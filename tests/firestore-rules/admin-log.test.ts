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

describe("Admin Log Rules", () => {
	test("Disallow reading a specific entry", async () => {
		const db = await getFirestoreInstance();
		await expect(
			db.collection("admin-log").doc("someAward").get()
		).toDeny();
	});
	test("Disallow editing a specific entries by normal users", async () => {
		const db = await getFirestoreInstance("verified");
		await expect(
			db.collection("admin-log").doc("someAward").set({
				someData: true,
			})
		).toDeny();
	});
	test("Disallow editing or deleting (but not creating) entries by admins", async () => {
		const db = await getFirestoreInstance("admin", {
			"admin-log/someAward": {
				existingData: true,
			},
		});
		await expect(
			db.collection("admin-log").doc("someAward").set({
				someData: true,
			})
		).toDeny();
		await expect(
			db.collection("admin-log").doc("someAward").delete()
		).toDeny();
	});
	test("Allow admins to create and read entries", async () => {
		const db = await getFirestoreInstance("admin");
		await expect(db.collection("admin-log").get()).toAllow();
		await expect(
			db.collection("admin-log").doc("someAward").get()
		).toAllow();
		await expect(
			db
				.collection("admin-log")
				.doc("someNewAward")
				.set({ someData: true })
		).toAllow();
	});
});
