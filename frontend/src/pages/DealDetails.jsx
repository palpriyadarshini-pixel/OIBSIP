import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function DealDetails() {
  const { id } = useParams();

  const [deal, setDeal] = useState(null);
  const [pizzas, setPizzas] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState({});

  const [addons, setAddons] = useState([]);
  const [selectedPizza, setSelectedPizza] = useState(null);

  const [showModal, setShowModal] =
    useState(false);

  const [selectedAddons, setSelectedAddons] =
    useState([]);

  const [selectedCrust, setSelectedCrust] =
    useState(null);

  const [promotion, setPromotion] =
    useState({
      step: 1,
      paidPizza: null,
      freePizza: null,
    });

  const addonTotal =
    selectedAddons.reduce(
      (sum, addon) => sum + addon.price,
      0
    ) +
    (selectedCrust?.price || 0);

  const basePrice =
    selectedPizza
      ? selectedPizza.sizes.find(
          (s) =>
            s.size ===
            (selectedSizes[
              selectedPizza._id
            ] || "Medium")
        )?.price || 0
      : 0;

  const finalPrice =
    basePrice + addonTotal;
  

  const fetchDeal = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/deals/${id}`
      );

      setDeal(data);

      const pizzaResponse = await axios.get(
        "http://localhost:5000/api/pizzas"
      );

      const filteredPizzas =
        pizzaResponse.data.filter((pizza) =>
          data.applicableItems.includes(
            pizza.name
          )
        );

      setPizzas(filteredPizzas);
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
    fetchDeal();
    fetchAddons();
  }, []);

  const addCustomizedPizzaToCart = async () => {
    try {
      const token =
        localStorage.getItem("token");

      if (deal.dealType === "BOGO") {

          if (promotion.step === 1) {

              setPromotion({
                  step: 2,

                  paidPizza: {
                      pizza: selectedPizza,

                      size:
                          selectedSizes[selectedPizza._id] ||
                          "Medium",

                      selectedCrust,

                      selectedAddons,

                      customPrice: finalPrice,
                  },

                  freePizza: null,
              });

              setShowModal(false);

              alert("Now choose your FREE Pizza.");

              return;
          }


          if (promotion.step === 2) {

              console.log("Paid Pizza");
              console.log(promotion.paidPizza);

              console.log("Free Pizza");
              console.log(selectedPizza);

              alert("Step 2 reached");

              return;
          }

      }

      await axios.post(
        "http://localhost:5000/api/cart",
        {
          pizzaId: selectedPizza._id,

          size:
            selectedSizes[
              selectedPizza._id
            ] || "Medium",

          quantity: 1,

          selectedCrust:
            selectedCrust?.name || "",

          selectedAddons:
            selectedAddons.map(
              (addon) => ({
                name: addon.name,
                price: addon.price,
              })
            ),

          customPrice: finalPrice,

          dealId: deal._id,
          dealTitle: deal.title,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      alert("Added To Cart");

      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (!deal) return <h1>Loading...</h1>;

  return (
    <div className="min-h-screen bg-black text-white p-10">

        <div className="bg-[#1a1a1a] rounded-3xl overflow-hidden mb-10">

        <img
            src={deal.image}
            alt={deal.title}
            className="w-full h-80 object-cover"
        />

        <div className="p-8">

            <h1 className="text-5xl font-black mb-4">
            {deal.title}
            </h1>

            <div className="flex gap-4 items-center mb-4">

            <span className="text-gray-400 line-through">
                ₹{deal.originalPrice}
            </span>

            <span className="text-orange-500 text-3xl font-bold">
                ₹{deal.offerPrice}
            </span>

            </div>

            <p className="text-green-400 text-xl mb-4">
            Coupon Code: {deal.couponCode}
            </p>

            <p className="text-gray-300">
            {deal.termsAndConditions}
            </p>

        </div>

        </div>

      <h2 className="text-3xl font-bold mb-2">

        {promotion.step === 1
          ? "Choose Your Pizza"
          : "Choose Your FREE Pizza"}

      </h2>

      <p className="text-orange-400 mb-6">

        {promotion.step === 1
          ? "Step 1 of 2"
          : "Step 2 of 2"}

      </p>

      <div className="grid md:grid-cols-3 gap-8">

        {pizzas.map((pizza) => (
          <div
            key={pizza._id}
            className="bg-[#1a1a1a] p-4 rounded-2xl border border-orange-500/20 hover:border-orange-500 transition"
            >
            <img
              src={pizza.image}
              alt={pizza.name}
              className="h-48 w-full object-cover rounded"
            />

            <h3 className="text-xl font-bold mt-4">
              {pizza.name}
            </h3>
            <select
              className="w-full p-2 mt-3 rounded text-black"
              value={selectedSizes[pizza._id] || "Medium"}
              onChange={(e) =>
                setSelectedSizes({
                  ...selectedSizes,
                  [pizza._id]: e.target.value,
                })
              }
            >
              {pizza.sizes.map((size) => (
                <option
                  key={size._id}
                  value={size.size}
                >
                  {size.size}
                </option>
              ))}
            </select>

            <button
              onClick={() => {
                if (
                  deal.dealType === "BOGO" &&
                  promotion.step === 2
                ) {

                  setPromotion({
                    ...promotion,
                    freePizza: pizza,
                  });

                } else {
                setSelectedPizza({
                  ...pizza,
                  dealId: deal._id,
                  dealTitle: deal.title,
                  dealPrice: deal.offerPrice,
                });
                setSelectedAddons([]);
                setSelectedCrust(null);
                setShowModal(true);
              }}}
              className="bg-orange-500 text-white px-4 py-2 rounded mt-3 w-full"
            >
              Customize & Add
            </button>
         </div>
        ))}

      </div>

      {showModal && selectedPizza && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="bg-[#1a1a1a] text-white p-8 rounded-xl w-[600px] max-h-[85vh] overflow-y-auto">

            <h2 className="text-3xl font-bold mb-4 text-orange-500">
              {selectedPizza.name}
            </h2>

            <p className="mb-4">
              Customize Your Pizza
            </p>

            <div>

              <h3 className="font-bold text-lg mb-2 text-orange-400">
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
                    className={`border border-gray-700 p-3 rounded-lg mb-2 cursor-pointer transition ${
                      selectedCrust?._id === addon._id
                        ? "bg-orange-500 text-white border-orange-500"
                        : "bg-[#222] text-white"
                    }`}
                  >
                    {addon.name} (+₹{addon.price})
                  </div>
                ))}

            </div>

            <div>

              <h3 className="font-bold text-lg mb-2 text-orange-400">
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
                    onClick={() => {
                      const exists =
                        selectedAddons.find(
                          (a) =>
                            a._id === addon._id
                        );

                      if (exists) {
                        setSelectedAddons(
                          selectedAddons.filter(
                            (a) =>
                              a._id !== addon._id
                          )
                        );
                      } else {
                        setSelectedAddons([
                          ...selectedAddons,
                          addon,
                        ]);
                      }
                    }}
                    className={`border border-gray-700 p-3 rounded-lg mb-2 cursor-pointer transition ${
                      selectedAddons.some(
                        (a) =>
                          a._id === addon._id
                      )
                        ? "bg-orange-500 text-white border-orange-500"
                        : "bg-[#222] text-white"
                    }`}
                  >
                    {addon.name} (+₹{addon.price})
                  </div>
                ))}

            </div>

            <div>

              <h3 className="font-bold text-lg mb-2 mt-4 text-orange-400">
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
                    onClick={() => {
                      const exists =
                        selectedAddons.find(
                          (a) =>
                            a._id === addon._id
                        );

                      if (exists) {
                        setSelectedAddons(
                          selectedAddons.filter(
                            (a) =>
                              a._id !== addon._id
                          )
                        );
                      } else {
                        setSelectedAddons([
                          ...selectedAddons,
                          addon,
                        ]);
                      }
                    }}
                    className={`border border-gray-700 p-3 rounded-lg mb-2 cursor-pointer ${
                      selectedAddons.some(
                        (a) =>
                          a._id === addon._id
                      )
                        ? "bg-orange-500 text-white border-orange-500"
                        : "bg-[#222] text-white"
                    }`}
                  >
                    {addon.name} (+₹{addon.price})
                  </div>
                ))}

            </div>

            <div>

              <h3 className="font-bold text-lg mb-2 mt-4 text-orange-400">
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
                    onClick={() => {
                      const exists =
                        selectedAddons.find(
                          (a) =>
                            a._id === addon._id
                        );

                      if (exists) {
                        setSelectedAddons(
                          selectedAddons.filter(
                            (a) =>
                              a._id !== addon._id
                          )
                        );
                      } else {
                        setSelectedAddons([
                          ...selectedAddons,
                          addon,
                        ]);
                      }
                    }}
                    className={`border border-gray-700 p-3 rounded-lg mb-2 cursor-pointer ${
                      selectedAddons.some(
                        (a) =>
                          a._id === addon._id
                      )
                        ? "bg-orange-500 text-white border-orange-500"
                        : "bg-[#222] text-white"
                    }`}
                  >
                    {addon.name} (+₹{addon.price})
                  </div>
                ))}

                <div className="mt-6 p-4 bg-green-100 rounded text-black">

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

                <div className="flex gap-4 mt-6">

                  <button
                    onClick={() => setShowModal(false)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-bold flex-1"
                  >
                    Close
                  </button>

                  <button
                    onClick={addCustomizedPizzaToCart}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-bold flex-1"
                  >
                    Add To Cart
                  </button>

                </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default DealDetails;