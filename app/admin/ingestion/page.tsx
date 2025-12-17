"use client";

import { useState } from "react";

export default function AdminIngestionPage() {
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState("email");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;

    const payload = {
      method,
      endpoint: (form.endpoint as HTMLInputElement).value,
      access_key: (form.access_key as HTMLInputElement).value,
      secret_key: (form.secret_key as HTMLInputElement).value,
      bucket: (form.bucket as HTMLInputElement).value,
      object: (form.object as HTMLInputElement).value,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/admin/ingest`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // ✅ CAMBIO CLAVE: token desde ENV, no localStorage
            "X-Admin-Token": process.env.NEXT_PUBLIC_ADMIN_TOKEN!,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        throw new Error("Ingestion failed");
      }

      alert("Ingestion job started successfully");
      form.reset();
    } catch (err) {
      alert("Error starting ingestion");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-white px-6 py-10">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-semibold">
          Secure Model Ingestion
        </h1>

        <p className="text-neutral-400">
          Use this form to ingest a model provided via email,
          encrypted email, secure portal or IAM-based access.
        </p>

        {/* ACCESS METHOD */}
        <div>
          <label className="block text-sm mb-1">
            Access method
          </label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 rounded"
          >
            <option value="email">Email (plain)</option>
            <option value="encrypted_email">Encrypted email</option>
            <option value="portal">Secure portal</option>
            <option value="iam">IAM / Role based</option>
          </select>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <input
            name="endpoint"
            placeholder="Endpoint (https://storage.customer.com)"
            required
            className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 rounded"
          />

          <input
            name="access_key"
            placeholder="Access key (if applicable)"
            className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 rounded"
          />

          <input
            name="secret_key"
            placeholder="Secret key (if applicable)"
            className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 rounded"
          />

          <input
            name="bucket"
            placeholder="Bucket name"
            required
            className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 rounded"
          />

          <input
            name="object"
            placeholder="Object (model-3b.bin)"
            required
            className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 rounded"
          />

          <button
            disabled={loading}
            className="w-full bg-white text-black py-3 rounded font-medium disabled:opacity-50"
          >
            {loading ? "Starting ingestion…" : "Start ingestion"}
          </button>
        </form>

        <p className="text-xs text-neutral-500">
          No model data is uploaded via this UI.
          Access is read-only, time-limited and auditable.
        </p>
      </div>
    </main>
  );
}
