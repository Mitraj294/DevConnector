const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth.js");
const User = require("../../models/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = "mysecrettoken";
require("dotenv").config(); // This will load .env variables into process.env
const config = require("config");
const { check, validationResult } = require("express-validator");

// @route   GET api/auth
// @desc    Get logged-in user's data
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    // Corrected the issue of using findById
    const user = await User.findById(req.user.id).select("-password"); // Use req.user.id instead of req.user.findById
    return res.json(user); // Return the user object
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// @route    POST api/auth
// @desc     Authemticate user and get token
// @access   Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    console.log("Received data in /api/auth:", req.body); // Check the incoming request body

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      console.log("Attempting to find user by email:", email);

      // Check if the user already exists
      let user = await User.findOne({ email });

      if (!user) {
        // console.log("Invalid Credentials");
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        // console.log("Invalid Credentials");
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      // Payload with user ID
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
      //console.log("User registered successfully");
      //res.send("User registered successfully");
    } catch (err) {
      console.error("Error occurred:", err.message); // Log the exact error message
      res.status(500).send("Server error");
    }
  }
);
module.exports = router;
