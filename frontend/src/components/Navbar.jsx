import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Navbar() {
  
  const user = JSON.parse(
  localStorage.getItem("user")
);

  const [cartCount, setCartCount] = useState(0);
  const fetchCartCount = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) return;

    const { data } = await axios.get(
      "http://localhost:5000/api/cart",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const totalItems = data.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    setCartCount(totalItems);
  } catch (error) {
    console.log(error);
  }
};

 const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  window.location.href = "/";
};

useEffect(() => {
  fetchCartCount();
}, []);

  return (
    <nav className="bg-gray-900 text-white px-8 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-yellow-400">
        Pizza Delhivery
      </h1>

      <div className="flex gap-6">
        <Link to="/">Home</Link>
        <Link to="/cart">
        Cart ({cartCount})
        </Link>
        {user?.role === "admin" ? (
          <Link to="/admin/orders">Orders</Link>
        ) : (
          <Link to="/orders">Orders</Link>
        )}
        {user?.role === "admin" && (
        <Link to="/admin">Admin</Link>
        )}
        {user ? (
        <button onClick={handleLogout}>
        Logout
        </button>
        ) : (
        <Link to="/login">Login</Link>
        )}
        <Link to="/profile">
          Profile
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;