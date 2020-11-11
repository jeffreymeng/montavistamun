const FB_SERVICE_ACCOUNT = JSON.parse(process.env.FB_SERVICE_ACCOUNT);

const database = require("./utils/fbUtils");
const admin = require("firebase-admin");
if (admin.apps.length === 0) {
	admin.initializeApp({
		credential: admin.credential.cert(FB_SERVICE_ACCOUNT),
		databaseURL: "https://montavistamodelun.firebaseio.com",
	});
}

export async function handler(event, context) {
	if (event.httpMethod !== "GET") {
		return {
			statusCode: 405,
			body: `{"success":false, "code":"method_not_allowed","message":"only GET is allowed"}`,
		};
	}

	const token = event.headers?.authorization?.replace("Bearer ", "");
	if (!token) {
		return {
			statusCode: 403,
			body: JSON.stringify({
				success: false,
				code: "unauthorized",
				message: "Missing an auth token.",
			}),
		};
	}
	let uid = event.queryStringParameters.user;

	if (!uid) {
		return {
			statusCode: 400,
			body: `{"success":false, "code":"invalid_parameters", "message":"Missing query parameter 'user' with user id or array of user ids to get."}`,
		};
	}

	// verify caller
	let callerUid;
	try {
		const decodedToken = await admin.auth().verifyIdToken(token);
		callerUid = decodedToken.uid;

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
		const userRecord = await admin.auth().getUser(uid);
		return {
			statusCode: 200,
			body: `{"success":true, "data":${JSON.stringify(userRecord)}}`,
		};
	} catch (error) {
		console.log("ERROR");
		console.log(error, JSON.stringify(error));
		if (error.code && error.message) {
			return {
				statusCode: 400,
				body: `{"success":false, "code":"firebase/${error.code}", "message":${error.message}`,
			};
		}
		return {
			statusCode: 500,
			body: `{"success":false, "code":"internal_error", "message":"The server encountered an internal error while fetching the user data."}`,
		};
	}
}
