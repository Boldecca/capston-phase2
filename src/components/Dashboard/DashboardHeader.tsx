"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";

interface User {
  name: string;
  avatar: string;
}

export default function DashboardHeader() {
  const router = useRouter();
  const [user, setUser] = useState<User>(() => ({
    name: "John Doe",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  }));
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    router.push("/auth/sign-in");
  };

  if (!user) return null;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center font-bold text-white">
            M
          </div>
          <span className="text-xl font-bold text-gray-900">PublishHub</span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex gap-8">
          <Link href="/" className="text-gray-700 hover:text-blue-600 transition font-medium text-sm">
            Home
          </Link>
          <Link href="/explore" className="text-gray-700 hover:text-blue-600 transition font-medium text-sm">
            Explore
          </Link>
          <Link href="/write" className="text-gray-700 hover:text-blue-600 transition font-medium text-sm">
            Write
          </Link>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search posts, ts, tags, authors..."
            className="hidden lg:block px-4 py-2 bg-gray-100 border border-gray-300 rounded-full text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 hover:bg-gray-100 p-1 rounded-full transition"
            >
              <Image
                src={user.avatar}
                alt={user.name}
                width={36}
                height={36}
                className="rounded-full"
                priority
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition text-sm"
                >
                  View Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 transition font-semibold text-sm"
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