const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },

    roomType: {
      type: String,
      enum: ["Single", "Double", "Shared", "Studio"],
      required: true,
    },
    numberOfBeds: { type: Number, required: true },
    roomSize: { type: Number, required: true }, // changed from String to Number for filtering

    availableFrom: { type: Date, required: true },
    minStayMonths: { type: Number, required: true },

    furnished: { type: Boolean, default: false },
    privateBathroom: { type: Boolean, default: false },
    attachedKitchen: { type: Boolean, default: false },

    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    proximityToUniversity: { type: String },

    rent: { type: Number, required: true },
    utilityIncluded: { type: Boolean, default: false },
    securityDeposit: { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: ["Bank Transfer", "Cash", "MobilePay", "Other"],
      default: "Bank Transfer",
    },

    maxTenants: { type: Number, required: true },
    smokingAllowed: { type: Boolean, default: false },
    petsAllowed: { type: Boolean, default: false },
    internetIncluded: { type: Boolean, default: true },
    laundryAccess: { type: Boolean, default: false },

    roomImages: [{ type: String }],

    postedBy: { type: String, required: true }, // Firebase UID of landlord
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Room", roomSchema);
