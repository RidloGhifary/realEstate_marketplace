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

const UpdateUser = async (req, res) => {
  if (req.id !== req.params.id) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  if (!req.body.username || !req.body.avatar) {
    return res.status(400).send({ message: "Something required is missing" });
  }
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...others } = updateUser._doc;
    res.status(200).json(others);
  } catch (error) {
    console.log("[Error while updating user]", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { GetCurrentUser, UpdateUser };
