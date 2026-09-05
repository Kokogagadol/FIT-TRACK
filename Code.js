// 1. Fungsi untuk menerima kiriman HTTP POST dari Vercel / Website Luar
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse data JSON yang dikirim via Body dari Vercel
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.tanggal || new Date().toLocaleDateString('id-ID'),
      data.waktu || new Date().toLocaleTimeString('id-ID'),
      data.jenis,
      data.jumlah,
      data.satuan,
      data.durasi,
      data.pace,
      data.catatan
    ]);

    return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// 2. Fungsi Direct untuk Mode internal Apps Script
function saveWorkoutToSheet(data) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow([
    data.tanggal,
    data.waktu,
    data.jenis,
    data.jumlah,
    data.satuan,
    data.durasi,
    data.pace,
    data.catatan
  ]);
  return "OK";
}
