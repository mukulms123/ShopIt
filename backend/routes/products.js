import express from "express";
import {
  createProductReview,
  deleteProductById,
  deleteReview,
  getProductDetails,
  getProductReview,
  getProducts,
  newProducts,
  updateProductById,
} from "../controllers/productControllers.js";
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js";

const router = express.Router();

router.route("/products").get(getProducts);
router
  .route("/admin/products")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newProducts);
router.route("/products/:id").get(getProductDetails);
router
  .route("/admin/products/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProductById);
router
  .route("/admin/products/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProductById);

router
  .route("/reviews")
  .post(isAuthenticatedUser, createProductReview)
  .get(isAuthenticatedUser, getProductReview);

router
  .route("/admin/reviews")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteReview);

export default router;
