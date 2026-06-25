import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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

const updateQuantity = async (cartId, quantity) => {
  try {
    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/api/cart/${cartId}`,
      { quantity },
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

    toast.success(data.message);

    setCart([]);
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    fetchCart();
  }, []);

  console.log(cart[0]);
  console.log(cart[0]?.pizza);

  const totalPrice = cart.reduce((total, item) => {
   return total + (item.customPrice || 0) * item.quantity;
  }, 0);

  return (
    <div>
      <div className="bg-linear-to-r from-red-500 via-orange-500 to-yellow-400 rounded-2xl p-10 mb-8 shadow-xl text-center">
        <h1 className="text-6xl font-black text-white tracking-wide">
          🍕 Your Pizza Cart
        </h1>

        <p className="text-white text-xl mt-3">
          Fresh • Hot • Ready for Delivery
        </p>
      </div>
      <div className="bg-gray-100 p-6 rounded-xl shadow-lg mb-6">
        <h2 className="text-4xl font-extrabold text-green-600">
          Total: ₹{totalPrice}
        </h2>
      </div>
      <button
        onClick={placeOrder}
        className="bg-green-500 text-white px-6 py-3 rounded-lg font-bold mb-6"
      >
        Place Order
      </button>
      {cart.map((item) => (
          <div
            key={item._id}
            className="bg-gray-100 rounded-xl shadow-md p-4 mb-4 flex gap-4 items-center"
          >
          <img
            src={item.pizza?.image}
            alt={item.pizza?.name}
            className="w-24 h-24 object-cover rounded-lg"
          />
          <div className="flex-1">
          <h3>{item.pizza?.name}</h3>
          <p>Size: {item.size}</p>
          {item.selectedCrust && (
            <p>
              <span className="font-semibold">
                Crust:
              </span>{" "}
              {item.selectedCrust}
            </p>
          )}
          {item.selectedAddons?.length > 0 && (
            <div className="mt-2">
              <p className="font-semibold">
                Addons:
              </p>

              <ul className="list-disc ml-5">
                {item.selectedAddons.map(
                  (addon, index) => (
                    <li key={index}>
                      {addon.name} (+₹{addon.price})
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
          <p>
            Price: ₹{item.customPrice}
          </p>
          <div className="flex items-center gap-3 my-2">
            <button
              className="bg-gray-300 px-3 py-1 rounded"
              onClick={() =>
                updateQuantity(
                  item._id,
                  Math.max(1, item.quantity - 1)
                )
              }
            >
              -
            </button>

            <span className="font-bold">
              {item.quantity}
            </span>

            <button
              className="bg-gray-300 px-3 py-1 rounded"
              onClick={() =>
                updateQuantity(
                  item._id,
                  item.quantity + 1
                )
              }
            >
              +
            </button>
          </div>
          <button onClick={() => removeFromCart(item._id)}>
            Remove
          </button>
          <p className="font-bold text-green-600">
            Subtotal: ₹
            {(item.customPrice || 0) *
              item.quantity}
          </p>
          <button
            onClick={() => removeFromCart(item._id)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Remove
          </button>
        </div>
        </div>
      ))}
       
    </div>
  );
}

export default Cart;