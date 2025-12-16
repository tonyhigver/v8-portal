"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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
  const [error, setError] = useState<string | null>(null);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
  const ADMIN_TOKEN = process.env.NEXT_PUBLIC_ADMIN_TOKEN;

  async function load() {
    try {
      setLoading(true);
      setError(null);

      if (!API_BASE || !ADMIN_TOKEN) {
        throw new Error("Missing API base or admin token");
      }

      const res = await fetch(`${API_BASE}/admin/poc`, {
        headers: {
          "X-Admin-Token": ADMIN_TOKEN,
        },
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`API error ${res.status}: ${text}`);
      }

      const data = await res.json();

      if (!Array.isArray(data)) {
        throw new Error("Unexpected API response (not an array)");
      }

      setPocs(data);
    } catch (err: any) {
      console.error("Admin load failed:", err);
      setPocs([]);
      setError(err.message || "Failed to load POCs");
    } finally {
      setLoading(false);
    }
  }

  async function action(id: number, action: string) {
    try {
      if (!API_BASE || !ADMIN_TOKEN) {
        throw new Error("Missing API base or admin token");
      }

      const res = await fetch(
        `${API_BASE}/admin/poc/${id}/${action}`,
        {
          method: "POST",
          headers: {
            "X-Admin-Token": ADMIN_TOKEN,
          },
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Action failed ${res.status}: ${text}`);
      }

      await load();
    } catch (err) {
      console.error("Action failed:", err);
      alert("Action failed. Check console.");
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <main className="p-8 min-h-screen bg-neutral-950 text-white">
      <h1 className="text-3xl font-semibold mb-8">
        POC Requests
      </h1>

      {loading && (
        <p className="text-neutral-400">Loading…</p>
      )}

      {error && (
        <p className="text-red-500 mb-4">
          {error}
        </p>
      )}

      {!loading && !error && (
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
                  <td className="py-2">
                    <Link
                      href={`/admin/poc/${p.id}`}
                      className="underline"
                    >
                      {p.company}
                    </Link>
                  </td>
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
