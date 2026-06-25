import Deal from "../models/Deal.js";

export const createDeal = async (req, res) => {
  try {
    const deal = await Deal.create(req.body);

    res.status(201).json(deal);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getDeals = async (req, res) => {
  try {
    const deals = await Deal.find();

    res.status(200).json(deals);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getDealById = async (req, res) => {
  try {
    const deal = await Deal.findById(req.params.id);

    if (!deal) {
      return res.status(404).json({
        message: "Deal not found",
      });
    }

    res.status(200).json(deal);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateDeal = async (req, res) => {
  try {
    const deal =
      await Deal.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.status(200).json(deal);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteDeal = async (req, res) => {
  try {
    await Deal.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: "Deal deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};