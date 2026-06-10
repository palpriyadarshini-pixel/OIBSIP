import { useEffect, useState } from "react";
import axios from "axios";

function Cart() {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        "http://localhost:5000/api/cart",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      setCart(data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromCart = async (cartId) => {
  try {
    const token = localStorage.getItem("token");

    await axios.delete(
      `http://localhost:5000/api/cart/${cartId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchCart();
  } catch (error) {
    console.log(error);
  }
};

const placeOrder = async () => {
  try {
    const token = localStorage.getItem("token");

    const { data } = await axios.post(
      "http://localhost:5000/api/orders",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(data.message);

    setCart([]);
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    fetchCart();
  }, []);

  const totalPrice = cart.reduce((total, item) => {
  return total + item.pizza.price * item.quantity;
  }, 0);

  return (
    <div>
      <h1>Cart</h1>
      <h2>Total: ₹{totalPrice}</h2>
      <button onClick={placeOrder}>
      Place Order
      </button>
      {cart.map((item) => (
        <div key={item._id}>
          <h3>{item.pizza?.name}</h3>
          <p>Quantity: {item.quantity}</p>
          <button onClick={() => removeFromCart(item._id)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default Cart;