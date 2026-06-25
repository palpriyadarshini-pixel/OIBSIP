import { useEffect, useState } from "react";
import axios from "axios";


function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
        
      const { data } = await axios.get(
        "http://localhost:5000/api/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, status) => {
  try {
    const token = localStorage.getItem("token");
    
    await axios.put(
      `http://localhost:5000/api/orders/${orderId}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchOrders();
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Admin Orders
      </h1>

      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white p-6 rounded-xl shadow mb-6"
        >
          <h2 className="font-bold text-xl">
            Order #{order._id.slice(-6)}
          </h2>

          <p>
            Customer: {order.user?.name}
          </p>

          <p>
            Email: {order.user?.email}
          </p>

          <p>
            Total: ₹{order.totalAmount}
          </p>

          <select
            value={order.status}
            className="border p-2 mt-2"
            onChange={(e) =>
                updateStatus(order._id, e.target.value)
            }
            >
            <option>Pending</option>
            <option>Preparing</option>
            <option>Out For Delivery</option>
            <option>Delivered</option>
            </select>
        </div>
      ))}
    </div>
  );
}

export default AdminOrders;