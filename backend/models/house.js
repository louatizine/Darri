const mongoose = require("mongoose");

const houseSchema = mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    images: [{ type: String }], // Array of image paths
  },
  { timestamps: true }
);

module.exports = mongoose.model("House", houseSchema);
