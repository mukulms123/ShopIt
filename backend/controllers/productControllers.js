import Product from "../models/product.js";

// Get lis of all products => /api/v1/products
export const getProducts = async (req, res)=>{

    const products = await Product.find();

    res.status(200).json({
        products
    })
};

// Create new products => /api/v1/admin/products
export const newProducts = async (req, res)=>{
    const product = await Product.create(req.body);

    res.status(200).json({product});
};

// Get single product's details => /api/v1/products/:id
export const getProductDetails = async (req, res)=>{

    try{
        const products = await Product.findById(req?.params?.id);
        
        if(!products){
            res.status(404).json({"Status":"Product not found"});
        }
        else{
            res.status(200).json({
                products
            })
        }
    }
    catch(error){
        console.log("ERROR: ", error.message);
        res.status(500).json({"Status": "Its not you Its us!"});
    }
};

// Update a product by id => PUT api/v1/products/:id
export const updateProductById = async (req, res) => {
    try {
        const products = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});

        if(!products){
            res.status(404).json({"Status": "Product not found by Id"});
        }
        else{
            res.status(200).json({
                products
            });
        }

    } catch (error) {
        console.log("ERROR: ", error.message);
        res.status(500).json({"Status": "Its not you Its us!"});
    }
};

// Delete a product by id => DELETE api/v1/products/:id
export const deleteProductById = async (req, res) => {
    try {
        const products = await Product.findByIdAndDelete(req.params.id);

        if(!products){
            res.status(404).json({"Status": "Product not found by Id"});
        }
        else{
            res.status(200).json({
                products
            });
        }

    } catch (error) {
        console.log("ERROR: ", error.message);
        res.status(500).json({"Status": "Its not you Its us!"});
    }
};