"use client";

import { useEffect, useState } from "react";

export default function PocStatusPage() {
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("poc_id");
    if (!id) return;

    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/poc/${id}`)
      .then((res) => res.json())
      .then((data) => setStatus(data.status));
  }, []);

  if (!status) {
    return <p className="p-8">Loading…</p>;
  }

  if (status !== "approved") {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-semibold">POC submitted</h1>
        <p className="mt-4 text-neutral-500">
          Your request is under review. This page will update once approved.
        </p>
      </main>
    );
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold mb-4">
        Schedule your POC call
      </h1>

      <iframe
        src={process.env.NEXT_PUBLIC_CALENDAR_LINK}
        className="w-full h-[700px] border rounded"
      />
    </main>
  );
}
