"use client";

interface StatCard {
  label: string;
  value: string;
  icon: string;
  trend: string;
  color: string;
}

export default function Analytics() {
  const stats: StatCard[] = [
    { label: "Total Views", value: "12.5K", icon: "👁️", trend: "+12%", color: "from-blue-900/30 to-blue-800/10 border-blue-700/30" },
    { label: "Total Claps", value: "2.3K", icon: "👏", trend: "+8%", color: "from-pink-900/30 to-pink-800/10 border-pink-700/30" },
    { label: "Total Posts", value: "24", icon: "📝", trend: "+3", color: "from-purple-900/30 to-purple-800/10 border-purple-700/30" },
    { label: "Followers", value: "1.2K", icon: "👥", trend: "+24", color: "from-green-900/30 to-green-800/10 border-green-700/30" },
  ];

  return (
    <div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`bg-gradient-to-br ${stat.color} border rounded-lg p-6 hover:border-opacity-100 transition`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
              <span className="text-3xl">{stat.icon}</span>
            </div>
            <p className="text-green-400 text-sm font-semibold">↑ {stat.trend}</p>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-8">
        <h3 className="text-white font-bold text-xl mb-6">Traffic Over Time</h3>
        <div className="h-80 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl mb-3">📊</div>
            <p className="text-gray-400">Chart placeholder</p>
            <p className="text-gray-500 text-sm mt-2">Install Chart.js or Recharts to display analytics</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-gray-900 border border-gray-800 rounded-lg p-8">
        <h3 className="text-white font-bold text-xl mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between pb-4 border-b border-gray-800 last:border-0">
              <div>
                <p className="text-white font-semibold">Someone clapped your post</p>
                <p className="text-gray-400 text-sm">2 hours ago</p>
              </div>
              <span className="text-2xl">👏</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}