import { NextAuthOptions } from "next-auth";
import credentialsProvider from "next-auth/providers/credentials";
import { getCsrfToken } from "next-auth/react";
import { SiweMessage } from "siwe";
import { ethers } from "ethers";

const nextAuthSecret = process.env["NEXTAUTH_SECRET"];
if (!nextAuthSecret) {
  throw new Error("NEXTAUTH_SECRET is not set");
}
const projectId = process.env["NEXT_PUBLIC_WCID"];
if (!projectId) {
  throw new Error("NEXT_PUBLIC_WCID is not set");
}

export const authOptions: NextAuthOptions = {
  providers: [
    credentialsProvider({
      name: "Ethereum",
      credentials: {
        message: {
          label: "Message",
          type: "text",
          placeholder: "0x0",
        },
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "0x0",
        },
      },
      async authorize(credentials, req) {
        try {
          if (!credentials?.message) {
            throw new Error("SiweMessage is undefined");
          }
          const siwe = new SiweMessage(credentials.message);
          const provider = new ethers.JsonRpcProvider(
            `https://rpc.walletconnect.com/v1?chainId=eip155:${siwe.chainId}&projectId=${projectId}`
          );
          const nonce = await getCsrfToken({ req: { headers: req.headers } });
          const result = await siwe.verify(
            {
              signature: credentials?.signature || "",
              nonce,
            },
            { provider }
          );

          if (result.success) {
            return {
              id: `eip155:${siwe.chainId}:${siwe.address}`,
            };
          }

          return null;
        } catch (e) {
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async session({ session, token }) {
      if (!token.sub) {
        return session;
      }

      const [, chainId, address] = token.sub.split(":");
      if (chainId && address) {
        session.address = address;
        session.chainId = parseInt(chainId, 10);
        session.user = {
          name: address,
          email: null,
          image: null,
        };
      }

      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};
