export function Button({ children }: { children: React.ReactNode }) {
  return (
    <button className="px-4 py-2 bg-white text-black rounded">
      {children}
    </button>
  );
}
