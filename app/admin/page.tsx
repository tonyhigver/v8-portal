"use client";

import { useEffect, useState } from "react";

type Poc = {
  id: number;
  company: string;
  email: string;
  role?: string;
  poc_type: string;
  status: string;
  created_at: string;
};

export default function AdminPage() {
  const [pocs, setPocs] = useState<Poc[]>([]);
  const [loading, setLoading] = useState(true);

  const headers = {
    "X-Admin-Token": process.env.NEXT_PUBLIC_ADMIN_TOKEN!,
  };

  async function load() {
    setLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/admin/poc`,
      { headers }
    );
    const data = await res.json();
    setPocs(data);
    setLoading(false);
  }

  async function action(id: number, action: string) {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/admin/poc/${id}/${action}`,
      {
        method: "POST",
        headers,
      }
    );
    load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <main className="p-8 min-h-screen bg-neutral-950 text-white">
      <h1 className="text-3xl font-semibold mb-8">
        POC Requests
      </h1>

      {loading ? (
        <p className="text-neutral-400">Loading…</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-neutral-800 text-left">
                <th className="py-2">Company</th>
                <th>Email</th>
                <th>Role</th>
                <th>Type</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pocs.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-neutral-900 hover:bg-neutral-900"
                >
                  <td className="py-2">{p.company}</td>
                  <td>{p.email}</td>
                  <td>{p.role || "—"}</td>
                  <td>{p.poc_type}</td>
                  <td>
                    <span className="px-2 py-1 rounded text-xs bg-neutral-800">
                      {p.status}
                    </span>
                  </td>
                  <td className="text-right space-x-2">
                    <button
                      onClick={() => action(p.id, "approve")}
                      className="px-2 py-1 bg-green-600 rounded text-sm"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => action(p.id, "ask_info")}
                      className="px-2 py-1 bg-yellow-600 rounded text-sm"
                    >
                      Ask info
                    </button>
                    <button
                      onClick={() => action(p.id, "reject")}
                      className="px-2 py-1 bg-red-600 rounded text-sm"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {pocs.length === 0 && (
            <p className="text-neutral-400 mt-4">
              No POC requests yet.
            </p>
          )}
        </div>
      )}
    </main>
  );
}
