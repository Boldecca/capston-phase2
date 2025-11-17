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
    <div>
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <div className="bg-white border border-gray-200 rounded-lg p-8 max-w-2xl">
        <h3 className="text-xl font-bold mb-6">Profile Settings</h3>

        <form onSubmit={handleSave} className="flex flex-col gap-6">
          {/* Avatar */}
          <div>
            <label className="block text-gray-700 font-semibold mb-3">
              Avatar
            </label>
            <Image
              src={user.avatar}
              alt="Avatar"
              width={80}
              height={80}
              className="rounded-full border border-gray-300 mb-3"
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Name</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            ) : (
              <p className="text-gray-700">{user.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            ) : (
              <p className="text-gray-700">{user.email}</p>
            )}
          </div>

          {/* Bio */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Bio</label>
            {isEditing ? (
              <textarea
                name="bio"
                value={user.bio}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-700">{user.bio}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  disabled={loading}
                  className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg transition disabled:opacity-50 font-semibold"
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