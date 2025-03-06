const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  console.log("Received token:", token); // Log the token received

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded token:", decoded);

    req.user = decoded.user;

    next();
  } catch (err) {
    console.error("JWT verification failed:", err);

    res.status(401).json({ msg: "Token is not valid" });
  }
};
