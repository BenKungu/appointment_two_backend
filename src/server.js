const express = require("express");
const app = express();
const port = 3000; // or any port you prefer

// Middleware and route setup go here

const appointmentsRouter = require("./routes/appointments");
const formData = req.body;


// Use the appointments router for the /api/appointments route
app.use("/api/appointments", appointmentsRouter);

const { authenticateUser } = require("./middlewares/authenticationMiddleware");
console.log('Received form data:', formData);

  // You can add code here to save the form data to a database or perform other actions

  // Respond with a success message or appropriate status code
  res.status(201).json({ message: 'Form data received successfully' });
});

// Define a route that uses the authentication middleware
app.get("/secure-route", authenticateUser, (req, res) => {
  res.json({ message: "This route is secure." });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
