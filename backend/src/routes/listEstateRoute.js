const router = require("express").Router();
const listControllers = require("../controllers/listEstateController");
const { verifyToken } = require("../middleware/auth");
const { validateListing, validate } = require("../middleware/estate");

router.post(
  "/create",
  verifyToken,
  validateListing,
  validate,
  listControllers.CreateList
);
router.get(
  "/user-listing/:id",
  verifyToken,
  listControllers.GetListingByUserId
);
router.delete("/listing/:id", verifyToken, listControllers.DeleteList);
router.post(
  "/listing/:id",
  verifyToken,
  validateListing,
  validate,
  listControllers.UpdateList
);
router.get("/listing/:id", listControllers.GetEstateById);
router.get("/allListings", listControllers.GetAll);

module.exports = router;
