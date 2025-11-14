"use client";

import Link from "next/link";
import React from "react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/posts", label: "Posts" },
  { href: "/about", label: "About" },
  { href: "/account", label: "Account" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg">
          MediumX
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="hover:underline underline-offset-4"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
