import firebaseType from "firebase";

export default interface UserData {
	classOf: number;
	email: string;
	firstName: string;
	lastName: string;
	grade: {
		grade: number;
		asOf: firebaseType.firestore.Timestamp;
	};

	admin?: boolean;
	verified?: boolean;
}
