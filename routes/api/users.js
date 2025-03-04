const express = require('express');
const router = express.Router();  // Correct usage of Router

// Define routes
router.get('/', (req, res) => {
  res.send('User route');
});

module.exports = router;
