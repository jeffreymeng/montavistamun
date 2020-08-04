import { Link } from "gatsby";
import React from "react";
import useFirebase from "../../../auth/useFirebase";
import { AuthLayout } from "../../../components/layout";

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
								for was disabled. If you believe this is an
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
		<AuthLayout title={"Email Verified"}>
			{!success && !error && (
				<h2 className="mt-6 text-3xl leading-9 font-extrabold text-gray-900">
					Verifying Your Email...
				</h2>
			)}
			{success && (
				<>
					<h2 className="mt-6 text-3xl leading-9 font-extrabold text-gray-900">
						Your email has been successfully verified.
					</h2>
					<p className="text-xl font-bold">
						You may now safely close this page.
					</p>
				</>
			)}
			{error && (
				<h2 className="mt-6 text-3xl leading-9 font-extrabold text-gray-900">
					{error}
				</h2>
			)}
		</AuthLayout>
	);
}
