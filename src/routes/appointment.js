// routes/appointments.js

const express = require("express");
const router = express.Router();
const { Appointment } = require("../models");
const sequelize = require("../config/database");

router.post("/appointments", async (req, res) => {
  try {
    // Get form data from the request
    const { name, email, phone, meeting, location, service } = req.body;

    // Create a new appointment record in the database
    const appointment = await Appointment.create({
      name,
      email,
      phone,
      meeting,
      location,
      service,
    });

    // Respond with a success message
    res
      .status(201)
      .json({ message: "Appointment created successfully", appointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
