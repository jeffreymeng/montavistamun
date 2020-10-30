import { firestore } from "@firebase/rules-unit-testing";
import {
	getFirestoreInstance,
	RulesMatchers,
	rulesMatchers,
	teardown,
} from "./helpers";

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace jest {
		// eslint-disable-next-line @typescript-eslint/no-empty-interface
		interface Matchers<R> extends RulesMatchers<R> {}
	}
}

const userData = {
	firstName: "John",
	lastName: "Doe",
	email: "john.doe@example.com",
	grade: {
		grade: 10,
		asOf: firestore.FieldValue.serverTimestamp(),
	},
	classOf: 2022,
};

afterAll(() => teardown());

expect.extend(rulesMatchers);

describe("User Account Rules", () => {
	test("Allow reading own user data", async () => {
		const db = await getFirestoreInstance(true);
		await expect(db.collection("users").doc("test").get()).toAllow();
	});
	test("Allow admins to read all user data", async () => {
		const db = await getFirestoreInstance("admin");
		await expect(db.collection("users").get()).toAllow();
		await expect(db.collection("users").doc("someUser").get()).toAllow();
	});
	test("Allow admins to edit all user data, including verified and admin fields", async () => {
		const db = await getFirestoreInstance("admin");
		await expect(
			db
				.collection("users")
				.doc("someUser")
				.set({
					...userData,
					admin: true,
					verified: true,
				})
		).toAllow();
	});
	test("Allow writing own user data, except for verified and admin fields", async () => {
		const db = await getFirestoreInstance(true);
		await expect(
			db.collection("users").doc("test").set(userData)
		).toAllow();
		await expect(
			db.collection("users").doc("test").update({
				firstName: "Foo",
				classOf: 2021,
			})
		).toAllow();
	});
	test("Disallow creating own user data if setting verified or admin field", async () => {
		const db = await getFirestoreInstance(true);
		await expect(
			db
				.collection("users")
				.doc("test")
				.set({
					...userData,
					verified: true,
				})
		).toDeny();
		await expect(
			db
				.collection("users")
				.doc("test")
				.set({ ...userData, admin: true })
		).toDeny();
		await expect(
			db
				.collection("users")
				.doc("test")
				.set({ verified: false, admin: true })
		).toDeny();
	});
	test("Disallow updating own user data if modifying verified or admin field", async () => {
		const db = await getFirestoreInstance(true, {
			"users/test": userData,
		});
		await expect(
			db.collection("users").doc("test").update({
				verified: true,
			})
		).toDeny();
		await expect(
			db.collection("users").doc("test").update({
				admin: true,
			})
		).toDeny();
		await expect(
			db.collection("users").doc("test").update({
				verified: false,
				admin: true,
			})
		).toDeny();
	});
	test("Disallow reading or writing other users' data", async () => {
		const db = await getFirestoreInstance({ uid: "otherUser" });
		await expect(db.collection("users").get()).toDeny();
		await expect(db.collection("users").doc("test").get()).toDeny();
		await expect(db.collection("users").doc("test").set(userData)).toDeny();
	});
	test("Disallow reading or writing user data when not logged in", async () => {
		const db = await getFirestoreInstance();
		await expect(db.collection("users").get()).toDeny();
		await expect(db.collection("users").doc("test").get()).toDeny();
		await expect(db.collection("users").doc("test").set(userData)).toDeny();
	});
});
