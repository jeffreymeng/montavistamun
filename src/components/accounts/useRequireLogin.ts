import { useLocation } from "@reach/router";
import { navigate } from "gatsby";
import React from "react";
import AuthContext from "../../context/AuthContext";

export default function useRequireLogin(): void {
	const { user, loading } = React.useContext(AuthContext);
	const location = useLocation();
	React.useEffect(() => {
		if (!user && !loading) {
			navigate("/account/login", {
				replace: true,
				state: { continueURL: location.pathname },
			});
		}
	}, [user, loading]);
}
