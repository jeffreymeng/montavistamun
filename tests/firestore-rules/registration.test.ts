import {
	getFirestoreInstance,
	rulesMatchers,
	RulesMatchers,
	teardown,
} from "./helpers";

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace jest {
		// eslint-disable-next-line @typescript-eslint/no-empty-interface
		interface Matchers<R> extends RulesMatchers<R> {}
	}
}
afterAll(() => teardown());

expect.extend(rulesMatchers);

describe("Registration Rules", () => {
	test("Allow reading own entries", async () => {
		const db = await getFirestoreInstance(true);
		await expect(db.collection("registration").doc("test").get()).toAllow();
	});
	test("Allow writing own entries", async () => {
		const db = await getFirestoreInstance(true);
		await expect(
			db.collection("registration").doc("test").set({ someData: true })
		).toAllow();

		// this is an update
		await expect(
			db
				.collection("registration")
				.doc("test")
				.set({ someMoreData: true })
		).toAllow();
	});
	test("Allow reading own history", async () => {
		const db = await getFirestoreInstance(true);
		await expect(
			db
				.collection("registration")
				.doc("test")
				.collection("history")
				.doc("historyId")
				.get()
		).toAllow();
	});
	test("Allow creating own history", async () => {
		const db = await getFirestoreInstance(true);
		await expect(
			db
				.collection("registration")
				.doc("test")
				.collection("history")
				.add({
					someData: true,
				})
		).toAllow();
	});
	test("Disallow editing or deleting own history", async () => {
		const db = await getFirestoreInstance(true, {
			"registration/test/history/historyId": {
				placeholderData: true,
			},
		});
		await expect(
			db
				.collection("registration")
				.doc("test")
				.collection("history")
				.doc("historyId")
				.update({
					someData: true,
				})
		).toDeny();
		await expect(
			db
				.collection("registration")
				.doc("test")
				.collection("history")
				.doc("historyId")
				.delete()
		).toDeny();
	});
	test("Allow admins to read all registration and history", async () => {
		const db = await getFirestoreInstance("admin");
		await expect(db.collection("registration").get()).toAllow();
		await expect(
			db
				.collection("registration")
				.doc("nonAdminUser")
				.collection("history")
				.get()
		).toAllow();
	});
	test("Allow admins to modify all registration and history", async () => {
		const db = await getFirestoreInstance("admin");
		await expect(
			db
				.collection("registration")
				.doc("nonAdminUser")
				.set({ someData: true })
		).toAllow();
		await expect(
			db
				.collection("registration")
				.doc("nonAdminUser")
				.collection("history")
				.doc("historyId")
				.set({ someData: true })
		).toAllow();
	});
});
