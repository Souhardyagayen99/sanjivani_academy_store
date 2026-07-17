const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  item_id:      { type: Number, required: true, unique: true },
  item:         { type: String, required: true, unique: true },
  unit:         { type: String, required: true },
  price:        { type: Number, required: true },
  cst:          { type: Number, required: true, default: 0 },
  gst:          { type: Number, required: true, default: 0 },
  total_amount: { type: Number, required: true }
});

module.exports = mongoose.model('Item', itemSchema, 'items');
