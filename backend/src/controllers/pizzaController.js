import Pizza from "../models/Pizza.js";

export const createPizza = async (req, res) => {
  try {
    const { name, description, image, price } = req.body;

const pizza = await Pizza.create({
  name,
  description,
  image,
  sizes: [
    {
      size: "Medium",
      price,
    },
  ],
});

    res.status(201).json({
      message: "Pizza created successfully",
      pizza,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllPizzas = async (req, res) => {
  try {
    const pizzas = await Pizza.find();

    res.status(200).json(pizzas);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updatePizza = async (req, res) => {
  try {
    const pizza = await Pizza.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(pizza);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deletePizza = async (req, res) => {
  try {
    await Pizza.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Pizza deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};