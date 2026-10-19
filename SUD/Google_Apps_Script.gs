const SPREADSHEET_ID = ""; //Id de la hoja de excel
const HEADERS = ["Fecha", "Nombre(s)", "Apellidos", "Teléfono", "Correo"];

function doPost(e) {
  try {
    const sheet = getSheet();
    const data = readData(e);

    sheet.appendRow([
      new Date(),
      data.nombre || "",
      data.apellidos || "",
      data.telefono || "",
      data.correo || ""
    ]);

    return json({ result: "success", fila: sheet.getLastRow(), recibido: data });
  } catch (err) {
    return json({ result: "error", message: String(err), stack: err && err.stack });
  }
}

function readData(e) {
  if (e && e.parameter && e.parameter.nombre) {
    return e.parameter;
  }

  if (e && e.postData && e.postData.contents) {
    try {
      return JSON.parse(e.postData.contents);
    } catch (err) {
      // no era JSON, seguimos
    }
  }

  return (e && e.parameter) || {};
}

function getSheet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheets()[0];

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  }

  return sheet;
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
