export default interface FirebaseStoredUserData {
	firstName: string;
	lastName: string;
	email: string;
	classOf: number;
	grade: {
		grade: number;
		asOf: firebase.firestore.Timestamp;
	};
}
