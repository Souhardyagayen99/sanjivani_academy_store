const express = require('express');
const router = express.Router();
const OpeningBalance = require('../models/OpeningBalance');
const { StockDetail } = require('../models/Stock');
const auth = require('../middleware/auth');

router.use(auth);

// GET /api/balance/opening
router.get('/opening', async (req, res) => {
  try {
    const balances = await OpeningBalance.find().sort({ date: -1 });
    const totalAmount = balances.reduce((acc, curr) => acc + curr.total_amount, 0);
    res.json({ data: balances, totalAmount });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/balance/closing
router.get('/closing', async (req, res) => {
  try {
    const stockDetails = await StockDetail.find();
    // Simplified closing balance logic, assuming StockDetail has current price or we join with Item
    // For now returning stock details
    res.json(stockDetails);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
