import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


function Admin() {
  const navigate = useNavigate();

  const [pizza, setPizza] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: ""
  });
const [stats, setStats] = useState({
  totalOrders: 0,
  totalUsers: 0,
  totalPizzas: 0,
  totalRevenue: 0,
});
const [pizzas, setPizzas] = useState([]);
const [editingId, setEditingId] = useState(null);


  const handleChange = (e) => {
    setPizza({
      ...pizza,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    let data;

const token = localStorage.getItem("token");

if (editingId) {
  const response = await axios.put(
  `http://localhost:5000/api/pizzas/${editingId}`,
  {
    name: pizza.name,
    description: pizza.description,
    image: pizza.image,
    category: pizza.category,

    sizes: [
      {
        size: "Small",
        price: Number(pizza.price),
      },
      {
        size: "Medium",
        price: Number(pizza.price) + 100,
      },
      {
        size: "Large",
        price: Number(pizza.price) + 200,
      },
    ],
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  );

  data = response.data;

  toast.success("Pizza Updated Successfully!");

  setEditingId(null);
} else {
  const response = await axios.post(
  "http://localhost:5000/api/pizzas",
  {
    name: pizza.name,
    description: pizza.description,
    image: pizza.image,
    category: pizza.category,

    sizes: [
      {
        size: "Small",
        price: Number(pizza.price),
      },
      {
        size: "Medium",
        price: Number(pizza.price) + 100,
      },
      {
        size: "Large",
        price: Number(pizza.price) + 200,
      },
    ],
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  );

  data = response.data;

  toast.success("Pizza Added Successfully!");
}

    console.log(data);

    toast.success("Pizza Added Successfully!");

    setPizza({
      name: "",
      description: "",
      price: "",
      image: "",
      category:"",
    });
    fetchPizzas();
  } catch (error) {
    console.log(error);
    toast.error("Failed to add pizza");
  }
};

const fetchPizzas = async () => {
  try {
    const { data } = await axios.get(
      "http://localhost:5000/api/pizzas"
    );

    setPizzas(data);
  } catch (error) {
    console.log(error);
  }
};

const fetchStats = async () => {
  try {
    const token =
      localStorage.getItem("token");

    const { data } = await axios.get(
      "http://localhost:5000/api/orders/dashboard-stats",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setStats(data);
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  fetchPizzas();
  fetchStats();
}, []);

const handleEdit = (pizza) => {
  setPizza({
    name: pizza.name,
    description: pizza.description,
    price: pizza.sizes[0].price ,
    image: pizza.image,
    category: pizza.category,
  });

  setEditingId(pizza._id);
};

const handleDelete = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await axios.delete(
      `http://localhost:5000/api/pizzas/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

   toast.success("Pizza deleted successfully");

    fetchPizzas();
  } catch (error) {
    console.log(error);
    toast.error("Failed to delete pizza");
  }
};


  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold text-center mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

      <div className="bg-white p-4 rounded-xl shadow text-center">
        <h3 className="text-gray-500">
          Orders
        </h3>
        <p className="text-3xl font-bold">
          {stats.totalOrders}
        </p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow text-center">
        <h3 className="text-gray-500">
          Users
        </h3>
        <p className="text-3xl font-bold">
          {stats.totalUsers}
        </p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow text-center">
        <h3 className="text-gray-500">
          Pizzas
        </h3>
        <p className="text-3xl font-bold">
          {stats.totalPizzas}
        </p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow text-center">
        <h3 className="text-gray-500">
          Revenue
        </h3>
        <p className="text-3xl font-bold">
          ₹{stats.totalRevenue}
        </p>
      </div>

    </div>

    <div className="flex gap-4 justify-center mb-8">
      <button
        onClick={() => navigate("/admin/deals")}
        className="bg-orange-500 text-white px-6 py-3 rounded-lg font-bold"
      >
        Manage Deals
      </button>

      <button
        onClick={() => navigate("/admin/orders")}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold"
      >
        Manage Orders
      </button>

      <button
        onClick={() => navigate("/admin/addons")}
        className="bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold"
      >
        Manage Addons
      </button>

    </div>

      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">
          Add New Pizza
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Pizza Name"
            value={pizza.name}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={pizza.description}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={pizza.price}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={pizza.image}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          <select
            name="category"
            value={pizza.category}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          >
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
          </select>

          <button
            type="submit"
            className="w-full bg-yellow-500 text-black font-bold py-3 rounded hover:bg-yellow-600"
          >
           {editingId ? "Update Pizza" : "Add Pizza"}
          </button>
        </form>
        <div className="mt-10">
  <h2 className="text-2xl font-bold mb-4">
    Existing Pizzas
  </h2>

  {pizzas.map((pizza) => (
    <div
      key={pizza._id}
      className="bg-white p-4 mb-4 rounded shadow"
    >
      <h3 className="font-bold text-xl">
        {pizza.name}
      </h3>

      <p>{pizza.description}</p>

      <p>
        ₹{pizza.sizes[0]?.price}
      </p>

      <p>{pizza.category}</p>

      <button 
        onClick={() => handleEdit(pizza)}
        className="bg-blue-500 text-white px-4 py-2 mr-2 rounded"
        >
        Edit
      </button>

      <button
        onClick={() => handleDelete(pizza._id)}
        className="bg-red-500 text-white px-4 py-2 rounded"
        >
        Delete
      </button>
    </div>
  ))}
</div>
      </div>
    </div>
  );
}

export default Admin;