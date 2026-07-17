const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const { StockDetail, StockHistory } = require('../models/Stock');
const OpeningBalance = require('../models/OpeningBalance');
const auth = require('../middleware/auth');

router.use(auth);

// GET /api/stock (List all stock details)
router.get('/', async (req, res) => {
  try {
    const stock = await StockDetail.find().lean();
    const openingBalances = await OpeningBalance.find().lean();
    
    const openingBalanceMap = {};
    openingBalances.forEach(ob => {
       openingBalanceMap[ob.item] = ob.total_stock;
    });

    const result = stock.map(s => {
       return {
           ...s,
           opening_balance: openingBalanceMap[s.item] || 0
       };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/stock/:itemName
router.get('/:itemName', async (req, res) => {
  try {
    const stock = await StockDetail.findOne({ item: req.params.itemName }).lean();
    if (!stock) return res.status(404).json({ error: 'Stock not found' });
    const ob = await OpeningBalance.findOne({ item: req.params.itemName }).lean();
    res.json({ ...stock, opening_balance: ob ? ob.total_stock : 0 });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/stock/add (Add stock)
router.post('/add', async (req, res) => {
  try {
    const { item, pon, unit, quantity, date, supplier_name, bill_number, bill_date, remark } = req.body;

    // 1. Find item to get stock_id
    const itemMaster = await Item.findOne({ item });
    if (!itemMaster) {
      return res.status(400).json({ error: 'Item not found in item master' });
    }

    // 2. Update stock detail
    let stockDetail = await StockDetail.findOne({ item });
    if (stockDetail) {
      stockDetail.total_stock += Number(quantity);
      stockDetail.balance += Number(quantity);
      await stockDetail.save();
    } else {
       // Should have been created in items route, but just in case
       stockDetail = new StockDetail({
           stock_id: itemMaster.item_id,
           item,
           unit,
           total_stock: quantity,
           issued_stock: 0,
           balance: quantity
       });
       await stockDetail.save();
    }

    // 3. Add to stock history
    const history = new StockHistory({
      stock_id: itemMaster.item_id,
      item, pon, unit, quantity, date, supplier_name, bill_number, bill_date, remark
    });
    await history.save();

    res.status(201).json({ message: 'Stock added successfully', stockDetail });
  } catch (err) {
    res.status(400).json({ error: 'Error adding stock', details: err.message });
  }
});

module.exports = router;
