// ============================================================
// CHATBOT LEAD CAPTURE — Google Apps Script Backend
// Dành cho: Landing Page BS. Dũng
// Phiên bản: 2.0 (có interest, intent_level & email cảnh báo hot)
// ============================================================

// ⚠️ CẤU HÌNH — THAY ĐỔI THEO THỰC TẾ CỦA BẠN
const SHEET_ID = '';         // ← Dán SPREADSHEET ID vào đây (lấy từ URL của Google Sheets)
const SHEET_NAME = 'Leads'; // ← Tên sheet (tab) trong file Google Sheets
const ALERT_EMAIL = 'tranminhdung08@gmail.com'; // ← Email nhận cảnh báo khách HOT

// Cấu trúc cột Google Sheets (9 cột):
// A: Thời gian | B: Tên | C: SĐT | D: Email | E: Nguồn | F: Session ID | G: Lịch sử Chat | H: Quan tâm | I: Mức độ

/**
 * Hàm xử lý HTTP POST từ chatbot (Next.js frontend gọi vào)
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    const timestamp   = data.timestamp   || new Date().toLocaleString('vi-VN');
    const name        = data.name        || '';
    const phone       = data.phone       || '';
    const email       = data.email       || '';
    const interest    = data.interest    || '';
    const intent_level = data.intent_level || '';
    const source      = data.source      || '';
    const sessionId   = data.sessionId   || '';
    const chatHistory = data.chatHistory || '';

    // Bỏ qua nếu không có dữ liệu gì
    if (!name && !phone && !email && !interest) {
      return ContentService.createTextOutput(JSON.stringify({ status: 'skipped', reason: 'no_data' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const ss    = SHEET_ID ? SpreadsheetApp.openById(SHEET_ID) : SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    // Tạo header nếu sheet còn trống
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Thời gian', 'Tên', 'SĐT', 'Email', 'Nguồn', 'Session ID', 'Lịch sử Chat', 'Quan tâm', 'Mức độ']);
      // Định dạng header
      const headerRange = sheet.getRange(1, 1, 1, 9);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#1a73e8');
      headerRange.setFontColor('#ffffff');
    }

    // Tìm dòng có cùng Session ID để cập nhật (không tạo dòng trùng lặp)
    const data2D     = sheet.getDataRange().getValues();
    let   targetRow  = -1;

    for (let i = 1; i < data2D.length; i++) {
      if (data2D[i][5] === sessionId) { // Cột F (index 5) = Session ID
        targetRow = i + 1; // Chuyển sang 1-indexed
        break;
      }
    }

    if (targetRow > 0) {
      // ── CẬP NHẬT dòng cũ ──
      const row = sheet.getRange(targetRow, 1, 1, 9);
      const existing = row.getValues()[0];

      row.setValues([[
        timestamp,
        name        || existing[1],
        phone       || existing[2],
        email       || existing[3],
        source      || existing[4],
        sessionId,
        chatHistory || existing[6],
        interest    || existing[7],
        intent_level || existing[8],
      ]]);
    } else {
      // ── THÊM DÒNG MỚI ──
      sheet.appendRow([timestamp, name, phone, email, source, sessionId, chatHistory, interest, intent_level]);
      targetRow = sheet.getLastRow();
    }

    // ── Tô màu dòng theo intent_level ──
    const rowRange = sheet.getRange(targetRow, 1, 1, 9);
    if (intent_level === 'hot') {
      rowRange.setBackground('#fce8e6'); // Đỏ nhạt
    } else if (intent_level === 'warm') {
      rowRange.setBackground('#fef7e0'); // Vàng nhạt
    } else {
      rowRange.setBackground('#ffffff');
    }

    // ── GỬI EMAIL CẢNH BÁO khi intent_level = "hot" ──
    if (intent_level === 'hot' && (name || phone || email)) {
      sendHotLeadAlert(name, phone, email, interest, timestamp);
    }

    return ContentService.createTextOutput(JSON.stringify({ status: 'ok', row: targetRow }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    console.error('doPost error:', err);
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Gửi email cảnh báo nội bộ khi có khách HOT
 */
function sendHotLeadAlert(name, phone, email, interest, timestamp) {
  try {
    const subject = '📢 KHÁCH HÀNG NÓNG - CẦN LIÊN HỆ NGAY!';
    const body    = `
📢 KHÁCH HÀNG NÓNG - CẦN LIÊN HỆ NGAY!
==========================================

Tên:        ${name || '(chưa có)'}
SĐT:        ${phone || '(chưa có)'}
Email:      ${email || '(chưa có)'}
Quan tâm:   ${interest || '(chưa rõ)'}
Thời gian:  ${timestamp}

==========================================
Vui lòng liên hệ khách hàng này trong vòng 30 phút!

(Email tự động từ hệ thống Chatbot BS. Dũng)
    `.trim();

    GmailApp.sendEmail(ALERT_EMAIL, subject, body);
    console.log('✅ Đã gửi email cảnh báo HOT lead:', name, phone);
  } catch (err) {
    console.error('Lỗi gửi email cảnh báo:', err);
  }
}

/**
 * Hàm xử lý HTTP GET (dùng để test bằng trình duyệt)
 */
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'ok',
    message: 'Chatbot Lead API v2.0 — BS. Dũng',
    timestamp: new Date().toLocaleString('vi-VN')
  })).setMimeType(ContentService.MimeType.JSON);
}
