const Product = require("../models/productModel"); 

const handleError = (res, statusCode, message, success = false) => {
  return res.status(statusCode).json({ success, message });
};

const handleSuccess = (res, data) => {
  return res.status(200).json({ success: true, ...data });
};

// API - Add a Delet Product (ADMIN)
const deleteProduct = async (req, res) => {
  try {
    console.log("Request From Delete", req.params.id);
    
    const token = req.headers.token;  
    console.log("Token In ProductController", token);
    
    const result = await Product.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
        return res.status(404).send('No product found with that ID.');
    }
    res.send('Product deleted successfully.');
  } catch (error) {
    res.status(500).send('User are Not Able to Delete this Product',error);
  }
};

//Api to Add Product Admin
const addProduct = async (req, res) => {
  console.log("resss")
  try {
    const { name, description, price, image } = req.body;
    console.log("Backend DAta",req.body);
    if (!name || !description ||  !price || !image) {
      return handleError(res, 400, "Please fill all the details");
    }
    const existingProduct = await Product.findOne({
      name,
      description,
      price,
      image,
    });
    if (existingProduct) {
      return handleError(res, 400, "Product already exists");
    }
    const product = await Product.create({
      name,
      description,
      price,
      image,
    });

    return handleSuccess(res, { product });
  } catch (error) {
    return handleError(res, 400, message);
  }
};

// API - Get a Product
const getAProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return handleError(res, 404, "Error fetching product");
    }
    return handleSuccess(res, { product });
  } catch (error) {
    return handleError(res, 400, "Error fetching product: " + error.message);
  }
};

// API - Get all Products
const getAllProducts = async (req, res) => {
  try {
    const search = req.query.search;
    const category = req.query.category;

    let query = {};

    if (search) {
      const regexString = search
        .split(" ")
        .map((word) => `(?=.*${word})`)
        .join(""); 
      query.$or = [
        { category: { $regex: regexString, $options: "i" } },
        { name: { $regex: regexString, $options: "i" } },
        { description: { $regex: regexString, $options: "i" } },
      ];
    }

    if (category) {
      query.category = { $regex: category, $options: "i" };
    }

    const products = await Product.find(query);

    return handleSuccess(res, { productsCount: products.length, products });
  } catch (error) {
    return handleError(res, 400, error.message);
  }
};


// Api To Edit Product Admin 
const editProduct = async (req, res) => {
  console.log("Edit API");
  const { id } = req.params;
  const { name, price, description, image } = req.body;
  if (!id) {
    return res.status(400).send({ message: 'Product ID is required' });
  }

  try {
    // Find product and update it
    const updatedProduct = await Product.findByIdAndUpdate(id, {
      name, price, description, image
    }, { new: true }); // {new: true} ensures the returned document is the updated one

    if (!updatedProduct) {
      return res.status(404).send({ message: 'No product found with that ID' });
    }

    return handleSuccess(res, {product: updatedProduct });
    
  } catch (error) {
    return handleError(res, 400, error.message);
  }
};

module.exports = { addProduct, getAProduct, getAllProducts, deleteProduct,editProduct };
