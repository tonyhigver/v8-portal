"use client";

import { useEffect, useState } from "react";

export default function PocStatusPage() {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = localStorage.getItem("poc_id");
    if (!id) {
      setLoading(false);
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/poc/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
        <p className="text-neutral-400">Loading…</p>
      </main>
    );
  }

  if (!status || status !== "approved") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-neutral-950 px-4 text-white">
        <div className="max-w-xl text-center space-y-4">
          <h1 className="text-3xl font-semibold">
            POC request received
          </h1>
          <p className="text-neutral-400">
            Your request is under review.  
            This page will automatically unlock once approved.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-950 px-4">
      <div className="w-full max-w-6xl bg-white rounded-xl overflow-hidden shadow-xl">
        <div className="px-6 py-4 border-b">
          <h1 className="text-2xl font-semibold text-black">
            Schedule your POC call
          </h1>
          <p className="text-sm text-neutral-600 mt-1">
            Choose a time that works for you. Availability updates in real time.
          </p>
        </div>

        <iframe
          src={process.env.NEXT_PUBLIC_CALENDAR_LINK}
          className="w-full h-[900px] border-0"
          allow="camera; microphone; fullscreen"
        />
      </div>
    </main>
  );
}
