const router = require("express").Router();
const listControllers = require("../controllers/listEstateController");
const { verifyToken } = require("../middleware/auth");
const { check } = require("express-validator");

router.post(
  "/create",
  verifyToken,
  [
    check("name", "Name is required").isString().isLength({ min: 2 }),
    check("description", "Description is required")
      .isString()
      .isLength({ min: 2 }),
    check("address", "Address is required").isString().isLength({ min: 2 }),
    check("regularPrice", "Regular price is required")
      .isNumeric()
      .isFloat({ min: 1 }),
    check("discountPrice", "Discount price is required")
      .optional()
      .isNumeric()
      .isFloat({ min: 0 }),
    check("bathrooms", "Bathrooms price is required").isNumeric(),
    check("bedrooms", "Bedrooms price is required").isNumeric(),
    check("furnished", "Furnished must be true or false")
      .optional()
      .isBoolean(),
    check("parking", "Parking must be true or false").optional().isBoolean(),
    check("type", "Type must be a string").isString(),
    check("offer", "Offer must be true or false").optional().isBoolean(),
    check("imageUrls", "Image with minimus value 1 is required")
      .isArray()
      .custom((value) => {
        if (!Array.isArray(value)) {
          throw new Error("Image URLs must be an array");
        }
        if (value.some((url) => typeof url !== "string")) {
          throw new Error("Image URLs must be an array of strings");
        }
        return true;
      }),
  ],
  listControllers.CreateList
);

router.get("/listing/:id", verifyToken, listControllers.GetListingByUserId);

module.exports = router;
