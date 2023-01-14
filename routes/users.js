const express = require('express')
const router = express.Router();
const { createUser, loginUser, loginAdmin } = require('../controllers/users')
const { protect } = require('../middleware/authMiddleware')

router.post("/", protect, createUser);
router.post("/login", loginUser);
router.post("/admin/login", loginAdmin);

module.exports = router; 