import express from "express";
import {protect} from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import {
  createPizza,
  getAllPizzas,
  updatePizza,
  deletePizza,
} from "../controllers/pizzaController.js";

const router = express.Router();

router.post(
  "/",
  protect,
  adminMiddleware,
  createPizza
);
router.get(
  "/",
  getAllPizzas);
router.put(
  "/:id",
  protect,
  adminMiddleware,
  updatePizza);
router.delete(
  "/:id", 
  protect,
  adminMiddleware,
  deletePizza);

export default router;
