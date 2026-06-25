import mongoose from "mongoose";

const promotionSessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    deal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Deal",
      required: true,
    },

    dealType: {
      type: String,
      required: true,
    },

    step: {
      type: Number,
      default: 1,
    },

    paidItems: [
      {
        pizza: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Pizza",
        },

        size: String,

        quantity: Number,

        selectedCrust: String,

        selectedAddons: [
          {
            name: String,
            price: Number,
          },
        ],

        customPrice: Number,
      },
    ],

    freeItems: [
      {
        pizza: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Pizza",
        },

        size: String,

        quantity: Number,

        selectedCrust: String,

        selectedAddons: [
          {
            name: String,
            price: Number,
          },
        ],

        customPrice: Number,
      },
    ],

    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "PromotionSession",
  promotionSessionSchema
);