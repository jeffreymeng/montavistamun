import classNames from "classnames";
import { Link, navigate } from "gatsby";
import React, { useState } from "react";
import { AuthLayout } from "../../components/layout";
import AuthContext from "../../context/AuthContext";
import useFirebase from "../../firebase/useFirebase";
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
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = React.useState<React.ReactNode | null>(null);
	const [submitting, setSubmitting] = useState(false);
	const [justLoggedIn, setJustLoggedIn] = useState(false);
	const [alreadyLoggedIn, setAlreadyLoggedIn] = useState(false);
	const [
		alreadyLoggedInTimeLeft,
		setAlreadyLoggedInTimeLeft,
	] = React.useState<number | undefined>();
	const [
		alreadyLoggedInContinueCancelled,
		setAlreadyLoggedInContinueCancelled,
	] = useState(false);
	const { user, loading } = React.useContext(AuthContext);
	const firebase = useFirebase();
	React.useEffect(() => {
		if (user && !loading && !justLoggedIn) {
			setAlreadyLoggedIn(true);
			setAlreadyLoggedInTimeLeft(10);
		}
	}, [user, loading]);
	React.useEffect(() => {
		if (!alreadyLoggedIn)
			return () => {
				return null;
			};
		const intervalID = setInterval(() => {
			if (alreadyLoggedInTimeLeft === undefined) return;

			setAlreadyLoggedInTimeLeft((old) => {
				return old === undefined ? undefined : old > 0 ? old - 1 : 0;
			});
		}, 1000);
		return () => clearInterval(intervalID);
	}, [alreadyLoggedIn]);
	React.useEffect(() => {
		if (alreadyLoggedInTimeLeft === undefined) {
			return;
		}
		if (alreadyLoggedInTimeLeft <= 0) {
			navigate(state?.continueURL || "/dashboard/", {
				replace: true,
			});
		}
	}, [alreadyLoggedInTimeLeft]);
	return (
		<AuthLayout title={"Login"}>
			{alreadyLoggedIn && (
				<div>
					<h2 className="mt-6 text-3xl leading-9 font-extrabold text-gray-900">
						{user?.displayName
							? `Hey ${
									user.displayName.split(" ")[0]
							  }, you're already logged in!`
							: "You're already logged in!"}
					</h2>
					<div className="mt-5">
						<div className="mt-8 md:mt-20 lg:mt-40">
							<Link
								to={state?.continueURL || "/dashboard/"}
								className={classNames(
									"mt-4 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white transition duration-150 ease-in-out bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:ring-indigo-500 active:bg-indigo-700"
								)}
							>
								{state?.continueURL
									? "Continue"
									: "Continue to Member Dashboard"}
							</Link>
						</div>
						{!alreadyLoggedInContinueCancelled && (
							<div className={"mt-4"}>
								<p>
									We'll automatically redirect you in{" "}
									{alreadyLoggedInTimeLeft} seconds.{" "}
									<a
										onClick={() =>
											setAlreadyLoggedInContinueCancelled(
												true
											)
										}
										className="link cursor-pointer"
										type={"button"}
									>
										Cancel
									</a>
								</p>
							</div>
						)}
					</div>
				</div>
			)}
			{!alreadyLoggedIn && (
				<>
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
										setError("Please enter your email.");
										return;
									}
									if (!password) {
										setError("Please enter your password.");
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
											if (userCred.user?.uid) {
												heap.identify(
													"fbuser-" +
														userCred.user.uid
												);
												heap.addUserProperties({
													hasAccount: true,
													emailVerified:
														userCred.user
															.emailVerified,
												});
											}
											setJustLoggedIn(true);
											if (
												userCred.user &&
												!userCred.user.emailVerified
											) {
												return navigate(
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
												return navigate(
													state?.continueURL ||
														"/dashboard/",
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
												case "auth/wrong-password":
													setError(
														"Incorrect Password"
													);
													break;
												case "auth/user-disabled":
													setError(
														<p>
															This account has
															been disabled. If
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
											autoComplete={"username"}
											className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
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
											autoComplete={"current-password"}
											disabled={submitting}
											className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
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
													: "bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:ring-indigo-500 active:bg-indigo-700"
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
				</>
			)}
		</AuthLayout>
	);
}
