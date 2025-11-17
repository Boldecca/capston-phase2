"use client";

import { useState } from "react";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import Sidebar from "@/components/Dashboard/Sidebar";
import MyPosts from "@/components/Dashboard/MyPosts";
import Comments from "@/components/Dashboard/Comments";
import Profile from "@/components/Dashboard/Profile";
import Settings from "@/components/Dashboard/Settings";
import NewPostButton from "@/components/Dashboard/NewPostButton";

type TabType = "dashboard" | "posts" | "comments" | "profile" | "settings";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "posts":
        return <PostsContent />;
      case "comments":
        return <Comments />;
      case "profile":
        return <Profile />;
      case "settings":
        return <Settings />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <DashboardHeader />
      <div className="flex">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

function DashboardContent() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
        <NewPostButton />
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Posts</h2>
        <MyPosts />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
        <RecentActivity />
      </div>
    </div>
  );
}

function PostsContent() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Your Posts</h1>
        <NewPostButton />
      </div>
      <MyPosts />
    </div>
  );
}

function RecentActivity() {
  const activities = [
    {
      id: 1,
      text: 'Post "Understanding React Hooks" published',
      date: "April 18, 2024",
    },
    {
      id: 2,
      text: 'Comment added on "A Journey into Next.js"',
      date: "April 18, 2024",
    },
    {
      id: 3,
      text: 'Post "A Journey into Next.js" published',
      date: "April 20, 2024",
    },
    {
      id: 4,
      text: 'Post "Deploying Applications with Vercel" published',
      date: "April 15, 2024",
    },
  ];

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="px-6 py-4 border-b border-gray-200 last:border-b-0 flex justify-between items-center hover:bg-gray-50 transition"
        >
          <p className="text-gray-800 font-medium">{activity.text}</p>
          <span className="text-gray-500 text-sm">{activity.date}</span>
        </div>
      ))}
    </div>
  );
}