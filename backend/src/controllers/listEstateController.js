const EstateList = require("../models/listing.model");

const CreateList = async (req, res) => {
  try {
    const estate = await EstateList.create(req.body);
    return res.status(201).json(estate);
  } catch (error) {
    console.log("[Error while creating listEstate]", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const GetListingByUserId = async (req, res) => {
  if (req.id !== req.params.id) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  try {
    const listings = await EstateList.find({ userRef: req.params.id });

    if (listings.length < 1)
      res.status(204).send({ message: "Resources is empty" });

    res.status(200).json(listings);
  } catch (error) {
    console.log("[Error while fetching listEstate]", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { CreateList, GetListingByUserId };
