require("dotenv").config();

const express = require("express");

const restaurantRoutes = require("./routes/restaurantRoutes");
const menuItemRoutes = require("./routes/menuItemRoutes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/restaurants", restaurantRoutes);
app.use("/api/menuitems", menuItemRoutes);

module.exports = app;
