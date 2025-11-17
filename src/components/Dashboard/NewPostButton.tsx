"use client";

import { useState } from "react";

interface NewPostModalProps {
  onClose: () => void;
}

function NewPostModal({ onClose }: NewPostModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6">
        <h2 className="text-lg font-semibold mb-4">Create New Post</h2>
        <textarea
          className="w-full border rounded p-2 mb-4"
          rows={6}
          placeholder="What's on your mind?"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-blue-600 text-white"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default function NewPostButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold rounded-lg shadow-lg transition transform hover:scale-105 active:scale-95"
      >
        ✨ New Post
      </button>
      {isOpen && <NewPostModal onClose={() => setIsOpen(false)} />}
    </>
  );
}