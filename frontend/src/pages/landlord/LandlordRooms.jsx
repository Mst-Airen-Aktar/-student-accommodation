// src/pages/landlord/LandlordRooms.jsx
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

export default function LandlordRooms() {
  const { user } = useContext(AuthContext);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRooms = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/rooms?postedBy=${user.uid}`
      );
      setRooms(res.data);
    } catch (err) {
      console.error("Failed to fetch rooms", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure to delete this room?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/rooms/${id}`);
      toast.success("Room deleted successfully");
      fetchRooms();
    } catch (err) {
      console.error("Failed to delete", err);
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  if (loading) return <p className="p-8">Loading rooms...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-pink-800 mb-6">
        🏠 My Posted Rooms
      </h2>
      {rooms.length === 0 ? (
        <p>No rooms posted yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {rooms.map((room) => (
            <div
              key={room._id}
              className="bg-white rounded-xl shadow p-4 space-y-2 relative"
            >
              <img
                src={room.roomImages[0] || "/no-image.png"}
                alt={room.title}
                className="w-full h-48 object-cover rounded"
              />
              <h3 className="text-lg font-semibold text-pink-800">
                {room.title}
              </h3>
              <p className="text-sm text-gray-500">
                {room.city} • {room.roomSize} sqm
              </p>
              <p className="text-sm text-gray-600 truncate">
                {room.description}
              </p>
              <div className="flex justify-between items-center">
                <Link
                  to={`/edit-room/${room._id}`}
                  className="text-sm text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                >
                  ✏️ Edit
                </Link>
                <button
                  onClick={() => handleDelete(room._id)}
                  className="text-sm text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                >
                  ❌ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
