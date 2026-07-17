require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/items', require('./routes/items'));
app.use('/api/staff', require('./routes/staff'));
app.use('/api/requirements', require('./routes/requirements'));
app.use('/api/purchase', require('./routes/purchase'));
app.use('/api/stock', require('./routes/stock'));
app.use('/api/issue', require('./routes/issue'));
app.use('/api/sell', require('./routes/sell'));
app.use('/api/reports', require('./routes/reports'));
app.use('/api/balance', require('./routes/balance'));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
