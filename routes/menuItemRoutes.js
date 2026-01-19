const express = require("express");
const router = express.Router();
const menuItemController = require("../controllers/menuItemController");

// GET all menu items
router.get("/", menuItemController.getMenuItems);

// GET menu item by ID
router.get("/:id", menuItemController.getMenuItemById);

// POST create menu item
router.post("/", menuItemController.createMenuItem);

// PUT update menu item
router.put("/:id", menuItemController.updateMenuItem);

// DELETE menu item
router.delete("/:id", menuItemController.deleteMenuItem);

module.exports = router;
