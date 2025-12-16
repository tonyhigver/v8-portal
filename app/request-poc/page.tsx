"use client";

import { useState } from "react";

export default function RequestPocPage() {
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;

    const company = (form.elements.namedItem("company") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const role = (form.elements.namedItem("role") as HTMLInputElement).value;
    const pocType = (form.elements.namedItem("pocType") as HTMLSelectElement).value;

    const data = { company, email, role, pocType };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/poc/request`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to submit POC");
      }

      alert("POC request submitted. We will contact you.");
      form.reset();
    } catch (err) {
      alert("Error submitting POC. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-950 px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-md space-y-6 bg-neutral-900 p-8 rounded-lg"
      >
        <h1 className="text-2xl font-semibold text-white">
          Request POC
        </h1>

        {/* Company */}
        <div>
          <label className="block text-sm text-neutral-300 mb-1">
            Company name
          </label>
          <input
            name="company"
            required
            className="w-full rounded bg-neutral-800 border border-neutral-700 px-3 py-2 text-white"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm text-neutral-300 mb-1">
            Corporate email
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full rounded bg-neutral-800 border border-neutral-700 px-3 py-2 text-white"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm text-neutral-300 mb-1">
            Role
          </label>
          <input
            name="role"
            placeholder="CTO, ML Lead, Founder…"
            className="w-full rounded bg-neutral-800 border border-neutral-700 px-3 py-2 text-white"
          />
        </div>

        {/* POC type */}
        <div>
          <label className="block text-sm text-neutral-300 mb-1">
            POC type
          </label>
          <select
            name="pocType"
            className="w-full rounded bg-neutral-800 border border-neutral-700 px-3 py-2 text-white"
          >
            <option value="open_source">
              Open-source model (recommended)
            </option>
            <option value="customer_model">
              Our own model
            </option>
          </select>
        </div>

        {/* Submit */}
        <button
          disabled={loading}
          className="w-full bg-white text-black py-2 rounded font-medium disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Request POC"}
        </button>

        <p className="text-xs text-neutral-400">
          Models are never uploaded without explicit approval.
        </p>
      </form>
    </main>
  );
}
