// import axios from "axios";
// import { useEffect, useState } from "react";
// import Sidebar from "../../components/Sidebar";

// export default function BookingList() {
//   const [bookings, setBookings] = useState([]);

//   const fetchBookings = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/bookings");
//       setBookings(res.data);
//     } catch (err) {
//       console.error("Failed to fetch bookings:", err);
//     }
//   };

//   const updateStatus = async (id, newStatus) => {
//     try {
//       await axios.put(`http://localhost:5000/api/bookings/${id}`, {
//         status: newStatus,
//       });
//       fetchBookings();
//     } catch (err) {
//       alert("Update failed");
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="flex-1 p-6 bg-gray-50 min-h-screen">
//         <h1 className="text-2xl font-bold text-pink-800 mb-4">
//           📋 Booking Requests
//         </h1>

//         <div className="overflow-x-auto shadow-md rounded-xl bg-white">
//           <table className="w-full text-sm text-left">
//             <thead className="text-xs text-white uppercase bg-pink-700">
//               <tr>
//                 <th className="px-4 py-3">Room Title</th>
//                 <th className="px-4 py-3">User Name</th>
//                 <th className="px-4 py-3">Email</th>
//                 <th className="px-4 py-3">Status</th>
//                 <th className="px-4 py-3 text-right">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {bookings.map((b) => (
//                 <tr key={b._id} className="border-t hover:bg-gray-50">
//                   <td className="px-4 py-3">{b.room?.title || "N/A"}</td>
//                   <td className="px-4 py-3">{b.userName}</td>
//                   <td className="px-4 py-3">{b.userEmail}</td>
//                   <td className="px-4 py-3">
//                     <span
//                       className={`px-2 py-1 rounded text-white text-xs ${
//                         b.status === "pending"
//                           ? "bg-yellow-500"
//                           : b.status === "approved"
//                           ? "bg-green-600"
//                           : "bg-red-600"
//                       }`}
//                     >
//                       {b.status}
//                     </span>
//                   </td>
//                   <td className="px-4 py-3 flex gap-2 justify-end">
//                     {b.status === "pending" && (
//                       <>
//                         <button
//                           onClick={() => updateStatus(b._id, "approved")}
//                           className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs"
//                         >
//                           Approve
//                         </button>
//                         <button
//                           onClick={() => updateStatus(b._id, "rejected")}
//                           className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
//                         >
//                           Reject
//                         </button>
//                       </>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// src/pages/admin/BookingList.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 5;

  const fetchBookings = async () => {
    const res = await axios.get("http://localhost:5000/api/bookings");
    setBookings(res.data);
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/bookings/${id}`, { status });
      toast.success(`Booking marked as ${status}`);
      fetchBookings();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // ✅ Only declared ONCE
  const filteredBookings = bookings.filter((b) =>
    statusFilter ? b.status === statusFilter : true
  );

  // Pagination logic
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const paginatedBookings = filteredBookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );

  const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);

  return (
    <div>
      <h1 className="text-2xl font-bold text-pink-800 mb-6">
        📋 Booking Requests
      </h1>

      <div className="overflow-x-auto bg-white shadow rounded-xl">
        {/* filter */}
        <select
          onChange={(e) => setStatusFilter(e.target.value)}
          className="mb-4 border rounded px-3 py-1 text-sm"
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        <table className="w-full text-sm">
          <thead className="bg-pink-700 text-white">
            <tr>
              <th className="p-3">Room</th>
              <th className="p-3">User</th>
              <th className="p-3">Status</th>
              <th className="p-3">Updated</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedBookings.map((b) => (
              <tr key={b._id} className="hover:bg-gray-50 border-b">
                <td className="p-3">{b.room?.title}</td>
                <td className="p-3">
                  {b.userName}
                  <div className="text-xs text-gray-500">{b.userEmail}</div>
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-xs rounded text-white ${
                      b.status === "approved"
                        ? "bg-green-600"
                        : b.status === "rejected"
                        ? "bg-red-600"
                        : "bg-yellow-500"
                    }`}
                  >
                    {b.status}
                  </span>
                </td>
                <td className="p-3 text-gray-500 text-sm">
                  {new Date(b.updatedAt).toLocaleString()}
                </td>
                <td className="p-3 text-right">
                  <select
                    value={b.status}
                    onChange={(e) => updateStatus(b._id, e.target.value)}
                    className={`text-xs border rounded px-2 py-1 cursor-pointer
      ${
        b.status === "approved"
          ? "bg-green-100 text-green-700"
          : b.status === "rejected"
          ? "bg-red-100 text-red-700"
          : "bg-yellow-100 text-yellow-700"
      }`}
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center items-center mt-6 gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            ⬅️ Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-pink-700 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Next ➡️
          </button>
        </div>
      </div>
    </div>
  );
}
