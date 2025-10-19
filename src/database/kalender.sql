-- Database untuk Kalender Gereja
DROP DATABASE IF EXISTS kalender_gereja;
CREATE DATABASE kalender_gereja CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE kalender_gereja;

-- Tabel untuk menyimpan jadwal kegiatan gereja
CREATE TABLE `jadwal_kegiatan` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nama_kegiatan` VARCHAR(255) NOT NULL,
  `deskripsi` TEXT NULL,
  `kategori` ENUM('Misa & Liturgi', 'Kegiatan Komunitas', 'Doa & Devosi', 'Pastoral & Acara Khusus') NOT NULL,
  `waktu_mulai` DATETIME NOT NULL,
  `waktu_selesai` DATETIME NULL,
  `lokasi` VARCHAR(100) DEFAULT 'Gereja Utama',
  `penanggung_jawab` VARCHAR(100) NULL,
  `kontak` VARCHAR(100) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Data sample: Jadwal kegiatan 1-12 Oktober 2025
INSERT INTO `jadwal_kegiatan` 
  (`nama_kegiatan`, `deskripsi`, `kategori`, `waktu_mulai`, `waktu_selesai`, `lokasi`, `penanggung_jawab`)
VALUES
  -- Rabu, 1 Oktober 2025 (Pembukaan Bulan Rosario)
  ('Misa Harian Pagi', 'Misa harian biasa.', 'Misa & Liturgi', '2025-10-01 06:00:00', '2025-10-01 06:45:00', 'Gereja Utama', 'Romo Paroki'),
  ('Doa Rosario Pembukaan Bulan Rosario', 'Doa Rosario bersama umat untuk membuka Bulan Rosario.', 'Doa & Devosi', '2025-10-01 19:00:00', '2025-10-01 20:00:00', 'Gua Maria', 'Legio Maria'),

  -- Kamis, 2 Oktober 2025
  ('Misa Harian Pagi', 'Misa harian biasa.', 'Misa & Liturgi', '2025-10-02 06:00:00', '2025-10-02 06:45:00', 'Gereja Utama', 'Romo Paroki'),
  ('Rapat Pengurus Lingkungan St. Yusuf', 'Rapat bulanan membahas program lingkungan.', 'Kegiatan Komunitas', '2025-10-02 20:00:00', '2025-10-02 21:00:00', 'Ruang Rapat St. Yusuf', 'Ketua Lingkungan'),

  -- Jumat, 3 Oktober 2025 (Jumat Pertama)
  ('Misa Jumat Pertama & Adorasi', 'Misa Hati Kudus Yesus dilanjutkan dengan Adorasi Sakramen Mahakudus.', 'Misa & Liturgi', '2025-10-03 18:00:00', '2025-10-03 20:00:00', 'Gereja Utama', 'Romo Paroki'),

  -- Sabtu, 4 Oktober 2025 (Pesta Nama St. Fransiskus Asisi)
  ('Sakramen Pengakuan Dosa', 'Tersedia imam untuk pengakuan dosa.', 'Pastoral & Acara Khusus', '2025-10-04 16:00:00', '2025-10-04 17:30:00', 'Ruang Pengakuan Dosa', 'Romo Rekan'),
  ('Misa Sabtu Sore (Vigili Minggu)', 'Misa Pesta St. Fransiskus Asisi, Pelindung Hewan. Ada pemberkatan hewan peliharaan setelah misa.', 'Misa & Liturgi', '2025-10-04 18:00:00', '2025-10-04 19:15:00', 'Gereja Utama', 'Romo Paroki'),
  ('Pertemuan OMK', 'Sharing dan games bersama Orang Muda Katolik.', 'Kegiatan Komunitas', '2025-10-04 19:30:00', '2025-10-04 21:00:00', 'Aula Paroki', 'Seksi Kepemudaan'),

  -- Minggu, 5 Oktober 2025 (HARI MINGGU BIASA XXVII)
  ('Misa Minggu Pagi I', 'Misa mingguan untuk umat.', 'Misa & Liturgi', '2025-10-05 07:00:00', '2025-10-05 08:15:00', 'Gereja Utama', 'Romo Paroki'),
  ('Sekolah Minggu / Bina Iman Anak', 'Kegiatan belajar dan bermain untuk anak-anak.', 'Kegiatan Komunitas', '2025-10-05 09:00:00', '2025-10-05 10:30:00', 'Gedung Karya Pastoral', 'Seksi Katekese'),
  ('Misa Minggu Pagi II (Misa Keluarga)', 'Misa mingguan dengan koor anak-anak.', 'Misa & Liturgi', '2025-10-05 09:00:00', '2025-10-05 10:15:00', 'Gereja Utama', 'Romo Rekan'),
  ('Misa Minggu Sore', 'Misa mingguan untuk umat.', 'Misa & Liturgi', '2025-10-05 17:00:00', '2025-10-05 18:15:00', 'Gereja Utama', 'Romo Paroki'),

  -- Selasa, 7 Oktober 2025 (Pesta SP Maria Ratu Rosario)
  ('Doa Rosario Meriah', 'Doa Rosario bersama dengan perarakan patung Bunda Maria di halaman gereja.', 'Doa & Devosi', '2025-10-07 19:00:00', '2025-10-07 20:30:00', 'Gereja & Halaman', 'Legio Maria'),

  -- Jumat, 10 Oktober 2025
  ('Latihan Koor OMK', 'Persiapan tugas koor untuk Misa Minggu.', 'Kegiatan Komunitas', '2025-10-10 19:30:00', '2025-10-10 21:00:00', 'Aula Paroki', 'Seksi Musik Liturgi'),

  -- Sabtu, 11 Oktober 2025
  ('Kursus Persiapan Perkawinan (Hari 1)', 'Sesi pertama KPP bagi para calon mempelai.', 'Pastoral & Acara Khusus', '2025-10-11 08:00:00', '2025-10-11 17:00:00', 'Gedung Karya Pastoral', 'Seksi Kerasulan Keluarga'),
  ('Misa Sabtu Sore (Vigili Minggu)', 'Misa mingguan untuk umat.', 'Misa & Liturgi', '2025-10-11 18:00:00', '2025-10-11 19:15:00', 'Gereja Utama', 'Romo Rekan'),

  -- Minggu, 12 Oktober 2025 (HARI MINGGU BIASA XXVIII)
  ('Kursus Persiapan Perkawinan (Hari 2)', 'Sesi kedua KPP bagi para calon mempelai.', 'Pastoral & Acara Khusus', '2025-10-12 08:00:00', '2025-10-12 17:00:00', 'Gedung Karya Pastoral', 'Seksi Kerasulan Keluarga'),
  ('Misa Minggu Pagi I', 'Misa mingguan untuk umat.', 'Misa & Liturgi', '2025-10-12 07:00:00', '2025-10-12 08:15:00', 'Gereja Utama', 'Romo Rekan'),
  ('Misa Minggu Pagi II', 'Misa mingguan untuk umat.', 'Misa & Liturgi', '2025-10-12 09:00:00', '2025-10-12 10:15:00', 'Gereja Utama', 'Romo Paroki'),
  ('Misa Minggu Sore', 'Misa mingguan untuk umat.', 'Misa & Liturgi', '2025-10-12 17:00:00', '2025-10-12 18:15:00', 'Gereja Utama', 'Romo Paroki');
