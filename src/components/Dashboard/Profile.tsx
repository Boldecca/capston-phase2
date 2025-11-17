"use client";

import Image from "next/image";

export default function Profile() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Profile</h1>

      <div className="bg-white border border-gray-200 rounded-lg p-8 max-w-2xl">
        <div className="flex items-center gap-6 mb-8">
          <Image
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
            alt="Avatar"
            width={100}
            height={100}
            className="rounded-full border border-gray-300"
          />
          <div>
            <h2 className="text-2xl font-bold">John Doe</h2>
            <p className="text-gray-600">Full-stack developer and writer</p>
            <p className="text-gray-600">1,234 followers</p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-xl font-bold mb-4">Bio</h3>
          <p className="text-gray-700 mb-4">
            Passionate about building modern web applications and sharing knowledge with the developer community.
          </p>
        </div>

        <div className="border-t border-gray-200 pt-6 mt-6">
          <h3 className="text-xl font-bold mb-4">Stats</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-2xl font-bold">24</p>
              <p className="text-gray-600">Posts</p>
            </div>
            <div>
              <p className="text-2xl font-bold">12.5K</p>
              <p className="text-gray-600">Views</p>
            </div>
            <div>
              <p className="text-2xl font-bold">2.3K</p>
              <p className="text-gray-600">Claps</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}