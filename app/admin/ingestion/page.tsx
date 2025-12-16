"use client";

import { useState } from "react";

type Method =
  | "credentials"
  | "pgp"
  | "portal"
  | "iam";

export default function IngestionPage() {
  const [method, setMethod] = useState<Method>("credentials");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const form = e.target as HTMLFormElement;

    const payload = {
      method,
      endpoint: (form.endpoint as any)?.value,
      access_key: (form.access_key as any)?.value,
      secret_key: (form.secret_key as any)?.value,
      bucket: (form.bucket as any)?.value,
      object: (form.object as any)?.value,
      expires_in_hours: Number(
        (form.expires as any)?.value || 48
      ),
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/admin/ingest`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Admin-Token":
              process.env.NEXT_PUBLIC_ADMIN_TOKEN!,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        throw new Error("Failed");
      }

      const data = await res.json();
      setMessage(`Ingestion started (job ${data.job_id})`);
    } catch {
      setMessage("Error starting ingestion");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-white p-8">
      <h1 className="text-3xl font-semibold mb-6">
        Secure Model Ingestion
      </h1>

      <form
        onSubmit={submit}
        className="max-w-xl space-y-4"
      >
        {/* METHOD */}
        <div>
          <label className="block text-sm mb-1">
            Ingestion method
          </label>
          <select
            value={method}
            onChange={(e) =>
              setMethod(e.target.value as Method)
            }
            className="w-full bg-neutral-900 border border-neutral-700 p-2 rounded"
          >
            <option value="credentials">
              Email / Manual credentials
            </option>
            <option value="pgp">
              Encrypted email (PGP)
            </option>
            <option value="portal">
              Secure portal
            </option>
            <option value="iam">
              Cloud IAM (AssumeRole)
            </option>
          </select>
        </div>

        {/* COMMON FIELDS */}
        <input
          name="endpoint"
          placeholder="Endpoint (https://storage.customer.com)"
          className="w-full p-2 bg-neutral-900 border border-neutral-700 rounded"
          required
        />
        <input
          name="bucket"
          placeholder="Bucket"
          className="w-full p-2 bg-neutral-900 border border-neutral-700 rounded"
          required
        />
        <input
          name="object"
          placeholder="Object (model-3b.bin)"
          className="w-full p-2 bg-neutral-900 border border-neutral-700 rounded"
          required
        />

        {/* CREDENTIALS */}
        {method !== "iam" && (
          <>
            <input
              name="access_key"
              placeholder="Access key"
              className="w-full p-2 bg-neutral-900 border border-neutral-700 rounded"
            />
            <input
              name="secret_key"
              placeholder="Secret key"
              className="w-full p-2 bg-neutral-900 border border-neutral-700 rounded"
            />
          </>
        )}

        <input
          name="expires"
          placeholder="Expires in hours (default 48)"
          type="number"
          className="w-full p-2 bg-neutral-900 border border-neutral-700 rounded"
        />

        <button
          disabled={loading}
          className="w-full py-3 bg-white text-black rounded font-medium"
        >
          {loading
            ? "Starting ingestion…"
            : "Start secure pull"}
        </button>

        {message && (
          <p className="text-sm text-neutral-400">
            {message}
          </p>
        )}
      </form>
    </main>
  );
}
