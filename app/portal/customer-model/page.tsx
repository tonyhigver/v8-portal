"use client";

import { useEffect, useState } from "react";

function format(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${h}h ${m}m ${s}s`;
}

export default function CustomerModelPage() {
  const [start] = useState(() => Date.now());

  const SIX_HOURS = 6 * 60 * 60 * 1000;
  const FOURTEEN_HOURS = 14 * 60 * 60 * 1000;

  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const i = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-950 text-white px-4">
      <div className="max-w-2xl w-full text-center space-y-10">
        <h1 className="text-3xl font-semibold">
          Custom Model Provisioning
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border border-neutral-800 rounded-xl p-6">
            <p className="text-sm text-neutral-400 mb-2">
              Environment preparation
            </p>
            <p className="text-4xl font-mono">
              {format(start + SIX_HOURS - now)}
            </p>
          </div>

          <div className="border border-neutral-800 rounded-xl p-6">
            <p className="text-sm text-neutral-400 mb-2">
              Model deployment window
            </p>
            <p className="text-4xl font-mono">
              {format(start + FOURTEEN_HOURS - now)}
            </p>
          </div>
        </div>

        <p className="text-neutral-400 text-sm">
          These timers reflect internal provisioning steps.
          <br />
          You will be notified once the environment is ready.
        </p>
      </div>
    </main>
  );
}
