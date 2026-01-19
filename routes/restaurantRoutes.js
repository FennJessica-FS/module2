const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");

// GET all restaurants
router.get("/", restaurantController.getRestaurants);

// POST create a restaurant
router.post("/", restaurantController.createRestaurant);

module.exports = router;
