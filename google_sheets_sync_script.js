/**
 * Google Apps Script - Auto Sync Webhook for Space Seller & Store Orders
 * Health2026 Store
 * 
 * Instructions:
 * 1. Open your Google Sheet.
 * 2. Go to Extensions > Apps Script.
 * 3. Replace all existing code with this file.
 * 4. Click Deploy > New deployment > Select 'Web app'.
 * 5. Set 'Execute as' = Me, and 'Who has access' = Anyone.
 * 6. Click Deploy, copy the Web App URL (ends with /exec), and paste it in orders.html settings.
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Auto-create Header row if the sheet is completely empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "رقم الطلب (Order ID)",
        "تاريخ الطلب (Date)",
        "اسم العميل (Customer Name)",
        "رقم الهاتف (Phone)",
        "المدينة (City)",
        "العنوان (Address)",
        "اسم المنتج (Product)",
        "رمز المنتج (SKU)",
        "الكمية (Qty)",
        "المبلغ الإجمالي (Price MAD)",
        "حالة الطلب (Status)",
        "المصدر (Source)"
      ]);
      
      // Style Header
      var headerRange = sheet.getRange(1, 1, 1, 12);
      headerRange.setBackground("#1e293b");
      headerRange.setFontColor("#ffffff");
      headerRange.setFontWeight("bold");
      headerRange.setHorizontalAlignment("center");
      sheet.setFrozenRows(1);
    }

    var data = {};
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        data = e.parameter || {};
      }
    } else {
      data = e.parameter || {};
    }

    var orderId = data.order_id || data.id || ("ORD-" + Math.floor(10000 + Math.random() * 90000));
    var dateStr = data.created_at || new Date().toLocaleString('ar-MA', { timeZone: 'Africa/Casablanca' });
    var customerName = data.customer_name || data.name || "عميل غير معروف";
    var phoneStr = "'" + String(data.phone || "").trim(); // Keep leading 0
    var city = data.city || "غير محدد";
    var address = data.address || "";
    var productName = data.product_name || data.product || "Curvy Shape Protein";
    var sku = data.sku || data.product_sku || "fem-boost250g";
    var qty = Number(data.quantity || data.qty || 1);
    var price = Number(data.price || 279);
    var status = data.status || "جديد (بانتظار التأكيد)";
    var source = data.source || "Landing Page";

    // Append the order row
    sheet.appendRow([
      orderId,
      dateStr,
      customerName,
      phoneStr,
      city,
      address,
      productName,
      sku,
      qty,
      price,
      status,
      source
    ]);

    // Format new row alignment
    var newRow = sheet.getLastRow();
    sheet.getRange(newRow, 1, 1, 12).setHorizontalAlignment("right");
    sheet.getRange(newRow, 1).setHorizontalAlignment("center"); // Order ID
    sheet.getRange(newRow, 4).setHorizontalAlignment("center"); // Phone
    sheet.getRange(newRow, 8).setHorizontalAlignment("center"); // SKU
    sheet.getRange(newRow, 9).setHorizontalAlignment("center"); // Qty
    sheet.getRange(newRow, 10).setHorizontalAlignment("center"); // Price

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Order successfully synced to Google Sheet",
      order_id: orderId,
      sku: sku
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "online",
    service: "Space Seller & Google Sheets Sync Service",
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}
