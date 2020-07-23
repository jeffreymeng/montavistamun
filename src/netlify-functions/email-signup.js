const { MAILCHIMP_API_KEY } = process.env;
const axios = require("axios").default;

export async function handler(event, context) {
	// axios.post(
	// 	"https://us11.api.mailchimp.com/3.0/lists/3bb1f12a14/members",
	// 	{
	// 		email_address: "test02@montavistamun.com",
	// 		status: "subscribed",
	// 		merge_fields: {
	// 			FNAME: "Urist",
	// 			LNAME: "McVankab",
	// 			GRADE: "11th",
	// 		},
	// 		tags: ["2020-2021 Website Sign-ups"],
	// 	},
	// 	{
	// 		auth: {
	// 			username: "nousernamerequired",
	// 			password: MAILCHIMP_API_KEY,
	// 		},
	// 	}
	// );
	return {
		statusCode: 200,
		body: JSON.stringify({
			message: `Hello world ${Math.floor(
				Math.random() * 10
			)} ${MAILCHIMP_API_KEY}`,
		}),
	};
}
