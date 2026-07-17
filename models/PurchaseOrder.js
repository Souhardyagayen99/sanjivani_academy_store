const mongoose = require('mongoose');

const purchaseOrderSchema = new mongoose.Schema({
  order_id:      { type: Number, required: true },
  college:       { type: String, required: true },
  order_no:      { type: String, required: true },
  date:          { type: Date, required: true },
  supplier_name: { type: String, required: true },
  item:          { type: String, required: true },
  unit:          { type: String, required: true },
  quantity:      { type: Number, required: true },
  price:         { type: Number, required: true },
  total:         { type: Number, required: true },
  cst:           { type: Number, default: 0 },
  gst:           { type: Number, default: 0 },
  total1:        { type: Number, required: true }
});

module.exports = mongoose.model('PurchaseOrder', purchaseOrderSchema, 'purchase_orders');
