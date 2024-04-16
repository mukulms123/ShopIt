import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide Name field"],
      maxLength: [200, "Product name cannot exceed 200 characters"],
    },
    price: {
      type: Number,
      required: [true, "Price field cannot be empty"],
      maxLength: [5, "Products price cannot exceed 5 characters"],
    },
    description: {
      type: String,
      required: [true, "Please provide description field"],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: String,
      required: [true, "Please provide product's category"],
      enum: {
        values: [
          "Electronics",
          "Cameras",
          "Laptops",
          "Accessories",
          "Headphones",
          "Food",
          "Books",
          "Sports",
          "Outdoor",
          "Home",
        ],
        message: "Please enter predefined categories",
      },
    },
    seller: {
      type: String,
      required: [true, "Seller name is required"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter product stocks"],
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: [true, "User Id is required for Review"],
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          require: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    //Either use createdAt object like this, or just use timestamps of mongoose
    // createdAt:{
    //     type: Date,
    //     default: Date.now
    // }
  },
  { timestamps: true }
);

export default mongoose.model("Products", productSchema);
