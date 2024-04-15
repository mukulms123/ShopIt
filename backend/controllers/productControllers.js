import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Product from "../models/product.js";
import ErrorHandler from "../utils/errorHandler.js";
import APIFilters from "../utils/apiFilters.js";

// Get lis of all products => /api/v1/products
export const getProducts = catchAsyncErrors(async (req, res) => {
  const resPerPage = 4;
  const apiFilters = new APIFilters(Product, req.query).search().filters();

  console.log(req.user);

  let products = await apiFilters.query;
  let filteredProductsCounts = products.length;
  //   const products = await Product.find();

  apiFilters.pagination(resPerPage);
  products = await apiFilters.query.clone();

  res.status(200).json({
    resPerPage,
    filteredProductsCounts,
    products,
  });
});

// Create new products => /api/v1/admin/products
export const newProducts = catchAsyncErrors(async (req, res) => {
  const product = await Product.create(req.body);

  res.status(200).json({ product });
});

// Get single product's details => /api/v1/products/:id
export const getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.findById(req?.params?.id);

  if (!products) {
    return next(new ErrorHandler("Product not found", 404));
  } else {
    res.status(200).json({
      products,
    });
  }
});

// Update a product by id => PUT api/v1/products/:id
export const updateProductById = catchAsyncErrors(async (req, res) => {
  const products = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!products) {
    return next(new ErrorHandler("Product not found", 404));
  } else {
    res.status(200).json({
      products,
    });
  }
});

// Delete a product by id => DELETE api/v1/products/:id
export const deleteProductById = catchAsyncErrors(async (req, res) => {
  const products = await Product.findByIdAndDelete(req.params.id);

  if (!products) {
    res.status(404).json({ Status: "Product not found by Id" });
  } else {
    res.status(200).json({
      products,
    });
  }
});
