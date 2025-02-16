const express = require("express");
const getDBConnection = require("../db");

const router = express.Router();

// Add Vaccine
router.post("/add-vaccine", async (req, res) => {
    const { name, type, price, sideEffect, origin, dosesRequired, info } = req.body;

    try {
        const conn = await getDBConnection();
        await conn.execute(
            `INSERT INTO vaccines (name, type, price, side_effect, origin, doses_required, info) 
             VALUES (:name, :type, :price, :sideEffect, :origin, :dosesRequired, :info)`,
            { name, type, price, sideEffect, origin, dosesRequired, info },
            { autoCommit: true }
        );

        res.json({ message: "Vaccine added successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add Hospital
router.post("/add-hospital", async (req, res) => {
    const { name, address, type, charges } = req.body;

    try {
        const conn = await getDBConnection();
        await conn.execute(
            `INSERT INTO hospitals (name, address, type, charges) 
             VALUES (:name, :address, :type, :charges)`,
            { name, address, type, charges },
            { autoCommit: true }
        );

        res.json({ message: "Hospital added successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
