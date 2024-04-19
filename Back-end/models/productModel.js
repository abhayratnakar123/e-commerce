const mongoose = require("mongoose");
 

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim:true
  },
  description: {
    type: String,
    required: true,
    trim:true
  },
  price: {
    type: Number,
    required: true,
    trim:true
  },
  image:{
    type:String,
    trim:true
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
