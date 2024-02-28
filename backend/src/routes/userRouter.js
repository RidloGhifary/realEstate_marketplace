const router = require("express").Router();
const userController = require("../controllers/userController");
const { verifyToken } = require("../middleware/auth");

router.get("/me", verifyToken, userController.GetCurrentUser);

module.exports = router;
