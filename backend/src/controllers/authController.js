const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

const SignUp = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password)
      return res.status(404).json({ message: "Something required is missing" });

    const user = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });
    if (username === user.username)
      return res.status(400).json({ message: "User already exist" });
    if (email === user.email)
      return res.status(400).json({ message: "Email already exist" });

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User created successful" });
  } catch (error) {
    console.log("[Error while creating user]", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { SignUp };
