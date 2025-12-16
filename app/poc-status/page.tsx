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

  /* ----------------------------
     LOADING
  ----------------------------- */
  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
        <p className="text-neutral-400">Loading…</p>
      </main>
    );
  }

  /* ----------------------------
     NOT APPROVED YET
  ----------------------------- */
  if (!status || status !== "approved") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-neutral-950 px-4 text-white">
        <div className="max-w-xl text-center space-y-4">
          <h1 className="text-3xl font-semibold">
            POC request received
          </h1>
          <p className="text-neutral-400">
            Your request is under review.
            <br />
            This page will unlock automatically once approved.
          </p>
        </div>
      </main>
    );
  }

  /* ----------------------------
     APPROVED → CTA ENTERPRISE
  ----------------------------- */
  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-950 px-4 text-white">
      <div className="max-w-xl w-full text-center space-y-6">
        <h1 className="text-3xl font-semibold">
          Your POC is approved 🎉
        </h1>

        <p className="text-neutral-400">
          Please schedule a short validation call with our team.
          <br />
          Availability updates in real time.
        </p>

        <a
          href={process.env.NEXT_PUBLIC_CALENDAR_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 px-8 py-4 bg-white text-black rounded-lg text-lg font-medium hover:bg-neutral-200 transition"
        >
          Open calendar & schedule call →
        </a>

        <p className="text-xs text-neutral-500">
          The call will be booked directly in Google Calendar.
          <br />
          You’ll receive a confirmation automatically.
        </p>
      </div>
    </main>
  );
}
