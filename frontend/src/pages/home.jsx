import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import HeroSection from "../components/HeroSection";
import DealsSection from "../components/DealsSection";

function Home() {
  const [pizzas, setPizzas] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [quantities, setQuantities] = useState({});
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedPizza, setSelectedPizza] = useState(null);
  const [addons, setAddons] = useState([]);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [selectedCrust, setSelectedCrust] =
  useState(null);
 
  const fetchPizzas = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/pizzas"
      );
console.log(data);
      setPizzas(data);
    } catch (error) {
      console.log(error);
    }
  };
const fetchAddons = async () => {
  try {
    const { data } = await axios.get(
      "http://localhost:5000/api/addons"
    );

    setAddons(data);
  } catch (error) {
    console.log(error);
  }
};
 useEffect(() => {
    fetchPizzas();
    fetchAddons();
  }, []);


const getPrice = (pizza) => {
  const selectedSize = selectedSizes[pizza._id] || "Medium";

  return pizza.sizes.find(
    (size) => size.size === selectedSize
  )?.price;
};

  const openCustomization = (pizza) => {
    setSelectedPizza(pizza);
    setSelectedAddons([]);
    setSelectedCrust(null);
    setShowModal(true);
  };

  const toggleAddon = (addon) => {
  console.log("Clicked:", addon);

  const exists = selectedAddons.find(
    (a) => a._id === addon._id
  );

  if (exists) {
    setSelectedAddons(
      selectedAddons.filter(
        (a) => a._id !== addon._id
      )
    );
  } else {
    setSelectedAddons([
      ...selectedAddons,
      addon,
    ]);
  }
};

    const addonTotal =
      selectedAddons.reduce(
        (sum, addon) => sum + addon.price,
        0
      ) +
      (selectedCrust?.price || 0);

    const basePrice = selectedPizza
      ? getPrice(selectedPizza)
      : 0;

    const finalPrice =
      basePrice + addonTotal;

const addCustomizedPizzaToCart = async () => {
  try {
    const token =
      localStorage.getItem("token");

    await axios.post(
      "http://localhost:5000/api/cart",
      {
        pizzaId: selectedPizza._id,

        size:
          selectedSizes[
            selectedPizza._id
          ] || "Medium",

        quantity:
          quantities[
            selectedPizza._id
          ] || 1,

        selectedCrust:
          selectedCrust?.name || "",

        selectedAddons:
          selectedAddons.map(
            (addon) => ({
              name: addon.name,
              price: addon.price,
            })
          ),

        customPrice:
          finalPrice,
      },
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    toast.success(
      "Pizza Added To Cart"
    );

    setShowModal(false);
  } catch (error) {
    console.log(error);

    toast.error(
      "Failed To Add Pizza"
    );
  }
};

  return (
  <div className="bg-[#111111] min-h-screen overflow-x-hidden">
    <HeroSection />
    <DealsSection />
    <div className="bg-linear-to-r from-yellow-400 to-orange-500 p-12 text-center mb-12 shadow-lg">
  <h1 className="text-5xl font-bold text-white mb-4">
    Fresh Pizza Delivered Fast
  </h1>

  <p className="text-white text-lg">
    Hot, delicious pizzas delivered to your doorstep.
  </p>
</div>
    <div className="max-w-md mx-auto mb-8">
      <input
        type="text"
        placeholder="🔍 Search Pizza..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 rounded-xl border shadow"
      />
    </div>
    <h2 className="text-center text-xl font-bold mb-4 text-gray-700">
      Browse By Category
    </h2>

    <div className="flex justify-center gap-3 mb-8 flex-wrap">

      <button
        onClick={() => setCategory("All")}
        className={`px-5 py-2 rounded-full font-medium transition ${
          category === "All"
            ? "bg-yellow-500 text-white shadow-lg"
            : "bg-white border"
        }`}
      >
        🍕 All Pizzas
      </button>

      <button
        onClick={() => setCategory("Veg")}
        className={`px-5 py-2 rounded-full font-medium transition ${
          category === "Veg"
            ? "bg-green-500 text-white shadow-lg"
            : "bg-white border"
        }`}
      >
        🟢 Vegetarian
      </button>

      <button
        onClick={() => setCategory("Non-Veg")}
        className={`px-5 py-2 rounded-full font-medium transition ${
          category === "Non-Veg"
            ? "bg-red-500 text-white shadow-lg"
            : "bg-white border"
        }`}
      >
        🔴 Non-Vegetarian
      </button>

    </div>
    <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
      Pizza Menu
    </h1>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {pizzas
        .filter((pizza) =>
          pizza.name
            .toLowerCase()
            .includes(search.toLowerCase())
        )
        .filter((pizza) =>
          category === "All"
            ? true
            : pizza.category === category
        )
        .map((pizza) => (
        <div
          key={pizza._id}
          className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
        >
          <img
            src={pizza.image}
            alt={pizza.name}
            className="w-full h-56 object-cover"
          />

          <div className="p-5">
            <h2 className="text-2xl font-bold mb-2">
              {pizza.name}
            </h2>

            <span
              className={`px-2 py-1 rounded text-white text-sm ${
                pizza.category === "Veg"
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            >
              {pizza.category}
            </span>

            <p className="text-gray-600 mb-4">
              {pizza.description}
            </p>

            <div className="mb-4">
          <select
            className="border p-2 rounded w-full"
            value={selectedSizes[pizza._id] || "Medium"}
            onChange={(e) =>
              setSelectedSizes({
                ...selectedSizes,
                [pizza._id]: e.target.value,
              })
            }
          >
            {pizza.sizes.map((size) => (
              <option key={size._id} value={size.size}>
                {size.size}
              </option>
            ))}
          </select>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <button
                className="bg-gray-300 px-3 py-1 rounded"
                onClick={() =>
                  setQuantities({
                    ...quantities,
                    [pizza._id]: Math.max(
                      1,
                      (quantities[pizza._id] || 1) - 1
                    ),
                  })
                }
              >
                -
              </button>

              <span className="font-bold">
                {quantities[pizza._id] || 1}
              </span>

              <button
                className="bg-gray-300 px-3 py-1 rounded"
                onClick={() =>
                  setQuantities({
                    ...quantities,
                    [pizza._id]: (quantities[pizza._id] || 1) + 1,
                  })
                }
              >
                +
              </button>
            </div>

            <p className="text-xl font-bold text-green-600 mb-4">
              ₹{getPrice(pizza) * (quantities[pizza._id] || 1)}
            </p>

            <button
              onClick={() => openCustomization(pizza)}
              className="bg-yellow-500 text-black font-bold px-4 py-2 rounded"
            >
              Customize
            </button>
          </div>
        </div>
      ))}
    </div>

    {showModal && selectedPizza && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

        <div className="bg-white p-8 rounded-xl w-[600px] max-h-[85vh] overflow-y-auto">

          <h2 className="text-3xl font-bold mb-4">
            {selectedPizza.name}
          </h2>

          <p className="mb-4">
            Customize Your Pizza
          </p>

          <div className="space-y-4">

            <div>

              <h3 className="font-bold text-lg mb-2">
                Crusts
              </h3>

              {addons
                .filter(
                  (addon) =>
                    addon.category === "Crust"
                )
                .map((addon) => (
                  <div
                    key={addon._id}
                    onClick={() =>
                      setSelectedCrust(addon)
                    }
                    className={`border p-2 rounded mb-2 cursor-pointer ${
                      selectedCrust?._id === addon._id
                        ? "bg-yellow-200 border-yellow-500"
                        : ""
                    }`}
                  >
                    {addon.name} (+₹{addon.price})
                  </div>
                ))}

            </div>

          <div>

            <h3 className="font-bold text-lg mb-2 mt-4">
              Dips
            </h3>

            {addons
              .filter(
                (addon) =>
                  addon.category === "Dip"
              )
              .map((addon) => (
                <div
                  key={addon._id}
                  onClick={() => toggleAddon(addon)}
                  className={`border p-2 rounded mb-2 cursor-pointer ${
                    selectedAddons.some(
                      (a) => a._id === addon._id
                    )
                      ? "bg-yellow-200 border-yellow-500"
                      : ""
                  }`}
                >
                  {addon.name} (+₹{addon.price})
                </div>
              ))}

          </div>

  <div>

  <h3 className="font-bold text-lg mb-2 mt-4">
    Toppings
  </h3>

  {addons
    .filter(
      (addon) =>
        addon.category === "Topping"
    )
    .map((addon) => (
      <div
       key={addon._id}
       onClick={() => toggleAddon(addon)}
       className={`border p-2 rounded mb-2 cursor-pointer ${
       selectedAddons.some(
          (a) => a._id === addon._id
        )
        ? "bg-yellow-200 border-yellow-500"
        : ""
       }`}
      >
                       
        {addon.name} (+₹{addon.price})
      </div>
    ))}

</div>

<div>

  <h3 className="font-bold text-lg mb-2 mt-4">
    Seasonings
  </h3>

  {addons
    .filter(
      (addon) =>
        addon.category ===
        "Seasoning"
    )
    .map((addon) => (
      <div
       key={addon._id}
       onClick={() => toggleAddon(addon)}
       className={`border p-2 rounded mb-2 cursor-pointer ${
       selectedAddons.some(
          (a) => a._id === addon._id
        )
        ? "bg-yellow-200 border-yellow-500"
        : ""
       }`}
      >
        {addon.name} (+₹{addon.price})
      </div>
    ))}

</div>

          </div>

          <div className="flex gap-4 mt-6">

            <div className="mt-6 p-4 bg-green-100 rounded">

              <p className="font-bold">
                Pizza Price: ₹{basePrice}
              </p>

              <p className="font-bold">
                Addons: ₹{addonTotal}
              </p>

              <p className="text-xl font-bold text-green-700">
                Total: ₹{finalPrice}
              </p>

            </div>
            
            <button
              onClick={addCustomizedPizzaToCart}
              className="bg-yellow-500 text-black font-bold px-4 py-2 rounded"
            >
              Add To Cart
            </button>

            <button
              onClick={() => setShowModal(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>

          </div>

        </div>

      </div>
    )}

  </div>
);
}

export default Home;