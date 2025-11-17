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

  // Simulate avatar upload
  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUser((prev) => ({ ...prev, avatar: url }));
    }
  };

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
      // Replace with real API call
      await new Promise((res) => setTimeout(res, 800));
      alert("Profile updated!");
      setIsEditing(false);
    } catch (error) {
      alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 shadow-lg">
        <h3 className="text-white font-bold text-2xl mb-6">Profile Settings</h3>
        <form onSubmit={handleSave} className="flex flex-col gap-6">
          {/* Avatar */}
          <div>
            <label className="block text-gray-300 font-semibold mb-3">Avatar</label>
            <div className="flex items-center gap-4">
              <Image
                src={user.avatar}
                alt="Avatar"
                width={80}
                height={80}
                className="rounded-full border border-gray-700"
              />
              {isEditing && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="text-gray-400"
                />
              )}
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-gray-300 font-semibold mb-2">Name</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            ) : (
              <p className="text-gray-400">{user.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-300 font-semibold mb-2">Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            ) : (
              <p className="text-gray-400">{user.email}</p>
            )}
          </div>

          {/* Bio */}
          <div>
            <label className="block text-gray-300 font-semibold mb-2">Bio</label>
            {isEditing ? (
              <textarea
                name="bio"
                value={user.bio}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-400">{user.bio}</p>
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
                  className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition disabled:opacity-50 font-semibold"
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