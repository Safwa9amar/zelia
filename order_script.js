function doPost(e) {
  return handleRequest(e);
}

function doGet(e) {
  console.log("do request from api");
  return handleRequest(e);
}

function handleRequest(e) {
  const sheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName("zelia_orders");

  const data = e?.postData ? JSON.parse(e.postData.contents) : {};

  // wilayaId is now passed directly as part of the form state
  const wilayaId = data.wilayaId ? Number(data.wilayaId) : null;

  const deliveryPrice = getDeliveryPriceByWilayaId(
    wilayaId,
    data.deliveryType === "home" ? "home" : "office",
  );

  // Updated order of columns to include new details
  sheet.appendRow([
    data.productName || "Unknown Product",
    data.fullName || "",
    data.phone || "",
    data.wilayaName || "", // e.g., "قسنطينة"
    data.commune || "", // new: Commune/Town
    data.address || "",
    data.color || "", // new: Product Color
    data.size || "", // new: Product Size
    data.quantity || "1",
    data.deliveryType || "", // "home" or "office"
    deliveryPrice, // calculated delivery price
    new Date(), // Timestamp
    "Processing", // Status
  ]);

  return ContentService.createTextOutput("success").setMimeType(
    ContentService.MimeType.TEXT,
  );
}

function getDeliveryPriceByWilayaId(wilayaId, deliveryType) {
  const sheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName("delivery_prices");

  if (!sheet || !wilayaId) return 0;

  const rows = sheet.getDataRange().getValues();

  for (let i = 1; i < rows.length; i++) {
    const id = Number(rows[i][0]); // column A: id

    if (id === wilayaId) {
      if (deliveryType === "home") {
        return rows[i][2] || 0; // homeDelivery (Column C)
      } else {
        return rows[i][3] || 0; // stopDesk (Column D)
      }
    }
  }

  return 0;
}
