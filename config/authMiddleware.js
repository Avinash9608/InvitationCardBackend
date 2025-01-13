const jwt = require("jsonwebtoken");
// const User = require("../models/User"); // Use if you need additional user data from your DB

const verifyToken = async (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token || !token.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  token = token.split(" ")[1]; // Remove 'Bearer ' prefix

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request

    // If you have roles, you can check the user's role here
    if (
      req.user.role &&
      req.user.role !== "admin" &&
      req.user.role !== "superadmin"
    ) {
      return res
        .status(403)
        .json({ message: "Access denied. Insufficient permissions." });
    }

    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = verifyToken;
