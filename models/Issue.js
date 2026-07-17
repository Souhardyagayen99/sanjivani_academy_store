const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  indent_no:    { type: Number, required: true },
  institute:    { type: String, required: true },
  department:   { type: String, required: true },
  item:         { type: String, required: true },
  unit:         { type: String, required: true },
  quantity:     { type: Number, required: true },
  price:        { type: Number, required: true },
  total_amount: { type: Number, required: true },
  receipt_no:   { type: String, required: true },
  date:         { type: Date, required: true },
  issued_by:    { type: String, required: true }
});

module.exports = mongoose.model('Issue', issueSchema, 'issues');
