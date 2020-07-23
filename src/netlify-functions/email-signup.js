const { MAILCHIMP_API_KEY } = process.env;
const axios = require("axios").default;
const queryString = require("query-string");

export async function handler(event, context) {
	if (event.httpMethod !== "POST") {
		return { statusCode: 405, body: "Method Not Allowed" };
	}
	const params = queryString.parse(event.body);
	const { firstName, lastName, email, grade } = params;
	if (
		!firstName.trim() ||
		!lastName.trim() ||
		email.indexOf("@") === -1 ||
		!["9th", "10th", "11th", "12th"].contains(grade)
	) {
		return { statusCode: 405, body: "Invalid parameters." };
	}
	try {
		await axios.post(
			"https://us11.api.mailchimp.com/3.0/lists/3bb1f12a14/members",
			{
				email_address: email,
				status: "subscribed",
				merge_fields: {
					FNAME: firstName,
					LNAME: lastName,
					GRADE: grade,
				},
				tags: ["2020-2021 Website Sign-ups"],
			},
			{
				auth: {
					username: "nousernamerequired",
					password: MAILCHIMP_API_KEY,
				},
			}
		);
	} catch (error) {
		return {
			statusCode: 500,
			body: {
				mailchimpError: error,
			},
		};
	}
	return {
		statusCode: 200,
		body: "Success",
	};
}
