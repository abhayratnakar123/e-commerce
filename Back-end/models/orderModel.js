const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  userid: { type: String, required: true },
  amount: { type: Number, required: true },
  date: {
    type: Date,
    default: Date.now,
  },
  address: { type: String, require: true },

});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;