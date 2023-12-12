"use client";

import ATMWithdraw from "@/components/ATMWithdraw";
import Customers from "@/components/Customers";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-12 gap-12">
      <div className="flex justify-center w-full">
        <h1 className="text-3xl">APIs Test</h1>
      </div>
      <ATMWithdraw></ATMWithdraw>
      <Customers></Customers>
    </main>
  );
}
