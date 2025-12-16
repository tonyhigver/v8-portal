"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RequestPocPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;

    const company = (form.elements.namedItem("company") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const role = (form.elements.namedItem("role") as HTMLInputElement).value;
    const pocType = (form.elements.namedItem("pocType") as HTMLSelectElement).value;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/poc/request`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ company, email, role, pocType }),
        }
      );

      if (!res.ok) throw new Error();

      const json = await res.json();
      localStorage.setItem("poc_id", json.id.toString());

      router.push("/poc-status");
    } catch {
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

        <input name="company" required placeholder="Company name" className="input" />
        <input name="email" type="email" required placeholder="Corporate email" className="input" />
        <input name="role" placeholder="CTO, ML Lead, Founder…" className="input" />

        <select name="pocType" className="input">
          <option value="open_source">Open-source model</option>
          <option value="customer_model">Our own model</option>
        </select>

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
