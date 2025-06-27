// src/pages/admin/Dashboard.jsx

export default function Dashboard() {
  // Static counts for now
  const stats = [
    { label: "Total Rooms", value: 18 },
    { label: "Total Bookings", value: 42 },
    { label: "Total Users", value: 15 },
  ];

  return (
    <>
      <h1 className="text-2xl font-bold text-pink-800 mb-6">
        📊 Admin Overview
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl shadow flex flex-col items-center"
          >
            <p className="text-3xl font-bold text-pink-700">{stat.value}</p>
            <p className="text-gray-600 mt-2">{stat.label}</p>
          </div>
        ))}
      </div>
    </>
  );
}
