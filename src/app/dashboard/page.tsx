"use client";

import MyPosts from "@/components/Dashboard/MyPosts";
import Comments from "@/components/Dashboard/Comments";
import Profile from "@/components/Dashboard/Profile";
import Settings from "@/components/Dashboard/Settings";
import NewPostButton from "@/components/Dashboard/NewPostButton";

type TabType = "dashboard" | "posts" | "comments" | "profile" | "settings";

export default function DashboardPage() {
  return <DashboardContent />;
}

function DashboardContent() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">Dashboard</h1>
        <NewPostButton />
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-200 mb-6">Your Posts</h2>
        <MyPosts />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-200 mb-6">Recent Activity</h2>
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
    <div className="border border-gray-800 rounded-lg overflow-hidden">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="px-6 py-4 border-b border-gray-800 last:border-b-0 flex justify-between items-center hover:bg-gray-800 transition"
        >
          <p className="text-gray-200 font-medium">{activity.text}</p>
          <span className="text-gray-400 text-sm">{activity.date}</span>
        </div>
      ))}
    </div>
  );
}