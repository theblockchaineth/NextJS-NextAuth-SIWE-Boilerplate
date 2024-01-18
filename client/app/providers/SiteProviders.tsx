import AuthProvider from "./auth/AuthProvider";
import Web3Providers from "./web3/Web3Provider";

export default function SiteProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Web3Providers>
        <AuthProvider>{children}</AuthProvider>
      </Web3Providers>
    </>
  );
}
