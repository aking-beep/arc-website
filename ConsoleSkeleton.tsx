export function ConsoleSkeleton() {
  return (
    <div aria-hidden="true" className="space-y-3">
      <div className="h-5 w-48 rounded bg-night-3" />
      <div className="h-3 w-72 rounded bg-night-2" />
      <div className="mt-6 space-y-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-11 rounded bg-night-2" />
        ))}
      </div>
      <span className="sr-only">Loading view</span>
    </div>
  );
}
