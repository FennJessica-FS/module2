const mongoose = require("mongoose");

// Schema that defines the structure of a Restaurant document
const restaurantSchema = new mongoose.Schema(
  {
    // Restaurant name
    name: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 80,
      trim: true,
    },

    // Type of cuisine served
    cuisine: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 40,
      trim: true,
    },

    // Customer rating (1–5)
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },

    // Indicates if the restaurant is currently open
    isOpen: {
      type: Boolean,
      default: true,
    },
  },
  {
    // Automatically adds createdAt and updatedAt fields
    timestamps: true,
  }
);

// Export the Restaurant model
module.exports = mongoose.model("Restaurant", restaurantSchema);
