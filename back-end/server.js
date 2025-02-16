const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const appointmentRoutes = require("./routes/appointment");
const verifyToken = require("./middleware/authMiddleware"); // JWT Middleware

const app = express();

app.use(cors());
app.use(express.json());

// Apply JWT Authentication Globally (Except for Public Routes)
app.use("/auth", authRoutes); // Public Routes
app.use(verifyToken); // Apply JWT Authentication Middleware Globally

// Protected Routes
app.use("/admin", adminRoutes);
app.use("/appointment", appointmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

