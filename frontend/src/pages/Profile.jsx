import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const [orderCount, setOrderCount] = useState(0);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  const fetchOrderCount = async () => {
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

      setOrderCount(data.length);
    } catch (error) {
      console.log(error);
    }
  };

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
    const storedUser = JSON.parse(
      localStorage.getItem("user")
    );

    setUser(storedUser);
    fetchOrderCount();
    fetchOrders();
  }, []);

  

  return (
  <div className="min-h-screen bg-gray-100 p-8">

    <div className="max-w-3xl mx-auto">

      <div className="bg-linear-to-r from-yellow-400 to-orange-500 rounded-2xl p-8 mb-8 text-center text-white shadow-lg">
        <h1 className="text-4xl font-bold">
          Welcome Back, {user?.name}
        </h1>

        <p className="mt-2 text-lg">
          Manage your account and orders
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8">

        <h2 className="text-3xl font-bold mb-6">
          👤 My Profile
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-gray-500">
              Name
            </p>

            <p className="font-semibold text-lg">
              {user?.name}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-gray-500">
              Email
            </p>

            <p className="font-semibold text-lg">
              {user?.email}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-gray-500">
              Role
            </p>

            <p className="font-semibold text-lg">
              {user?.role}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-gray-500">
              Orders Placed
            </p>

            <p className="font-semibold text-lg">
              {orderCount}
            </p>
          </div>

        </div>

        <div className="mt-8 flex flex-col md:flex-row gap-4">

          <button
            onClick={() => navigate("/orders")}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-3 rounded-lg"
          >
            View My Orders
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.href = "/login";
            }}
            className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-3 rounded-lg"
          >
            Logout
          </button>

        </div>

      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">

        <h2 className="text-2xl font-bold mb-4">
          Recent Orders
        </h2>

        {orders.length === 0 ? (
          <p>No orders yet</p>
        ) : (
          orders.slice(0, 5).map((order) => (
            <div
              key={order._id}
              className="border-b py-3"
            >
              <p>
                Order #
                {order._id.slice(-6)}
              </p>

              <p>
                ₹{order.totalAmount}
              </p>

              <p>
                {order.status}
              </p>
            </div>
          ))
        )}

      </div>

    </div>

  </div>
);
}

export default Profile;