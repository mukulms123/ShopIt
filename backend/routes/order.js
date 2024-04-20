import express from "express";
const router = express.Router();
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";
import {
  deleteOrders,
  getAllOrders,
  getMyOrders,
  getOrderDetails,
  newOrder,
  updateOrder,
} from "../controllers/orderControllers.js";

router.route("/orders/new").post(isAuthenticatedUser, newOrder);
router.route("/orders/:id").get(isAuthenticatedUser, getOrderDetails);
router.route("/me/orders").get(isAuthenticatedUser, getMyOrders);
router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

router
  .route("/admin/orders/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrders);

export default router;
