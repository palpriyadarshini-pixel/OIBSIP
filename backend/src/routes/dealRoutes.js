import express from "express";

import {
  createDeal,
  getDeals,
  updateDeal,
  getDealById,
  deleteDeal,
} from "../controllers/dealController.js";

import { protect } from "../middleware/authMiddleware.js";

import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", getDeals);
router.get("/:id", getDealById);

router.post(
  "/",
  protect,
  adminMiddleware,
  createDeal
);

router.put(
  "/:id",
  protect,
  adminMiddleware,
  updateDeal
);

router.delete(
  "/:id",
  protect,
  adminMiddleware,
  deleteDeal
);

export default router;