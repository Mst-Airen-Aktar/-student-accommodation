// import axios from "axios";
// import { useContext, useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { AuthContext } from "../../context/AuthProvider";

// export default function StudentProfile() {
//   const { user } = useContext(AuthContext);
//   const [profile, setProfile] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [form, setForm] = useState({});
//   const [loading, setLoading] = useState(false);

//   const fetchProfile = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/student-profile/${user?.uid}`
//       );
//       setProfile(res.data);
//       setForm(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "photoURL" && files.length > 0) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setForm((prev) => ({ ...prev, photoURL: reader.result }));
//       };
//       reader.readAsDataURL(files[0]);
//     } else {
//       setForm((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/student-profile",
//         {
//           uid: user?.uid,
//           ...form,
//         }
//       );
//       toast.success("Profile saved successfully!");
//       setProfile(res.data);
//       setEditMode(false);
//     } catch (err) {
//       toast.error("Failed to save profile");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (user?.uid) fetchProfile();
//   }, [user]);

//   if (!user) return <p className="text-center text-red-500">Login required</p>;

//   return (
//     <div className="max-w-5xl mx-auto mt-10 px-6 py-8 bg-white shadow-md rounded-xl">
//       <h2 className="text-3xl font-semibold text-center text-pink-800 mb-6">
//         Student Profile
//       </h2>

//       <form onSubmit={handleSubmit}>
//         {/* Photo Section */}
//         <div className="flex flex-col sm:flex-row items-center gap-6 mb-10">
//           <img
//             src={form.photoURL || "https://www.gravatar.com/avatar?d=mp"}
//             alt="Student"
//             className="w-28 h-28 rounded-full border object-cover"
//           />
//           {editMode && (
//             <input
//               type="file"
//               name="photoURL"
//               accept="image/*"
//               onChange={handleChange}
//               className="text-sm"
//             />
//           )}
//         </div>

//         {/* Form Fields */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {[
//             { label: "Full Name", name: "fullName", required: true },
//             { label: "Date of Birth", name: "dateOfBirth", type: "date" },
//             { label: "Nationality", name: "nationality" },
//             { label: "Gender", name: "gender" },
//             { label: "Passport Number", name: "passportNumber" },
//             { label: "University", name: "university" },
//             { label: "Student ID", name: "studentId" },
//             { label: "Program", name: "program" },
//             { label: "Address", name: "address" },
//             { label: "Emergency Contact Name", name: "emergencyContactName" },
//             { label: "Emergency Contact Phone", name: "emergencyContactPhone" },
//           ].map((f) => (
//             <div key={f.name}>
//               <label className="block font-medium text-gray-700 mb-1">
//                 {f.label}
//               </label>
//               <input
//                 type={f.type || "text"}
//                 name={f.name}
//                 value={form[f.name] || ""}
//                 onChange={handleChange}
//                 disabled={!editMode}
//                 required={f.required}
//                 className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 ${
//                   editMode ? "bg-white" : "bg-gray-100 text-gray-600"
//                 }`}
//               />
//             </div>
//           ))}
//         </div>

//         {/* Buttons */}
//         <div className="mt-8 flex justify-center gap-4">
//           {editMode ? (
//             <>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="px-6 py-2 bg-pink-800 text-white rounded-md hover:bg-pink-700"
//               >
//                 {loading ? "Saving..." : "Save Profile"}
//               </button>
//               <button
//                 type="button"
//                 onClick={() => {
//                   setEditMode(false);
//                   setForm(profile);
//                 }}
//                 className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
//               >
//                 Cancel
//               </button>
//             </>
//           ) : (
//             <button
//               type="button"
//               onClick={() => setEditMode(true)}
//               className="px-6 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700"
//             >
//               Edit Profile
//             </button>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// }
// src/pages/student/StudentProfileEdit.jsx
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthProvider";

export default function StudentProfileEdit() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({});
  const [files, setFiles] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/student-profile/${user.uid}`
      );
      setProfile(res.data);
      setForm(res.data);
      setLoading(false);
    } catch (err) {
      toast.error("Failed to load profile");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.uid) {
      fetchProfile();
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFiles((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in form) {
      data.append(key, form[key]);
    }

    if (files.passportPhoto) data.append("passportPhoto", files.passportPhoto);
    if (files.studentId) data.append("studentId", files.studentId);
    if (files.admissionLetter)
      data.append("admissionLetter", files.admissionLetter);

    try {
      const res = await axios.post(
        `http://localhost:5000/api/student-profile/${user.uid}`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success("✅ Profile updated successfully!");
      setProfile(res.data);
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to update profile");
    }
  };

  if (loading)
    return <p className="text-center py-10 text-gray-500">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-md rounded-xl mt-6 mb-12">
      {/* show student image in the top and below verifies or not */}
      <div className="flex items-center justify-between mb-6">
        <img
          src={profile?.photoURL || "https://www.gravatar.com/avatar?d=mp"}
          alt="Student"
          className="w-24 h-24 rounded-full border object-cover"
        />
        {profile?.verified ? (
          <span className="text-green-600 font-semibold">Verified</span>
        ) : (
          <span className="text-red-600 font-semibold">Not Verified</span>
        )}
      </div>

      <h2 className="text-2xl font-bold text-pink-800 mb-6">
        Edit Student Profile
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            className="input input-bordered"
            name="phone"
            placeholder="Phone"
            value={form.phone || ""}
            onChange={handleChange}
          />
          <input
            className="input input-bordered"
            name="dateOfBirth"
            placeholder="Date of Birth"
            value={form.dateOfBirth || ""}
            onChange={handleChange}
          />
          <input
            className="input input-bordered"
            name="gender"
            placeholder="Gender"
            value={form.gender || ""}
            onChange={handleChange}
          />
          <input
            className="input input-bordered"
            name="nationality"
            placeholder="Nationality"
            value={form.nationality || ""}
            onChange={handleChange}
          />
          <input
            className="input input-bordered"
            name="passportNumber"
            placeholder="Passport Number"
            value={form.passportNumber || ""}
            onChange={handleChange}
          />
          <input
            className="input input-bordered"
            name="university"
            placeholder="University"
            value={form.university || ""}
            onChange={handleChange}
          />
          <input
            className="input input-bordered"
            name="studentId"
            placeholder="Student ID"
            value={form.studentId || ""}
            onChange={handleChange}
          />
          <input
            className="input input-bordered"
            name="program"
            placeholder="Program"
            value={form.program || ""}
            onChange={handleChange}
          />
          <input
            className="input input-bordered"
            name="address"
            placeholder="Address"
            value={form.address || ""}
            onChange={handleChange}
          />
          <input
            className="input input-bordered"
            name="emergencyContactName"
            placeholder="Emergency Contact Name"
            value={form.emergencyContactName || ""}
            onChange={handleChange}
          />
          <input
            className="input input-bordered"
            name="emergencyContactPhone"
            placeholder="Emergency Contact Phone"
            value={form.emergencyContactPhone || ""}
            onChange={handleChange}
          />
        </div>

        <div className="mt-6">
          <label className="block font-semibold text-gray-700 mb-2">
            Upload Documents
          </label>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm mb-1">Passport Photo</p>
              <input
                type="file"
                name="passportPhoto"
                onChange={handleFileChange}
                className="file-input file-input-bordered w-full"
              />
              {profile?.documents?.passportPhotoUrl && (
                <img
                  src={profile.documents.passportPhotoUrl}
                  alt="Passport"
                  className="mt-2 rounded shadow"
                />
              )}
            </div>
            <div>
              <p className="text-sm mb-1">Student ID</p>
              <input
                type="file"
                name="studentId"
                onChange={handleFileChange}
                className="file-input file-input-bordered w-full"
              />
              {profile?.documents?.studentIdUrl && (
                <img
                  src={profile.documents.studentIdUrl}
                  alt="Student ID"
                  className="mt-2 rounded shadow"
                />
              )}
            </div>
            <div>
              <p className="text-sm mb-1">Admission Letter</p>
              <input
                type="file"
                name="admissionLetter"
                onChange={handleFileChange}
                className="file-input file-input-bordered w-full"
              />
              {profile?.documents?.admissionLetterUrl && (
                <a
                  href={profile.documents.admissionLetterUrl}
                  target="_blank"
                  className="text-blue-600 mt-2 block text-sm underline"
                >
                  View
                </a>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="btn bg-pink-800 hover:bg-pink-700 text-white px-6 py-3 mt-6 rounded-xl"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}
