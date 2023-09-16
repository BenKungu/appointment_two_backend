const express = require("express");
const router = express.Router();

// Define your API routes here
router.get("/", (req, res) => {
  // Handle GET request for appointments
  res.json({ message: "Get appointments" });
});

module.exports = router;
