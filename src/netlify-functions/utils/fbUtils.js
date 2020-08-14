const FB_SERVICE_ACCOUNT = JSON.parse(process.env.FB_SERVICE_ACCOUNT);
const axios = require("axios").default;
const jwt = require("jsonwebtoken");

// this is a mutating function
const convert = (data) => {
	for (const key in data.fields) {
		if (data.fields.hasOwnProperty(key)) {
			const val = data.fields[key];
			if (val === null || val === undefined) continue;
			switch (Object.keys(val)[0]) {
				case "timestampValue":
					data.fields[key] = new Date(val.timestampValue);
					break;
				case "arrayValue":
					data.fields[key] = val.values.map((field) => {
						// create a fake data object with only one field to convert, then retrieve the value of the converted field
						return convert({ fields: { data: field } }).data;
					});
					break;
				case "mapValue":
					data.fields[key] = convert(val);
					break;
				default:
					// other values are already parsed
					data.fields[key] = val[Object.keys(val)[0]];
			}
		}
	}
	return data.fields;
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

	// this doesn't support arrays or maps as field values
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
		return convert(result.data);
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

		return convert(result.data);
	},
};
