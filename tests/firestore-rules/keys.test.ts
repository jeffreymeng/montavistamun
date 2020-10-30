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

afterAll(() => teardown());

expect.extend(rulesMatchers);

describe("API Key Rules", () => {
	test("Allow reading any specific key if logged in and verified", async () => {
		const db = await getFirestoreInstance("verified");
		await expect(db.collection("keys").doc("someKeyId").get()).toAllow();
	});

	test("Disallow reading any specific key if not logged in", async () => {
		const db = await getFirestoreInstance(false);
		await expect(db.collection("keys").doc("someKeyId").get()).toDeny();
	});

	test("Disallow reading any specific key if logged in but not verified", async () => {
		const db = await getFirestoreInstance(true);
		await expect(db.collection("keys").doc("someKeyId").get()).toDeny();
	});

	test("Disallow listing all keys even if logged in and verified", async () => {
		const db = await getFirestoreInstance("verified");
		await expect(db.collection("keys").get()).toDeny();
	});

	test("Disallow writing to keys", async () => {
		const authedDb = await getFirestoreInstance("verified");
		await expect(
			authedDb.collection("keys").doc("someKeyId").set({ someData: true })
		).toDeny();
		const unauthedDb = await getFirestoreInstance();
		await expect(
			unauthedDb
				.collection("keys")
				.doc("someKeyId")
				.set({ someData: true })
		).toDeny();
	});
});
