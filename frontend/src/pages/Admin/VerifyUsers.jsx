import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function VerifyUsers() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/users");
    setUsers(res.data);
  };

  const handleVerify = async (id, isVerified) => {
    try {
      await axios.put(`http://localhost:5000/api/users/verify/${id}`, {
        verified: isVerified,
      });
      toast.success(`User marked as ${isVerified ? "Verified" : "Unverified"}`);
      fetchUsers();
    } catch (err) {
      toast.error("Error updating verification");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Verify Users</h2>
      <table className="w-full table-auto border shadow">
        <thead>
          <tr className="bg-blue-800 text-white">
            <th className="p-2">Photo</th>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Status</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="text-center border-t">
              <td className="p-2">
                <img
                  src={u.profileImage || "https://via.placeholder.com/40"}
                  className="h-10 w-10 rounded-full mx-auto"
                  alt="profile"
                />
              </td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    u.verified
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {u.verified ? "Verified" : "Unverified"}
                </span>
              </td>
              <td>
                <button
                  onClick={() => handleVerify(u._id, !u.verified)}
                  className={`px-3 py-1 rounded text-sm ${
                    u.verified ? "bg-red-500" : "bg-green-500"
                  } text-white`}
                >
                  {u.verified ? "Unverify" : "Verify"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
