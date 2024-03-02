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

    res.status(200).json(listings);
  } catch (error) {
    console.log("[Error while fetching listEstate]", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const DeleteList = async (req, res) => {
  try {
    const estate = await EstateList.findByIdAndDelete(req.params.id);
    if (!estate)
      return res
        .status(404)
        .send({ message: `Cannot find listEstate with id : ${req.params.id}` });

    if (req.id !== estate.userRef)
      return res
        .status(401)
        .send({ message: "You can only delete your own post" });

    res.status(200).json({ message: "Deleted Successful" });
  } catch (error) {
    console.log("[Error while deleting listEstate]", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const UpdateList = async (req, res) => {
  try {
    const updateEstate = await EstateList.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!updateEstate)
      return res.status(404).send({
        message: `Cannot find listEstate with id : ${req.params.id}`,
      });

    if (req.id !== updateEstate.userRef)
      return res
        .status(401)
        .send({ message: "You can only delete your own post" });

    res.status(200).json(updateEstate);
  } catch (error) {
    console.log("[Error while deleting listEstate]", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const GetEstateById = async (req, res) => {
  try {
    const estate = await EstateList.findById(req.params.id);

    if (!estate)
      return res.status(404).send({
        message: `Cannot find listEstate with id : ${req.params.id}`,
      });

    res.status(200).json(estate);
  } catch (error) {
    console.log("[Error while fetching listEstate]", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  CreateList,
  GetListingByUserId,
  DeleteList,
  UpdateList,
  GetEstateById,
};
