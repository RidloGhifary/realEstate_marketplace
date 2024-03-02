const { check, validationResult } = require("express-validator");

const validateListing = [
  check("name", "Name is required").isString().isLength({ min: 2 }),
  check("description", "Description is required")
    .isString()
    .isLength({ min: 2 }),
  check("address", "Address is required").isString().isLength({ min: 2 }),
  check("regularPrice", "Regular price is required")
    .isNumeric()
    .isFloat({ min: 1 }),
  check("discountPrice", "Discount price is required")
    .isNumeric()
    .default(0)
    .toFloat(),
  check("bathrooms", "Bathrooms price is required").isNumeric(),
  check("bedrooms", "Bedrooms price is required").isNumeric(),
  check("furnished", "Furnished must be true or false").optional().isBoolean(),
  check("parking", "Parking must be true or false").optional().isBoolean(),
  check("type", "Type must be a string").isString(),
  check("offer", "Offer must be true or false").optional().isBoolean(),
  check("imageUrls", "Image with minimum value 1 is required")
    .notEmpty()
    .isLength({ min: 1 })
    .isArray({ min: 1 }),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ errors: errors.array() });
};

module.exports = { validateListing, validate };
