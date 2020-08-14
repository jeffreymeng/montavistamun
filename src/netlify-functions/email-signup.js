const { MAILCHIMP_API_KEY } = process.env;
const axios = require("axios").default;
const crypto = require("crypto");

export async function handler(event, context) {
	if (event.httpMethod !== "POST") {
		return { statusCode: 405, body: "Method Not Allowed" };
	}
	if (!event.body) return { statusCode: 400, body: "Invalid parameters." };
	const params = JSON.parse(event.body);

	const { firstName, lastName, email, grade } = params;
	if (
		!firstName ||
		!firstName.trim() ||
		!lastName ||
		!lastName.trim() ||
		!email ||
		email.indexOf("@") === -1 ||
		!grade ||
		!["9th", "10th", "11th", "12th"].includes(grade)
	) {
		return {
			statusCode: 400,
			body: `{"success":false, "code":"invalid_parameters", "message":"One or more POST parameters were missing or malformed."}`,
		};
	}
	try {
		const listID = "3bb1f12a14";
		const emailHash = crypto
			.createHash("md5")
			.update(email.toLowerCase())
			.digest("hex");

		await axios.put(
			`https://us11.api.mailchimp.com/3.0/lists/${listID}/members/${emailHash}`,
			{
				email_address: email,
				status: "subscribed",
				status_if_new: "subscribed",
				merge_fields: {
					FNAME: firstName,
					LNAME: lastName,
					GRADE: grade === "9th" ? "9" : grade.substring(0, 2),
				},
				ip_signup: event.headers["client-ip"],
			},
			{
				auth: {
					username: "nousername",
					password: MAILCHIMP_API_KEY,
				},
			}
		);

		await axios.post(
			`https://us11.api.mailchimp.com/3.0/lists/${listID}/members/${emailHash}/tags`,
			{
				tags: [
					{
						"Has Account": "active",
						"2020-2021 Members": "active",
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
				error
			)}}`,
		};
	}
	return {
		statusCode: 200,
		body: `{"success":true}`,
	};
}
