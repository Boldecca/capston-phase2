"use client";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const navItems = [
    { id: "dashboard", icon: "📊", label: "Dashboard" },
    { id: "posts", icon: "📝", label: "Posts" },
    { id: "comments", icon: "💬", label: "Comments" },
    { id: "profile", icon: "👤", label: "Profile" },
    { id: "settings", icon: "⚙️", label: "Settings" },
  ];

  return (
    <aside className="w-64 border-r border-gray-200 bg-gray-50 min-h-screen sticky top-0">
      <nav className="p-6">
        <div className="space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition text-left ${
                activeTab === item.id
                  ? "bg-white text-blue-600 font-semibold border-l-4 border-blue-600"
                  : "text-gray-700 hover:bg-white"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </aside>
  );
}