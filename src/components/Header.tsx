"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/posts", label: "Explore" },
  { href: "/editor", label: "Write" },
];

export default function Header() {
  const [open, setOpen] = React.useState(false);
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 h-14 flex items-center gap-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg shrink-0">
          <Image src="/logo.svg" alt="Logo" width={20} height={20} />
          <span>PublishHub</span>
        </Link>

        {/* Nav */}
        <nav className="hidden sm:flex items-center gap-4 text-sm">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="hover:underline underline-offset-4">
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Search */}
        <div className="mx-2 flex-1 hidden md:block">
          <div className="relative">
            <input
              type="text"
              placeholder="Search posts, tags, authors..."
              className="w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground/70"
            />
          </div>
        </div>

        {/* Auth actions */}
        <div className="ml-auto hidden sm:flex items-center gap-2">
          <Link href="/(auth)/login" className="rounded-md px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10">
            Sign in
          </Link>
          <Link href="/(auth)/signup" className="rounded-md border px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10">
            Sign Up
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="ml-auto inline-flex items-center justify-center rounded-md border p-2 sm:hidden"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {open ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile panel */}
      {open && (
        <div className="sm:hidden border-t bg-background/95">
          <div className="mx-auto w-full max-w-6xl px-4 py-3 space-y-3">
            <div className="flex flex-col gap-2 text-sm">
              {nav.map((n) => (
                <Link key={n.href} href={n.href} className="rounded-md px-2 py-2 hover:bg-black/5 dark:hover:bg-white/10" onClick={() => setOpen(false)}>
                  {n.label}
                </Link>
              ))}
            </div>
            <div>
              <input
                type="text"
                placeholder="Search posts, tags, authors..."
                className="w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground/70"
              />
            </div>
            <div className="flex items-center gap-2">
              <Link href="/(auth)/login" className="flex-1 rounded-md px-3 py-2 text-sm text-center hover:bg-black/5 dark:hover:bg-white/10" onClick={() => setOpen(false)}>
                Sign in
              </Link>
              <Link href="/(auth)/signup" className="flex-1 rounded-md border px-3 py-2 text-sm text-center hover:bg-black/5 dark:hover:bg-white/10" onClick={() => setOpen(false)}>
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
