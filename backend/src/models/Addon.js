import mongoose from "mongoose";

const addonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      enum: [
        "Crust",
        "Dip",
        "Seasoning",
        "Topping"
      ],
      required: true,
    },

    tier: {
      type: String,
      enum: [
        "Normal",
        "Premium",
        "Gourmet"
      ],
      default: "Normal",
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Addon = mongoose.model(
  "Addon",
  addonSchema
);

export default Addon;