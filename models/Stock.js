const mongoose = require('mongoose');

const stockDetailSchema = new mongoose.Schema({
  stock_id:      { type: Number, required: true },
  item:          { type: String, required: true, unique: true },
  unit:          { type: String, required: true },
  total_stock:   { type: Number, required: true, default: 0 },
  issued_stock:  { type: Number, required: true, default: 0 },
  balance:       { type: Number, required: true, default: 0 }
});

const stockHistorySchema = new mongoose.Schema({
  stock_id:      { type: Number, required: true },
  item:          { type: String, required: true },
  pon:           { type: String, required: true },
  unit:          { type: String, required: true },
  quantity:      { type: Number, required: true },
  date:          { type: Date, required: true },
  supplier_name: { type: String, required: true },
  bill_number:   { type: String, required: true },
  bill_date:     { type: Date, required: true },
  remark:        { type: String, default: '' }
});

const StockDetail  = mongoose.model('StockDetail',  stockDetailSchema,  'stock_details');
const StockHistory = mongoose.model('StockHistory', stockHistorySchema, 'stock_history');

module.exports = { StockDetail, StockHistory };
