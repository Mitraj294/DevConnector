const express = require('express');
const router = express.Router();  // Correct usage of Router

// Define your routes
router.get('/', (req, res) => {
  res.send('Profile route');
});

module.exports = router;
