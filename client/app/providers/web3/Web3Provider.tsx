"use client";

import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { WagmiConfig } from "wagmi";
import { mainnet, sepolia } from "viem/chains";
import { siweConfig } from "./SiweClient";

const metadata = {
  name: "My Application",
  description: "My Application",
  url: process.env.NEXTAUTH_URL,
};

const projectId = String(process.env.NEXT_PUBLIC_WCID);
const chains =
  parseInt(String(process.env.NEXT_PUBLIC_NETWORK_ID)) == 1
    ? [mainnet]
    : [sepolia];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({
  siweConfig,
  wagmiConfig,
  projectId,
  chains,
  themeMode: "dark",
  termsConditionsUrl: "/terms",
  privacyPolicyUrl: "/privacy",
});

export default function Web3Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
    </>
  );
}
