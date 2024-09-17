const { MAILCHIMP_API_KEY } = process.env;
const FB_SERVICE_ACCOUNT = JSON.parse(process.env.FB_SERVICE_ACCOUNT);
const axios = require("axios").default;
const crypto = require("crypto");
const admin = require("firebase-admin");
if (admin.apps.length === 0) {
	admin.initializeApp({
		credential: admin.credential.cert(FB_SERVICE_ACCOUNT),
		databaseURL: "https://montavistamodelun.firebaseio.com",
	});
}
exports.handler = async function(event, context) {
	if (event.httpMethod !== "POST") {
		return { statusCode: 405, body: "Method Not Allowed" };
	}
	if (!event.body) return { statusCode: 400, body: "Invalid parameters." };
	const params = JSON.parse(event.body);
	const { firstName, lastName, email, grade, newEmail } = params;
	if (!email || email.indexOf("@") === -1) {
		return {
			statusCode: 400,
			body: `{"success":false, "code":"invalid_parameters", "message":"Missing a valid email parameter."}`,
		};
	}

	try {
		const token = event.headers?.authorization?.replace("Bearer ", "");
		if (!token) {
			return {
				statusCode: 403,
				body: `{"success":false, "code":"unauthorized", "message":"Missing an auth token."}`,
			};
		}
		const tokenData = await admin.auth().verifyIdToken(token);
		if (tokenData.email !== email && !tokenData.admin) {
			return {
				statusCode: 403,
				body: `{"success":false, "code":"unauthorized", "message":"A user may only change their own details, unless they are an admin."}`,
			};
		}
	} catch (error) {
		console.log(error);
		return {
			statusCode: 403,
			body: `{"success":false, "code":"unauthorized", "message":"Unable to verify the auth token."}`,
		};
	}
	try {
		const listID = "3bb1f12a14";
		let emailHash = crypto
			.createHash("md5")
			.update(email.toLowerCase())
			.digest("hex");
		const existingFields = await axios
			.get(
				`https://us11.api.mailchimp.com/3.0/lists/${listID}/members/${emailHash}`,
				{},
				{
					auth: {
						username: "nousername",
						password: MAILCHIMP_API_KEY,
					},
				}
			)
			.catch((e) => {
				console.log("Mailchimp Existing Fields GET Error", e);
				// the user probably doesn't exist
				// so just assume there is no previous data
				return Promise.resolve({});
			});
		const data = {
			email_address: newEmail || email,
			status: "subscribed",
			status_if_new: "subscribed",
			ip_signup: event.headers["client-ip"],
		};
		let newData = {};
		if (firstName || lastName || grade || newEmail) {
			if (firstName) {
				newData.FNAME = firstName;
			}
			if (lastName) {
				newData.LNAME = lastName;
			}
			if (firstName && lastName) {
				newData.FULLNAME = `${firstName} ${lastName}`;
			}
			if (grade) {
				newData.GRADE = grade;
			}
			if (newEmail) {
				newData.EMAIL = newEmail;
			}
		}
		data.merge_fields = {
			...(existingFields?.merge_fields || {}),
			...newData,
		};
		await axios.put(
			`https://us11.api.mailchimp.com/3.0/lists/${listID}/members/${emailHash}`,
			data,
			{
				auth: {
					username: "nousername",
					password: MAILCHIMP_API_KEY,
				},
			}
		);
		if (newEmail) {
			emailHash = crypto
				.createHash("md5")
				.update(newEmail.toLowerCase())
				.digest("hex");
		}
		await axios.post(
			`https://us11.api.mailchimp.com/3.0/lists/${listID}/members/${emailHash}/tags`,
			{
				tags: [
					{
						name: "Has Account",
						status: "active",
					},
					{
						name: "2022-2023 Members",
						status: "active",
					},
				],
			},
			{
				auth: {
					username: "nousername",
					password: MAILCHIMP_API_KEY,
				},
			}
		);
	} catch (error) {
		console.log("INTERNAL ERROR", error);
		return {
			statusCode: 500,
			body: `{"success":false, "code":"internal_error", "mailchimpErrorData":${JSON.stringify(
				{ ...error }
			)}}`,
		};
	}
	return {
		statusCode: 200,
		body: `{"success":true}`,
	};
}
