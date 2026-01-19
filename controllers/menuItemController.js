const MenuItem = require("../models/MenuItem");

// Get all menu items
exports.getMenuItems = async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch menu items" });
  }
};

// Get a single menu item by ID
exports.getMenuItemById = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ error: "Menu item not found" });
    }

    res.json(item);
  } catch (error) {
    res.status(400).json({ error: "Invalid menu item id" });
  }
};

// Create a new menu item
exports.createMenuItem = async (req, res) => {
  try {
    const newItem = new MenuItem(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a menu item by ID
exports.updateMenuItem = async (req, res) => {
  try {
    const updatedItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ error: "Menu item not found" });
    }

    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a menu item by ID
exports.deleteMenuItem = async (req, res) => {
  try {
    const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ error: "Menu item not found" });
    }

    res.json({ message: "Menu item deleted" });
  } catch (error) {
    res.status(400).json({ error: "Invalid menu item id" });
  }
};
