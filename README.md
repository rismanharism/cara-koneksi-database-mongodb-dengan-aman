# cara-koneksi-database-mongodb-dengan-aman
Konfigurasi File .env
Simpan informasi sensitif seperti URI MongoDB di file .env. Contoh:
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/mydatabase?retryWrites=true&w=majority
Jangan hardcode kredensial di kode.
Buat file terpisah untuk koneksi database
Menambahkan Event Listener untuk Monitoring Koneksi
// database.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // URI MongoDB dari .env
    const uri = process.env.MONGODB_URI;

    // Opsi koneksi MongoDB
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    // Mongoose Connect
    await mongoose.connect(uri, options);

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

Penjelasan Event Listener
connected: Event ini dipicu ketika Mongoose berhasil terhubung ke database MongoDB. Ini memberikan indikasi bahwa koneksi aktif.
error: Event ini dipicu jika terjadi masalah dengan koneksi MongoDB, seperti kegagalan jaringan atau kesalahan konfigurasi.
disconnected: Event ini dipicu ketika Mongoose terputus dari database. Ini bisa terjadi jika koneksi hilang atau dihentikan.

Gunakan Helmet untuk Keamanan Header HTTP
Helmet adalah middleware untuk Express yang membantu mengatur header HTTP yang lebih aman, sehingga aplikasi Anda lebih terlindungi dari berbagai serangan.

Helmet akan membantu Anda melindungi aplikasi dari berbagai risiko keamanan dengan mengatur berbagai header HTTP yang aman, seperti:

X-Content-Type-Options: Mencegah browser mengeksekusi file yang tidak sesuai dengan jenis kontennya.
X-XSS-Protection: Mengaktifkan perlindungan XSS.
Strict-Transport-Security: Memastikan koneksi menggunakan HTTPS.

Proteksi dari Clickjacking
Clickjacking adalah serangan di mana halaman web ditampilkan dalam frame atau iframe untuk menipu pengguna agar melakukan klik pada elemen yang berbeda dari yang mereka lihat.

Untuk mencegah Clickjacking, Anda bisa menggunakan header X-Frame-Options yang bisa diatur oleh Helmet.

Menggunakan X-Frame-Options:
Helmet secara otomatis mengatur X-Frame-Options untuk mencegah aplikasi Anda dimasukkan ke dalam iframe.

javascript
Salin
Edit
app.use(helmet.frameguard({ action: 'deny' }));
Dengan pengaturan ini, aplikasi Anda tidak akan bisa dibuka dalam frame atau iframe, melindungi pengguna dari serangan clickjacking.

Rate Limiting untuk Mencegah Brute Force Attack
Brute force attack adalah metode serangan yang mencoba menebak password atau token API dengan cara mencoba banyak kombinasi. Untuk mencegahnya, Anda bisa menggunakan rate limiting.

Dengan rate limiting, aplikasi Anda akan melindungi diri dari serangan brute force dengan membatasi jumlah permintaan yang dapat dibuat oleh klien dalam jangka waktu tertentu.

teknologi yang digunakan
express
mongoose 
dotenv
helmet
express-rate-limit


