const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "mysecrettoken";
require("dotenv").config(); // This will load .env variables into process.env

const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");
const { JsonWebTokenError } = require("jsonwebtoken");

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    console.log("Received data in /api/users:", req.body); // Check the incoming request body

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      console.log("Attempting to find user by email:", email);

      // Check if the user already exists
      let user = await User.findOne({ email });

      if (user) {
        console.log("User already exists");
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      // Get user gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      console.log("Creating a new user:", { name, email, avatar });

      // Create a new user instance
      user = new User({
        name,
        email,
        avatar,
        password,
      });

      console.log("Encrypting password...");
      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      console.log("Saving user to database...");
      // Save the user to the database
      await user.save();

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
      console.log("User registered successfully");
      res.send("User registered successfully");
    } catch (err) {
      console.error("Error occurred:", err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
