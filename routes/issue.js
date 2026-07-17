const express = require('express');
const router = express.Router();
const Issue = require('../models/Issue');
const { StockDetail } = require('../models/Stock');
const auth = require('../middleware/auth');

router.use(auth);

// GET /api/issue/next-id (Simulating indent_no auto increment if needed)
router.get('/next-id', async (req, res) => {
  try {
    const lastIssue = await Issue.findOne().sort({ indent_no: -1 });
    const nextId = lastIssue ? lastIssue.indent_no + 1 : 1;
    res.json({ nextId });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/issue
router.post('/', async (req, res) => {
  try {
    const issue = new Issue(req.body);

    // Update stock balances
    const stockDetail = await StockDetail.findOne({ item: issue.item });
    if (!stockDetail) {
      return res.status(400).json({ error: 'Item not found in stock' });
    }

    if (stockDetail.balance < issue.quantity) {
      return res.status(400).json({ error: 'Insufficient stock balance' });
    }

    stockDetail.issued_stock += Number(issue.quantity);
    stockDetail.balance -= Number(issue.quantity);
    await stockDetail.save();

    await issue.save();
    res.status(201).json(issue);
  } catch (err) {
    res.status(400).json({ error: 'Error processing issue', details: err.message });
  }
});

// GET /api/issue
router.get('/', async (req, res) => {
  try {
    const issues = await Issue.find().sort({ date: -1 });
    res.json(issues);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
