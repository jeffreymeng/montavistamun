let { FB_SERVICE_ACCOUNT } = process.env;
FB_SERVICE_ACCOUNT = JSON.parse(FB_SERVICE_ACCOUNT);
const admin = require("firebase-admin");
const jwt = require("jsonwebtoken");
admin.initializeApp({
	credential: admin.credential.cert(FB_SERVICE_ACCOUNT),
	databaseURL: "https://montavistamodelun.firebaseio.com",
});

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

	const response = await Axios.patch(
		`https://firestore.googleapis.com/v1beta1/projects/montavistamodelun/databases/(default)/documents/hello/world?updateMask.fieldPaths=hello&updateMask.fieldPaths=id`,
		{
			hello: true,
			id,
		},
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);

	return {
		statusCode: 200,
		body: `{"success":true,"message":"done with id ${id}", "response":${JSON.stringify(
			response
		)}`,
	};
}
