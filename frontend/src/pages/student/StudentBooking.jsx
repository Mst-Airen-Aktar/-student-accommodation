import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthProvider";

export default function StudentBookings() {
  const { user } = useContext(AuthContext); // assuming user.uid or user._id
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("User ID:", user?.uid); // Debugging line to check user ID
  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/bookings/student/${user?.uid}`
      );
      setBookings(res.data);
      console.log("Bookings fetched:", res.data); // Debugging line to check bookings
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`);
      toast.success("Booking cancelled");
      fetchBookings();
    } catch (err) {
      console.error(err);
      toast.error("Failed to cancel");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user?.uid]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-pink-800 mb-6">📄 My Bookings</h2>

      {loading ? (
        <p>Loading...</p>
      ) : bookings.length === 0 ? (
        <p className="text-gray-600">No bookings yet.</p>
      ) : (
        <div className="grid gap-6">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="border rounded-xl p-4 shadow-md bg-white"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <img
                  src={b.roomId.roomImages?.[0] || "/no-image.png"}
                  alt="Room"
                  className="w-full md:w-48 h-36 object-cover rounded-lg"
                />
                <div className="flex-1 space-y-1">
                  <h3 className="text-lg font-semibold text-pink-800">
                    {b.roomId.title}
                  </h3>
                  <p className="text-sm text-gray-600">{b.roomId.city}</p>
                  <p className="text-sm text-gray-700">
                    Rent: <strong>€{b.roomId.rent}</strong> /month
                  </p>
                  <p className="text-sm">
                    Available from:{" "}
                    {new Date(b.roomId.availableFrom).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex flex-col justify-between items-end">
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      b.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : b.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                  </span>

                  {b.status === "pending" && (
                    <button
                      onClick={() => handleCancel(b._id)}
                      className="mt-4 text-sm bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
