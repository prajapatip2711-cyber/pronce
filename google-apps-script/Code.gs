const SHEETS = ["Products", "Website Orders", "Physical Orders", "Customers", "Enquiries", "Testimonials", "Newsletter", "Inventory", "Admin Logs", "Settings"];

function setup() {
  const book = SpreadsheetApp.getActive();
  SHEETS.forEach(name => { if (!book.getSheetByName(name)) book.insertSheet(name); });
  const order = book.getSheetByName("Physical Orders");
  if (order.getLastRow() === 0) order.appendRow(["Created", "Order ID", "Status", "Customer", "Email", "Phone", "Items", "Address", "City", "State", "PIN", "Payment", "Notes"]);
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    if (!SHEETS.includes(body.sheet)) throw new Error("Unknown sheet");
    const payload = body.payload || {};
    const row = body.sheet === "Physical Orders"
      ? [body.createdAt, payload.orderId, payload.status, payload.name, payload.email, payload.phone, JSON.stringify(payload.items), payload.address, payload.city, payload.state, payload.pinCode, payload.payment, payload.message || ""]
      : [body.createdAt, ...Object.values(payload)];
    SpreadsheetApp.getActive().getSheetByName(body.sheet).appendRow(row);
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: error.message })).setMimeType(ContentService.MimeType.JSON);
  }
}
