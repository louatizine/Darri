// houseController.js
const House = require("../models/House");
const upload = require("multer")();

// POST request to add a house
const addHouse = async (req, res) => {
  try {
    const { title, description, price, location, owner } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Please upload at least one image" });
    }

    if (!location) {
      return res.status(400).json({ message: "Location is required!" });
    }

    // Extract file paths
    const imagePaths = req.files.map((file) => file.path);

    // Create a new house with uploaded images
    const house = new House({
      title,
      description,
      price,
      location,
      owner,
      images: imagePaths,
    });

    await house.save();
    res.status(201).json({ message: "House added successfully!", house });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// GET all houses
const getAllHouses = async (req, res) => {
  try {
    const houses = await House.find();
    res.status(200).json(houses);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// GET a single house by ID
const getHouseById = async (req, res) => {
  try {
    const house = await House.findById(req.params.id);
    if (!house) {
      return res.status(404).json({ message: "House not found!" });
    }
    res.status(200).json(house);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// PUT request to update a house by ID
const updateHouseById = async (req, res) => {
  try {
    const { title, description, price, location, owner } = req.body;
    const house = await House.findById(req.params.id);
    
    if (!house) {
      return res.status(404).json({ message: "House not found!" });
    }

    if (req.files && req.files.length > 0) {
      // Update images if files are uploaded
      const imagePaths = req.files.map((file) => file.path);
      house.images = imagePaths;
    }

    // Update other house fields
    house.title = title || house.title;
    house.description = description || house.description;
    house.price = price || house.price;
    house.location = location || house.location;
    house.owner = owner || house.owner;

    await house.save();
    res.status(200).json({ message: "House updated successfully!", house });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// DELETE request to delete a house by ID
const deleteHouseById = async (req, res) => {
  try {
    const house = await House.findById(req.params.id);
    
    if (!house) {
      return res.status(404).json({ message: "House not found!" });
    }

    // Use findByIdAndDelete instead of remove()
    await House.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "House deleted successfully!" });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addHouse,
  getAllHouses,
  getHouseById,
  updateHouseById,
  deleteHouseById,
};
