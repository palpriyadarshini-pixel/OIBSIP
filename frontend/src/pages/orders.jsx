import { useEffect, useState } from "react";
import axios from "axios";


function Orders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        "http://localhost:5000/api/orders/my-orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        My Orders
      </h1>

      {orders.map((order) => (
    <div
      key={order._id}
      className="bg-white shadow-lg rounded-xl p-6 mb-6"
    >
      <h2 className="text-xl font-bold mb-2">
        Order #{order._id.slice(-6)}
      </h2>

      <div className="mb-4">
        <span
          className={`px-3 py-1 rounded-full text-white text-sm ${
            order.status === "Delivered"
              ? "bg-green-500"
              : order.status === "Out For Delivery"
              ? "bg-blue-500"
              : order.status === "Preparing"
              ? "bg-yellow-500"
              : "bg-gray-500"
          }`}
        >
          {order.status}
        </span>
      </div>

      <div className="mt-4">

        <div className="flex items-center gap-3">

          <div
            className={`w-4 h-4 rounded-full ${
              ["Pending", "Preparing", "Out For Delivery", "Delivered"]
                .includes(order.status)
                ? "bg-green-500"
                : "bg-gray-300"
            }`}
          />

          <span>Order Placed</span>

        </div>

        <div className="flex items-center gap-3 mt-2">

          <div
            className={`w-4 h-4 rounded-full ${
              ["Preparing", "Out For Delivery", "Delivered"]
                .includes(order.status)
                ? "bg-green-500"
                : "bg-gray-300"
            }`}
          />

          <span>Preparing</span>

        </div>

        <div className="flex items-center gap-3 mt-2">

          <div
            className={`w-4 h-4 rounded-full ${
              ["Out For Delivery", "Delivered"]
                .includes(order.status)
                ? "bg-green-500"
                : "bg-gray-300"
            }`}
          />

          <span>Out For Delivery</span>

        </div>

        <div className="flex items-center gap-3 mt-2">

          <div
            className={`w-4 h-4 rounded-full ${
              order.status === "Delivered"
                ? "bg-green-500"
                : "bg-gray-300"
            }`}
          />

          <span>Delivered</span>

        </div>

      </div>

      <p className="mb-4 text-gray-500">
        {new Date(order.createdAt).toLocaleString()}
      </p>

      {order.items.map((item) => (
        <div
          key={item._id}
          className="border-b py-2"
        >
          <p className="font-medium">
            {item.pizza?.name}
          </p>

          <p>
            Size: {item.size}
          </p>

          <p>
            Quantity: {item.quantity}
          </p>
        </div>
      ))}

      <h3 className="text-lg font-bold mt-4">
        Total: ₹{order.totalAmount}
      </h3>
    </div>
))}
    </div>
  );
}

export default Orders;