// src/pages/landlord/LandlordDashboard.jsx
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

export default function LandlordDashboard() {
  const { user } = useContext(AuthContext);
  const [rooms, setRooms] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      const res1 = await axios.get(
        `http://localhost:5000/api/rooms/landlord/${user.uid}`
      );
      const res2 = await axios.get(
        `http://localhost:5000/api/applications/landlord/${user.uid}`
      );
      setRooms(res1.data);
      setApplications(res2.data);
    };

    fetchData();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-pink-800 mb-4">
          🏠 Landlord Dashboard
        </h1>

        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow p-5 mb-6">
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

        {/* My Room Listings */}
        <div className="bg-white rounded-lg shadow p-5 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-pink-700">
              🏡 Your Room Listings
            </h2>
            <Link
              to="/landlord/add-room"
              className="bg-pink-800 text-white px-4 py-2 rounded hover:bg-pink-700"
            >
              ➕ Add New Room
            </Link>
          </div>
          {rooms.length === 0 ? (
            <p className="text-gray-500">No rooms listed yet.</p>
          ) : (
            <ul className="grid md:grid-cols-2 gap-4">
              {rooms.map((room) => (
                <li
                  key={room._id}
                  className="border p-4 rounded shadow hover:shadow-md"
                >
                  <h3 className="font-bold text-lg">{room.title}</h3>
                  <p className="text-gray-600">📍 {room.city}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Rent: €{room.rent} / month
                  </p>
                  <div className="flex gap-2 mt-3">
                    <Link
                      to={`/landlord/edit-room/${room._id}`}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
                    <button className="text-sm text-red-600 hover:underline">
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-lg shadow p-5">
          <h2 className="text-xl font-semibold text-pink-700 mb-4">
            📥 Student Applications
          </h2>
          {applications.length === 0 ? (
            <p className="text-gray-500">No applications received yet.</p>
          ) : (
            <table className="w-full table-auto text-sm">
              <thead>
                <tr className="bg-pink-50">
                  <th className="p-2 text-left">Student</th>
                  <th className="p-2 text-left">Room</th>
                  <th className="p-2 text-left">Status</th>
                  <th className="p-2 text-left">Applied On</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app._id} className="border-t hover:bg-gray-50">
                    <td className="p-2">{app.studentName}</td>
                    <td className="p-2">{app.roomTitle}</td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 text-xs rounded-full font-medium 
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
                    <td className="p-2">{app.appliedDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
