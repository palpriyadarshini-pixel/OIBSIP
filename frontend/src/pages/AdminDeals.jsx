import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AdminDeals() {
  
  const [deal, setDeal] = useState({
    title: "",
    description: "",
    image: "",
    originalPrice: "",
    offerPrice: "",
    couponCode: "",

    applicableCategory: "Pizza",

    applicableItems: "",

    termsAndConditions: "",
  });

  const [editingId, setEditingId] =
    useState(null);

  const fetchDeals = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/deals"
      );

      setDeals(data);
    } catch (error) {
      console.log(error);
    }
  };
  const [deals, setDeals] = useState([]);


  useEffect(() => {
    fetchDeals();
  }, []);

  const handleChange = (e) => {
    setDeal({
      ...deal,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token =
        localStorage.getItem("token");

      const payload = {
        ...deal,

        applicableItems:
          deal.applicableItems
            .split(",")
            .map((item) => item.trim()),
      };

      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/deals/${editingId}`,
          payload,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        toast.success(
          "Deal Updated"
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/deals",
          payload,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        toast.success(
          "Deal Added"
        );
      }

      setDeal({
        title: "",
        description: "",
        image: "",
        originalPrice: "",
        offerPrice: "",
        couponCode: "",
      });

      setEditingId(null);

      fetchDeals();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (deal) => {
    setDeal(deal);

    setEditingId(deal._id);
  };

  const handleDelete = async (id) => {
    try {
      const token =
        localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/deals/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      toast.success(
        "Deal Deleted"
      );

      fetchDeals();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold mb-8">
        Manage Deals
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded shadow"
      >

        <input
          type="text"
          name="title"
          placeholder="Deal Title"
          value={deal.title}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={deal.description}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={deal.image}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />

        <input
          type="number"
          name="originalPrice"
          placeholder="Original Price"
          value={deal.originalPrice}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />

        <input
          type="number"
          name="offerPrice"
          placeholder="Offer Price"
          value={deal.offerPrice}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />

        <input
          type="text"
          name="couponCode"
          placeholder="Coupon Code"
          value={deal.couponCode}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />

        <select
          name="applicableCategory"
          value={deal.applicableCategory}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        >
          <option value="Pizza">
            Pizza
          </option>

          <option value="Drinks">
            Drinks
          </option>

          <option value="Desserts">
            Desserts
          </option>

          <option value="Sides">
            Sides
          </option>

          <option value="Combo">
            Combo
          </option>

          <option value="All">
            All
          </option>
        </select>

        <input
          type="text"
          name="applicableItems"
          placeholder="Margherita, Farmhouse, Paneer Tikka"
          value={deal.applicableItems}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />

        <textarea
          name="termsAndConditions"
          placeholder="Terms & Conditions"
          value={deal.termsAndConditions}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />

        <button
          type="submit"
          className="bg-orange-500 text-white px-6 py-3 rounded"
        >
          {editingId
            ? "Update Deal"
            : "Add Deal"}
        </button>

      </form>

      <div className="mt-10">

        {deals.map((deal) => (
          <div
            key={deal._id}
            className="bg-white p-4 rounded shadow mb-4"
          >
            <h3 className="text-xl font-bold">
              {deal.title}
            </h3>

            <p>
              {deal.description}
            </p>

            <p>
              ₹{deal.offerPrice}
            </p>

            <button
              onClick={() =>
                handleEdit(deal)
              }
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              Edit
            </button>

            <button
              onClick={() =>
                handleDelete(
                  deal._id
                )
              }
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}

      </div>

    </div>
  );
}

export default AdminDeals;