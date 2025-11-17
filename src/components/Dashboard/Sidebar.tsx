"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type TabType = "dashboard" | "posts" | "comments" | "profile" | "settings";

interface SidebarProps {
  activeTab: TabType;
}

export default function Sidebar({ activeTab }: SidebarProps) {
  const pathname = usePathname();
  
  const navItems = [
    { id: "dashboard", icon: "", label: "Dashboard", href: "/dashboard" },
    { id: "posts", icon: "", label: "Posts", href: "/dashboard/posts" },
    { id: "comments", icon: "", label: "Comments", href: "/dashboard/comments" },
    { id: "profile", icon: "", label: "Profile", href: "/dashboard/profile" },
    { id: "settings", icon: "", label: "Settings", href: "/dashboard/settings" },
  ];

  return (
    <aside className="w-64 border-r border-gray-800 bg-gray-900 min-h-screen sticky top-[65px]">
      <nav className="p-6">
        <div className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.id === 'dashboard' && pathname === '/dashboard');
                
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition text-left font-medium ${
                  isActive
                    ? "bg-gray-800 text-blue-400 border-l-4 border-blue-500"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}