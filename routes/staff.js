const express = require('express');
const router = express.Router();
const Staff = require('../models/Staff');
const auth = require('../middleware/auth');

router.use(auth);

// GET /api/staff (Search/List staff)
router.get('/', async (req, res) => {
  try {
    const query = req.query.q;
    let staffList;
    if (query) {
      // Autocomplete search
      staffList = await Staff.find({ name: { $regex: query, $options: 'i' } }).limit(10);
    } else {
      staffList = await Staff.find().sort({ name: 1 });
    }
    res.json(staffList);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
