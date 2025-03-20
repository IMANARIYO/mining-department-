"use client"; // Ensure this is included for the client component

import React, { useState, useEffect } from "react";
import { Payment, columns } from "./columns";
import { DataTable } from "@/components/tablesUtils/data-table";

export default function DemoPage() {
  const [data, setData] = useState<Payment[]>([]);

  useEffect(() => {
    async function getData() {
      return Array.from({ length: 1000 }, (_, i) => ({
        id: `id_${i + 1}`,
        amount: Math.floor(Math.random() * 1000) + 1,
        status: ["pending", "failed", "processing", "success"][
          Math.floor(Math.random() * 4)
        ] as "pending" | "failed" | "processing" | "success",
        email: `user${i + 1}@example.com`,
        date: new Date(
          Date.now() - Math.floor(Math.random() * 10000000000)
        ).toISOString(),
        method: ["credit_card", "paypal", "bank_transfer"][
          Math.floor(Math.random() * 3)
        ] as "credit_card" | "paypal" | "bank_transfer",
        reference: `REF${Math.floor(Math.random() * 100000)}`,
        currency: ["USD", "EUR", "GBP"][Math.floor(Math.random() * 3)] as
          | "USD"
          | "EUR"
          | "GBP",
        customerName: `Customer ${i + 1}`,
        transactionType: ["deposit", "withdrawal", "purchase"][
          Math.floor(Math.random() * 3)
        ] as "deposit" | "withdrawal" | "purchase",
        notes: `This is a sample note for payment #${i + 1}.`
      }));
    }

    getData().then(setData);
  }, []);

  return (
    <div className="container   w-[100vw]  overflow-x-auto">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
