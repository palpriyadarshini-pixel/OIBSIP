import express from "express";
import {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", protect, placeOrder);
router.get("/my-orders", protect, getMyOrders);
router.get(
  "/",
  protect,
  adminMiddleware,
  getAllOrders
);

router.put(
  "/:id",
  protect,
  adminMiddleware,
  updateOrderStatus
);

export default router;