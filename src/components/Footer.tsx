"use client";

import React from "react";
import Container from "@/components/Container";

export default function Footer() {
  return (
    <footer className="border-t mt-10">
      <Container className="py-8 text-sm text-muted-foreground flex items-center justify-between">
        <p>© {new Date().getFullYear()} MediumX</p>
        <p className="opacity-80">Built with Next.js</p>
      </Container>
    </footer>
  );
}
