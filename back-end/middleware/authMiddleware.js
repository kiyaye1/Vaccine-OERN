const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    const token = req.header("Authorization");
    if (!token) return res.status(403).json({ error: "Access Denied. No Token Provided." });

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ error: "Invalid Token" });
    }
}

module.exports = verifyToken;
