import Cart from "../models/Cart.js";

export const addToCart = async (req, res) => {
  try {
    const { pizzaId, size, quantity } = req.body;
    console.log(req.body);

    const cartItem = await Cart.create({
      user: req.user._id,
      pizza: pizzaId,
      size,
      quantity,
    });

    res.status(201).json({
      message: "Added to cart",
      cartItem,
    });
  } catch (error) {
    console.log(error),
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getCart = async (req, res) => {
  try {
    const cartItems = await Cart.find({
      user: req.user._id,
    }).populate("pizza");

    res.status(200).json(cartItems);
  } catch (error) {
    console.log(error),
    res.status(500).json({
      message: error.message,
    });
  }
};
export const removeFromCart = async (req, res) => {
  try {
    const cartItem = await Cart.findById(req.params.id);

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    await Cart.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Item removed from cart",
    });
  } catch (error) {
    console.log(error),
    res.status(500).json({
      message: error.message,
    });
  }
};
export const updateCartQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;

    const cartItem = await Cart.findByIdAndUpdate(
      req.params.id,
      { quantity },
      { new: true }
    );

    res.status(200).json(cartItem);
  } catch (error) {
    console.log(error),
    res.status(500).json({
      message: error.message,
    });
  }
};