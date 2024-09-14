const { MAILCHIMP_API_KEY } = process.env;
const FB_SERVICE_ACCOUNT = JSON.parse(process.env.FB_SERVICE_ACCOUNT);

var exec = require('child_process').exec;

exec('ls',
    function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
             console.log('exec error: ' + error);
        }
    });
const axios = require("axios").default;
const crypto = require("crypto");
const admin = require("firebase-admin");
if (admin.apps.length === 0) {
	admin.initializeApp({
		credential: admin.credential.cert(FB_SERVICE_ACCOUNT),
		databaseURL: "https://montavistamodelun.firebaseio.com",
	});
}
/*
 * Returns the member updates a user was sent.
 *
 * Query Parameters:
 * email: the email of the user for which to retrieve the sent updates.
 * count: the number of responses to return
 * page: (defaults to 1), the 1-indexed page of results to return
 *
 * Requires a firebase Bearer token. If the user is not an administrator, they may only retrieve the updates sent to their email.
 */
export async function handler(event, context) {
	if (event.httpMethod !== "GET") {
		return { statusCode: 405, body: "Method Not Allowed" };
	}
	const params = event.queryStringParameters;
	let { page, count, email } = params;
	page = page || 1;
	if (!count || !email) {
		return {
			statusCode: 400,
			body: `{"success":false, "code":"invalid_parameters", "message":"Missing a request parameter."}`,
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
				body: `{"success":false, "code":"unauthorized", "message":"A user may only get their own emails, unless they are an admin."}`,
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
		let emailHash = crypto
			.createHash("md5")
			.update(email.toLowerCase())
			.digest("hex");
		const memberInfo = await axios.get(
			"https://us11.api.mailchimp.com/3.0/lists/3bb1f12a14/members/" +
				emailHash,
			{
				auth: {
					username: "nousername",
					password: MAILCHIMP_API_KEY,
				},
			}
		);
		console.log(memberInfo);
		const resp = await axios.get(
			`https://us11.api.mailchimp.com/3.0/campaigns?count=${count}&sort_field=send_time&member_id=${emailHash}&sort_dir=DESC&status=sent&fields=campaigns.id,campaigns.long_archive_url,campaigns.send_time,campaigns.settings.subject_line,campaigns.settings.preview_text,campaigns.settings.title,total_items&offset=${
				count * (page - 1)
			}`,
			{
				auth: {
					username: "nousername",
					password: MAILCHIMP_API_KEY,
				},
			}
		);
		return {
			statusCode: 200,
			body: JSON.stringify({
				success: true,
				...resp.data,
				mailchimpEmailID: memberInfo.data?.unique_email_id,
			}),
		};
	} catch (error) {
		console.log(error);
		console.log("Mailchimp Error", { ...error });

		return {
			statusCode: 500,
			body: `{"success":false, "code":"internal_error", "mailchimpError":"${JSON.stringify(
				error.response.data
			)}"}`,
		};
	}
}
