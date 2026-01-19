const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");

// GET all restaurants
router.get("/", restaurantController.getRestaurants);

// GET restaurant by ID
router.get("/:id", restaurantController.getRestaurantById);

// POST create a restaurant
router.post("/", restaurantController.createRestaurant);

// PUT update restaurant by ID
router.put("/:id", restaurantController.updateRestaurant);

// DELETE restaurant by ID
router.delete("/:id", restaurantController.deleteRestaurant);

module.exports = router;
