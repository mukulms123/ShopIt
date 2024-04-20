import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import order from "../models/order.js";
import Order from "../models/order.js";
import Product from "../models/product.js";
import ErrorHandler from "../utils/errorHandler.js";

// Create new Order => /api/v1/orders/new
export const newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
    paymentMethod,
    paymentInfo,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
    paymentMethod,
    paymentInfo,
    user: req.user._id,
  });
  res.status(200).json({
    order,
  });
});

// Get Order Details => /api/v1/orders/:id
export const getOrderDetails = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }

  res.status(200).json({
    order,
  });
});

// Get current user orders  => /api/v1/me/orders
export const getMyOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  if (!orders) {
    return next(new ErrorHandler("No orders found for this user", 404));
  }

  res.status(200).json({
    orders,
  });
});

// Get all orders - Admin  => /api/v1/admin/orders
export const getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  if (!orders) {
    return next(new ErrorHandler("No orders found", 404));
  }

  res.status(200).json({
    orders,
  });
});

// Update orders - Admin => /api/v1/admin/orders/:id
export const updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("No orders found for this Id", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already Delivered this order", 400));
  }

  order?.orderItems?.forEach(async (item) => {
    const product = await Product.findById(item.product.toString());

    if (!product) {
      return next(new ErrorHandler("No Product found for this Id", 404));
    }

    product.stock = product.stock - item.quantity;
    await product.save();
  });

  order.orderStatus = req.body.status;
  order.deliveredAt = Date.now();

  await order.save();

  res.status(200).json({
    order,
  });
});

// Delete order - Admin  => /api/v1/admin/orders/:id
export const deleteOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.findById(req.params.id);

  if (!orders) {
    return next(new ErrorHandler("No orders found", 404));
  }

  await order.deleteOne();

  res.status(200).json({
    success: true,
  });
});
