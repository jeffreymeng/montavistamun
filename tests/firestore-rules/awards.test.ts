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

describe("Awards Rules", () => {
	test("Allow listing all awards", async () => {
		const db = await getFirestoreInstance();
		await expect(db.collection("awards").get()).toAllow();
	});
	test("Allow getting a specific award", async () => {
		const db = await getFirestoreInstance();
		await expect(db.collection("awards").doc("someAward").get()).toAllow();
	});
	test("Disallow editing for normal users", async () => {
		const db = await getFirestoreInstance("verified");
		await expect(
			db.collection("awards").doc("someAward").set({
				someData: true,
			})
		).toDeny();
	});
	test("Allow admins to edit awards", async () => {
		const db = await getFirestoreInstance("admin");
		await expect(
			db.collection("awards").doc("someAward").set({
				someData: true,
			})
		).toAllow();
	});
});
