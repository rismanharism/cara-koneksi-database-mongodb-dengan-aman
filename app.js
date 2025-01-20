require('dotenv').config(); // Load .env
const express = require('express');
const helmet = require('helmet');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Gunakan helmet untuk mengatur header HTTP yang aman
app.use(helmet());
app.use(helmet.frameguard({ action: 'deny' }));

// Hubungkan ke database
connectDB();

// Middleware
app.use(express.json());

// Rute dasar
app.get('/', (req, res) => {
  res.send('connect is running...');
});
const rateLimit = require('express-rate-limit');

// Set limit untuk API
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 100, // Maksimum 100 request per window
  message: 'Terlalu banyak permintaan dari alamat IP ini, coba lagi nanti.'
});

app.use(limiter);

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
