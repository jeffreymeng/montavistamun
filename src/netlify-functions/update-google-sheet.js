const { google } = require("googleapis");


// https://docs.google.com/spreadsheets/d/--spreadsheetID--/edit#gid=--sheetGID--
//export default async function handler(spreadsheetID, UID, ...data) {
export async function handler(event, context) {
  console.log("start");
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: `{"success":false, "code":"method_not_allowed","message":"only POST is allowed"}`,
    };
  }
  if (!event.body) return { statusCode: 400, body: "Invalid parameters." };
	const params = JSON.parse(event.body);
  const {spreadsheetID, UID, ...data} = params;

  console.log("processed variables");
  const FB_SERVICE_ACCOUNT = JSON.parse(process.env.FB_SERVICE_ACCOUNT);
  console.log(FB_SERVICE_ACCOUNT);
  try {
    const client = google.auth.fromJSON({FB_SERVICE_ACCOUNT});
    if (!client) {
      return {
				statusCode: 403,
				body: `{"success":false, "code":"unauthorized", "message":"no auth client"}`,
      };
    }
    client.scopes = ["https://www.googleapis.com/auth/spreadsheets"];
    console.log("no client");

    const googleSheets = google.sheets({ version: "v4", auth: client });
    if (!googleSheets) {
      return {
				statusCode: 403,
				body: `{"success":false, "code":"unauthorized", "message":"unable to create google sheets instance"}`,
      };
    }
    console.log("has sheets");
    //appends a row with all the user data
    if (!data || !UID) {
      return {
				statusCode: 400,
				body: `{"success":false, "code":"unauthorized", "message":"params not valid"}`,
      };
    }
    const dataRow = { values: [...data, UID] };
    const res = await googleSheets.spreadsheets.values.append({
      spreadsheetId: spreadsheetID,
      range: "A1",
      requestBody: dataRow,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
    });
    console.log("put data on sheets")
    if (!res) {
      return {
        statusCode: 500,
        body: `{"success":false, "code":"internal_error", "message":"Did not append values successfully"}`,
      };
    }
    console.log("spreadsheet");
	} catch (error) {
		console.log("INTERNAL ERROR", error);
		return {
			statusCode: 500,
			body: `{"success":false, "code":"internal_error", "message":""}`,
		};
	}

	return {
		statusCode: 200,
		body: `{"success":true}`,
	};
}
