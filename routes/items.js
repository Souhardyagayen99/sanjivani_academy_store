const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const { StockDetail } = require('../models/Stock');
const auth = require('../middleware/auth');

// Protect all item routes
router.use(auth);

// GET /api/items (Search/List items)
router.get('/', async (req, res) => {
  try {
    const query = req.query.q;
    let items;
    if (query) {
      // Autocomplete search (by name or id)
      const numQuery = parseInt(query);
      const searchConditions = [
        { item: { $regex: query, $options: 'i' } }
      ];
      
      if (!isNaN(numQuery)) {
        searchConditions.push({ item_id: numQuery });
      }

      items = await Item.find({ $or: searchConditions }).limit(10);
    } else {
      items = await Item.find().sort({ item_id: -1 });
    }
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/items/:item_name (Get specific item details)
router.get('/details/:name', async (req, res) => {
  try {
    const item = await Item.findOne({ item: req.params.name });
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/items/next-id (Get next auto-increment id)
router.get('/next-id', async (req, res) => {
  try {
    const lastItem = await Item.findOne().sort({ item_id: -1 });
    const nextId = lastItem ? lastItem.item_id + 1 : 1;
    res.json({ nextId });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/items (Create new item)
router.post('/', async (req, res) => {
  try {
    const { item_id, item, unit, price, cst, gst, total_amount } = req.body;

    const newItem = new Item({ item_id, item, unit, price, cst, gst, total_amount });
    await newItem.save();

    // Also initialize StockDetail for this item (as per original logic)
    const newStockDetail = new StockDetail({
      stock_id: item_id,
      item,
      unit,
      total_stock: 0,
      issued_stock: 0,
      balance: 0
    });
    await newStockDetail.save();

    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: 'Error creating item', details: err.message });
  }
});

module.exports = router;
