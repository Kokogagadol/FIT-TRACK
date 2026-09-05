function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('FitTrack Pro')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
}

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Otomatis buat baris judul jika sheet masih kosong
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
    
    return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}