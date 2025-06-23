// routes/userRoutes.js

const express = require("express");
const router = express.Router();
const {
  createUser,
  getUsers,
  updateUser,
  deleteUser
} = require("../controllers/userController");

// POST /api/users - Create a new user
router.post("/users", createUser);

// GET /api/users - Get all users
router.get("/users", getUsers);

// PUT /api/users/:id - Update user by ID
router.put("/users/:id", updateUser);

// DELETE /api/users/:id - Delete user by ID
router.delete("/users/:id", deleteUser);

module.exports = router;
