import classNames from "classnames";
import { Link, navigate } from "gatsby";
import React from "react";
import useFirebase from "../../auth/useFirebase";
import { Layout } from "../../components/layout";
export interface LoginPageProps {
	/**
	 * A path to redirect the user to upon successful sign in.
	 * Defaults to /account/
	 */
	continueURL?: string;
}
export default function LoginPage({
	location: { state },
}: {
	location: { state: LoginPageProps };
}): React.ReactElement {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [error, setError] = React.useState<React.ReactNode | null>(null);
	const [submitting, setSubmitting] = React.useState(false);
	const firebase = useFirebase();
	return (
		<Layout title={"Login"} navbarShadow="always">
			<div className="min-h-ca bg-gray-50 flex">
				<div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
					<div className="mx-auto w-full max-w-sm">
						<div>
							<h2 className="mt-6 text-3xl leading-9 font-extrabold text-gray-900">
								Sign in to your account
								{state?.continueURL ? " to continue" : ""}
							</h2>
							<p className="mt-2 text-sm leading-5 text-gray-600 max-w">
								Or{" "}
								<Link
									to="/account/create"
									state={{
										continueURL: state?.continueURL,
									}}
									className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
								>
									join Monta Vista Model United Nations
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
											setError(
												"Please enter your email."
											);
											return;
										}
										if (!password) {
											setError(
												"Please enter your password."
											);
											return;
										}
										setSubmitting(true);

										firebase
											.auth()
											.signInWithEmailAndPassword(
												email,
												password
											)
											.then((userCred) => {
												if (
													userCred.user &&
													!userCred.user.emailVerified
												) {
													navigate(
														"/account/create",
														{
															replace: true,
															state: {
																continueURL:
																	state?.continueURL,
															},
														}
													);
												} else {
													navigate(
														state?.continueURL ||
															"/account/",
														{ replace: true }
													);
												}
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
																No user was
																found with that
																email.
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
													case "auth/wrong-password":
														setError(
															"Incorrect Password"
														);
														break;
													case "auth/user-disabled":
														setError(
															<p>
																This account has
																been disabled.
																If you believe
																this is an
																error, please
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
																	{
																		error.message
																	}
																</p>
																<p>
																	If this was
																	unexpected,
																	please email
																	us at{" "}
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

									<div className="mt-6">
										<label
											htmlFor="password"
											className="block text-sm font-medium leading-5 text-gray-700"
										>
											Password
										</label>
										<div className="mt-1 rounded-md shadow-sm">
											<input
												id="password"
												type="password"
												required
												value={password}
												onChange={(e) =>
													setPassword(e.target.value)
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
													? "Signing you in..."
													: "Sign in"}
											</button>
										</span>
									</div>
									<div className="mt-6 text-center">
										<div className="text-sm leading-5">
											<p>
												<Link
													to="/account/recover"
													state={{
														continueURL:
															state?.continueURL,
													}}
													className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
												>
													Forgot your password?
												</Link>
											</p>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
				<div className="hidden lg:block relative w-0 flex-1">
					<img
						className="absolute inset-0 h-full w-full object-cover"
						src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
						alt=""
					/>
				</div>
			</div>
		</Layout>
	);
}
