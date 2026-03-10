import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const Hotel = mongoose.model("Hotel", hotelSchema);
export default Hotel;
