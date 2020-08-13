import { Link } from "gatsby";
import React from "react";
import useFirebase from "../../../auth/useFirebase";
import { AuthLayout } from "../../../components/layout";

export default function RecoverEmailPage({
	location,
}: {
	location: { state?: { code?: string; continueURL?: string } };
}): React.ReactElement {
	const [success, setSuccess] = React.useState(false);
	const [error, setError] = React.useState<React.ReactNode>("");
	const [email, setEmail] = React.useState("");
	const code = location?.state?.code;
	const continueURL = location?.state?.continueURL;
	const firebase = useFirebase();
	React.useEffect(() => {
		if (!firebase) return;
		if (!code) {
			setError(<>The link you used to access this page was malformed.</>);
			return;
		}
		(async () => {
			try {
				const codeInfo = await firebase.auth().checkActionCode(code);
				setEmail(codeInfo.data?.email as string);
				await firebase.auth().applyActionCode(code);

				setSuccess(true);
			} catch (error) {
				switch (error.code) {
					case "auth/expired-action-code":
						setError(
							<>
								The email you used to access this page has
								expired. If you believe this is an error, please
								email{" "}
								<a
									href="mailto:support@montavistamun.com"
									className="link"
								>
									support@montavistamun.com
								</a>
								.
							</>
						);
						break;
					case "auth/invalid-action-code":
						setError(
							<>
								You've already reverted your email using this
								link.
							</>
						);
						break;
					case "auth/user-disabled":
						setError(
							<>
								The account you are trying to recover for was
								disabled. If you believe this is an error,
								please email{" "}
								<a
									href="mailto:support@montavistamun.com"
									className="link"
								>
									support@montavistamun.com
								</a>
								.
							</>
						);
						break;
					case "auth/user-not-found":
						setError(
							<>
								The account you are trying to recover was
								deleted. If you believe this is an error, please
								email{" "}
								<a
									href="mailto:support@montavistamun.com"
									className="link"
								>
									support@montavistamun.com
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
									href="mailto:support@montavistamun.com"
									className="link"
								>
									support@montavistamun.com
								</a>
								.
							</>
						);
						break;
				}
			}
			firebase.auth().signOut();
		})();
	}, [firebase]);
	console.log(code, continueURL);
	return (
		<AuthLayout title={"Recover Your Email"}>
			{!success && !error && (
				<h2 className="mt-6 text-3xl leading-9 font-extrabold text-gray-900">
					Loading...
				</h2>
			)}
			{success && (
				<>
					<h2 className="mt-6 text-3xl leading-9 font-extrabold text-gray-900">
						Your account email has been reverted to {email}
					</h2>
					<p className="text-xl font-bold">
						If your account has been hacked, you should also{" "}
						<Link
							to={"/account/settings"}
							className="link font-bold"
						>
							change your password
						</Link>
						.
					</p>
					<Link
						to={"/account/login"}
						className={
							"mt-4 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white transition duration-150 ease-in-out bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
						}
					>
						Log In
					</Link>
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
