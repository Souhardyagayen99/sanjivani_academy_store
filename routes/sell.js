const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale');
const { StockDetail } = require('../models/Stock');
const auth = require('../middleware/auth');

router.use(auth);

// POST /api/sell
router.post('/', async (req, res) => {
  try {
    const sale = new Sale(req.body);

    // Deduct from stock balance
    const stockDetail = await StockDetail.findOne({ item: sale.item });
    if (!stockDetail) {
      return res.status(400).json({ error: 'Item not found in stock' });
    }

    if (stockDetail.balance < sale.quantity) {
      return res.status(400).json({ error: 'Insufficient stock balance' });
    }

    // Treat selling similar to issuing for balance deduction
    stockDetail.issued_stock += Number(sale.quantity);
    stockDetail.balance -= Number(sale.quantity);
    await stockDetail.save();

    await sale.save();
    res.status(201).json(sale);
  } catch (err) {
    res.status(400).json({ error: 'Error processing sale', details: err.message });
  }
});

// GET /api/sell
router.get('/', async (req, res) => {
  try {
    const sales = await Sale.find().sort({ date: -1 });
    res.json(sales);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
