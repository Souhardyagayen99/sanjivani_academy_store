const express = require('express');
const router = express.Router();
const YearlyRequirement = require('../models/YearlyRequirement');
const PurchaseOrder = require('../models/PurchaseOrder');
const Issue = require('../models/Issue');
const Sale = require('../models/Sale');
const auth = require('../middleware/auth');

router.use(auth);

// GET /api/reports/requirements
router.get('/requirements', async (req, res) => {
  try {
    const { college, department } = req.query;
    let query = {};
    if (college) query.college = college;
    if (department) query.department = department;

    const requirements = await YearlyRequirement.find(query).sort({ date: -1 });
    
    const totalAmount = requirements.reduce((acc, curr) => acc + curr.total1, 0);

    res.json({ data: requirements, totalAmount });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/reports/purchase
router.get('/purchase', async (req, res) => {
  try {
    const { order_id, supplier_name } = req.query;
    let query = {};
    if (order_id) query.order_id = order_id;
    if (supplier_name) query.supplier_name = { $regex: supplier_name, $options: 'i' };

    const orders = await PurchaseOrder.find(query).sort({ date: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/reports/issue
router.get('/issue', async (req, res) => {
  try {
    const { institute, department, name, date } = req.query;
    let query = {};
    if (institute) query.institute = institute;
    if (department) query.department = department;
    if (name) query.issued_by = { $regex: name, $options: 'i' };
    if (date) query.date = date; // Might need exact date matching logic or range

    const issues = await Issue.find(query).sort({ date: -1 });
    res.json(issues);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/reports/sell
router.get('/sell', async (req, res) => {
  try {
    const { college, department } = req.query;
    let query = {};
    if (college) query.college = college;
    if (department) query.department = department;

    const sales = await Sale.find(query).sort({ date: -1 });
    const totalAmount = sales.reduce((acc, curr) => acc + curr.amount, 0);

    res.json({ data: sales, totalAmount });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
