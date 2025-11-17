import { ReactNode } from "react";
import Sidebar from "@/components/Dashboard/Sidebar";

type TabType = "dashboard" | "posts" | "comments" | "profile" | "settings";

interface DashboardLayoutProps {
  children: ReactNode;
  params: { tab?: string[] };
}

export default function DashboardLayout({ children, params }: DashboardLayoutProps) {
  // Get the active tab from the URL
  const activeTab = (params.tab?.[0] as TabType) || "dashboard";

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] bg-white">
      <Sidebar activeTab={activeTab} />
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
