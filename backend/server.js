const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes"); // Add this line

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes); // Add this line

// Modern MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.log("MongoDB Connection Error:", err));
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));