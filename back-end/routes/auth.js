const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const getDBConnection = require("../db");

const router = express.Router();

// User Registration
router.post("/register", async (req, res) => {
    const { name, age, profession, contact, street, city, state, zipCode, gender, disease, medicalCertificate, password } = req.body;

    try {
        const conn = await getDBConnection();
        const hashedPassword = await bcrypt.hash(password, 10);
        
        await conn.execute(
            `INSERT INTO users (name, age, profession, contact, street, city, state, zip_code, gender, disease, medical_certificate, password) 
             VALUES (:name, :age, :profession, :contact, :street, :city, :state, :zipCode, :gender, :disease, :medicalCertificate, :password)`,
            { name, age, profession, contact, street, city, state, zipCode, gender, disease, medicalCertificate, password: hashedPassword },
            { autoCommit: true }
        );

        res.json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// User Login
router.post("/login", async (req, res) => {
    const { contact, password } = req.body;

    try {
        const conn = await getDBConnection();
        const result = await conn.execute(
            `SELECT id, name, age, profession, contact, street, city, state, zip_code, password FROM users WHERE contact = :contact`,
            { contact },
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );

        if (result.rows.length === 0) {
            return res.status(400).json({ error: "User not found" });
        }

        const user = result.rows[0];

        const passwordMatch = await bcrypt.compare(password, storedHashedPassword);

        if (!passwordMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.ID, contact: user.CONTACT },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ message: "Login successful!", token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
