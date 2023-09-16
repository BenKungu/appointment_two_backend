// server.js

const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const appointmentsRouter = require("./routes/appointments");

const app = express();
const port = 3000; // Use your desired port

// Middleware
app.use(bodyParser.json());
app.use("/api", appointmentsRouter);

// Database sync (this will create the table if it doesn't exist)
sequelize.sync();

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
