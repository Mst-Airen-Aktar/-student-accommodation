const mongoose = require("mongoose");

const landlordSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true }, // from Firebase auth or your auth system
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  nationalId: { type: String, required: true }, // Finnish personal ID or passport
  address: { type: String, required: true },

  businessId: { type: String },

  propertyAddresses: [String], // array of property addresses landlord owns/manages

  houseRules: { type: String }, // optional text

  languagesSpoken: [String], // e.g. ["Finnish", "English"]

  documents: {
    idProofUrl: { type: String }, // link to uploaded ID document
    rentalLicenseUrl: { type: String }, // if available
    energyCertificateUrl: { type: String }, // optional
  },

  profilePhotoUrl: { type: String }, // landlord profile picture

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Landlord", landlordSchema);
