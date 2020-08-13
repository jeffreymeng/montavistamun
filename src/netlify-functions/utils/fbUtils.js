const FB_SERVICE_ACCOUNT = JSON.parse(process.env.FB_SERVICE_ACCOUNT);
const axios = require("axios").default;
const jwt = require("jsonwebtoken");

// this is a mutating function
const convert = (data) => {
	for (const key in data.fields) {
		if (data.fields.hasOwnProperty(key)) {
			const val = data.fields[key];
			switch (Object.keys(data)[0]) {
				case "timestampValue":
					data.fields[key] = new Date(val);
					return;
				default:
					// other values are already parsed (no support for maps/arrays)
					data.fields[key] = data.fields[Object.keys(data)[0]];
			}
		}
	}
	return data;
};

const getToken = () => {
	// generate a jwt
	return jwt.sign(
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
};

module.exports = {
	currentTimestamp: () => ({
		type: "timestamp",
		time: new Date().toISOString(),
	}),

	update: async (path, fields) => {
		const fieldsToPush = {};
		for (const key in fields) {
			if (fields.hasOwnProperty(key)) {
				const val = fields[key];
				switch (typeof val) {
					case "string":
						fieldsToPush[key] = { stringValue: val };
						break;
					case "number":
						if (Math.floor(val) === val) {
							fieldsToPush[key] = { integerValue: val };
						} else {
							fieldsToPush[key] = { doubleValue: val };
						}
						break;
					case "boolean":
						fieldsToPush[key] = { booleanValue: val };
						break;
					default:
						if (val.type === "timestamp") {
							fieldsToPush[key] = { timestampValue: val.time };
							return;
						}
						throw new Error(
							"Unexpected field type. Arrays and maps are not supported by the update function."
						);
				}
			}
		}
		const result = await axios.patch(
			`https://firestore.googleapis.com/v1/projects/montavistamodelun/databases/(default)/documents${path}?${Object.keys(
				fields
			)
				.map((name) => `updateMask.fieldPaths=${name}`)
				.join("&")}`,
			{
				fields: fieldsToPush,
			},
			{
				headers: {
					Authorization: `Bearer ${getToken()}`,
				},
			}
		);
		return convert(result.data.fields);
	},
	get: async (path) => {
		const result = await axios.get(
			`https://firestore.googleapis.com/v1/projects/montavistamodelun/databases/(default)/documents${path}`,
			{
				headers: {
					Authorization: `Bearer ${getToken()}`,
				},
			}
		);

		return convert(result.data.fields);
	},
};
