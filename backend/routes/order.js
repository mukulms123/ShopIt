import express from "express";
const router = express.Router();
import { isAuthenticatedUser } from "../middlewares/auth.js";
import {
  getMyOrders,
  getOrderDetails,
  newOrder,
} from "../controllers/orderControllers.js";

router.route("/orders/new").post(isAuthenticatedUser, newOrder);
router.route("/orders/:id").get(isAuthenticatedUser, getOrderDetails);
router.route("/me/orders").get(isAuthenticatedUser, getMyOrders);

export default router;
