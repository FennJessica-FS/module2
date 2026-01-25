const MenuItem = require("../models/menuItem");
const Restaurant = require("../models/restaurant");
const MSG = require("../messages/messages");

// GET all menu items
exports.getMenuItems = async (req, res) => {
  try {
    const { select, sort, page = 1, limit = 10, ...filters } = req.query;

    let filterStr = JSON.stringify(filters);
    filterStr = filterStr.replace(
      /\b(gt|gte|lt|lte|in|ne|nin|regex)\b/g,
      (match) => `$${match}`
    );

    const mongoFilters = JSON.parse(filterStr);

    let query = MenuItem.find(mongoFilters).populate("restaurantId", "-__v");

    if (select) {
      query = query.select(select.split(",").join(" "));
    } else {
      query = query.select("-__v");
    }

    if (sort) {
      query = query.sort(sort.split(",").join(" "));
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    query = query.skip(skip).limit(limitNum);

    const items = await query;

    res.status(200).json({
      success: true,
      count: items.length,
      page: pageNum,
      limit: limitNum,
      data: items,
    });
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
      return res.status(404).json({ message: MSG.NOT_FOUND });
    }

    const populated = await MenuItem.findById(updatedItem._id)
      .select("-__v")
      .populate("restaurantId", "-__v");

    res.status(200).json({ message: MSG.UPDATED, data: populated });
  } catch (error) {
    res.status(400).json({ message: MSG.BAD_REQUEST });
  }
};

// DELETE menu item by ID
exports.deleteMenuItem = async (req, res) => {
  try {
    const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ message: MSG.NOT_FOUND });
    }

    res.status(200).json({ message: MSG.DELETED });
  } catch (error) {
    res.status(400).json({ message: MSG.BAD_REQUEST });
  }
};
