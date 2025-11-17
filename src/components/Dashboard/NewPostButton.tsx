"use client";

import { useState } from "react";
import NewPostModal from "./NewPostModal";

export default function NewPostButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg transition transform hover:scale-105 active:scale-95 flex items-center gap-2"
      >
        <span>✨</span> New Post
      </button>
      {isOpen && <NewPostModal onClose={() => setIsOpen(false)} />}
    </>
  );
}