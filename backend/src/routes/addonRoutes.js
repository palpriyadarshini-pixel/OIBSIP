import express from "express";

import {
  getAddons,
  createAddon,
  deleteAddon,
  updateAddon,
} from "../controllers/addonController.js";

import { protect } from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", getAddons);

router.post(
  "/",
  protect,
  adminMiddleware,
  createAddon
);
router.delete(
  "/:id",
  protect,
  adminMiddleware,
  deleteAddon
);
router.put(
  "/:id",
  protect,
  adminMiddleware,
  updateAddon
);

export default router;