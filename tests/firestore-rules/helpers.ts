// based on these two resources:
// https://medium.com/flutter-community/firestore-security-rules-and-tests-for-firebase-e195bdbea198
// https://github.com/firebase/quickstart-testing/blob/master/unit-test-security-rules/test/firestore.spec.js

import * as firebase from "@firebase/rules-unit-testing";
import fs from "fs";
interface FirebaseAuthTokenOptions {
	uid: string;
	email?: string;
	email_verified?: boolean;
	name?: string;
	[claim: string]: any;
}

/**
 * Get a firestore instance with specified auth and initial data options.
 * @param authentication - false for no authentication,
 * "unverified" or true for a basic user with uid "test",
 * "verified" for a verified user with uid "test",
 * "admin" for a verified admin user with uid "test",
 * or a custom firebase auth options object with a property uid and optional other properties.
 * @param data - data to pre-populate the database with
 */
export async function getFirestoreInstance(
	authentication:
		| boolean
		| "unverified"
		| "verified"
		| "admin"
		| FirebaseAuthTokenOptions = false,
	data?: Record<string, any>
) {
	let authObject: undefined | FirebaseAuthTokenOptions;
	if (authentication === false) {
		authObject = undefined;
	} else if (typeof authentication === "string" || authentication === true) {
		authObject = {
			uid: "test",
		};
		switch (authentication) {
			case "verified":
				authObject.verified = true;
				break;
			case "admin":
				authObject.verified = true;
				authObject.admin = true;
		}
	} else {
		authObject = authentication;
	}

	const projectId = `rules-test-${Date.now()}`;
	// Create the test app using the unique ID and the given user auth object
	const app = firebase.initializeTestApp({
		projectId,
		auth: authObject,
	});

	// Get the db linked to the new firebase app that we created
	const db = app.firestore();

	// Apply the test rules so we can write documents
	await firebase.loadFirestoreRules({
		projectId,
		rules: fs.readFileSync(
			"tests/firestore-rules/firestore-allow-all.rules",
			"utf8"
		),
	});

	// Write mock documents with test rules
	if (data) {
		for (const key in data) {
			await db.doc(key).set(data[key]);
		}
	}

	// Apply the rules to be tested
	await firebase.loadFirestoreRules({
		projectId,
		rules: fs.readFileSync("firestore.rules", "utf8"),
	});

	// return the initialized DB for testing
	return db;
}

export async function teardown(): Promise<void> {
	await Promise.all(firebase.apps().map((app) => app.delete()));
}

export interface RulesMatchers<R> {
	toAllow(): R;
	toDeny(): R;
}
export const rulesMatchers = {
	toAllow: async (testPromise: Promise<any>) => {
		let pass = false;
		try {
			await firebase.assertSucceeds(testPromise);
			pass = true;
		} catch (err) {
			console.log(err);
		}
		return {
			pass,
			message: () =>
				"Expected Firebase operation to be allowed, but it was denied",
		};
	},
	toDeny: async (testPromise: Promise<any>) => {
		let pass = false;
		try {
			await firebase.assertFails(testPromise);
			pass = true;
		} catch (err) {
			console.log(err);
		}
		return {
			pass,
			message: () =>
				"Expected Firebase operation to be denied, but it was allowed",
		};
	},
};
