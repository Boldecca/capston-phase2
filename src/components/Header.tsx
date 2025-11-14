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
        <div className="ml-auto flex items-center gap-2">
          <Link href="/(auth)/login" className="rounded-md px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10">
            Sign in
          </Link>
          <Link href="/(auth)/signup" className="rounded-md border px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10">
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
