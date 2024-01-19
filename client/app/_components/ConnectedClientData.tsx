"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { useSession } from "next-auth/react";

export default function ConnectedClientData() {
  const [isClient, setIsClient] = useState(false);
  const { isConnected, address } = useAccount();
  const { data } = useSession();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div>
      <p className="mt-24 text-2xl">Client-side Wallet/Chain Data</p>
      <div className="stats my-8 w-full rounded-none shadow">
        <div className="stat">
          <div className="stat-title">Connected Wallet?</div>
          <div
            className={`stat-value ${
              isConnected ? "text-green-600" : "text-red-600"
            }`}
          >
            {String(isConnected)}
          </div>
        </div>

        <div className="stat">
          <div className="stat-title">Connected User</div>
          <div className="stat-value text-secondary">
            {address &&
              String(address).substring(0, 4) +
                "..." +
                String(address).substring(38)}
          </div>
        </div>
      </div>
      <p className="mt-12 text-2xl">Client-side Session Token Data</p>
      {data && (
        <p className="my-4 italic text-yellow-500">
          {JSON.stringify(data, null, 4)}
        </p>
      )}
    </div>
  );
}
