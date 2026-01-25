require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const restaurantRoutes = require("./routes/restaurantRoutes");
const menuItemRoutes = require("./routes/menuItemRoutes");

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongo connection error:", err));

app.get("/", (req, res) => {
  res.send("API is running");
});

// Routes
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/menuitems", menuItemRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
