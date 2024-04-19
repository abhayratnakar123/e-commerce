const Order = require("../models/orderModel");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const jwt = require("jsonwebtoken");
const Razorpay = require("razorpay");
const crypto = require('crypto');
const Payment = require('../models/paymentModel')

const handleError = (res, statusCode, message, success = false) => {
  return res.status(statusCode).json({ success, message });
};

const handleSuccess = (res, data) => {
  return res.status(200).json({ success: true, ...data });
};

// API - Get user orders
const getUserOrders = async (req, res) => {
  try {
    const token = req.headers.token;
    const decoded = jwt.decode(token, process.env.JWT_SECRET);
    const userid = decoded.data;
    console.log("User ID" , userid)
    const orders = await Order.find({ userid: userid });
    console.log(orders);
    handleSuccess(res, { total: orders.length, orders });
  } catch (error) {
    handleError(res, 400, error.message);
  }
};

// API - User Cart
const userCart = async (req, res) => {
  try {
    const productid = req.params.id;
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userid = decoded.data;

    const product = await Product.findById(productid);
    if (!product) {
      return handleError(res, 404, "Product not found");
    }

    const user = await User.findById(userid).select("-password");
    if (!user) {
      return handleError(res, 404, "User not found");
    }

    if (!user.cartItems) {
      user.cartItems = [];
    }

    const existingCartItem = user.cartItems.find(
      (item) => item.product._id.toString() === product._id.toString()
    );

    if (existingCartItem) {
      return handleError(res, 403, "Product already exists");
    }

    let quantity = req.body.quantity;

    user.cartItems.unshift({
      product: product,
      quantity: quantity,
      price: product.price,
    });

    await user.save();

    return handleSuccess(res, {
      message: "Added to cart",
      cart: user.cartItems,
    });
  } catch (error) {
    return handleError(res, 400, "Error adding product: " + error.message);
  }
};

// API - Place order
const cartCheckout = async (req, res) => {
  try {
    const token = req.headers.token;
    const decoded = jwt.decode(token, process.env.JWT_SECRET);
    const userId = decoded.data;
    const user = await User.findOne({ _id: userId }).select("-password");

    if (user.cartItems.length < 1) {
      return handleError(res, 404, "Cart is empty", false);
    }
    const address = req.body.address;
    const totalPrice = req.body.totalPrice;

    const { cartItems, ...userWithoutCartItems } = user;
    const order = await Order.create({
      user: userWithoutCartItems,
      products: user.cartItems,
      address,
      totalPrice,
      userid: userId,
    });
    handleSuccess(res, { order });
    //Resetting the cart
    user.cartItems = [];
    return await user.save();
  } catch (error) {
    return handleError(res, 400, error.message);
  }
};


// Api To Payment And Order 

const payment = async (req, res) => {
  // Initialize the Razorpay instance
  const instance = new Razorpay({
    key_id: process.env.Razor_Pay_Api_key,
    key_secret: process.env.Razor_Pay_Api_Secrate,
  });

  const totalPrice = req.body.totalPrice;
  const options = {
    amount: Number(totalPrice * 100), 
    currency: "INR",
    receipt: "order_rcptid_11"
  };
  try {
    const token = req.headers.token;
    if (!token) {
      return handleError(res, 401, "No token provided");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userid = decoded.data;
    const address = req.body.address;
    // Create an order with Razorpay
    const order = await instance.orders.create(options);
    console.log(order, "Order created successfully");

    const newOrder = new Order({
      orderId: order.id,
      userid:userid,
      amount: totalPrice,
      created_at: Date.now(),
      address:address
    });
    await newOrder.save();
    console.log("Order saved in DB successfully");
    console.log("Order saved in DB successfully");
    return handleSuccess(res, order); 
  }
  catch (error) {
    console.error("Detailed Error:", error);
    const message = error.error?.description || error.message || "Failed to create order";
    return handleError(res, error.statusCode || 400, message);
  }
};

// WebHook To Verify payment 
const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto.createHmac('sha256', process.env.Razor_Pay_Api_Secrate)
    .update(body.toString())
    .digest('hex');

  if (expectedSignature === razorpay_signature) {
    //Save in DataBase comes hare and redirect to payment Sucess page 

    await Payment.create({
      razorpay_order_id, razorpay_payment_id, razorpay_signature
    })
    res.redirect(`http://localhost:3001/paymentsucess?reference=${razorpay_payment_id}`)
  } else {
    return res.status(400).send("Verification Failed");
  }
}
module.exports = {
  cartCheckout,
  getUserOrders,
  userCart,
  payment,
  verifyPayment
};
