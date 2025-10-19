const mysql = require('mysql2/promise');
require('dotenv').config();

// Konfigurasi koneksi untuk database kalender_gereja
const kalenderPool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: 'kalender_gereja',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test koneksi
kalenderPool.getConnection()
  .then(connection => {
    console.log('✅ Connected to kalender_gereja database');
    connection.release();
  })
  .catch(err => {
    console.error('❌ Error connecting to kalender_gereja database:', err.message);
  });

module.exports = kalenderPool;
