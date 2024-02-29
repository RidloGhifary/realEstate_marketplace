const router = require("express").Router();
const listControllers = require("../controllers/listEstateController");
const { verifyToken } = require("../middleware/auth");

router.post("/create", verifyToken, listControllers.CreateList);

module.exports = router;
