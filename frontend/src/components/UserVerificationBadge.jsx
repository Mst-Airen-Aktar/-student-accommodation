import axios from "axios";
import { useEffect, useState } from "react";

export default function UserVerificationBadge({ uid, role }) {
  const [verified, setVerified] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const url =
          role === "student"
            ? `http://localhost:5000/api/students/${uid}`
            : `http://localhost:5000/api/landlords/${uid}`;
        const res = await axios.get(url);
        setVerified(res.data.verified);
      } catch (err) {
        console.error("Error fetching verification status:", err);
        setVerified(null);
      }
    };

    if (role !== "admin") fetchStatus();
  }, [uid, role]);

  if (verified === null)
    return <span className="text-gray-500 italic">Unknown</span>;

  return verified ? (
    <span className="text-green-600 font-semibold">Verified</span>
  ) : (
    <span className="text-yellow-600 font-semibold">Pending</span>
  );
}
