import { useState } from "react";

export default function BookingForm({ room }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    studentId: "",
    university: "",
    moveInDate: "",
    months: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Request Sent:", { room, ...formData });
    // TODO: Send to backend
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-pink-800">Apply for: {room.title}</h2>
      <p className="text-gray-600 mb-4">{room.city} • €{room.rent}/month</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="input"
            required
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="input"
            required
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="input"
            onChange={handleChange}
          />
          <input
            type="text"
            name="studentId"
            placeholder="Student ID"
            className="input"
            required
            onChange={handleChange}
          />
          <input
            type="text"
            name="university"
            placeholder="University Name"
            className="input"
            required
            onChange={handleChange}
          />
          <input
            type="date"
            name="moveInDate"
            className="input"
            required
            onChange={handleChange}
          />
          <input
            type="number"
            name="months"
            placeholder="Months of Stay"
            className="input"
            required
            onChange={handleChange}
          />
        </div>

        <textarea
          name="message"
          rows="4"
          placeholder="Optional Message"
          className="w-full p-3 border border-gray-300 rounded-md"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-pink-800 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}
