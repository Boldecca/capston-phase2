"use client";

import { useState } from "react";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import MyPosts from "../../components/Dashboard/MyPosts";
import Drafts from "../../components/Dashboard/Drafts";
import Analytics from "../../components/Dashboard/Analytics";
import Settings from "../../components/Dashboard/Settings";
import NewPostButton from "../../components/Dashboard/NewPostButton";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("posts");

  const tabs = [
    { id: "posts", label: "📝 Published", icon: "✨" },
    { id: "drafts", label: "📋 Drafts", icon: "📄" },
    { id: "analytics", label: "📊 Analytics", icon: "📈" },
    { id: "settings", label: "⚙️ Settings", icon: "🔧" },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <DashboardHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div>
              <h1 className="text-5xl font-bold mb-2">Your Dashboard</h1>
              <p className="text-gray-400 text-lg">Manage, publish, and grow your audience</p>
            </div>
            <NewPostButton />
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/10 border border-blue-700/30 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Total Posts</p>
              <p className="text-3xl font-bold">24</p>
              <p className="text-green-400 text-xs mt-2">↑ 3 this month</p>
            </div>
            <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/10 border border-purple-700/30 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Total Views</p>
              <p className="text-3xl font-bold">12.5K</p>
              <p className="text-green-400 text-xs mt-2">↑ 12% this week</p>
            </div>
            <div className="bg-gradient-to-br from-pink-900/30 to-pink-800/10 border border-pink-700/30 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Total Claps</p>
              <p className="text-3xl font-bold">2.3K</p>
              <p className="text-green-400 text-xs mt-2">↑ 8% this week</p>
            </div>
            <div className="bg-gradient-to-br from-green-900/30 to-green-800/10 border border-green-700/30 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Followers</p>
              <p className="text-3xl font-bold">1.2K</p>
              <p className="text-green-400 text-xs mt-2">↑ 24 this month</p>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="mb-8">
          <div className="flex gap-2 flex-wrap border-b border-gray-800 pb-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-semibold transition relative group ${
                  activeTab === tab.id
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-[-17px] left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-96">
          {activeTab === "posts" && <MyPosts />}
          {activeTab === "drafts" && <Drafts />}
          {activeTab === "analytics" && <Analytics />}
          {activeTab === "settings" && <Settings />}
        </div>
      </div>
    </div>
  );
}