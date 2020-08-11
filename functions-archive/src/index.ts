import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
admin.initializeApp();

export const setUserPermissions = functions.https.onCall(
	async (data, context) => {
		const targetId = data?.userId; // id of user to set
		const verified = data?.verified; // if un
		const admin = data?.admin;

		// check that caller is an administrator
		if (!context.auth) {
			throw new functions.https.HttpsError(
				"failed-precondition",
				"The function must be called " + "while authenticated."
			);
		}

		// they can run this function if they have the administrator claim OR they are an admin in firebase
		if (!context.auth.token.admin) {
			const callerDataSnapshot = await admin
				.firestore()
				.collection("users")
				.doc(context.auth.uid)
				.get();
			if (!callerDataSnapshot.data().admin) {
				throw new functions.https.HttpsError(
					"failed-precondition",
					"The function must be called " + "while authenticated."
				);
			}
		}

		if (!targetId) {
			throw new functions.https.HttpsError(
				"invalid-argument",
				"You must specify the id of the user to modify"
			);
		}

		// if neither field is set
		if (
			!(verified === true || verified === false) &&
			!(admin === true && admin === false)
		) {
			throw new functions.https.HttpsError(
				"invalid-argument",
				"You must specify at least one permission field to update."
			);
		}
		const modifiedClaims: Partial<{
			verified: boolean;
			admin: boolean;
		}> = {};
		if (typeof verified === "boolean") modifiedClaims.verified = verified;
		if (typeof admin === "boolean") modifiedClaims.admin = admin;

		const targetUserRecord = await admin.auth().getUser(targetId);
		const existingClaims = targetUserRecord.customClaims;
		const finalClaims = {
			...existingClaims,
			...modifiedClaims,
		};
		await admin.auth().setCustomUserClaims(targetId, finalClaims);
		return {
			success: true,
			finalClaims,
		};
	}
);

// warning: untested code below
// exports.onUserPermissionUpdate = functions.firestore
// 	.document("permissions/{userId}")
// 	.onWrite(async (change, context) => {
// 		// Get an object with the current document value.
// 		// If the document does not exist, it has been deleted.
// 		const document = change.after.exists ? change.after.data() : null;
//
// 		// Get an object with the previous document value (for update or delete)
// 		const oldDocument = change.before.exists ? change.before.data() : null;
//
// 		const userId = context.params.userId;
//
// 		// the next two if statements prevent infinite loops
// 		if (!document) {
// 			// never delete a permissions document.
// 			// instead, set their admin and verified values to false
// 			// this ensures that synchronization data is preserved
// 			functions.logger.error(
// 				`A permissions document (id = ${userId} was deleted. Deletion of a permissions document will NOT synchronize the permissions of the user.`
// 			);
// 			return;
// 		}
// 		// if it's already synchronized, or there is an error, than synchronization has already been attempted.
// 		if (!document?.synchronized?.value || document?.synchronized?.error) {
// 			return;
// 		}
//
//
// 		let synchronizationError = false;
//
// 		try {
// 			// if something has been changed
// 			if (
// 				document?.admin !== oldDocument?.admin ||
// 				document?.verified !== oldDocument?.verified
// 			) {
// 				// update the admin field
// 				await admin.auth().setCustomUserClaims(userId, {
// 					admin: document?.admin,
// 					verified: document?.verified,
// 				});
// 			}
// 		} catch (error) {
// 			synchronizationError = true;
// 			functions.logger.error(
// 				`An error occurred while setting claims`,
// 				error
// 			);
// 		}
//
// 		return admin
// 			.firestore()
// 			.collection("permissions")
// 			.doc(userId)
// 			.update({
// 				synchronized: {
// 					timestamp: admin.firestore.FieldValue.serverTimestamp(),
// 					value: !synchronizationError,
// 					error: synchronizationError,
// 				},
// 			});
// 	});
