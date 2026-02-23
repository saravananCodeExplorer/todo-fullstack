const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

//  Middlewares
app.use(cors());
app.use(express.json());

//  Test route
app.get("/", (req, res) => {
  res.json({ message: "Backend is running " });
});

// API routes
app.use("/api", taskRoutes);

// Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});