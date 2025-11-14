"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="py-12 sm:py-16">
      <div className="grid items-center gap-8 sm:grid-cols-2">
        <div>
          <h1 className="mb-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Welcome to MediumX
          </h1>
          <p className="mb-6 text-muted-foreground">
            A clean, modern publishing starter built with Next.js. Share ideas,
            publish posts, and grow your audience.
          </p>
          <div className="flex gap-3">
            <a
              href="/posts"
              className="inline-flex items-center justify-center rounded-md bg-foreground px-4 py-2 text-background transition-colors hover:opacity-90"
            >
              Explore Posts
            </a>
            <a
              href="/about"
              className="inline-flex items-center justify-center rounded-md border px-4 py-2 transition-colors hover:bg-black/5 dark:hover:bg-white/10"
            >
              Learn More
            </a>
          </div>
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg ring-1 ring-border">
          <Image src="/hero.svg" alt="Hero" fill className="object-cover" priority />
        </div>
      </div>
    </section>
  );
}
