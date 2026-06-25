import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import pizzaRoutes from "./routes/pizzaRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import addonRoutes from "./routes/addonRoutes.js";
import dealRoutes from "./routes/dealRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/pizzas", pizzaRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use(
  "/api/addons",
  addonRoutes
);
app.use(
  "/api/deals",
  dealRoutes
);

app.get("/", (req, res) => {
  res.send("Pizza Delhivery API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});