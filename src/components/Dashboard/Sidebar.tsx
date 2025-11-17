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
    <aside className="w-64 border-r border-gray-200 bg-white min-h-screen sticky top-[65px]">
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
                    ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
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