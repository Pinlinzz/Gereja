-- Data Sample untuk Gereja Damai Kristus - Finance Module
USE gereja_damai_kristus;

-- Insert kategori standar
INSERT INTO finance_categories (name, type, description) VALUES
('Persembahan', 'income', 'Persembahan minggu reguler'),
('Perpuluhan', 'income', 'Persepuluhan dari jemaat'),
('Sumbangan Khusus', 'income', 'Sumbangan untuk keperluan khusus'),
('Building Fund', 'income', 'Dana pembangunan gereja'),
('Operasional', 'expense', 'Biaya operasional gereja'),
('Gaji', 'expense', 'Gaji petugas dan staff'),
('Utilitas', 'expense', 'Listrik, air, internet'),
('Pemeliharaan', 'expense', 'Pemeliharaan gedung dan fasilitas'),
('Program Gereja', 'expense', 'Biaya program dan kegiatan'),
('Sosial', 'expense', 'Bantuan sosial dan pelayanan masyarakat')
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- Insert data transaksi sample untuk 6 bulan terakhir
-- Januari 2025
INSERT INTO finance (date, description, type, category, amount, notes) VALUES
-- Pemasukan Januari
('2025-01-05', 'Persembahan Minggu I', 'income', 'Persembahan', 4500000, 'Ibadah minggu pertama'),
('2025-01-12', 'Persembahan Minggu II', 'income', 'Persembahan', 5200000, 'Ibadah minggu kedua'),
('2025-01-19', 'Persembahan Minggu III', 'income', 'Persembahan', 4800000, 'Ibadah minggu ketiga'),
('2025-01-26', 'Persembahan Minggu IV', 'income', 'Persembahan', 5100000, 'Ibadah minggu keempat'),
('2025-01-15', 'Sumbangan Pembangunan', 'income', 'Building Fund', 3000000, 'Sumbangan untuk renovasi'),
('2025-01-20', 'Perpuluhan Jemaat', 'income', 'Perpuluhan', 2500000, 'Perpuluhan bulan Januari'),

-- Pengeluaran Januari
('2025-01-05', 'Gaji Petugas Gereja', 'expense', 'Gaji', 4000000, 'Gaji bulan Januari'),
('2025-01-10', 'Biaya Listrik', 'expense', 'Utilitas', 1500000, 'Tagihan listrik Desember'),
('2025-01-10', 'Biaya Air', 'expense', 'Utilitas', 500000, 'Tagihan air Desember'),
('2025-01-15', 'Pembelian Perlengkapan Ibadah', 'expense', 'Operasional', 800000, 'Lilin, kain altar, dll'),
('2025-01-20', 'Service AC', 'expense', 'Pemeliharaan', 1200000, 'Service AC rutin'),
('2025-01-25', 'Bantuan Sosial', 'expense', 'Sosial', 1000000, 'Bantuan untuk keluarga tidak mampu'),

-- Februari 2025
('2025-02-02', 'Persembahan Minggu I', 'income', 'Persembahan', 4800000, 'Ibadah minggu pertama'),
('2025-02-09', 'Persembahan Minggu II', 'income', 'Persembahan', 5500000, 'Ibadah minggu kedua'),
('2025-02-16', 'Persembahan Minggu III', 'income', 'Persembahan', 5100000, 'Ibadah minggu ketiga'),
('2025-02-23', 'Persembahan Minggu IV', 'income', 'Persembahan', 5300000, 'Ibadah minggu keempat'),
('2025-02-10', 'Sumbangan Khusus', 'income', 'Sumbangan Khusus', 2000000, 'Untuk program natal'),
('2025-02-15', 'Building Fund', 'income', 'Building Fund', 1500000, 'Dana pembangunan'),

('2025-02-05', 'Gaji Petugas Gereja', 'expense', 'Gaji', 4000000, 'Gaji bulan Februari'),
('2025-02-10', 'Biaya Listrik', 'expense', 'Utilitas', 1600000, 'Tagihan listrik Januari'),
('2025-02-10', 'Biaya Air', 'expense', 'Utilitas', 520000, 'Tagihan air Januari'),
('2025-02-12', 'Pembelian Sound System', 'expense', 'Operasional', 3000000, 'Upgrade sound system'),
('2025-02-20', 'Program Retreat', 'expense', 'Program Gereja', 2500000, 'Biaya retreat jemaat'),

-- Maret 2025
('2025-03-02', 'Persembahan Minggu I', 'income', 'Persembahan', 4200000, NULL),
('2025-03-09', 'Persembahan Minggu II', 'income', 'Persembahan', 4900000, NULL),
('2025-03-16', 'Persembahan Minggu III', 'income', 'Persembahan', 4600000, NULL),
('2025-03-23', 'Persembahan Minggu IV', 'income', 'Persembahan', 5100000, NULL),
('2025-03-30', 'Persembahan Minggu V', 'income', 'Persembahan', 4800000, NULL),

('2025-03-05', 'Gaji Petugas Gereja', 'expense', 'Gaji', 4000000, 'Gaji bulan Maret'),
('2025-03-10', 'Biaya Listrik', 'expense', 'Utilitas', 1550000, NULL),
('2025-03-10', 'Biaya Air', 'expense', 'Utilitas', 510000, NULL),
('2025-03-15', 'Cat Gedung', 'expense', 'Pemeliharaan', 3500000, 'Pengecatan eksterior'),

-- April 2025
('2025-04-06', 'Persembahan Minggu I', 'income', 'Persembahan', 5200000, NULL),
('2025-04-13', 'Persembahan Minggu II', 'income', 'Persembahan', 5800000, NULL),
('2025-04-20', 'Persembahan Minggu III', 'income', 'Persembahan', 5400000, NULL),
('2025-04-27', 'Persembahan Minggu IV', 'income', 'Persembahan', 5700000, NULL),

('2025-04-05', 'Gaji Petugas Gereja', 'expense', 'Gaji', 4000000, 'Gaji bulan April'),
('2025-04-10', 'Biaya Listrik', 'expense', 'Utilitas', 1650000, NULL),
('2025-04-10', 'Biaya Air', 'expense', 'Utilitas', 530000, NULL),
('2025-04-15', 'Program Paskah', 'expense', 'Program Gereja', 4000000, 'Perayaan Paskah'),

-- Mei 2025
('2025-05-04', 'Persembahan Minggu I', 'income', 'Persembahan', 5000000, NULL),
('2025-05-11', 'Persembahan Minggu II', 'income', 'Persembahan', 5300000, NULL),
('2025-05-18', 'Persembahan Minggu III', 'income', 'Persembahan', 5100000, NULL),
('2025-05-25', 'Persembahan Minggu IV', 'income', 'Persembahan', 5400000, NULL),

('2025-05-05', 'Gaji Petugas Gereja', 'expense', 'Gaji', 4000000, 'Gaji bulan Mei'),
('2025-05-10', 'Biaya Listrik', 'expense', 'Utilitas', 1600000, NULL),
('2025-05-10', 'Biaya Air', 'expense', 'Utilitas', 520000, NULL),
('2025-05-15', 'Renovasi Toilet', 'expense', 'Pemeliharaan', 3500000, NULL),

-- Juni 2025
('2025-06-01', 'Persembahan Minggu I', 'income', 'Persembahan', 4700000, NULL),
('2025-06-08', 'Persembahan Minggu II', 'income', 'Persembahan', 5100000, NULL),
('2025-06-15', 'Persembahan Minggu III', 'income', 'Persembahan', 4900000, NULL),
('2025-06-22', 'Persembahan Minggu IV', 'income', 'Persembahan', 5200000, NULL),

('2025-06-05', 'Gaji Petugas Gereja', 'expense', 'Gaji', 4000000, 'Gaji bulan Juni'),
('2025-06-10', 'Biaya Listrik', 'expense', 'Utilitas', 1580000, NULL),
('2025-06-10', 'Biaya Air', 'expense', 'Utilitas', 515000, NULL),
('2025-06-20', 'Program Anak-Anak', 'expense', 'Program Gereja', 2000000, 'VBS - Vacation Bible School');

-- Update monthly summary
INSERT INTO monthly_summary (year, month, total_income, total_expense, balance)
SELECT 
    YEAR(date) as year,
    MONTH(date) as month,
    SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as total_income,
    SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as total_expense,
    SUM(CASE WHEN type = 'income' THEN amount ELSE -amount END) as balance
FROM finance
GROUP BY YEAR(date), MONTH(date)
ON DUPLICATE KEY UPDATE
    total_income = VALUES(total_income),
    total_expense = VALUES(total_expense),
    balance = VALUES(balance);
