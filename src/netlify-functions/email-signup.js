const { MAILCHIMP_API_KEY } = process.env;
const axios = require("axios").default;

export async function handler(event, context) {
	if (event.httpMethod !== "POST") {
		return { statusCode: 405, body: "Method Not Allowed" };
	}
	if (!event.body) return { statusCode: 405, body: "Invalid parameters." };
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
			body: `MailchimpError: ${JSON.stringify(error)}`,
		};
	}
	return {
		statusCode: 200,
		body: "Success",
	};
}
