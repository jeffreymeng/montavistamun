const { google } = require("googleapis");

const FB_SERVICE_ACCOUNT = JSON.parse(process.env.FB_SERVICE_ACCOUNT);

// https://docs.google.com/spreadsheets/d/--spreadsheetID--/edit#gid=--sheetGID--
//export default async function handler(spreadsheetID, UID, ...data) {
export async function handler(event, context) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: `{"success":false, "code":"method_not_allowed","message":"only POST is allowed"}`,
    };
  }
  if (!event.body) return { statusCode: 400, body: "Invalid parameters." };
	const params = JSON.parse(event.body);
  const {spreadsheetID, UID, ...data} = params;

  try {
    const auth = new google.auth.GoogleAuth({
      keyId: FB_SERVICE_ACCOUNT.private_key_id,
      key: FB_SERVICE_ACCOUNT.private_key,
      email: FB_SERVICE_ACCOUNT.client_email,
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    if (!auth) {
      return {
				statusCode: 403,
				body: `{"success":false, "code":"unauthorized", "message":"unable to authorize"}`,
      };
    }
    const client = await auth.getClient();
    if (!client) {
      return {
				statusCode: 403,
				body: `{"success":false, "code":"unauthorized", "message":"no auth client"}`,
      };
    }

    const googleSheets = google.sheets({ version: "v4", auth: client });
    if (!googleSheets) {
      return {
				statusCode: 403,
				body: `{"success":false, "code":"unauthorized", "message":"unable to create google sheets instance"}`,
      };
    }
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
			body: `{"success":false, "code":"internal_error", "message":"error writing to google sheets"}`,
		};
	}

	return {
		statusCode: 200,
		body: `{"success":true}`,
	};
}
