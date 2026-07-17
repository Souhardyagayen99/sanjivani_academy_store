const express = require('express');
const router = express.Router();
const YearlyRequirement = require('../models/YearlyRequirement');
const MonthlyRequirement = require('../models/MonthlyRequirement');
const auth = require('../middleware/auth');

router.use(auth);

// --- Yearly Requirements ---

// GET /api/requirements/yearly/next-id
router.get('/yearly/next-id', async (req, res) => {
  try {
    const lastReq = await YearlyRequirement.findOne().sort({ req_id: -1 });
    const nextId = lastReq ? lastReq.req_id + 1 : 1;
    res.json({ nextId });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/requirements/yearly
router.post('/yearly', async (req, res) => {
  try {
    const yearly = new YearlyRequirement(req.body);
    await yearly.save();
    res.status(201).json(yearly);
  } catch (err) {
    res.status(400).json({ error: 'Error saving yearly requirement', details: err.message });
  }
});

// --- Monthly Requirements ---

// GET /api/requirements/monthly/next-id
router.get('/monthly/next-id', async (req, res) => {
  try {
    const lastReq = await MonthlyRequirement.findOne().sort({ req_id: -1 });
    const nextId = lastReq ? lastReq.req_id + 1 : 1;
    res.json({ nextId });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/requirements/monthly
router.post('/monthly', async (req, res) => {
  try {
    const monthly = new MonthlyRequirement(req.body);
    await monthly.save();
    res.status(201).json(monthly);
  } catch (err) {
    res.status(400).json({ error: 'Error saving monthly requirement', details: err.message });
  }
});

module.exports = router;
