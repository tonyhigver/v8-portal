import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">V8 Memory Runtime</h1>
      <p className="text-neutral-400 max-w-md text-center">
        Private inference runtime for extreme VRAM reduction.
      </p>
      <Link
        href="/request-poc"
        className="px-6 py-3 bg-white text-black rounded-md"
      >
        Request POC
      </Link>
    </main>
  );
}
