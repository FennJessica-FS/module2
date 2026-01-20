const MenuItem = require("../models/MenuItem");
const Restaurant = require("../models/Restaurant");
const MSG = require("../messages/messages");

// GET all menu items
exports.getMenuItems = async (req, res) => {
  try {
    const items = await MenuItem.find()
      .select("-__v")
      .populate("restaurantId", "-__v");

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: MSG.SERVER_ERROR });
  }
};

// GET menu item by ID
exports.getMenuItemById = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id)
      .select("-__v")
      .populate("restaurantId", "-__v");

    if (!item) {
      return res.status(404).json({ message: MSG.NOT_FOUND });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: MSG.SERVER_ERROR });
  }
};

// POST create a menu item
exports.createMenuItem = async (req, res) => {
  try {
    const { name, price, available, restaurantId } = req.body;

    // make sure restaurant exists
    const restaurantExists = await Restaurant.findById(restaurantId);
    if (!restaurantExists) {
      return res.status(404).json({ message: MSG.NOT_FOUND });
    }

    const created = await MenuItem.create({
      name,
      price,
      available,
      restaurantId,
    });

    // return populated + clean payload
    const populated = await MenuItem.findById(created._id)
      .select("-__v")
      .populate("restaurantId", "-__v");

    res.status(201).json({ message: MSG.CREATED, data: populated });
  } catch (error) {
    res.status(400).json({ message: MSG.BAD_REQUEST });
  }
};

// PUT update menu item by ID
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

// DELETE menu item by ID
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
