let { FB_SERVICE_ACCOUNT } = process.env;
FB_SERVICE_ACCOUNT = JSON.parse(FB_SERVICE_ACCOUNT);
const admin = require("firebase-admin");
admin.initializeApp({
	credential: admin.credential.cert(FB_SERVICE_ACCOUNT),
	databaseURL: "https://montavistamodelun.firebaseio.com",
});
const axios = require("axios").default;

const jwt = require("jsonwebtoken");

export async function handler(event, context) {
	const id = Math.floor(Math.random() * 10000000 + 1);

	const response = await update("/hello/world", {
		hello: true,
		id: id,
		time: currentTimestamp(),
	});
	const getResponse = await get("/hello/world");
	return {
		statusCode: 200,
		body: `{"success":true,"message":"done with id ${id}", "response":"${JSON.stringify(
			response.data
		)}", "getTest":${JSON.stringify(getResponse.data)}}`,
	};
}
