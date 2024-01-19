"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { status } = useSession();
  const router = useRouter();

  const targetUrl = String(searchParams.callbackUrl) || "/";

  if (status === "authenticated") {
    router.push(targetUrl);
  }
  return (
    <section className="flex h-[calc(90vh)] w-full items-center">
      <div className="m-auto flex max-w-5xl flex-col items-center justify-center space-y-8 px-5 text-center">
        <p className="text-3xl">PLEASE CONNECT WALLET TO PROCEED</p>
      </div>
    </section>
  );
}
