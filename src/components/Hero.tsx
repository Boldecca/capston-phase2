"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="py-12 sm:py-16">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div className="max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs opacity-90">
            <span className="inline-flex h-2 w-2 rounded-full bg-blue-500" />
            <span>Welcome to PublishHub</span>
          </div>
          <h1 className="mb-4 text-4xl font-semibold tracking-tight sm:text-6xl">
            Share Your <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Ideas</span>
            <br />
            with the World
          </h1>
          <p className="mb-6 max-w-2xl text-muted-foreground">
            PublishHub is a modern platform for writers, developers, and creators to share stories, ideas, and expertise with a global audience. Start publishing today.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="/editor"
              className="inline-flex items-center justify-center rounded-md bg-foreground px-4 py-2 text-background transition-opacity hover:opacity-90"
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
        <div className="relative mx-auto aspect-[4/3] w-full max-w-xl overflow-hidden rounded-xl border">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/writer-publishing-platform-creative-workspace-xNo9PziFr5Y24KwGqwQShxTWNZHpSV.jpg"
            alt="Creative writing workspace"
            fill
            sizes="(max-width: 1024px) 100vw, 600px"
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
