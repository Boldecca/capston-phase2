"use client";

interface StatCard {
  label: string;
  value: string;
  icon: string;
  trend: string;
}

export default function Analytics() {
  const stats: StatCard[] = [
    { label: "Total Views", value: "12.5K", icon: "👁️", trend: "+12%" },
    { label: "Total Claps", value: "2.3K", icon: "👏", trend: "+8%" },
    { label: "Total Posts", value: "24", icon: "📝", trend: "+3" },
    { label: "Followers", value: "1.2K", icon: "👥", trend: "+24" },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-slate-700 border border-slate-600 rounded-lg p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-sm mb-2">{stat.label}</p>
                <p className="text-white text-3xl font-bold">{stat.value}</p>
              </div>
              <span className="text-3xl">{stat.icon}</span>
            </div>
            <p className="text-green-400 text-sm mt-4 font-semibold">↑ {stat.trend}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-700 border border-slate-600 rounded-lg p-6">
        <h3 className="text-white font-semibold text-lg mb-4">Traffic Over Time</h3>
        <div className="h-64 bg-slate-600 rounded flex items-center justify-center text-slate-400">
          <p>📊 [Chart Placeholder - integrate Chart.js or Recharts]</p>
        </div>
      </div>
    </div>
  );
}