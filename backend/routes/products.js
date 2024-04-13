import express from "express";
import { deleteProductById, getProductDetails, getProducts, newProducts, updateProductById } from "../controllers/productControllers.js";

const router = express.Router();

router.route("/products").get(getProducts);
router.route("/admin/products").post(newProducts);
router.route("/products/:id").get(getProductDetails);
router.route("/products/:id").put(updateProductById);
router.route("/products/:id").delete(deleteProductById);

export default router;