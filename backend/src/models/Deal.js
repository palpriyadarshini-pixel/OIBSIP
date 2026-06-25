import mongoose from "mongoose";

const dealSchema = new mongoose.Schema(
{
  title: String,

  description: String,

  image: String,

  originalPrice: Number,

  offerPrice: Number,

  couponCode: String,
  
  expiryDate: Date,

  dealType: {
    type: String,
    enum: [
      "BOGO",
      "BUY2GET1",
      "PERCENTAGE",
      "FLAT",
      "FREE_DIP",
      "FREE_CRUST",
      "COMBO",
      "FREE_DELIVERY"
    ],
  },

  promotionConfig: {
    type: Object,
    default: {},
  },

  discountValue: {
    type: Number,
    default: 0,
  },

  isActive: {
    type: Boolean,
    default: true,
  },

  applicableCategory: {
    type: String,
    enum: [
      "Pizza",
      "Drinks",
      "Desserts",
      "Sides",
      "Combo",
      "All",
    ],
    default: "Pizza",
  },

  applicableItems: [
    {
      type: String,
    },
  ],

  termsAndConditions: {
    type: String,
    default: "",
  },
},
{
  timestamps: true,
}
);

export default mongoose.model(
  "Deal",
  dealSchema
);