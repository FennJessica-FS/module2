const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema(
  {
    // Connects this menu item to a restaurant
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },

    // Name of the menu item
    name: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 80,
      trim: true,
    },

    // Price of the item
    price: {
      type: Number,
      required: true,
      min: 0.5,
    },

    // Whether the item is currently available
    available: {
      type: Boolean,
      default: true,
    },

    // When the item was added
    addedOn: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MenuItem", menuItemSchema);
