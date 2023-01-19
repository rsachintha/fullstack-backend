const express = require('express')
const router = express.Router();
const { getItems, createItem, getItem, deleteItem, updateItem, getStats } = require('../controllers/items')

// const { protect } = require('../middleware/authMiddleware')

router.get("/", getItems);
router.post("/", createItem);
router.get("/stats", getStats);
router.get("/:id", getItem);
router.delete("/:id", deleteItem);
router.put("/", updateItem);

module.exports = router;