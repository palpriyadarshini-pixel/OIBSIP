import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AdminAddons() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] =
    useState("Topping");

  const [addons, setAddons] = useState([]);
  const [tier, setTier] =
  useState("Normal");
  const [editingId, setEditingId] =
  useState(null);

  const fetchAddons = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/addons"
      );

      setAddons(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load addons");
    }
  };

  useEffect(() => {
    fetchAddons();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token =
        localStorage.getItem("token");

if (editingId) {
  await axios.put(
    `http://localhost:5000/api/addons/${editingId}`,
    {
      name,
      price,
      category,
      tier,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  toast.success(
    "Addon Updated Successfully"
  );

  setEditingId(null);
} else {
  await axios.post(
    "http://localhost:5000/api/addons",
    {
      name,
      price,
      category,
      tier,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  toast.success(
    "Addon Added Successfully"
  );
}

      toast.success("Addon Added");

      setName("");
      setPrice("");
      setCategory("Topping");
      setTier("Normal");

      fetchAddons();
    } catch (error) {
      console.log(error);
      toast.error("Failed to add addon");
    }
  };

  const handleDelete = async (id) => {
    try {
      const token =
        localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/addons/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Addon Deleted");

      fetchAddons();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete addon");
    }
  };

  const renderAddons = (
  category,
  tier
) => {
  return addons
    .filter(
      (addon) =>
        addon.category === category &&
        addon.tier === tier
    )
    .map((addon) => (
      <div
        key={addon._id}
        className="bg-white p-3 rounded-lg shadow mb-2"
      >
        <h3 className="font-bold">
          {addon.name}
        </h3>

        <p>
          ₹{addon.price}
        </p>

        <button
          onClick={() =>
            handleEdit(addon)
          }
          className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
        >
          Edit
        </button>

        <button
          onClick={() =>
            handleDelete(addon._id)
          }
          className="bg-red-500 text-white px-3 py-1 rounded mt-2"
        >
          Delete
        </button>
      </div>
    ));
};

const handleEdit = (addon) => {
  setName(addon.name);
  setPrice(addon.price);
  setCategory(addon.category);
  setTier(addon.tier);

  setEditingId(addon._id);

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold text-center mb-8">
        Manage Addons
      </h1>

      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg">

        <h2 className="text-2xl font-semibold mb-4">
          Add New Addon
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Addon Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full p-3 border rounded"
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
            className="w-full p-3 border rounded"
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="w-full p-3 border rounded"
          >

            <option value="Topping">
              Topping
            </option>

            <option value="Dip">
              Dip
            </option>

            <option value="Crust">
              Crust
            </option>

            <option value="Seasoning">
              Seasoning
            </option>
          </select>

          <select
            value={tier}
            onChange={(e) =>
              setTier(e.target.value)
            }
            className="w-full p-3 border rounded"
          >
            <option value="Normal">
              Normal
            </option>

            <option value="Premium">
              Premium
            </option>

            <option value="Gourmet">
              Gourmet
            </option>
          </select>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded font-bold hover:bg-green-600"
          >
           {editingId
            ? "Update Addon"
            : "Add Addon"}
          </button>
        </form>

        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-4">
            Existing Addons
          </h2>
<div className="space-y-10">

  <div>
    <h2 className="text-3xl font-bold mb-4">
      Crusts
    </h2>

    <div className="grid md:grid-cols-3 gap-6">

      <div>
        <h3 className="text-xl font-bold text-green-600 mb-3">
          Normal
        </h3>

        {renderAddons(
          "Crust",
          "Normal"
        )}
      </div>

      <div>
        <h3 className="text-xl font-bold text-yellow-600 mb-3">
          Premium
        </h3>

        {renderAddons(
          "Crust",
          "Premium"
        )}
      </div>

      <div>
        <h3 className="text-xl font-bold text-purple-600 mb-3">
          Gourmet
        </h3>

        {renderAddons(
          "Crust",
          "Gourmet"
        )}
      </div>

    </div>
  </div>

  <div>
    <h2 className="text-3xl font-bold mb-4">
      Dips
    </h2>

    <div className="grid md:grid-cols-3 gap-6">

      <div>
        <h3 className="text-xl font-bold text-green-600 mb-3">
          Normal
        </h3>

        {renderAddons(
          "Dip",
          "Normal"
        )}
      </div>

      <div>
        <h3 className="text-xl font-bold text-yellow-600 mb-3">
          Premium
        </h3>

        {renderAddons(
          "Dip",
          "Premium"
        )}
      </div>

      <div>
        <h3 className="text-xl font-bold text-purple-600 mb-3">
          Gourmet
        </h3>

        {renderAddons(
          "Dip",
          "Gourmet"
        )}
      </div>

    </div>
  </div>

  <div>
    <h2 className="text-3xl font-bold mb-4">
      Toppings
    </h2>

    <div className="grid md:grid-cols-3 gap-6">

      <div>
        <h3 className="text-xl font-bold text-green-600 mb-3">
          Normal
        </h3>

        {renderAddons(
          "Topping",
          "Normal"
        )}
      </div>

      <div>
        <h3 className="text-xl font-bold text-yellow-600 mb-3">
          Premium
        </h3>

        {renderAddons(
          "Topping",
          "Premium"
        )}
      </div>

      <div>
        <h3 className="text-xl font-bold text-purple-600 mb-3">
          Gourmet
        </h3>

        {renderAddons(
          "Topping",
          "Gourmet"
        )}
      </div>

    </div>
  </div>

  <div>
    <h2 className="text-3xl font-bold mb-4">
      Seasonings
    </h2>

    <div className="grid md:grid-cols-3 gap-6">

      <div>
        <h3 className="text-xl font-bold text-green-600 mb-3">
          Normal
        </h3>

        {renderAddons(
          "Seasoning",
          "Normal"
        )}
      </div>

      <div>
        <h3 className="text-xl font-bold text-yellow-600 mb-3">
          Premium
        </h3>

        {renderAddons(
          "Seasoning",
          "Premium"
        )}
      </div>

      <div>
        <h3 className="text-xl font-bold text-purple-600 mb-3">
          Gourmet
        </h3>

        {renderAddons(
          "Seasoning",
          "Gourmet"
        )}
      </div>

    </div>
  </div>

</div>

        </div>

      </div>

    </div>
  );
}

export default AdminAddons;