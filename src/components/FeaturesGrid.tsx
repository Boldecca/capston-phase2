export default function FeaturesGrid() {
  const items = [
    {
      title: "Lightning Fast",
      desc: "Built with performance in mind. Read articles instantly.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
        </svg>
      ),
    },
    {
      title: "Community Driven",
      desc: "Connect with thousands of writers and readers worldwide.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 11a4 4 0 10-8 0 4 4 0 008 0z" />
          <path d="M3 21a7 7 0 0118 0" />
        </svg>
      ),
    },
    {
      title: "Grow Your Audience",
      desc: "Reach readers, build your brand, and monetize your content.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 17l6-6 4 4 8-8" />
          <path d="M14 7h7v7" />
        </svg>
      ),
    },
  ] as const;

  return (
    <section className="py-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {items.map(({ title, desc, icon }) => (
          <div
            key={title}
            className="rounded-lg border p-5 transition-colors hover:bg-black/[.02] dark:hover:bg-white/[.03]"
          >
            <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-md bg-muted">
              <span className="opacity-80">{icon}</span>
            </div>
            <h3 className="mb-1 text-base font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
