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

const GetAll = async (req, res) => {
  try {
    let offer = req.query.offer;
    if (offer === undefined || offer === false) {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === false) {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;
    if (parking === undefined || parking === false) {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;
    if (type === undefined || type === "all") {
      type = { $in: ["rent", "sale"] };
    }

    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    const searchEstate = await EstateList.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(searchEstate);
  } catch (error) {
    console.log("[Error while fetching all listEstate]", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  CreateList,
  GetListingByUserId,
  DeleteList,
  UpdateList,
  GetEstateById,
  GetAll,
};
