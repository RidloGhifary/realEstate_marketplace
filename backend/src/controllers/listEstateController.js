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

module.exports = { CreateList };
