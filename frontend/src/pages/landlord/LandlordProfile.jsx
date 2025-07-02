import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";

export default function LandlordProfile() {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    nationalId: "",
    address: "",
    businessId: "",
    propertyAddresses: [""],
    houseRules: "",
    languagesSpoken: [],
  });
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [idProof, setIdProof] = useState(null);
  const [rentalLicense, setRentalLicense] = useState(null);
  const [energyCertificate, setEnergyCertificate] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    axios.get(`http://localhost:5000/api/landlords/${user.uid}`).then((res) => {
      if (res.data) {
        setFormData({
          ...res.data,
          propertyAddresses:
            res.data.propertyAddresses?.length > 0
              ? res.data.propertyAddresses
              : [""],
          languagesSpoken: res.data.languagesSpoken || [],
        });
      }
    });
  }, [user]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleArrayChange(index, value, field) {
    const arr = [...formData[field]];
    arr[index] = value;
    setFormData((prev) => ({ ...prev, [field]: arr }));
  }

  function addArrayField(field) {
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  }

  function removeArrayField(index, field) {
    if (formData[field].length === 1) return;
    const arr = [...formData[field]];
    arr.splice(index, 1);
    setFormData((prev) => ({ ...prev, [field]: arr }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!user) return alert("Login required");

    setLoading(true);
    try {
      const data = new FormData();
      for (const key in formData) {
        if (Array.isArray(formData[key])) {
          data.append(key, JSON.stringify(formData[key]));
        } else {
          data.append(key, formData[key]);
        }
      }
      if (profilePhoto) data.append("profilePhoto", profilePhoto);
      if (idProof) data.append("idProof", idProof);
      if (rentalLicense) data.append("rentalLicense", rentalLicense);
      if (energyCertificate)
        data.append("energyCertificate", energyCertificate);

      const res = await axios.post(
        `http://localhost:5000/api/landlords/${user.uid}`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("Profile saved successfully");
      setFormData((prev) => ({ ...prev, ...res.data }));
    } catch (error) {
      alert("Failed to save profile");
      console.error(error);
    }
    setLoading(false);
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
        Landlord Profile
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* image upload click on avatar then upload image,when select image ity preview on those avatar  and aftar save it will permanently sav */}

        <div className="flex items-center space-x-4 mb-6">
          <img
            src={
              formData?.profilePhoto ||
              "https://www.gravatar.com/avatar?d=mp&s=200"
            }
            alt="Profile"
            className="h-16 w-16 rounded-full border-2 border-pink-
800 object-cover"
          />
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Profile Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfilePhoto(e.target.files[0])}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-pink-50 file:text-pink-700
                hover:file:bg-pink-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic info */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                National ID / Passport <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nationalId"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                value={formData.nationalId}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="address"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business ID (optional)
              </label>
              <input
                type="text"
                name="businessId"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                value={formData.businessId}
                onChange={handleInputChange}
              />
            </div>

            {/* Property addresses */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property Addresses
              </label>
              {formData.propertyAddresses.map((address, i) => (
                <div key={i} className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) =>
                      handleArrayChange(i, e.target.value, "propertyAddresses")
                    }
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayField(i, "propertyAddresses")}
                    className="inline-flex items-center justify-center w-8 h-8 text-red-500 hover:text-red-700 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayField("propertyAddresses")}
                className="inline-flex items-center text-sm text-pink-600 hover:text-pink-800 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Add Property Address
              </button>
            </div>
          </div>
        </div>

        {/* House rules */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            House Rules
          </label>
          <textarea
            name="houseRules"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            value={formData.houseRules}
            onChange={handleInputChange}
          ></textarea>
        </div>

        {/* Languages spoken */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Languages Spoken
          </label>
          {formData.languagesSpoken.map((lang, i) => (
            <div key={i} className="flex space-x-2 mb-2">
              <input
                type="text"
                value={lang}
                onChange={(e) =>
                  handleArrayChange(i, e.target.value, "languagesSpoken")
                }
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              />
              <button
                type="button"
                onClick={() => removeArrayField(i, "languagesSpoken")}
                className="inline-flex items-center justify-center w-8 h-8 text-red-500 hover:text-red-700 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayField("languagesSpoken")}
            className="inline-flex items-center text-sm text-pink-600 hover:text-pink-800 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add Language
          </button>
        </div>

        {/* File uploads */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Photo
            </label>
            <div className="mt-1 flex items-center">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProfilePhoto(e.target.files[0])}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-pink-50 file:text-pink-700
                  hover:file:bg-pink-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ID Proof (jpg/png/pdf)
            </label>
            <div className="mt-1 flex items-center">
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => setIdProof(e.target.files[0])}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-pink-50 file:text-pink-700
                  hover:file:bg-pink-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rental License (jpg/png/pdf)
            </label>
            <div className="mt-1 flex items-center">
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => setRentalLicense(e.target.files[0])}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-pink-50 file:text-pink-700
                  hover:file:bg-pink-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Energy Certificate (optional)
            </label>
            <div className="mt-1 flex items-center">
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => setEnergyCertificate(e.target.files[0])}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-pink-50 file:text-pink-700
                  hover:file:bg-pink-100"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving...
              </>
            ) : (
              "Save Profile"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
