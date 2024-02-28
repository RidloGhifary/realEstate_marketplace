const router = require("express").Router();
const authController = require("../controllers/authController");
const { check } = require("express-validator");
const { verifyToken } = require("../middleware/auth");

router.post(
  "/signup",
  [
    check("username", "username is required").isString(),
    check("email", "email is required").isEmail(),
    check("password", "password with 8 character or more is required").isLength(
      { min: 8 }
    ),
  ],
  authController.SignUp
);

router.post(
  "/signin",
  [
    check("email", "email is required").isEmail(),
    check("password", "password with 8 character or more is required").isLength(
      { min: 8 }
    ),
  ],
  authController.SignIn
);

router.get("/validate-token", verifyToken, authController.ValidateToken);

module.exports = router;
