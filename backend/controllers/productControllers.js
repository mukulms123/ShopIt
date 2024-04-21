import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Product from "../models/product.js";
import ErrorHandler from "../utils/errorHandler.js";
import APIFilters from "../utils/apiFilters.js";

// Get lis of all products => /api/v1/products
export const getProducts = catchAsyncErrors(async (req, res) => {
  const resPerPage = 4;
  const apiFilters = new APIFilters(Product, req.query).search().filters();

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
  req.body.user = req.user._id;

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
export const updateProductById = catchAsyncErrors(async (req, res, next) => {
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
export const deleteProductById = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.findByIdAndDelete(req.params.id);

  if (!products) {
    res.status(404).json({ Status: "Product not found by Id" });
  } else {
    res.status(200).json({
      products,
    });
  }
});

// Create/Update product review => /api/v1/reviews
export const createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler("Product not found!", 404));
  }

  const isReview = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (isReview) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get product review => /api/v1/reviews?id
export const getProductReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found!", 404));
  }

  res.status(200).json({
    reviews: product.reviews,
  });
});

// Delete a review => /api/v1/admin/reviews/
export const deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHandler("Product not found!", 404));
  }

  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );

  product.numOfReviews = reviews.length;
  product.reviews = reviews;

  product.ratings =
    reviews.length === 0
      ? 0
      : product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.numOfReviews;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});
