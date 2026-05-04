/**
 * TodayInTech — Book a Demo Lead Capture
 * Google Apps Script Web App
 *
 * HOW TO DEPLOY:
 * 1. Open your Google Sheet → Extensions → Apps Script
 * 2. Paste this entire file, replacing any existing code
 * 3. Click Deploy → New deployment
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Click Deploy → copy the Web App URL
 * 5. Paste that URL into bookademo/index.html where it says APPS_SCRIPT_URL
 *
 * SHEET COLUMNS: Name | Email | Phone | Service | Message | Submitted At
 */

var SPREADSHEET_ID = '1jRmLUN-kbsToxeUs3u1jLT2arYzuzElAYkG8LAbHduc';
var SHEET_NAME     = 'Sheet1';

// ── GET: return all existing emails and phones for duplicate check ──
function doGet(e) {
  try {
    var sheet = SpreadsheetApp
                  .openById(SPREADSHEET_ID)
                  .getSheetByName(SHEET_NAME);

    var lastRow = sheet.getLastRow();

    // No data yet (0 rows or only header row)
    if (lastRow <= 1) {
      return jsonResponse({ emails: [], phones: [] });
    }

    // Columns: A=Name, B=Email, C=Phone (rows 2 onward, skip header)
    var emailCol = sheet.getRange(2, 2, lastRow - 1, 1).getValues(); // col B
    var phoneCol = sheet.getRange(2, 3, lastRow - 1, 1).getValues(); // col C

    var emails = emailCol.map(function(r) { return String(r[0]).toLowerCase().trim(); })
                         .filter(function(v) { return v !== ''; });

    var phones = phoneCol.map(function(r) { return String(r[0]).replace(/\s+/g, '').trim(); })
                         .filter(function(v) { return v !== ''; });

    return jsonResponse({ emails: emails, phones: phones });

  } catch (err) {
    return jsonResponse({ emails: [], phones: [], error: err.message });
  }
}

// ── POST: write a new lead row ──
function doPost(e) {
  try {
    var data  = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp
                  .openById(SPREADSHEET_ID)
                  .getSheetByName(SHEET_NAME);

    // Add header row automatically on first submission
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Name', 'Email', 'Phone', 'Service', 'Message', 'Submitted At']);
    }

    sheet.appendRow([
      data.name        || '',
      data.email       || '',
      data.phone       || '',
      data.serviceNeed || '',
      data.message     || '',
      new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    ]);

    return jsonResponse({ success: true });

  } catch (err) {
    return jsonResponse({ success: false, error: err.message });
  }
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
