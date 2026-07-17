const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  name:       { type: String, required: true },
  college:    { type: String, required: true },
  department: { type: String, required: true },
  item:       { type: String, required: true },
  unit:       { type: String, required: true },
  quantity:   { type: Number, required: true },
  price:      { type: Number, required: true },
  amount:     { type: Number, required: true },
  receipt:    { type: String, required: true },
  date:       { type: Date, required: true }
});

module.exports = mongoose.model('Sale', saleSchema, 'sales');
