import { ReactNode } from "react";
import { Metadata } from "next";
import Sidebar from "@/components/Dashboard/Sidebar";

type TabType = "dashboard" | "posts" | "comments" | "profile" | "settings";

export const metadata: Metadata = {
  title: "Dashboard | MediumX",
};

export default function DashboardLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { tab?: string[] };
}) {
  const activeTab = (params?.tab?.[0] as TabType) || "dashboard";

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] bg-gray-900 text-white">
      <Sidebar activeTab={activeTab} />
      <main className="flex-1 p-8 bg-gray-900">
        {children}
      </main>
    </div>
  );
}
