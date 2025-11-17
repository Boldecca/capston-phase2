"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";

interface User {
  name: string;
  avatar: string;
  followers: number;
}

export default function DashboardHeader() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>({
    name: "John Doe",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    followers: 1234,
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    router.push("/auth/sign-in");
  };

  if (!user) return null;

  return (
    <header className="bg-black border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo & Nav */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold">
              M
            </div>
            <span className="text-xl font-bold group-hover:text-blue-400 transition">
              PublishHub
            </span>
          </Link>
          <nav className="hidden md:flex gap-8">
            <Link
              href="/"
              className="text-gray-400 hover:text-white transition"
            >
              Home
            </Link>
            <Link
              href="/explore"
              className="text-gray-400 hover:text-white transition"
            >
              Explore
            </Link>
            <Link
              href="/write"
              className="text-gray-400 hover:text-white transition"
            >
              Write
            </Link>
          </nav>
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-6">
          {/* Search */}
          <div className="hidden lg:block">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-full text-gray-400 focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          {/* User Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 hover:bg-gray-900 p-2 rounded-lg transition"
            >
              <Image
                src={user.avatar}
                alt={user.name}
                width={36}
                height={36}
                className="rounded-full"
                priority
              />
              <div className="hidden sm:flex flex-col items-start">
                <p className="text-white font-semibold text-sm">{user.name}</p>
                <p className="text-gray-400 text-xs">
                  {user.followers} followers
                </p>
              </div>
              <svg
                className={`w-4 h-4 text-gray-400 transition ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-800 rounded-lg shadow-xl overflow-hidden">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-gray-400 hover:bg-gray-800 hover:text-white transition"
                >
                  View Profile
                </Link>
                <Link
                  href="/settings"
                  className="block px-4 py-2 text-gray-400 hover:bg-gray-800 hover:text-white transition"
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-800 transition font-semibold"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}