const { FB_SERVICE_ACCOUNT } = process.env;

const database = import("./fbUtils.js");
const admin = require("firebase-admin");
admin.initializeApp({
	credential: admin.credential.cert(FB_SERVICE_ACCOUNT),
	databaseURL: "https://montavistamodelun.firebaseio.com",
});
export async function handler(event, context) {
	if (event.httpMethod !== "POST") {
		return {
			statusCode: 405,
			body: `{"success":false, "code":"method_not_allowed","message":"only POST is allowed"}`,
		};
	}
	if (!event.body)
		return {
			statusCode: 400,
			body: `{"success":false, "code":"no_body","message":"No request body was found."}`,
		};
	const params = JSON.parse(event.body);
	const { token, targetUID, newPermissions } = params;
	if (!token || !targetUID || !newPermissions) {
		return {
			statusCode: 400,
			body: `{"success":false, "code":"invalid_parameters", "message":"One or more POST parameters were missing or malformed."}`,
		};
	}

	// verify caller
	try {
		const decodedToken = await admin.auth().verifyIdToken(token);
		const callerUid = decodedToken.uid;

		// they must either have the admin claim or be an admin according to the database
		if (!decodedToken.admin) {
			// check database
			const callerData = await database.get(`/users/${callerUid}`);

			console.log(JSON.stringify(callerData));

			if (!callerData.admin) {
				return {
					statusCode: 403,
					body: `{"success":false, "code":"invalid_token", "message":"The provided auth token was not that of an administrator."}`,
				};
			}
		}
	} catch (error) {
		console.log(error);
		return {
			statusCode: 403,
			body: `{"success":false, "code":"invalid_token", "message":"The provided auth token was unable to be verified.", "error":${JSON.stringify(
				error
			)}}`,
		};
	}

	// perform updates
	try {
		const modifiedClaims = {};

		if (typeof newPermissions.verified === "boolean")
			modifiedClaims.verified = newPermissions.verified;
		if (typeof newPermissions.admin === "boolean")
			modifiedClaims.admin = newPermissions.admin;

		const targetUserRecord = await admin.auth().getUser(targetUID);
		const existingClaims = targetUserRecord.customClaims;
		const finalClaims = {
			...existingClaims,
			...modifiedClaims,
		};
		await Promise.all([
			admin.auth().setCustomUserClaims(targetUID, finalClaims),
			database.update(`/users/${targetUID}`, finalClaims),
		]);

		return {
			statusCode: 200,
			body: `{"success":true, "finalClaims":${JSON.stringify(
				finalClaims
			)}}`,
		};
	} catch (error) {
		console.log(error);
		return {
			statusCode: 500,
			body: `{"success":false, "code":"internal_error", "message":"The server encountered an internal error while modifying the claims."}`,
		};
	}
}
