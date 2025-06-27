import { Dialog } from "@headlessui/react";

import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function RoomDetails() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [mainImg, setMainImg] = useState("");
  const [loading, setLoading] = useState(true);
  const [landlordInfo, setLandlordInfo] = useState(null); // Optional: Contact info

  // for booking modal
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    userName: "",
    userEmail: "",
    userPhone: "",
    message: "",
  });

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/rooms/${id}`);
        setRoom(res.data);
        setMainImg(res.data.roomImages?.[0] || "/no-image.png");

        // OPTIONAL: fetch landlord info if stored in database
        // const userRes = await axios.get(`/api/users/${res.data.postedBy}`);
        // setLandlordInfo(userRes.data);
      } catch (err) {
        console.error("Error fetching room:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  // Handle booking form submission
  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/bookings", {
        ...bookingForm,
        roomId: room._id,
      });
      alert("✅ Booking request sent!");
      setIsBookingOpen(false);
      setBookingForm({
        userName: "",
        userEmail: "",
        userPhone: "",
        message: "",
      });
    } catch (err) {
      alert("❌ Booking failed");
      console.error(err);
    }
  };

  if (loading) return <div className="p-6 text-gray-600">Loading...</div>;
  if (!room) return <div className="p-6 text-red-500">Room not found</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Link to="/listings" className="text-pink-700 underline">
        ← Back to Room Listings
      </Link>

      {/* Title */}
      <h1 className="text-3xl font-bold text-pink-800">{room.title}</h1>
      <p className="text-gray-600 text-lg">{room.city}</p>

      {/* Image section */}
      <div>
        <img
          src={mainImg}
          alt="Main Room"
          className="w-full h-[400px] object-cover rounded-xl shadow"
        />
        <div className="flex gap-3 mt-3">
          {room.roomImages.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Thumb ${i}`}
              onClick={() => setMainImg(img)}
              className={`w-24 h-24 object-cover rounded cursor-pointer border ${
                mainImg === img ? "border-pink-700" : "border-transparent"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Info and Booking */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <p>
            <span className="font-semibold">Rent:</span> €{room.rent}/month
          </p>
          <p>
            <span className="font-semibold">Room Size:</span> {room.roomSize}{" "}
            sqm
          </p>
          <p>
            <span className="font-semibold">Available From:</span>{" "}
            {new Date(room.availableFrom).toLocaleDateString()}
          </p>
          <p>
            <span className="font-semibold">Room Type:</span>{" "}
            {room.roomType || "Room"}
          </p>

          <div className="flex flex-wrap gap-2 mt-2">
            {room.furnished && (
              <span className="bg-green-600 text-white px-2 py-1 text-sm rounded">
                Furnished
              </span>
            )}
            {room.internetIncluded && (
              <span className="bg-blue-600 text-white px-2 py-1 text-sm rounded">
                Internet Included
              </span>
            )}
            {room.privateBathroom && (
              <span className="bg-indigo-600 text-white px-2 py-1 text-sm rounded">
                Private Bathroom
              </span>
            )}
          </div>

          {/* status */}
          <p className="mt-2">
            <span className="font-semibold">Status:</span>{" "}
            <span
              className={`${
                room.status === "Available"
                  ? "text-green-600"
                  : room.status === "Booked"
                  ? "text-red-600"
                  : "text-gray-600"
              }`}
            >
              {room.status}
            </span>
          </p>

          {/* Book Button */}
          <div className="pt-4">
            <button
              disabled={room.status !== "Available"}
              type="button"
              onClick={() => setIsBookingOpen(true)}
              className={`${
                room.status !== "Available"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-pink-700 hover:bg-pink-800"
              } text-white px-4 py-2 rounded shadow transition-colors duration-200`}
            >
              Book Now
            </button>
          </div>
        </div>

        {/* Description and Contact */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Description</h2>
          <p className="text-gray-700 whitespace-pre-line">
            {room.description}
          </p>

          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-1">📞 Contact Landlord</h2>
            <p>
              <span className="font-medium">Landlord UID:</span> {room.postedBy}
            </p>
            {/* Optional if more info is stored:
            <p>Email: {landlordInfo?.email}</p>
            <p>Phone: {landlordInfo?.phone}</p>
            */}
          </div>
        </div>
      </div>
      <Dialog
        open={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded bg-white p-6 space-y-4 shadow-xl">
            <Dialog.Title className="text-lg font-bold text-pink-800">
              📩 Book This Room
            </Dialog.Title>
            <form onSubmit={handleBookingSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Your Name"
                value={bookingForm.userName}
                onChange={(e) =>
                  setBookingForm({ ...bookingForm, userName: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={bookingForm.userEmail}
                onChange={(e) =>
                  setBookingForm({ ...bookingForm, userEmail: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="tel"
                placeholder="Phone (optional)"
                value={bookingForm.userPhone}
                onChange={(e) =>
                  setBookingForm({ ...bookingForm, userPhone: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
              />
              <textarea
                placeholder="Any message?"
                value={bookingForm.message}
                onChange={(e) =>
                  setBookingForm({ ...bookingForm, message: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
                rows={3}
              />
              <button
                type="submit"
                className="w-full bg-pink-700 text-white py-2 rounded hover:bg-pink-800"
              >
                Submit Booking
              </button>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
