const router = require("express").Router();
const userController = require("../controllers/userController");
const { verifyToken } = require("../middleware/auth");

router.get("/me", verifyToken, userController.GetCurrentUser);
router.post("/update/:id", verifyToken, userController.UpdateUser);

module.exports = router;
