"use client";

import { useEffect, useState } from "react";

type PocType = "open_source" | "customer_model";

export default function PocStatusPage() {
  const [status, setStatus] = useState<string | null>(null);
  const [pocType, setPocType] = useState<PocType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = localStorage.getItem("poc_id");

    if (!id) {
      setLoading(false);
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/poc/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch POC");
        return res.json();
      })
      .then((data) => {
        setStatus(data.status);
        setPocType(data.poc_type); // 👈 viene del backend
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
     NOT APPROVED
  ----------------------------- */
  if (!status || status !== "approved") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-semibold">POC under review</h1>
          <p className="text-neutral-400">
            This page will unlock automatically once approved.
          </p>
        </div>
      </main>
    );
  }

  /* ----------------------------
     APPROVED
  ----------------------------- */
  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-950 px-4 text-white">
      <div className="max-w-xl w-full text-center space-y-6">
        <h1 className="text-3xl font-semibold">POC approved 🎉</h1>

        {/* 🔴 DISCLAIMER */}
        <div className="border border-red-500 text-red-400 text-sm rounded-lg p-3">
          ⚠️ Once you schedule the call, you will be redirected back to this page automatically.
        </div>

        {/* ----------------------------
            OPEN SOURCE MODEL
        ----------------------------- */}
        {pocType === "open_source" && (
          <>
            <p className="text-neutral-400">
              Please schedule a short validation call with our team.
            </p>

            <a
              href={process.env.NEXT_PUBLIC_CALENDAR_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                localStorage.setItem(
                  "poc_started_at",
                  Date.now().toString()
                );
              }}
              className="inline-block px-8 py-4 bg-white text-black rounded-lg text-lg font-medium"
            >
              Open calendar & schedule call →
            </a>

            <a
              href="/portal/poc-active"
              className="block text-sm text-neutral-400 underline"
            >
              I’ve already scheduled my call
            </a>
          </>
        )}

        {/* ----------------------------
            CUSTOMER MODEL
        ----------------------------- */}
        {pocType === "customer_model" && (
          <>
            <p className="text-neutral-400">
              Your custom model POC requires internal provisioning.
            </p>

            <a
              href="/portal/customer-model"
              className="inline-block px-8 py-4 bg-white text-black rounded-lg text-lg font-medium"
            >
              Continue →
            </a>
          </>
        )}
      </div>
    </main>
  );
}
