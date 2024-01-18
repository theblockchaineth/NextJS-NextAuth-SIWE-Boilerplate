import type { SIWESession } from "@web3modal/core";
import NextAuth from "next-auth";
import { authOptions } from "./authOptions";

declare module "next-auth" {
  interface Session extends SIWESession {
    address: string;
    chainId: number;
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
