"use client";

import { useState } from "react";

export default function RequestPocPage() {
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    await fetch("/api/poc/request", {
      method: "POST",
      body: JSON.stringify({
        company: "TODO",
        email: "TODO",
        pocType: "open_source",
      }),
    });

    setLoading(false);
    alert("Request submitted");
  }

  return (
    <form
      onSubmit={submit}
      className="min-h-screen flex flex-col items-center justify-center gap-4"
    >
      <h2 className="text-2xl font-semibold">Request POC</h2>
      <button
        disabled={loading}
        className="px-6 py-2 bg-white text-black rounded"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
