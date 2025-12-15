"use client";

import Link from "next/link";

export default function StartPocPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl">Choose POC type</h2>

      <Link href="/portal/results" className="block underline">
        Use open source model
      </Link>

      <Link href="/portal/upload" className="block underline">
        Upload our model
      </Link>
    </div>
  );
}
