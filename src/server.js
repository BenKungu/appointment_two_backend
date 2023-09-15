const express = require("express");
const app = express();
const port = 3000; // or any port you prefer

// Middleware and route setup go here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
