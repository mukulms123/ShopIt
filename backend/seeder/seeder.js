import mongoose from "mongoose";
import Products from "../models/product.js";

import products from "./data.js"; 

const seedProducts = async()=>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/shopIt");
        await Products.deleteMany();
        console.log("Products are deleted");
        await Products.insertMany(products);
        console.log("Products inserted");
        process.exit();
    }
    catch(error){
        console.log(error.message);
        process.exit();

    }
};

seedProducts();