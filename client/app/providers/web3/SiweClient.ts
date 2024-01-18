import { SiweMessage } from "siwe";
import { createSIWEConfig } from "@web3modal/siwe";
import { getCsrfToken, signIn, signOut, getSession } from "next-auth/react";
import type {
  SIWECreateMessageArgs,
  SIWESession,
  SIWEVerifyMessageArgs,
} from "@web3modal/core";

export const siweConfig = createSIWEConfig({
  createMessage: ({ nonce, address, chainId }: SIWECreateMessageArgs) =>
    new SiweMessage({
      version: "1",
      domain: window.location.host,
      uri: window.location.origin,
      address,
      chainId,
      nonce,
      statement:
        "This site uses SIWE functionality to generate a secure token between you and our servers.",
    }).prepareMessage(),
  getNonce: async () => {
    const nonce = await getCsrfToken();
    if (!nonce) {
      throw new Error("Failed to get nonce!");
    }

    return nonce;
  },
  getSession: async () => {
    const session = await getSession();
    if (!session) {
      throw new Error("Failed to get session!");
    }

    const { address, chainId } = session as unknown as SIWESession;

    return { address, chainId };
  },
  verifyMessage: async ({ message, signature }: SIWEVerifyMessageArgs) => {
    try {
      const success = await signIn("credentials", {
        message,
        redirect: false,
        signature,
        callbackUrl: "/",
      });

      return Boolean(success?.ok);
    } catch (error) {
      return false;
    }
  },
  signOut: async () => {
    try {
      await signOut({
        redirect: false,
      });

      return true;
    } catch (error) {
      return false;
    }
  },
});
