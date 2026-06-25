import Addon from "../models/Addon.js";

export const getAddons = async (req, res) => {
  try {
    const addons = await Addon.find();

    res.status(200).json(addons);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createAddon = async (req, res) => {
  try {
    const addon = await Addon.create(req.body);

    res.status(201).json(addon);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteAddon = async (req, res) => {
  try {
    await Addon.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: "Addon deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateAddon = async (req, res) => {
  try {
    const addon =
      await Addon.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.status(200).json(addon);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};