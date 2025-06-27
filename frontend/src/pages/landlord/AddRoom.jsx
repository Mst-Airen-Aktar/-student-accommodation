import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";

export default function AddRoom() {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    roomType: "Single",
    numberOfBeds: 1,
    roomSize: "",
    availableFrom: "",
    minStayMonths: 1,
    furnished: false,
    privateBathroom: false,
    attachedKitchen: false,
    address: "",
    city: "",
    postalCode: "",
    proximityToUniversity: "",
    rent: "",
    utilityIncluded: false,
    securityDeposit: "",
    paymentMethod: "Bank Transfer",
    maxTenants: 1,
    smokingAllowed: false,
    petsAllowed: false,
    internetIncluded: true,
    laundryAccess: false,
  });

  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    const formDataObj = new FormData();
    files.forEach((file) => formDataObj.append("images", file));

    try {
      const res = await axios.post(
        "http://localhost:5000/api/upload",
        formDataObj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setImages(files);
      setPreviewUrls(res.data);
    } catch (err) {
      console.error("Upload failed", err);
      alert("Image upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    const room = {
      ...formData,
      rent: parseFloat(formData.rent),
      securityDeposit: parseFloat(formData.securityDeposit),
      numberOfBeds: parseInt(formData.numberOfBeds),
      minStayMonths: parseInt(formData.minStayMonths),
      maxTenants: parseInt(formData.maxTenants),
      postedBy: user.uid,
      roomImages: previewUrls,
    };

    try {
      await axios.post("http://localhost:5000/api/rooms", room);
      alert("✅ Room added successfully!");
      // setFormData({
      //   title: "",
      //   description: "",
      //   roomType: "Single",
      //   numberOfBeds: 1,
      //   roomSize: "",
      //   availableFrom: "",
      //   minStayMonths: 1,
      //   furnished: false,
      //   privateBathroom: false,
      //   attachedKitchen: false,
      //   address: "",
      //   city: "",
      //   postalCode: "",
      //   proximityToUniversity: "",
      //   rent: "",
      //   utilityIncluded: false,
      //   securityDeposit: "",
      //   paymentMethod: "Bank Transfer",
      //   maxTenants: 1,
      //   smokingAllowed: false,
      //   petsAllowed: false,
      //   internetIncluded: true,
      //   laundryAccess: false,
      // });
      // setImages([]);
      // setPreviewUrls([]);
    } catch (err) {
      alert("❌ Failed to add room");
      console.error(err);
    }
  };

  const handleFilter = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const params = new URLSearchParams();

    for (let [key, value] of form.entries()) {
      if (value !== "" && value !== "false") {
        params.append(key, value);
      }
    }

    const res = await axios.get(
      `http://localhost:5000/api/rooms?${params.toString()}`
    );
    setFilteredRooms(res.data);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-2xl font-bold text-pink-800 mb-6">
          ➕ Add New Room
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Room Details */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Room Details</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full border rounded px-3 py-2"
                  placeholder="Cozy room near Aalto University"
                />
              </div>

              <div>
                <label className="block font-medium">Room Type</label>
                <select
                  name="roomType"
                  value={formData.roomType}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded px-3 py-2"
                  required
                >
                  <option>Single</option>
                  <option>Double</option>
                  <option>Shared</option>
                  <option>Studio</option>
                </select>
              </div>

              <div>
                <label className="block font-medium">Number of Beds</label>
                <input
                  type="number"
                  name="numberOfBeds"
                  min={1}
                  value={formData.numberOfBeds}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block font-medium">Room Size (sqm)</label>
                <input
                  type="number"
                  name="roomSize"
                  min={1}
                  value={formData.roomSize}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded px-3 py-2"
                  required
                  placeholder="e.g., 18"
                />
              </div>

              <div>
                <label className="block font-medium">Available From</label>
                <input
                  type="date"
                  name="availableFrom"
                  value={formData.availableFrom}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block font-medium">
                  Minimum Stay (months)
                </label>
                <input
                  type="number"
                  name="minStayMonths"
                  min={1}
                  value={formData.minStayMonths}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded px-3 py-2"
                  required
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block font-medium">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="mt-1 w-full border rounded px-3 py-2"
                required
                placeholder="Describe the room, furniture, lighting, surroundings..."
              ></textarea>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="furnished"
                  checked={formData.furnished}
                  onChange={handleChange}
                  className="form-checkbox"
                />
                <span>Furnished</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="privateBathroom"
                  checked={formData.privateBathroom}
                  onChange={handleChange}
                  className="form-checkbox"
                />
                <span>Private Bathroom</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="attachedKitchen"
                  checked={formData.attachedKitchen}
                  onChange={handleChange}
                  className="form-checkbox"
                />
                <span>Attached Kitchen</span>
              </label>
            </div>
          </div>

          {/* Location Info */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Location Info</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block font-medium">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full border rounded px-3 py-2"
                  placeholder="Street and house number"
                />
              </div>

              <div>
                <label className="block font-medium">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block font-medium">Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full border rounded px-3 py-2"
                  placeholder="e.g., 00100"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block font-medium">
                Proximity to University
              </label>
              <input
                type="text"
                name="proximityToUniversity"
                value={formData.proximityToUniversity}
                onChange={handleChange}
                className="mt-1 w-full border rounded px-3 py-2"
                placeholder="e.g., 1.2 km to LUT"
              />
            </div>
          </div>

          {/* Rent & Costs */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Rent & Costs</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block font-medium">Monthly Rent (€)</label>
                <input
                  type="number"
                  name="rent"
                  min={0}
                  step="0.01"
                  value={formData.rent}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full border rounded px-3 py-2"
                />
              </div>

              <div className="flex items-center mt-6 space-x-2">
                <input
                  type="checkbox"
                  name="utilityIncluded"
                  checked={formData.utilityIncluded}
                  onChange={handleChange}
                  className="form-checkbox"
                />
                <label className="font-medium">Utility Cost Included</label>
              </div>

              <div>
                <label className="block font-medium">
                  Security Deposit (€)
                </label>
                <input
                  type="number"
                  name="securityDeposit"
                  min={0}
                  step="0.01"
                  value={formData.securityDeposit}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded px-3 py-2"
                  placeholder="Usually 1-2 months rent"
                />
              </div>

              <div>
                <label className="block font-medium">Payment Method</label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded px-3 py-2"
                >
                  <option>Bank Transfer</option>
                  <option>Cash</option>
                  <option>MobilePay</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Availability & Rules */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Availability & Rules</h2>
            <div className="grid md:grid-cols-3 gap-4 items-center">
              <div>
                <label className="block font-medium">
                  Max Number of Tenants
                </label>
                <input
                  type="number"
                  name="maxTenants"
                  min={1}
                  value={formData.maxTenants}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded px-3 py-2"
                  required
                />
              </div>

              <label className="flex items-center space-x-2 mt-6">
                <input
                  type="checkbox"
                  name="smokingAllowed"
                  checked={formData.smokingAllowed}
                  onChange={handleChange}
                  className="form-checkbox"
                />
                <span>Smoking Allowed</span>
              </label>

              <label className="flex items-center space-x-2 mt-6">
                <input
                  type="checkbox"
                  name="petsAllowed"
                  checked={formData.petsAllowed}
                  onChange={handleChange}
                  className="form-checkbox"
                />
                <span>Pets Allowed</span>
              </label>

              <label className="flex items-center space-x-2 mt-6">
                <input
                  type="checkbox"
                  name="internetIncluded"
                  checked={formData.internetIncluded}
                  onChange={handleChange}
                  className="form-checkbox"
                />
                <span>Internet Included</span>
              </label>

              <label className="flex items-center space-x-2 mt-6">
                <input
                  type="checkbox"
                  name="laundryAccess"
                  checked={formData.laundryAccess}
                  onChange={handleChange}
                  className="form-checkbox"
                />
                <span>Laundry Access</span>
              </label>
            </div>
          </div>

          {/* Images Upload */}
          <div>
            <label className="block font-medium mb-2">
              Upload Images (Max 5)
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="mt-1"
            />
            {previewUrls.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-3">
                {previewUrls.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt={`preview-${i}`}
                    className="w-24 h-24 rounded object-cover border"
                  />
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="bg-pink-800 text-white px-6 py-2 rounded hover:bg-pink-700"
          >
            Submit Room
          </button>
        </form>
      </div>
    </div>
  );
}
