import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthProvider";

export default function StudentProfile() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/student-profile/${user?.uid}`
      );
      setProfile(res.data);
      setForm(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photoURL" && files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setForm((prev) => ({ ...prev, photoURL: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/student-profile",
        {
          uid: user?.uid,
          ...form,
        }
      );
      toast.success("Profile saved successfully!");
      setProfile(res.data);
      setEditMode(false);
    } catch (err) {
      toast.error("Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.uid) fetchProfile();
  }, [user]);

  if (!user) return <p className="text-center text-red-500">Login required</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10 px-6 py-8 bg-white shadow-md rounded-xl">
      <h2 className="text-3xl font-semibold text-center text-pink-800 mb-6">
        Student Profile
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Photo Section */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-10">
          <img
            src={form.photoURL || "https://www.gravatar.com/avatar?d=mp"}
            alt="Student"
            className="w-28 h-28 rounded-full border object-cover"
          />
          {editMode && (
            <input
              type="file"
              name="photoURL"
              accept="image/*"
              onChange={handleChange}
              className="text-sm"
            />
          )}
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Full Name", name: "fullName", required: true },
            { label: "Date of Birth", name: "dateOfBirth", type: "date" },
            { label: "Nationality", name: "nationality" },
            { label: "Gender", name: "gender" },
            { label: "Passport Number", name: "passportNumber" },
            { label: "University", name: "university" },
            { label: "Student ID", name: "studentId" },
            { label: "Program", name: "program" },
            { label: "Address", name: "address" },
            { label: "Emergency Contact Name", name: "emergencyContactName" },
            { label: "Emergency Contact Phone", name: "emergencyContactPhone" },
          ].map((f) => (
            <div key={f.name}>
              <label className="block font-medium text-gray-700 mb-1">
                {f.label}
              </label>
              <input
                type={f.type || "text"}
                name={f.name}
                value={form[f.name] || ""}
                onChange={handleChange}
                disabled={!editMode}
                required={f.required}
                className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                  editMode ? "bg-white" : "bg-gray-100 text-gray-600"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          {editMode ? (
            <>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-pink-800 text-white rounded-md hover:bg-pink-700"
              >
                {loading ? "Saving..." : "Save Profile"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditMode(false);
                  setForm(profile);
                }}
                className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setEditMode(true)}
              className="px-6 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700"
            >
              Edit Profile
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
