// houseRoutes.js
const express = require("express");
const router = express.Router();
const upload = require("multer")();
const {
  addHouse,
  getAllHouses,
  getHouseById,
  updateHouseById,
  deleteHouseById,
} = require("../controllers/houseController");

// POST request to add a house
router.post("/add", upload.array("images", 5), addHouse);

// GET all houses
router.get("/", getAllHouses);

// GET a single house by ID
router.get("/:id", getHouseById);

// PUT request to update a house by ID
router.put("/:id", upload.array("images", 5), updateHouseById);

// DELETE request to delete a house by ID
router.delete("/:id", deleteHouseById);

module.exports = router;
