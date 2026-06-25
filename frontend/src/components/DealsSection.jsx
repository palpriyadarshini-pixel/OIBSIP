import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function DealsSection() {
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

const navigate = useNavigate();

  useEffect(() => {
  fetchDeals();
}, []);

  return (
    <section className="bg-[#111111] py-20 px-10">
      <h2 className="text-5xl font-black text-center text-white mb-12">
        Today's Deals
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {deals.map((deal, index) => (
          <div
            key={index}
            className="bg-[#1a1a1a] rounded-3xl overflow-hidden border border-orange-500/20 hover:border-orange-500 transition"
          >
            <img
              src={deal.image}
              alt={deal.title}
              className="h-60 w-full object-cover"
            />

            <div className="p-6">
              <h3 className="text-white text-2xl font-bold">
                {deal.title}
              </h3>

                <p className="text-green-400 mt-2">
                    Coupon: {deal.couponCode}
                </p>

                <div className="mt-2">
                    <span className="text-gray-400 line-through mr-2">
                        ₹{deal.originalPrice}
                    </span>

                    <span className="text-orange-500 text-xl font-bold">
                        ₹{deal.offerPrice}
                    </span>
                </div>

              <button
                onClick={() =>
                  navigate(`/deal/${deal._id}`)
                }
                className="mt-4 bg-orange-500 text-white px-5 py-2 rounded-full"
              >
                Order Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DealsSection;