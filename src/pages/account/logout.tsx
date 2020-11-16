import { Link } from "gatsby";
import React, { useState } from "react";
import { Layout, Main } from "../../components/layout";
import useFirebase from "../../firebase/useFirebase";

interface LogoutProps {
	/**
	 * Specifies a URL to return the user to should the logout be cancelled (by the user logging back in)
	 */
	cancelReturnURL?: string;
}
export default function LogoutPage({
	cancelReturnURL,
}: LogoutProps): React.ReactElement {
	const [loading, setLoading] = useState(true);
	const firebase = useFirebase();

	React.useEffect(() => {
		if (!firebase) return;
		firebase
			.auth()
			.signOut()
			.then(() => setLoading(false));
	}, [firebase]);
	return (
		<Layout title={"Logout"}>
			<Main>
				<h1
					className={
						"text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10"
					}
				>
					{loading ? "Logging you out..." : "You've been logged out"}
				</h1>
				<p className={"mt-4 mb-20"}>
					Didn't mean to log out?{" "}
					<Link
						to={"/account/login"}
						state={{
							continueURL: cancelReturnURL,
						}}
						className={"link"}
					>
						Log back in
					</Link>
					.
				</p>
			</Main>
		</Layout>
	);
}
