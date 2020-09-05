import axios from "axios";
import classNames from "classnames";
import { Link } from "gatsby";
import React, { useState } from "react";
import useFirebase from "../../../auth/useFirebase";
import { AuthLayout } from "../../../components/layout";

export default function HandleEmailActionPage({
	location,
}: {
	location: { state?: { code?: string; continueURL?: string } };
}): React.ReactElement {
	const [success, setSuccess] = useState(false);
	const [error, setError] = React.useState<React.ReactNode>("");
	const [loginError, setLoginError] = React.useState<React.ReactNode>("");
	const code = location?.state?.code;
	const continueURL = location?.state?.continueURL;
	const [newEmail, setNewEmail] = useState("");
	const [oldEmail, setOldEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(true);
	const [submitting, setSubmitting] = useState(false);
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
				setOldEmail(codeInfo?.data?.previousEmail as string);
				setNewEmail(codeInfo?.data?.email as string);

				setLoading(false);
			} catch (error) {
				switch (error.code) {
					case "auth/expired-action-code":
						setError(
							<>
								The email you used to access this page has
								expired.
								<Link to="/account/settings" className="link">
									Retry changing your email in settings
								</Link>
								.
							</>
						);
						break;
					case "auth/invalid-action-code":
						setError(
							<>
								You've already changed your email using this
								link.
							</>
						);
						break;
					case "auth/user-disabled":
						setError(
							<>
								The account you are trying to change an email
								for was disabled. If you believe this is an
								error, please email{" "}
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
								The account you are trying to change an email
								for was deleted. If you believe this is an
								error, please email{" "}
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
			await firebase.auth().signOut();
		})();
	}, [firebase]);
	console.log(code, continueURL);
	return (
		<AuthLayout title={"Change Your Email"}>
			{loading && (
				<h2 className="mt-6 text-3xl leading-9 font-extrabold text-gray-900">
					Loading...
				</h2>
			)}
			{!loading && !success && !error && (
				<>
					<h2 className="mt-6 text-3xl leading-9 font-extrabold text-gray-900">
						Enter your password to change your email to {newEmail}
					</h2>
					<form
						noValidate
						onSubmit={async (e) => {
							e.preventDefault();
							if (!firebase) return;
							if (!code) return;
							if (!password) {
								setLoginError("Please enter a password.");
								return;
							}

							setSubmitting(true);
							try {
								await firebase
									.auth()
									.signInWithEmailAndPassword(
										oldEmail,
										password
									);
								await Promise.all([
									firebase.auth().applyActionCode(code),
									firebase
										.firestore()
										.collection("users")
										.doc(firebase.auth().currentUser?.uid)
										.update({ email: newEmail }),
								]);
								await firebase
									.auth()
									.currentUser?.getIdToken(true)
									.then((token) => {
										return axios.post(
											"/.netlify/functions/update-email-list",
											{
												email: oldEmail,
												newEmail,
											},
											{
												headers: {
													authorization: `Bearer ${token}`,
												},
											}
										);
									});
								await firebase.auth().signOut();
								setSuccess(true);
							} catch (error) {
								setSubmitting(false);
								console.log(error);
								switch (error.code) {
									case "auth/wrong-password":
										setLoginError("Incorrect Password");
										return;
									default:
										setLoginError(
											<>
												<p>Error: {error.message}</p>
												<p>
													If this was unexpected,
													please email us at{" "}
													<a
														href={
															"mailto:support@montavistamun.com"
														}
														className={
															"text-blue-500 active:text-blue-700 hover:underline"
														}
													>
														support@montavistamun.com
													</a>
													.
												</p>
											</>
										);
								}
							}
						}}
					>
						<div className="mt-6">
							<div className="flex justify-between">
								<label
									htmlFor="password"
									className="block text-sm font-medium leading-5 text-gray-700"
								>
									Password
								</label>
							</div>
							<div className="mt-1 relative rounded-md shadow-sm">
								<input
									id="password"
									type={"password"}
									required
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									disabled={submitting}
									className={
										(submitting ? "bg-gray-100" : "") +
										" " +
										"appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
									}
								/>
							</div>
						</div>

						{loginError && (
							<div className="mt-6 text-left">
								<div className="text-sm  text-red-400 leading-5">
									{typeof loginError === "string" ? (
										<p>{loginError}</p>
									) : (
										<>{loginError}</>
									)}
								</div>
							</div>
						)}
						<div className="mt-6">
							<span className="block w-full rounded-md shadow-sm">
								<button
									type="submit"
									disabled={submitting}
									className={classNames(
										"w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white transition duration-150 ease-in-out",
										submitting
											? "bg-indigo-400"
											: "bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
									)}
								>
									{submitting
										? "Changing Email..."
										: "Confirm Email Change"}
								</button>
							</span>
						</div>
					</form>
				</>
			)}
			{success && (
				<>
					<h2 className="mt-6 text-3xl leading-9 font-extrabold text-gray-900">
						Your account email has been changed to {newEmail}
					</h2>

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
