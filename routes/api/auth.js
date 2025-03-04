const express = require('express');
const router = express.Router();  // Correct usage of Router

// Your routes here
router.get('/', (req, res) => {
  res.send('Auth route');
});

module.exports = router;
