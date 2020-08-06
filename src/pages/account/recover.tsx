import classNames from "classnames";
import { Link } from "gatsby";
import React from "react";
import useFirebase from "../../auth/useFirebase";
import { AuthLayout } from "../../components/layout";
import { LoginPageProps } from "./login";
export default function ForgotPasswordPage({
	location: { state },
}: {
	location: { state: LoginPageProps };
}): React.ReactElement {
	const [email, setEmail] = React.useState("");
	const [emailSent, setEmailSent] = React.useState(false);
	const [error, setError] = React.useState<React.ReactNode | null>(null);
	const [submitting, setSubmitting] = React.useState(false);
	const firebase = useFirebase();
	return (
		<AuthLayout title={"Login"}>
			{!emailSent && (
				<div className="mx-auto w-full max-w-sm">
					<div>
						<h2 className="mt-6 text-3xl leading-9 font-extrabold text-gray-900">
							Reset your password
						</h2>
						<p className="mt-2 text-sm leading-5 text-gray-600 max-w">
							Or{" "}
							<Link
								to="/account/login"
								state={{
									continueURL: state?.continueURL,
								}}
								className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
							>
								log in instead
							</Link>
						</p>
					</div>

					<div className="mt-8">
						<div className="mt-6">
							<form
								noValidate
								onSubmit={(e) => {
									e.preventDefault();
									if (!firebase) return;
									if (!email) {
										setError("Please enter your email.");
										return;
									}
									setSubmitting(true);
									firebase
										.auth()
										.sendPasswordResetEmail(
											email,
											state?.continueURL
												? {
														url: state?.continueURL,
												  }
												: undefined
										)
										.then(() => {
											setSubmitting(false);
											setEmailSent(true);
										})
										.catch((error) => {
											setSubmitting(false);
											console.log(error);
											switch (error.code) {
												case "auth/invalid-email":
													setError(
														"You didn't enter a valid email."
													);
													return;
												case "auth/user-not-found":
													setError(
														<p>
															No user was found
															with that email.
															<br />
															Do you want to{" "}
															<Link
																to={
																	"/account/create"
																}
																className="link"
															>
																join MVMUN
															</Link>{" "}
															instead?
														</p>
													);
													return;

												case "auth/user-disabled":
													setError(
														<p>
															This account has
															been disabled by an
															administrator. If
															you believe this is
															an error, please
															email{" "}
															<a
																className="link"
																href={
																	"mailto:support@montavistamun.com"
																}
															>
																support@montavistamun.com
															</a>
														</p>
													);
													return;
												default:
													setError(
														<>
															<p>
																Error:{" "}
																{error.message}
															</p>
															<p>
																If this was
																unexpected,
																please email us
																at{" "}
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
										});
								}}
							>
								<div>
									<label
										htmlFor="email"
										className="block text-sm font-medium leading-5 text-gray-700"
									>
										Email address
									</label>
									<div className="mt-1 rounded-md shadow-sm">
										<input
											id="email"
											type="email"
											required
											autoFocus
											value={email}
											onChange={(e) =>
												setEmail(e.target.value)
											}
											disabled={submitting}
											className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
										/>
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
												? "Sending a password reset email..."
												: "Reset Password"}
										</button>
									</span>
								</div>
							</form>
						</div>
					</div>
				</div>
			)}
			{emailSent && (
				<div className="mx-auto w-full max-w-sm">
					<div>
						<h2 className="mt-6 text-3xl leading-9 font-bold text-gray-900">
							We sent an email to <b>{email}</b>
						</h2>
						<p className="mt-2 text-sm leading-5 text-gray-600 max-w">
							<button
								onClick={() => {
									setEmail("");
									setEmailSent(false);
								}}
								className="text-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
							>
								wrong email?
							</button>
						</p>
					</div>

					<p className="text-md font-bold mt-5">
						You should recieve the email within 5 minutes. If you
						still don't see it then, you can try{" "}
						<a
							className="link"
							onClick={() => window.location.reload()}
						>
							resending the email
						</a>
						.
					</p>
				</div>
			)}
		</AuthLayout>
	);
}
