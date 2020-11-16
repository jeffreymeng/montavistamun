import type firebaseType from "firebase";

export default interface FirebaseStoredUserData {
	firstName: string;
	lastName: string;
	email: string;
	classOf: number;
	grade: {
		grade: number;
		asOf: firebaseType.firestore.Timestamp;
	};
}
