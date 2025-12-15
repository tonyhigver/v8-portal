export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen p-8 bg-neutral-900">
      <header className="mb-8 text-xl font-semibold">
        V8 POC Portal
      </header>
      {children}
    </div>
  );
}
