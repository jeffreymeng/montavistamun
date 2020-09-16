const FB_SERVICE_ACCOUNT = JSON.parse(process.env.FB_SERVICE_ACCOUNT);
const axios = require("axios").default;
const jwt = require("jsonwebtoken");

const convertToFirebaseFormat = (fields) => {
	const result = {};
	for (const key in fields) {
		if (fields.hasOwnProperty(key)) {
			const val = fields[key];
			switch (typeof val) {
				case "string":
					result[key] = { stringValue: val };
					break;
				case "number":
					if (Math.floor(val) === val) {
						result[key] = { integerValue: val };
					} else {
						result[key] = { doubleValue: val };
					}
					break;
				case "boolean":
					result[key] = { booleanValue: val };
					break;
				case "object":
					if (val.type === "timestamp") {
						result[key] = { timestampValue: val.time };
						break;
					}
					if (Array.isArray(val)) {
						result[key] = {
							arrayValue: {
								// create a fake data object with only one field to convert, then retrieve the value of the converted field
								values: val.map(
									(item) =>
										convertToFirebaseFormat({ data: item })
											.fields.data
								),
							},
						};
						break;
					}
					result[key] = {
						mapValue: convertToFirebaseFormat(val),
					};
					break;

				default:
					throw new Error("Unexpected field type.");
			}
		}
	}
	return { fields: result };
};
const convertFromFirebaseFormat = (data) => {
	let result = {
		...data,
		fields: Object.assign({}, data.fields),
	};
	for (const key in result.fields) {
		if (result.fields.hasOwnProperty(key)) {
			const val = result.fields[key];
			if (val === null || val === undefined) continue;
			switch (Object.keys(val)[0]) {
				case "timestampValue":
					result.fields[key] = new Date(val.timestampValue);
					break;
				case "arrayValue":
					result.fields[key] = val.arrayValue.values.map((field) => {
						// create a fake data object with only one field to convert, then retrieve the value of the converted field
						return convertFromFirebaseFormat({
							fields: { data: field },
						}).data;
					});
					break;
				case "mapValue":
					result.fields[key] = convertFromFirebaseFormat(
						val.mapValue
					);
					break;
				default:
					// other values are already parsed
					result.fields[key] = val[Object.keys(val)[0]];
			}
		}
	}
	return result.fields;
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
	add: async (path, fields) => {
		const fieldsToPush = convertToFirebaseFormat();

		const result = await axios.post(
			`https://firestore.googleapis.com/v1/projects/montavistamodelun/databases/(default)/documents${path}`,
			fieldsToPush,
			{
				headers: {
					authorization: `Bearer ${getToken()}`,
				},
			}
		);
		return convertFromFirebaseFormat(result.data);
	},
	update: async (path, fields) => {
		const fieldsToPush = convertToFirebaseFormat();

		const result = await axios.patch(
			`https://firestore.googleapis.com/v1/projects/montavistamodelun/databases/(default)/documents${path}?${Object.keys(
				fields
			)
				.map((name) => `updateMask.fieldPaths=${name}`)
				.join("&")}`,
			fieldsToPush,
			{
				headers: {
					authorization: `Bearer ${getToken()}`,
				},
			}
		);
		return convertFromFirebaseFormat(result.data);
	},
	get: async (path) => {
		const result = await axios.get(
			`https://firestore.googleapis.com/v1/projects/montavistamodelun/databases/(default)/documents${path}`,
			{
				headers: {
					authorization: `Bearer ${getToken()}`,
				},
			}
		);

		return convertFromFirebaseFormat(result.data);
	},
};
