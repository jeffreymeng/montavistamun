let { FB_SERVICE_ACCOUNT } = process.env;
FB_SERVICE_ACCOUNT = JSON.parse(FB_SERVICE_ACCOUNT);
const admin = require("firebase-admin");
admin.initializeApp({
	credential: admin.credential.cert(JSON.parse(FB_SERVICE_ACCOUNT)),
	databaseURL: "https://montavistamodelun.firebaseio.com",
});
const axios = require("axios").default;

const jwt = require("jsonwebtoken");

export async function handler(event, context) {
	const id = Math.floor(Math.random() * 10000000 + 1);

	// generate a jwt
	const token = jwt.sign(
		{
			iss: FB_SERVICE_ACCOUNT.client_email,
			sub: FB_SERVICE_ACCOUNT.client_email,
			aud: "https://firestore.googleapis.com/",
		},
		FB_SERVICE_ACCOUNT.private_key,
		{
			algorithm: "RS256",
			keyid: FB_SERVICE_ACCOUNT.private_key_id,
			expiresIn: "1h",
		}
	);

	const response = await axios.patch(
		`https://firestore.googleapis.com/v1/projects/montavistamodelun/databases/(default)/documents${path}?${Object.keys(
			fields
		)
			.map((name) => `updateMask.fieldPaths=${name}`)
			.join("&")}`,
		{
			fields: {
				hello: { booleanValue: true },
				id: { integerValue: id },
				time: { ".sv": "timestamp" },
			},
		},
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
			responseType: "text",
			transformResponse: (data) => data,
		}
	);

	return {
		statusCode: 200,
		body: `{"success":true,"message":"done with id ${id}", "response":"${JSON.stringify(
			response
		)}"`,
	};
}
