const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const { sendWelcomeEmail } = require("../utils/sendMail");

const SignUp = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ message: errors.array() });

  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res.status(404).send({ message: "Something required is missing" });

    const user = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });

    if (user)
      return res.status(400).send({ message: "User or email already exist" });

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    await sendWelcomeEmail(email, username);

    res.status(201).send({ message: "User created successful" });
  } catch (error) {
    console.log("[Error while creating user]", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const SignIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });
    if (!existingUser)
      return res.status(404).send({ message: "Cannot find user" });

    const validPassword = bcrypt.compareSync(password, existingUser.password);
    if (!validPassword)
      return res.status(401).send({ message: "Wrong credentials" });

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...others } = existingUser._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(others);
  } catch (error) {
    console.log("[Error while logging in]", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { SignUp, SignIn };
