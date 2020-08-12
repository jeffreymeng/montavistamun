const { FB_SERVICE_ACCOUNT } = process.env;
const admin = require("firebase-admin");
admin.initializeApp({
	credential: admin.credential.cert(JSON.parse(FB_SERVICE_ACCOUNT)),
	databaseURL: "https://montavistamodelun.firebaseio.com",
});
export async function handler(event, context) {
	const id = Math.floor(Math.random() * 10000000 + 1);

	await admin
		.firestore()
		.collection("hello")
		.doc("world")
		.set({ hi: true, id });
	return {
		statusCode: 200,
		body: `done with id ${id}`,
	};
}
