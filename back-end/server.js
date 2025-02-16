const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const appointmentRoutes = require("./routes/appointment");
const verifyToken = require("./middleware/authMiddleware"); 

const app = express();

app.use(cors());
app.use(express.json());

// Public Routes
app.use("/auth", authRoutes); 

// Apply JWT Authentication Globally
app.use(verifyToken); 

// Protected Routes
app.use("/admin", adminRoutes);
app.use("/appointment", appointmentRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

