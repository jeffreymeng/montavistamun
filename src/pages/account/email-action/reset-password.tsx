import classNames from "classnames";
import { Link } from "gatsby";
import { Eye, EyeOff } from "heroicons-react";
import React from "react";
import { AuthLayout } from "../../../components/layout";
import useFirebase from "../../../components/useFirebase";
export default function HandleEmailActionPage({
	location,
}: {
	location: { state?: { code?: string; continueURL?: string } };
}): React.ReactElement {
	const [loading, setLoading] = React.useState(false);
	const [success, setSuccess] = React.useState(false);
	const [submitting, setSubmitting] = React.useState(false);
	const [password, setPassword] = React.useState("");
	const [confirm, setConfirm] = React.useState("");
	const [showPassword, setShowPassword] = React.useState(false);
	const [error, setError] = React.useState<React.ReactNode>("");
	const code = location?.state?.code;
	const continueURL = location?.state?.continueURL;
	const firebase = useFirebase();
	React.useEffect(() => {
		if (!firebase) return;
		if (!code) {
			setError(
				<>
					The link you used to access this page was malformed.
					<br />
					<Link to="/account/recover" className="link">
						Click here to request a new password reset email
					</Link>
					.
				</>
			);
			return;
		}
		(async () => {
			try {
				await firebase.auth().checkActionCode(code);
				setLoading(false);
			} catch (error) {
				setLoading(false);
				switch (error.code) {
					case "auth/expired-action-code":
						setError(
							<>
								The email you used to access this page has
								expired.
								<br />
								<Link to="/account/recover" className="link">
									Click here to request a new password reset
									email
								</Link>
								.
							</>
						);
						break;
					case "auth/invalid-action-code":
						setError(
							<>
								You've already used this link to reset your
								password.
								<br />
								<Link to="/account/recover" className="link">
									Click here to request a new password reset
									email
								</Link>
								.
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
		<AuthLayout title={"Reset Password"}>
			{loading && (
				<h2 className="mt-6 text-3xl leading-9 font-extrabold text-gray-900">
					Loading...
				</h2>
			)}
			{!loading && !error && !success && (
				<>
					<h2 className="mt-6 text-3xl leading-9 font-extrabold text-gray-900">
						Choose a new password
					</h2>
					<form
						noValidate
						onSubmit={(e) => {
							e.preventDefault();
							if (!firebase) return;
							if (!code) return;
							if (!password) {
								setError("Please enter a password.");
								return;
							}
							if (password.length < 8) {
								setError(
									"Please enter a password with at least eight characters."
								);
								return;
							}
							if (password !== confirm) {
								setError("The two passwords don't match.");
								return;
							}
							setSubmitting(true);
							firebase
								.auth()
								.confirmPasswordReset(code, password)
								.then(() => {
									setSubmitting(false);
									setSuccess(true);
								})
								.catch((error) => {
									setSubmitting(false);
									console.log(error);
									switch (error.code) {
										case "auth/weak-password":
											setError(
												"Your password isn't string enough. Try adding numbers and special characters."
											);
											return;
										default:
											setError(
												<>
													<p>
														Error: {error.message}
													</p>
													<p>
														If this was unexpected,
														please email us at{" "}
														<a
															href={
																"mailto:websitehelp@montavistamun.com"
															}
															className={
																"text-blue-500 active:text-blue-700 hover:underline"
															}
														>
															websitehelp@montavistamun.com
														</a>
														.
													</p>
												</>
											);
									}
								});
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
								<span className="text-sm leading-5 text-gray-500">
									8+ characters
								</span>
							</div>
							<div className="mt-1 relative rounded-md shadow-sm">
								<input
									id="password"
									type={showPassword ? "text" : "password"}
									required
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									disabled={submitting}
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
								/>
								<div className="absolute inset-y-0 right-0 flex items-center">
									<button
										onClick={() =>
											setShowPassword((old) => !old)
										}
										disabled={submitting}
										type="button"
										title={
											showPassword
												? "Hide Password"
												: "Show Password"
										}
										tabIndex={
											-1
										} /* Allowing it to be tabbable would be bad because a user could press tab and then immediately press enter, expeciting the submit button to get pressed but instead revealing their password. */
										className={
											"h-full py-0 px-3 border-transparent bg-transparent text-gray-500 sm:text-sm sm:leading-5 rounded-md focus:outline-none transition duration-150 ease-in-out " +
											(submitting
												? "focus:shadow-outline-blue focus:border-blue-300 hover:text-gray-700 active:text-gray-900 "
												: "")
										}
									>
										{showPassword ? <EyeOff /> : <Eye />}
									</button>
								</div>
							</div>
						</div>

						<div className="mt-6">
							<div className="flex justify-between">
								<label
									htmlFor="confirmPassword"
									className="block text-sm font-medium leading-5 text-gray-700"
								>
									Confirm Password
								</label>
							</div>
							<div className="mt-1 relative rounded-md shadow-sm">
								<input
									id="confirmPassword"
									type={showPassword ? "text" : "password"}
									required
									value={confirm}
									onChange={(e) => setConfirm(e.target.value)}
									disabled={submitting}
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
								/>
								<div className="absolute inset-y-0 right-0 flex items-center">
									<button
										onClick={() =>
											setShowPassword((old) => !old)
										}
										disabled={submitting}
										type="button"
										title={
											showPassword
												? "Hide Password"
												: "Show Password"
										}
										tabIndex={
											-1
										} /* Allowing it to be tabbable would be bad because a user could press tab and then immediately press enter, expeciting the submit button to get pressed but instead revealing their password. */
										className={
											"h-full py-0 px-3 border-transparent bg-transparent text-gray-500 sm:text-sm sm:leading-5 rounded-md focus:outline-none transition duration-150 ease-in-out " +
											(submitting
												? "focus:shadow-outline-blue focus:border-blue-300 hover:text-gray-700 active:text-gray-900 "
												: "")
										}
									>
										{showPassword ? <EyeOff /> : <Eye />}
									</button>
								</div>
							</div>
						</div>
						{error && (
							<div className="mt-6 text-left">
								<div className="text-sm  text-red-400 leading-5">
									{typeof error === "string" ? (
										<p>{error}</p>
									) : (
										<>{error}</>
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
										? "Resetting Password..."
										: "Reset Password"}
								</button>
							</span>
						</div>
					</form>
				</>
			)}
			{success && (
				<>
					<h2 className="mt-6 text-3xl leading-9 font-extrabold text-gray-900">
						Your password has been updated.
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
