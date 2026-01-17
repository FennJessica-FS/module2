const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// middleware to read JSON bodies
app.use(express.json());

// path to users data file
const USERS_FILE = path.join(__dirname, "data", "users.json");

// test route
app.get("/", (req, res) => {
  res.send("API is running ✅");
});

// GET all users (from file)
app.get("/users", (req, res) => {
  fs.readFile(USERS_FILE, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Could not read users file" });
    }

    try {
      const users = JSON.parse(data);
      res.json(users);
    } catch (parseErr) {
      res.status(500).json({ error: "Invalid JSON in users file" });
    }
  });
});
app.post("/users", (req, res) => {
  fs.readFile(USERS_FILE, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Could not read users file" });
    }

    let users = [];
    try {
      users = JSON.parse(data);
    } catch (parseErr) {
      return res.status(500).json({ error: "Invalid JSON in users file" });
    }

    const name = req.body && req.body.name;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }
its 
    const newUser = {
      id: Date.now(),
      name: name,
    };

    users.push(newUser);

    fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), (writeErr) => {
      if (writeErr) {
        return res.status(500).json({ error: "Could not save user" });
      }

      res.status(201).json(newUser);
    });
  });
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
