"use client";

import { useEffect, useState } from "react";

const POC_DURATION_MS =
  (10 * 24 * 60 * 60 * 1000) + // 10 días
  (30 * 60 * 1000);           // 30 minutos

export default function PocActivePage() {
  const [remaining, setRemaining] = useState<number | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const startedAt = localStorage.getItem("poc_started_at");
    if (!startedAt) return;

    const start = Number(startedAt);

    const interval = setInterval(() => {
      const now = Date.now();
      const left = start + POC_DURATION_MS - now;
      setRemaining(left > 0 ? left : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function format(ms: number) {
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  async function deletePoc() {
    setDeleting(true);

    // Simulación 30s (más adelante backend real)
    await new Promise((r) => setTimeout(r, 30000));

    localStorage.removeItem("poc_started_at");
    alert("POC data deleted from our servers.");
    window.location.href = "/";
  }

  if (remaining === null) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
        <p className="text-neutral-400">Loading…</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-950 px-4 text-white">
      <div className="max-w-xl w-full space-y-8 text-center">

        <h1 className="text-3xl font-semibold">
          POC Active
        </h1>

        <p className="text-neutral-400">
          Time remaining to complete the POC
        </p>

        <div className="text-4xl font-mono bg-neutral-900 rounded-lg py-6">
          {format(remaining)}
        </div>

        {/* DANGER ZONE */}
        <div className="border-t border-neutral-800 pt-6 space-y-4">
          <h2 className="text-lg font-medium text-red-400">
            Danger zone
          </h2>

          {!confirming && !deleting && (
            <button
              onClick={() => setConfirming(true)}
              className="w-full py-3 rounded bg-red-600 hover:bg-red-700 transition"
            >
              Delete AI from our servers
            </button>
          )}

          {confirming && !deleting && (
            <div className="space-y-4">
              <p className="text-sm text-neutral-400">
                Are you sure? This action is irreversible.
              </p>

              <div className="flex gap-4">
                <button
                  onClick={deletePoc}
                  className="flex-1 py-2 bg-red-600 rounded"
                >
                  Yes, delete
                </button>
                <button
                  onClick={() => setConfirming(false)}
                  className="flex-1 py-2 bg-neutral-800 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {deleting && (
            <div className="text-neutral-400">
              Deleting AI from servers… please wait
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
