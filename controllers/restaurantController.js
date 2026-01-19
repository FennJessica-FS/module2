const Restaurant = require("../models/Restaurant");

// GET all restaurants
exports.getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch restaurants" });
  }
};

// POST create a new restaurant
exports.createRestaurant = async (req, res) => {
  try {
    const newRestaurant = new Restaurant(req.body);
    const savedRestaurant = await newRestaurant.save();
    res.status(201).json(savedRestaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
