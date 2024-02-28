const User = require("../models/user.model");

const GetCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.id).select("-password");
    if (!user) return res.status(400).json({ message: "User not found" });
    res.send(user);
  } catch (error) {
    console.log("[Error while fetching user]", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { GetCurrentUser };
