function EditRoomModal({ isOpen, onClose, room, refresh }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (room) setFormData(room);
  }, [room]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/rooms/${room._id}`, formData);
      toast.success("Room updated");
      onClose();
      refresh();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  if (!room) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white p-6 rounded max-w-xl w-full space-y-4">
          <Dialog.Title className="text-lg font-bold text-pink-800">
            ✏️ Edit Room
          </Dialog.Title>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block font-medium">Title</label>
              <input
                name="title"
                value={formData.title || ""}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block font-medium">City</label>
              <input
                name="city"
                value={formData.city || ""}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block font-medium">Rent (€)</label>
              <input
                type="number"
                name="rent"
                value={formData.rent || ""}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block font-medium">Room Size</label>
              <input
                name="roomSize"
                value={formData.roomSize || ""}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block font-medium">Available From</label>
              <input
                type="date"
                name="availableFrom"
                value={formData.availableFrom?.split("T")[0] || ""}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block font-medium">Description</label>
              <textarea
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
                rows={3}
                className="w-full border px-3 py-2 rounded"
              ></textarea>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-pink-800 text-white rounded"
              >
                Update
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

// src/pages/landlord/LandlordRooms.jsx
import { Dialog } from "@headlessui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthProvider";
export default function LandlordRooms() {
  const { user } = useContext(AuthContext);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [roomToEdit, setRoomToEdit] = useState(null);

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

  const openEditModal = (room) => {
    setRoomToEdit(room);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setRoomToEdit(null);
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
                <button
                  onClick={() => openEditModal(room)}
                  className="text-sm text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(room._id)}
                  className="text-sm text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                >
                  ❌ Delete
                </button>
              </div>

              {/* Modal */}
              <EditRoomModal
                isOpen={editModalOpen}
                onClose={closeEditModal}
                room={roomToEdit}
                refresh={fetchRooms}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
