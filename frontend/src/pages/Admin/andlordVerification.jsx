import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function LandlordVerification() {
  const [landlords, setLandlords] = useState([]);

  const fetchLandlords = async () => {
    const res = await axios.get("http://localhost:5000/api/landlords");
    setLandlords(res.data);
  };

  const handleVerify = async (uid, status) => {
    try {
      await axios.put(`http://localhost:5000/api/landlords/${uid}/verify`, {
        verified: status,
      });
      toast.success(`Marked as ${status ? "Verified" : "Unverified"}`);
      fetchLandlords();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchLandlords();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Landlord Verification</h2>
      <div className="grid gap-6">
        {landlords.map((l) => (
          <div
            key={l._id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <div className="flex items-center gap-4">
              <img
                src={l.profilePhotoUrl}
                className="h-16 w-16 rounded-full object-cover border"
                alt="profile"
              />
              <div>
                <p className="font-bold text-lg">{l.name}</p>
                <p className="text-gray-600 text-sm">{l.email}</p>
                <p className="text-sm">
                  <span className="font-medium">Phone:</span> {l.phone}
                </p>
                <p className="text-sm">
                  <span className="font-medium">National ID:</span>{" "}
                  {l.nationalId}
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
              <a
                href={l.documents?.idProofUrl}
                target="_blank"
                className="text-blue-600 underline"
              >
                ID Proof
              </a>
              <a
                href={l.documents?.rentalLicenseUrl}
                target="_blank"
                className="text-blue-600 underline"
              >
                Rental License
              </a>
              <a
                href={l.documents?.energyCertificateUrl}
                target="_blank"
                className="text-blue-600 underline"
              >
                Energy Certificate
              </a>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span
                className={`text-sm font-semibold px-3 py-1 rounded-full ${
                  l.verified
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {l.verified ? "Verified" : "Pending"}
              </span>

              <div className="space-x-2">
                <button
                  onClick={() => handleVerify(l.uid, true)}
                  className="px-4 py-1 rounded bg-green-600 text-white hover:bg-green-700 text-sm"
                >
                  Verify
                </button>
                <button
                  onClick={() => handleVerify(l.uid, false)}
                  className="px-4 py-1 rounded bg-red-600 text-white hover:bg-red-700 text-sm"
                >
                  Unverify
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
