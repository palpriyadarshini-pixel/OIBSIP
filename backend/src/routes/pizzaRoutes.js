import express from "express";
import {protect} from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import {
  createPizza,
  getAllPizzas,
} from "../controllers/pizzaController.js";

const router = express.Router();

router.post(
  "/",
  protect,
  adminMiddleware,
  createPizza
);
router.get("/", getAllPizzas);

export default router;
