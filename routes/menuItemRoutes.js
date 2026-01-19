const express = require("express");
const router = express.Router();
const menuItemController = require("../controllers/menuItemController");

// GET all menu items
router.get("/", menuItemController.getMenuItems);

// GET menu item by id
router.get("/:id", menuItemController.getMenuItemById);

// POST create a menu item
router.post("/", menuItemController.createMenuItem);

// PUT update menu item by id
router.put("/:id", menuItemController.updateMenuItem);

// DELETE menu item by id
router.delete("/:id", menuItemController.deleteMenuItem);

module.exports = router;
