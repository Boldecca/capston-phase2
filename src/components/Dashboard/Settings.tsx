"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";

interface UserSettings {
  name: string;
  email: string;
  bio: string;
  avatar: string;
}

export default function Settings() {
  const [user, setUser] = useState<UserSettings>({
    name: "John Doe",
    email: "john@example.com",
    bio: "Full-stack developer and writer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/users/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="bg-slate-700 border border-slate-600 rounded-lg p-8">
        <h3 className="text-white font-bold text-xl mb-6">Profile Settings</h3>

        <form onSubmit={handleSave} className="flex flex-col gap-6">
          {/* Avatar */}
          <div>
            <label className="block text-slate-300 font-semibold mb-3">Avatar</label>
            <Image
              src={user.avatar}
              alt="Avatar"
              width={80}
              height={80}
              className="rounded-full mb-3"
            />
            {isEditing && (
              <input
                type="text"
                name="avatar"
                value={user.avatar}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-slate-600 text-white border border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>

          {/* Name */}
          <div>
            <label className="block text-slate-300 font-semibold mb-2">Name</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-slate-600 text-white border border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            ) : (
              <p className="text-slate-400">{user.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-slate-300 font-semibold mb-2">Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-slate-600 text-white border border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            ) : (
              <p className="text-slate-400">{user.email}</p>
            )}
          </div>

          {/* Bio */}
          <div>
            <label className="block text-slate-300 font-semibold mb-2">Bio</label>
            {isEditing ? (
              <textarea
                name="bio"
                value={user.bio}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 bg-slate-600 text-white border border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-slate-400">{user.bio}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  disabled={loading}
                  className="px-6 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition disabled:opacity-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition disabled:opacity-50 font-semibold"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-semibold"
              >
                Edit Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}