"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Poc = {
  id: number;
  company: string;
  email: string;
  role?: string;
  poc_type: string;
  status: string;
  created_at: string;
};

export default function PocDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const [poc, setPoc] = useState<Poc | null>(null);

  const headers = {
    "X-Admin-Token": process.env.NEXT_PUBLIC_ADMIN_TOKEN!,
  };

  async function load() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/admin/poc`,
      { headers }
    );
    const all = await res.json();
    const found = all.find((p: Poc) => p.id === Number(id));
    setPoc(found || null);
  }

  async function action(action: string) {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/admin/poc/${id}/${action}`,
      {
        method: "POST",
        headers,
      }
    );
    router.push("/admin");
  }

  useEffect(() => {
    load();
  }, []);

  if (!poc) {
    return (
      <div className="p-8 text-white">
        Loading…
      </div>
    );
  }

  return (
    <main className="p-8 min-h-screen bg-neutral-950 text-white">
      <h1 className="text-2xl font-semibold mb-6">
        POC Detail
      </h1>

      <div className="space-y-2 mb-8">
        <p><b>Company:</b> {poc.company}</p>
        <p><b>Email:</b> {poc.email}</p>
        <p><b>Role:</b> {poc.role || "—"}</p>
        <p><b>Type:</b> {poc.poc_type}</p>
        <p><b>Status:</b> {poc.status}</p>
      </div>

      <div className="space-x-3">
        <button
          onClick={() => action("approve")}
          className="px-4 py-2 bg-green-600 rounded"
        >
          Approve
        </button>
        <button
          onClick={() => action("ask_info")}
          className="px-4 py-2 bg-yellow-600 rounded"
        >
          Ask info
        </button>
        <button
          onClick={() => action("reject")}
          className="px-4 py-2 bg-red-600 rounded"
        >
          Reject
        </button>
      </div>
    </main>
  );
}
