const express = require('express')
const router = express.Router();
const { createUser, loginUser } = require('../controllers/users')
const { protect } = require('../middleware/authMiddleware')

router.post("/", protect, createUser);
router.post("/login", loginUser);

module.exports = router; 