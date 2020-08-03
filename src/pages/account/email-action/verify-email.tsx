import { Link } from "gatsby";
import React from "react";
import { Layout, Main } from "../../../components/layout";
import useFirebase from "../../../components/useFirebase";

export default function HandleEmailActionPage({
	location,
}: {
	location: { state?: { code?: string; continueURL?: string } };
}): React.ReactElement {
	const [success, setSuccess] = React.useState(false);
	const [error, setError] = React.useState<React.ReactNode>("");
	const code = location?.state?.code;
	const continueURL = location?.state?.continueURL;
	const firebase = useFirebase();
	React.useEffect(() => {
		if (!firebase) return;
		if (!code) {
			setError(
				<>
					The link you used to access this page was malformed.{" "}
					<Link
						to="/account/send-email-verification"
						className="link"
					>
						Click here to request a new verification email
					</Link>
					.
				</>
			);
			return;
		}
		(async () => {
			try {
				const codeInfo = await firebase.auth().checkActionCode(code);
				const [, sysend] = await Promise.all([
					firebase.auth().applyActionCode(code),
					import("sysend"),
				]);
				setSuccess(true);

				sysend.broadcast("email-verified", {
					email: codeInfo.data.email,
				});
			} catch (error) {
				switch (error.code) {
					case "auth/expired-action-code":
						setError(
							<>
								The email you used to access this page has
								expired.{" "}
								<Link
									to="/account/send-email-verification"
									className="link"
								>
									Click here to request a new verification
									email
								</Link>
								.
							</>
						);
						break;
					case "auth/invalid-action-code":
						setError(
							<>
								You've already verified your email using this
								link.
							</>
						);
						break;
					case "auth/user-disabled":
						setError(
							<>
								The account you are trying to verify an email
								for was disabled by an administrator. If you
								believe this is an error, please email{" "}
								<a
									href="mailto:websitehelp@montavistamun.com"
									className="link"
								>
									websitehelp@montavistamun.com
								</a>
								.
							</>
						);
						break;
					case "auth/user-not-found":
						setError(
							<>
								The account you are trying to verify an email
								for was deleted. If you believe this is an
								error, please email{" "}
								<a
									href="mailto:websitehelp@montavistamun.com"
									className="link"
								>
									websitehelp@montavistamun.com
								</a>
								.
							</>
						);
						break;
					default:
						setError(
							<>
								{error.message} <br />
								If this was unexpected, please email{" "}
								<a
									href="mailto:websitehelp@montavistamun.com"
									className="link"
								>
									websitehelp@montavistamun.com
								</a>
								.
							</>
						);
						break;
				}
			}
		})();
	}, [firebase]);
	console.log(code, continueURL);
	return (
		<Layout title="Loading...">
			<Main className="h-ca">
				{!success && !error && (
					<h1 className="text-3xl font-bold">Loading...</h1>
				)}
				{success && (
					<>
						<h1 className="text-3xl font-bold">
							Your email has been successfully verified.
						</h1>
						<p>You may now safely close this page.</p>
					</>
				)}
				{error && <h1 className="text-3xl font-bold">{error}</h1>}
			</Main>
		</Layout>
	);
}
