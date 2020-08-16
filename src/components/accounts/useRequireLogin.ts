import { useLocation } from "@reach/router";
import { navigate } from "gatsby";
import React from "react";
import useFirebase from "../../auth/useFirebase";
import AuthContext from "../../context/AuthContext";

export default function useRequireLogin(): void {
	const { user, loading } = React.useContext(AuthContext);
	const firebase = useFirebase();
	const location = useLocation();
	const redirectToLogin = () => {
		navigate("/account/login", {
			replace: true,
			state: {
				continueURL: location.pathname,
			},
		});
	};
	React.useEffect(() => {
		let unsubscribe = () => {
			/* noop */
		};
		if (!user && !loading) {
			redirectToLogin();
		}
		if (firebase) {
			unsubscribe = firebase
				.auth()
				.onAuthStateChanged((authStateUser) => {
					if (!authStateUser && !loading) {
						redirectToLogin();
					}
				});
		}
		return () => unsubscribe();
	}, [user, loading, firebase]);
}
