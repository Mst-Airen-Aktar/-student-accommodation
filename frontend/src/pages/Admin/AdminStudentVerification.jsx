import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AdminStudentVerification() {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 4;

  // Fetch all student profiles
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/student-profile`) // adjust if needed
      .then((res) => setStudents(res.data))
      .catch((err) => console.error("Failed to fetch students:", err));
  }, []);

  // Handle verify/unverify
  const handleVerify = async (uid, value) => {
    try {
      await axios.put(
        `http://localhost:5000/api/student-profile/verify/${uid}`,
        { verified: value }
      );

      toast.success(
        `Student ${value ? "verified" : "unverified"} successfully`
      );
      setStudents((prev) =>
        prev.map((s) => (s.uid === uid ? { ...s, verified: value } : s))
      );
    } catch (err) {
      toast.error("Failed to update status");
      console.error(err);
    }
  };

  // Pagination logic
  const indexOfLast = currentPage * studentsPerPage;
  const indexOfFirst = indexOfLast - studentsPerPage;
  const currentStudents = students.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(students.length / studentsPerPage);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-pink-800 mb-6">
        Student Verification
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {currentStudents.map((student) => (
          <div
            key={student._id}
            className="bg-white shadow-lg rounded-xl p-5 border border-gray-200 relative"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={student.photoURL || "https://via.placeholder.com/100"}
                alt="Student"
                className="w-20 h-20 rounded-full border-2 border-pink-700 object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {student.university}
                </h3>
                <p className="text-sm text-gray-600">{student.program}</p>
                <p className="text-sm text-gray-500">
                  Student ID: {student.studentId}
                </p>
              </div>
            </div>

            <div className="text-sm space-y-1 text-gray-700">
              <p>
                <strong>Nationality:</strong> {student.nationality}
              </p>
              <p>
                <strong>Gender:</strong> {student.gender}
              </p>
              <p>
                <strong>DOB:</strong> {student.dateOfBirth}
              </p>
              <p>
                <strong>Passport:</strong> {student.passportNumber}
              </p>
              <p>
                <strong>Phone:</strong> {student.phone}
              </p>
              <p>
                <strong>Address:</strong> {student.address}
              </p>
              <p>
                <strong>Emergency Contact:</strong>{" "}
                {student.emergencyContactName} ({student.emergencyContactPhone})
              </p>
            </div>

            <div className="mt-4">
              <h4 className="font-medium mb-1">Documents:</h4>
              <div className="flex flex-col gap-2 text-sm text-blue-600 underline">
                {student.documents?.passportPhotoUrl && (
                  <a
                    href={student.documents.passportPhotoUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Passport Photo
                  </a>
                )}
                {student.documents?.studentIdUrl && (
                  <a
                    href={student.documents.studentIdUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Student ID
                  </a>
                )}
                {student.documents?.admissionLetterUrl && (
                  <a
                    href={student.documents.admissionLetterUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Admission Letter
                  </a>
                )}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span
                className={`text-sm font-semibold ${
                  student.verified ? "text-green-600" : "text-yellow-600"
                }`}
              >
                {student.verified ? "Verified" : "Pending Verification"}
              </span>
              <div className="flex gap-2">
                {!student.verified && (
                  <button
                    onClick={() => handleVerify(student.uid, true)}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                  >
                    Verify
                  </button>
                )}
                {student.verified && (
                  <button
                    onClick={() => handleVerify(student.uid, false)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
                  >
                    Unverify
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-center mt-8 gap-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === index + 1
                ? "bg-pink-800 text-white"
                : "bg-white text-gray-800"
            } hover:bg-pink-100 transition`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
