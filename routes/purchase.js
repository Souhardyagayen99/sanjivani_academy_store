const express = require('express');
const router = express.Router();
const PurchaseOrder = require('../models/PurchaseOrder');
const auth = require('../middleware/auth');

router.use(auth);

// GET /api/purchase/next-id
router.get('/next-id', async (req, res) => {
  try {
    const lastOrder = await PurchaseOrder.findOne().sort({ order_id: -1 });
    const nextId = lastOrder ? lastOrder.order_id + 1 : 1;
    res.json({ nextId });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/purchase
router.post('/', async (req, res) => {
  try {
    const order = new PurchaseOrder(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: 'Error saving purchase order', details: err.message });
  }
});

// GET /api/purchase (List with optional filters)
router.get('/', async (req, res) => {
  try {
    const { order_no, supplier } = req.query;
    let query = {};
    if (order_no) query.order_no = order_no;
    if (supplier) query.supplier_name = { $regex: supplier, $options: 'i' };

    const orders = await PurchaseOrder.find(query).sort({ date: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
