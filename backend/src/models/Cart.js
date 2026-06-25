import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    pizza: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pizza",
      required: true,
    },

    size: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      default: 1,
    },

    selectedCrust: {
      type: String,
      default: "",
    },

    selectedAddons: [
      {
        name: String,
        price: Number,
      },
    ],

    customPrice: {
      type: Number,
      default: 0,
    },

    dealId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Deal",
    },

    dealType: {
      type: String,
      default: "",
    },

    isFreeItem: {
      type: Boolean,
      default: false,
    },

    discountApplied: {
      type: Number,
      default: 0,
    },
      },
      {
        timestamps: true,
      }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;