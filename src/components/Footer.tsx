"use client";

import React from "react";
import Container from "@/components/Container";

export default function Footer() {
  return (
    <footer className="border-t mt-10">
      <Container className="py-10">
        <div className="grid grid-cols-2 gap-8 text-sm text-muted-foreground sm:grid-cols-4">
          <div>
            <h4 className="mb-3 font-semibold text-foreground">About</h4>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="hover:underline underline-offset-4">About Us</a>
              </li>
              <li>
                <a href="#" className="hover:underline underline-offset-4">Our Mission</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-semibold text-foreground">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline underline-offset-4">Writing Guides</a>
              </li>
              <li>
                <a href="#" className="hover:underline underline-offset-4">API Docs</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-semibold text-foreground">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline underline-offset-4">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:underline underline-offset-4">Terms of Service</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-semibold text-foreground">Follow</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline underline-offset-4">Twitter</a>
              </li>
              <li>
                <a href="#" className="hover:underline underline-offset-4">GitHub</a>
              </li>
            </ul>
          </div>
        </div>
        <hr className="my-6 border-border" />
        <div className="text-center text-sm text-muted-foreground"> {new Date().getFullYear()} PublishHub. All rights reserved.</div>
      </Container>
    </footer>
  );
}
