const router = require("express").Router();
const userController = require("../controllers/userController");
const { verifyToken } = require("../middleware/auth");
const { check } = require("express-validator");

router.get("/me", verifyToken, userController.GetCurrentUser);
router.post(
  "/update/:id",
  verifyToken,
  [
    check("username", "username is required").isString(),
    check("avatar", "avatar is required").isString(),
  ],
  userController.UpdateUser
);

module.exports = router;
