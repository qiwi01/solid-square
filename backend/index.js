const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const app = express();

// Security
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Connect DB
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('DB Error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/properties', require('./routes/properties'));
app.use('/api/agents', require('./routes/agents'));
app.use('/api/users', require('./routes/users'));
app.use('/api/blog', require('./routes/blog'));
app.use('/api/enquiries', require('./routes/enquiries'));
app.use('/api/analytics', require('./routes/analytics'));

// Serve uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Error Handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Server Error' });
});


app.use(cors({
  origin: ['http://localhost:5173', 'https://solidsquare-estates.vercel.app'],
  credentials: true,
}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));