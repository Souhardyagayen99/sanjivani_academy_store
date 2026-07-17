const mongoose = require('mongoose');

const openingBalanceSchema = new mongoose.Schema({
  srno:         { type: Number, required: true }, // Keeping for legacy reference if needed, or can auto-increment
  item:         { type: String, required: true },
  unit:         { type: String, required: true },
  total_stock:  { type: Number, required: true },
  price:        { type: Number, required: true },
  gst:          { type: Number, required: true },
  cst:          { type: Number, required: true },
  total_amount: { type: Number, required: true },
  date:         { type: Date, required: true }
});

module.exports = mongoose.model('OpeningBalance', openingBalanceSchema, 'opening_balances');
