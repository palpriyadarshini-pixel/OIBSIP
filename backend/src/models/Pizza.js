import mongoose from "mongoose";

const pizzaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },


    category: {
      type: String,
      enum: ["Veg", "Non-Veg"],
      default: "Veg",
    },

    sizes: [
      {
        size: String,
        price: Number,
      },
    ],

    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Pizza = mongoose.model("Pizza", pizzaSchema);

export default Pizza;