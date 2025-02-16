const express = require("express");
const getDBConnection = require("../db");

const router = express.Router();

// Book an Appointment
router.post("/book", async (req, res) => {
    const { userId, hospitalId, vaccineId, appointmentDate, paymentStatus } = req.body;

    try {
        const conn = await getDBConnection();
        await conn.execute(
            `INSERT INTO appointments (user_id, hospital_id, vaccine_id, appointment_date, payment_status) 
             VALUES (:userId, :hospitalId, :vaccineId, TO_DATE(:appointmentDate, 'YYYY-MM-DD'), :paymentStatus)`,
            { userId, hospitalId, vaccineId, appointmentDate, paymentStatus },
            { autoCommit: true }
        );

        res.json({ message: "Appointment booked successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get All Appointments
router.get("/all", async (req, res) => {
    try {
        const conn = await getDBConnection();
        const result = await conn.execute(
            `SELECT id, user_id, hospital_id, vaccine_id, TO_CHAR(appointment_date, 'YYYY-MM-DD') AS appointment_date, payment_status 
             FROM appointments`
        );

        // Map the result to a structured response
        const appointments = result.rows.map(row => ({
            id: row[0],
            user_id: row[1],
            hospital_id: row[2],
            vaccine_id: row[3],
            appointment_date: row[4],
            payment_status: row[5]
        }));

        res.json({ appointments });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
