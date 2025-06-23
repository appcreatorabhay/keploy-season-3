const User = require("../models/user");

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();         // ✅ get saved result
    res.status(201).json(savedUser);             // ✅ respond with saved data
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users); // 🔁 changed from .send() to .json()
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update user by ID
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(user); // 🔁 changed from .send() to .json()
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete user by ID
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully" }); // ✅ matches test
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
