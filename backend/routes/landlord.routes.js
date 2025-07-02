const express = require("express");
const Landlord = require("../models/Landlord");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary.config");

const router = express.Router();

// Setup cloudinary storage for uploads
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "finnroom/landlords",
    allowed_formats: ["jpg", "png", "jpeg", "pdf"],
  },
});

const upload = multer({ storage });

// Get landlord profile by uid
router.get("/:uid", async (req, res) => {
  try {
    const landlord = await Landlord.findOne({ uid: req.params.uid });
    if (!landlord)
      return res.status(404).json({ message: "Landlord profile not found" });
    res.json(landlord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create or update landlord profile
router.post(
  "/:uid",
  upload.fields([
    { name: "profilePhoto", maxCount: 1 },
    { name: "idProof", maxCount: 1 },
    { name: "rentalLicense", maxCount: 1 },
    { name: "energyCertificate", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const {
        name,
        email,
        phone,
        nationalId,
        address,
        businessId,
        propertyAddresses,
        houseRules,
        languagesSpoken,
      } = req.body;

      // Parse propertyAddresses and languagesSpoken if sent as JSON string
      let parsedProperties = propertyAddresses;
      if (typeof propertyAddresses === "string")
        parsedProperties = JSON.parse(propertyAddresses);

      let parsedLanguages = languagesSpoken;
      if (typeof languagesSpoken === "string")
        parsedLanguages = JSON.parse(languagesSpoken);

      const updateData = {
        name,
        email,
        phone,
        nationalId,
        address,
        businessId,
        propertyAddresses: parsedProperties,
        houseRules,
        languagesSpoken: parsedLanguages,
      };

      // Add uploaded file URLs if present
      if (req.files.profilePhoto)
        updateData.profilePhotoUrl = req.files.profilePhoto[0].path;
      if (req.files.idProof) updateData.documents = updateData.documents || {};
      if (req.files.idProof)
        updateData.documents.idProofUrl = req.files.idProof[0].path;
      if (req.files.rentalLicense) {
        updateData.documents = updateData.documents || {};
        updateData.documents.rentalLicenseUrl = req.files.rentalLicense[0].path;
      }
      if (req.files.energyCertificate) {
        updateData.documents = updateData.documents || {};
        updateData.documents.energyCertificateUrl =
          req.files.energyCertificate[0].path;
      }

      const landlord = await Landlord.findOneAndUpdate(
        { uid: req.params.uid },
        updateData,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      res.json(landlord);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
);

// PUT /api/landlords/:uid/verify
router.put("/:uid/verify", async (req, res) => {
  try {
    const { verified } = req.body;

    const landlord = await Landlord.findOneAndUpdate(
      { uid: req.params.uid },
      { verified },
      { new: true }
    );

    if (!landlord)
      return res.status(404).json({ message: "Landlord not found" });

    res.json({
      message: `Landlord has been ${verified ? "verified" : "unverified"}.`,
      landlord,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
