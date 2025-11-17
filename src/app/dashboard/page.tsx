"use client";

import { useState } from "react";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import MyPosts from "@/components/Dashboard/MyPosts";
import Drafts from "@/components/Dashboard/Drafts";
import Analytics from "@/components/Dashboard/Analytics";
import Settings from "@/components/Dashboard/Settings";
import NewPostButton from "@/components/Dashboard/NewPostButton";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("posts");

  const tabs = [
    { id: "posts", label: "📝 Published", component: <MyPosts /> },
    { id: "drafts", label: "📋 Drafts", component: <Drafts /> },
    { id: "analytics", label: "📊 Analytics", component: <Analytics /> },
    { id: "settings", label: "⚙️ Settings", component: <Settings /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <DashboardHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Dashboard</h1>
          <NewPostButton />
        </div>

        {/* Tabs Navigation */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {tabs.find((tab) => tab.id === activeTab)?.component}
        </div>
      </div>
    </div>
  );
}