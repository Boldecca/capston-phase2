"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";

interface User {
  name: string;
  avatar: string;
  followers: number;
}

export default function DashboardHeader() {
  const router = useRouter();
  const [user] = useState<User | null>({
    name: "John Doe",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    followers: 1234,
  });

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    router.push("/auth/sign-in");
  };

  if (!user) return null;

  return (
    <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Image
            src={user.avatar}
            alt={user.name}
            width={40}
            height={40}
            className="rounded-full"
            priority
          />
          <div>
            <h2 className="text-white font-semibold">{user.name}</h2>
            <p className="text-slate-400 text-sm">{user.followers} followers</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-semibold"
        >
          Logout
        </button>
      </div>
    </header>
  );
}