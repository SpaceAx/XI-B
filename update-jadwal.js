const fs = require('fs');
const moment = require('moment');

const filePath = 'jadwal.json';

// Baca jadwal.json
let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Tambahkan jadwal baru
const newSchedule = {
  id: data.length + 1,
  tanggal_pembuatan: moment().format('YYYY-MM-DD HH:mm:ss'),
  tugas: "Tugas baru otomatis",
};

data.push(newSchedule);

// Simpan kembali ke jadwal.json
fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

console.log("Jadwal berhasil diperbarui!");
