const mongoose = require('mongoose');

const monthlyRequirementSchema = new mongoose.Schema({
  req_id:     { type: Number, required: true },
  college:    { type: String, required: true },
  department: { type: String, required: true },
  item:       { type: String, required: true },
  unit:       { type: String, required: true },
  quantity:   { type: Number, required: true },
  prize:      { type: Number, required: true },
  total:      { type: Number, required: true },
  cst:        { type: Number, required: true, default: 0 },
  gst:        { type: Number, required: true, default: 0 },
  total1:     { type: Number, required: true },
  month:      { type: String, required: true },
  year:       { type: String, required: true },
  date:       { type: Date, default: Date.now }
});

module.exports = mongoose.model('MonthlyRequirement', monthlyRequirementSchema, 'monthly_requirements');
