//import { google } from "googleapis";
//const express = require("express");
//import { google } from "googleapis";
//const {google} = require("googleapis");
//const app = express(); 

const GOOGLE_SERVICE_ACCOUNT = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT ?? "");

// https://docs.google.com/spreadsheets/d/--spreadsheetID--/edit#gid=--sheetGID--
export default async function WriteToGForm(spreadsheetID: string, UID: string, ...data : string[]): Promise<void> {

  /*
    const auth = new google.auth.GoogleAuth({
      keyId: GOOGLE_SERVICE_ACCOUNT.private_key_id,
      key: GOOGLE_SERVICE_ACCOUNT.private_key,
      email: GOOGLE_SERVICE_ACCOUNT.email,
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    const client = await auth.getClient();
    
    const googleSheets = google.sheets({version: "v4", auth: client});
    //appends a row with all the user data
    const dataRow = { values: [...data, UID] };
    await googleSheets.spreadsheets.values.append({
      spreadsheetId: spreadsheetID,
      range: "A1",
      requestBody: dataRow,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
    });
  console.log("spreadsheet");
  */
  return;
}
