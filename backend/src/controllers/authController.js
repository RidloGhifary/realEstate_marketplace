const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
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

module.exports = { SignUp };
