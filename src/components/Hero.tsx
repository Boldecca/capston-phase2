"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-3xl">
        <h1 className="mb-4 text-4xl font-semibold tracking-tight sm:text-6xl">
          Share your ideas
          <br />
          with the world
        </h1>
        <p className="mb-6 max-w-2xl text-muted-foreground">
          PublishHub is a modern platform for writers, developers, and creators to
          share their stories, ideas, and expertise with a global audience.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="/editor"
            className="inline-flex items-center justify-center rounded-md bg-foreground px-4 py-2 text-background transition-colors hover:opacity-90"
          >
            Start Writing
          </a>
          <a
            href="/posts"
            className="inline-flex items-center justify-center rounded-md border px-4 py-2 transition-colors hover:bg-black/5 dark:hover:bg-white/10"
          >
            Explore Stories
          </a>
        </div>
      </div>
    </section>
  );
}
