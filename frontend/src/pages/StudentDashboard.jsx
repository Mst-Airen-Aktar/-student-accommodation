// import ProfileCard from "../components/ProfileCard";
// import RoomApplicationTable from "../components/RoomApplicationTable";

// export default function StudentDashboard() {
//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold text-pink-800 mb-6">🎓 Student Dashboard</h1>
//       <div className="grid md:grid-cols-3 gap-6">
//         <ProfileCard />
//         <div className="md:col-span-2">
//           <RoomApplicationTable />
//         </div>
//       </div>
//     </div>
//   );
// }
// src/pages/student/StudentDashboard.jsx
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";

export default function StudentDashboard() {
  const { user } = useContext(AuthContext);
  const [rooms, setRooms] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const resRooms = await axios.get("http://localhost:5000/api/rooms");
        const resApps = await axios.get(
          `http://localhost:5000/api/applications/student/${user.uid}`
        );
        setRooms(resRooms.data);
        setApplications(resApps.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-pink-800 mb-4">
          🎓 Student Dashboard
        </h1>

        {/* Profile Info */}
        <div className="bg-white p-5 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold text-pink-700 mb-2">
            👤 Your Profile
          </h2>
          <p>
            <strong>Name:</strong> {user?.displayName}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
        </div>

        {/* Available Rooms */}
        <div className="bg-white p-5 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold text-pink-700 mb-4">
            🏡 Available Rooms
          </h2>
          {rooms.length === 0 ? (
            <p className="text-gray-500">No rooms found.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {rooms.map((room) => (
                <div
                  key={room._id}
                  className="border p-4 rounded hover:shadow-md transition"
                >
                  <h3 className="font-bold text-lg">{room.title}</h3>
                  <p className="text-gray-600">📍 {room.city}</p>
                  <p className="text-sm text-gray-500">
                    Rent: €{room.rent}/month
                  </p>
                  <button
                    onClick={() => handleApply(room._id)}
                    className="mt-3 bg-pink-700 text-white px-4 py-1 rounded hover:bg-pink-600"
                  >
                    Apply
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* My Applications */}
        <div className="bg-white p-5 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-pink-700 mb-4">
            📝 My Applications
          </h2>
          {applications.length === 0 ? (
            <p className="text-gray-500">
              You haven't applied for any rooms yet.
            </p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-pink-50">
                  <th className="p-2 text-left">Room</th>
                  <th className="p-2 text-left">City</th>
                  <th className="p-2 text-left">Status</th>
                  <th className="p-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app._id} className="border-t hover:bg-gray-50">
                    <td className="p-2">{app.roomTitle}</td>
                    <td className="p-2">{app.city}</td>
                    <td className="p-2">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full
                        ${
                          app.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : app.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="p-2">
                      {app.status === "Pending" && (
                        <button
                          onClick={() => handleCancel(app._id)}
                          className="text-red-500 text-sm hover:underline"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );

  // 🔘 Handle Apply
  async function handleApply(roomId) {
    try {
      await axios.post("http://localhost:5000/api/applications", {
        studentUid: user.uid,
        roomId: roomId,
        appliedDate: new Date(),
      });
      alert("✅ Applied successfully!");
    } catch (err) {
      alert(
        "❌ Failed to apply: " + err.response?.data?.message || err.message
      );
    }
  }

  // 🔘 Handle Cancel
  async function handleCancel(appId) {
    try {
      await axios.delete(`http://localhost:5000/api/applications/${appId}`);
      alert("❌ Application cancelled");
    } catch (err) {
      alert("❌ Failed to cancel");
    }
  }
}
