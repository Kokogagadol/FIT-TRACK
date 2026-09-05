function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('FitTrack Pro')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
}

// Fungsi otomatis yang dipanggil langsung oleh aplikasi tanpa butuh URL Web App
function saveWorkoutToSheet(data) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Buat header jika sheet masih kosong
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Tanggal', 'Waktu', 'Latihan', 'Jumlah/Jarak', 'Satuan', 'Durasi', 'Pace', 'Catatan']);
    }
    
    sheet.appendRow([
      data.tanggal || new Date().toLocaleDateString('id-ID'),
      data.waktu || new Date().toLocaleTimeString('id-ID'),
      data.jenis,
      data.jumlah,
      data.satuan,
      data.durasi || '-',
      data.pace || '-',
      data.catatan || ''
    ]);
    
    return { status: 'success' };
  } catch(err) {
    return { status: 'error', message: err.message };
  }
}
