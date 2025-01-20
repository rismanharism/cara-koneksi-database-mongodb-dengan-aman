// database.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // URI MongoDB dari .env
    const uri = process.env.MONGODB_URI;

    // Mongoose Connect
    await mongoose.connect(uri);

    console.log('MongoDB connected successfully');

    // Event listener untuk monitoring koneksi
    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected to DB');
    });

    mongoose.connection.on('error', (err) => {
      console.error('Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose disconnected from DB');
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Keluar jika gagal menghubungkan
  }
};

module.exports = connectDB;
