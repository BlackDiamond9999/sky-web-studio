const SHEET_NAME = 'Leads';
const HEADERS = [
  'createdAt','id','type','name','phone','email','company','industry','websiteType','pageCount','features','multilingual','budget','timeline','preferredDate','preferredTime','goal','notes','page','source','website','ip','userAgent'
];

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || '{}');
    const sheet = getOrCreateSheet_();
    ensureHeaders_(sheet, body.headers || HEADERS);

    const row = Array.isArray(body.row) ? body.row : toRowFromLead_(body.lead || {});
    sheet.appendRow(row);

    return json_({ ok: true, appended: true, rowCount: 1 });
  } catch (error) {
    return json_({ ok: false, error: String(error) });
  }
}

function getOrCreateSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  return sheet;
}

function ensureHeaders_(sheet, headers) {
  const firstRow = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  const empty = firstRow.every((cell) => !cell);
  if (empty) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
  }
}

function toRowFromLead_(lead) {
  return HEADERS.map((key) => {
    const value = lead[key];
    if (Array.isArray(value)) return value.join(', ');
    if (typeof value === 'boolean') return value ? 'yes' : 'no';
    return value || '';
  });
}

function json_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
