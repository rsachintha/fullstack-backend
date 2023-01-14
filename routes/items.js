const express = require('express')
const router = express.Router();
const { getItems, createItem, getItem, deleteItem, updateItem } = require('../controllers/items')

const { protect } = require('../middleware/authMiddleware')

router.get("/", protect, getItems);
router.post("/", protect, createItem);
router.get("/:id", protect, getItem);
router.delete("/:id", protect, deleteItem);
router.put("/:id", protect, updateItem);

module.exports = router;