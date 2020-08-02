import firebaseType, { User as FirebaseUser } from "firebase";
import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import firebaseConfig from "../../firebase-config";

const AuthContext = React.createContext<{
	user: FirebaseUser | null;
	loading: boolean | null;
	error: boolean | null;
	admin: boolean | null;
	verified: boolean | null;
}>({
	user: null,
	loading: true,
	error: null,
	admin: null,
	verified: null,
});

const AuthProvider = ({ children }: { children: ReactNode }): ReactElement => {
	const [user, setUser] = useState<FirebaseUser | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [admin, setAdmin] = useState<boolean | null>(null);
	const [auth, setAuth] = useState<firebaseType.auth.Auth | null>(null);
	const [verified, setVerified] = useState(null);
	React.useEffect(() => {
		(async (): Promise<void> => {
			// import firebase app
			const firebaseApp: any = await import("firebase/app");
			//
			await Promise.all([
				import("firebase/auth"),
				import("firebase/firestore"),
				import("firebase/functions"),
			]);
			// lazy load firebase in an async IIFE
			if (firebaseApp.apps.length === 0) {
				firebaseApp.initializeApp(firebaseConfig);
			}
			setAuth(firebaseApp.auth());
		})();
	}, []);
	useEffect(() => {
		if (!auth) {
			return;
		}
		const unsubscribe = auth.onAuthStateChanged(
			(user: FirebaseUser | null) => {
				setUser(user);
				if (user) {
					user.getIdTokenResult()
						.then(({ claims }) => {
							// console.log("CLAIMS", claims);
							setAdmin(claims.admin);
							setVerified(claims.verified);
							setLoading(false);
						})
						.catch((error) => {
							console.log(error);
							setAdmin(false);
							setLoading(false);
						});
				} else {
					setLoading(false);
				}
			}
		);
		return (): void => {
			unsubscribe();
		};
	}, [auth]);

	return (
		<AuthContext.Provider
			value={{
				user,
				loading,
				error,
				admin,
				verified,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
export { AuthProvider };
