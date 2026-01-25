const Restaurant = require("../models/restaurant");
const MSG = require("../messages/messages");

// GET all restaurants
exports.getRestaurants = async (req, res) => {
  try {
    const { select, sort, page = 1, limit = 10, ...filters } = req.query;

    let filterStr = JSON.stringify(filters);
    filterStr = filterStr.replace(
      /\b(gt|gte|lt|lte|in|ne|nin|regex)\b/g,
      (match) => `$${match}`
    );

    const mongoFilters = JSON.parse(filterStr);

    let query = Restaurant.find(mongoFilters);

    if (select) {
      query = query.select(select.split(",").join(" "));
    } else {
      query = query.select("-__v");
    }

    if (sort) {
      query = query.sort(sort.split(",").join(" "));
    } else {
      query = query.sort("-createdAt");
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    query = query.skip(skip).limit(limitNum);

    const restaurants = await query;

    res.status(200).json({
      success: true,
      count: restaurants.length,
      page: pageNum,
      limit: limitNum,
      data: restaurants,
    });
  } catch (error) {
    res.status(500).json({ message: MSG.SERVER_ERROR });
  }
};

// GET restaurant by ID
exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).select("-__v");

    if (!restaurant) {
      return res.status(404).json({ message: MSG.NOT_FOUND });
    }

    res.status(200).json(restaurant);
  } catch (error) {
    res.status(400).json({ message: MSG.BAD_REQUEST });
  }
};

// POST create a new restaurant
exports.createRestaurant = async (req, res) => {
  try {
    const newRestaurant = new Restaurant(req.body);
    const savedRestaurant = await newRestaurant.save();
    res.status(201).json({ message: MSG.CREATED, data: savedRestaurant });
  } catch (error) {
    res.status(400).json({ message: MSG.BAD_REQUEST });
  }
};

// PUT update restaurant by ID
exports.updateRestaurant = async (req, res) => {
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).select("-__v");

    if (!updatedRestaurant) {
      return res.status(404).json({ message: MSG.NOT_FOUND });
    }

    res.status(200).json({ message: MSG.UPDATED, data: updatedRestaurant });
  } catch (error) {
    res.status(400).json({ message: MSG.BAD_REQUEST });
  }
};

// DELETE restaurant by ID
exports.deleteRestaurant = async (req, res) => {
  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.id);

    if (!deletedRestaurant) {
      return res.status(404).json({ message: MSG.NOT_FOUND });
    }

    res.status(200).json({ message: MSG.DELETED });
  } catch (error) {
    res.status(400).json({ message: MSG.BAD_REQUEST });
  }
};
