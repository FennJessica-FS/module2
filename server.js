require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const bookRoutes = require("./routes/bookRoutes");

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongo connection error:", err));

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/books", bookRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
