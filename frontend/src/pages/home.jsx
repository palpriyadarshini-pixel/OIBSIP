import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [pizzas, setPizzas] = useState([]);

 
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

 useEffect(() => {
    fetchPizzas();
  }, []);

const addToCart = async (pizzaId) => {
  try {
    const token = localStorage.getItem("token");

    const { data } = await axios.post(
      "http://localhost:5000/api/cart",
      {
        pizzaId,
        size: "Medium",
        quantity: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(data.message);
  } catch (error) {
    console.log(error);
    alert("Failed to add to cart");
  }
};

  return (
  <div>
    <h1>Pizza Menu</h1>

    {pizzas.map((pizza) => (
      <div key={pizza._id}>
        <h3>{pizza.name}</h3>
        <p>{pizza.description}</p>
        <p>₹{pizza.price}</p>

        <img
          src={pizza.image}
          alt={pizza.name}
          width="200"
        />
        <button onClick={() => addToCart(pizza._id)}>
           Add To Cart
        </button>
        <hr />
      </div>
    ))}
  </div>
)};

export default Home;