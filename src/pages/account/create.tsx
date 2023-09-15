import axios from "axios";
import classNames from "classnames";
import { Link } from "gatsby";
import { Eye, EyeOff } from "heroicons-react";
import Mailcheck from "mailcheck";
import React, { useState } from "react";
import { AuthLayout } from "../../components/layout";
import AuthContext from "../../context/AuthContext";
import FirebaseStoredUserData from "../../firebase/FirebaseStoredUserData";
import useFirebase from "../../firebase/useFirebase";
import { getClassOf, getIsSummer } from "../../utils/schoolYearUtils";
import { LoginPageProps } from "./login";

export default function CreatePage({
	location: { state },
}: {
	location: { state: LoginPageProps };
}): React.ReactElement {
	const { user, loading } = React.useContext(AuthContext);
	const [name, setName] = useState(user?.displayName || "");
	const [grade, setGrade] = useState("");
	const [email, setEmail] = useState(user?.email || "");
	const [emailSuggestion, setEmailSuggestion] = React.useState<
		string | undefined
	>("");

	const [password, setPassword] = useState("");
	const [discordClicked, setDiscordClicked] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = React.useState<React.ReactNode | null>(null);
	const [submitting, setSubmitting] = useState(false);
	const [done, setDone] = useState(!!user);
	const [resendTimeLeft, setResendTimeLeft] = useState(60);
	const [timesResent, setTimesResent] = useState(0);

	const [verificationComplete, setVerificationComplete] = useState(
		!!user?.emailVerified
	);
	const [verificationEmailSent, setVerificationEmailSent] = useState(false);

	React.useEffect(() => {
		if (user) {
			setDone(true);

			setName((currentValue) => user.displayName || currentValue);
			setEmail(
				(currentValue) => user.email || currentValue || "your email"
			);
			setVerificationComplete(user.emailVerified);
		}
	}, [user]);
	const [sysend, setSysend] = React.useState<
		Record<string, any> | undefined
	>();
	React.useEffect(() => {
		if (!done) return;
		const interval = setInterval(() => {
			setResendTimeLeft((old) => (old > 0 ? old - 1 : 0));
		}, 1000);
		return () => clearInterval(interval);
	}, [done]);
	const firebase = useFirebase();

	React.useEffect(() => {
		import("sysend").then((module) => setSysend(module));
	}, []);
	React.useEffect(() => {
		if (!sysend) return;

		const handler = (verifiedEmail: string) => {
			if (email == verifiedEmail) {
				console.log(
					"VERIFICATION EMAIL MISMATCH. Expected " +
						email +
						" but got " +
						verifiedEmail +
						"."
				);
				return;
			}
			if (firebase) {
				firebase.auth().currentUser?.reload();
			}
			setVerificationComplete(true);
		};
		sysend.on("email-verified", handler);
		return () => sysend.off("email-verified", handler);
	}, [sysend, firebase]);
	return (
		<AuthLayout
			title={"Join MVMUN"}
			description={
				"Monta Vista Model United Nations is a close-knit club and community that strives to provide experiences in teamwork, negotiation, and diplomacy by simulating the United Nations during engaging conferences. Join MV Model UN today to start your MUN journey!"
			}
		>
			{done ? (
				<div className="w-full max-w-sm mx-auto">
					<div>
						<h2 className="mt-6 text-3xl font-extrabold leading-9 text-gray-900">
							Welcome
							{name && (
								<>
									{", "}
									{name.split(" ").slice(0, -1).join(" ")}
								</>
							)}
							!
						</h2>
						<h3 className="mt-3 text-xl font-bold text-gray-700">
							You're now a member of Monta Vista Model United
							Nations!
						</h3>
					</div>
					<h5 className={"text-xl font-extrabold mt-5"}>
						Next steps:
						<br />
						{verificationComplete && "✓ "}
						{verificationEmailSent || verificationComplete ? (
							<span
								className={
									verificationComplete ? "line-through" : ""
								}
							>
								Verify Your Email
								{!verificationComplete && " (required)"}
							</span>
						) : (
							<a
								className={"link"}
								onClick={(e) => {
									e.preventDefault();
									user?.sendEmailVerification().catch(
										(error) => console.log(error)
									);
									setResendTimeLeft(60);
									setVerificationEmailSent(true);
								}}
							>
								Verify Your Email (required)
							</a>
						)}
						<br />
						{discordClicked && "✓ "}
						<a
							href={"https://discord.gg/5sN9WXa"}
							onClick={(e) => {
								e.preventDefault();
								setDiscordClicked(true);
								window.open(
									"https://discord.gg/5sN9WXa",
									"_blank"
								);
							}}
							className={
								"link font-extrabold" +
								(discordClicked ? " line-through" : "")
							}
						>
							Join Our Discord
						</a>
						<br />
						Attend your first member meeting (Thursday lunches in
						C107!)
					</h5>

					{verificationComplete && (
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
					)}
					{!verificationComplete && verificationEmailSent && (
						<div className="mt-8">
							<h4 className="text-lg">
								We've sent a verification email to{" "}
								<b>{email}</b>. <br />
								Once you verify your email, we'll send you
								weekly member updates.
							</h4>

							<span className="block w-full mt-5 rounded-md shadow-sm">
								<button
									type="submit"
									disabled={resendTimeLeft > 0}
									className={classNames(
										"w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white transition duration-150 ease-in-out",
										resendTimeLeft > 0
											? "bg-indigo-400"
											: "bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:ring-indigo-500 active:bg-indigo-700"
									)}
									onClick={() => {
										if (resendTimeLeft > 0) return;
										setResendTimeLeft(60);
										setTimesResent((old) => old + 1);
									}}
								>
									{resendTimeLeft > 0
										? `If you don't get the email after ${resendTimeLeft} second${
												resendTimeLeft === 1 ? "" : "s"
										  }, you can resend it`
										: "Didn't get the email? Resend it"}
								</button>
							</span>
							{timesResent >= 1 && (
								<p className="mt-5 text-md">
									<b>Having problems getting our emails?</b>
									<br />
									Remember to check your spam folder. If you
									still don't see it, send us an email at{" "}
									<a
										href="mailto:support@montavistamun.com"
										className="link"
									>
										support@montavistamun.com
									</a>
									.
								</p>
							)}
						</div>
					)}
				</div>
			) : (
				<div className="w-full max-w-sm mx-auto">
					<div>
						<h2 className="mt-6 text-3xl font-extrabold leading-9 text-gray-900">
							Start your MUN journey today
						</h2>
						<p className="mt-2 text-sm leading-5 text-gray-600 max-w">
							<Link
								to="/account/login"
								state={{
									continueURL: state?.continueURL,
								}}
								className="font-medium text-indigo-600 transition duration-150 ease-in-out hover:text-indigo-500 focus:outline-none focus:underline"
							>
								Already have an account?
							</Link>
						</p>
					</div>

					<div className="mt-8">
						<div className="mt-6">
							<form
								noValidate
								onSubmit={async (e) => {
									e.preventDefault();
									if (!firebase) return;

									// the validation for this form is relatively lax because accounts are generally going
									// to be verified when they are used for anything significant, and decreasing sign-up
									// friction is more important than for some other web service

									if (
										!name.trim() ||
										!email.trim() ||
										!password.trim()
									) {
										setError("All fields are required.");
										return;
									}
									// check the grade field seperately because it is the one they are most likely to not notice
									// since it's a radio and not an input field
									// for any other field, once they realize all fields are required, it should be easy
									// to instantly identify the empty input field(s)
									if (!grade) {
										setError("Please enter your grade.");
										return;
									}
									if (
										name
											.trim()
											.split(" ")
											.filter((n) => n.length > 1)
											.length < 2
									) {
										// full name should have a first name of 2+ characters and
										// a last name of 2+ characters
										setError(
											"Please enter your full name."
										);
										return;
									}
									if (email.split("@").length < 2) {
										setError("Please enter a valid email.");
										return;
									}
									if (password.length < 8) {
										setError(
											"Your password should be at least 8 characters."
										);
										return;
									}
									setSubmitting(true);
									setShowPassword(false);

									try {
										const credential = await firebase
											.auth()
											.createUserWithEmailAndPassword(
												email,
												password
											);
										const user = credential.user;
										if (!user) {
											throw {
												message:
													"User not found in credential. This is an internal error.",
												code:
													"internal/no-user-in-credential",
											};
										}

										const gradeNum = parseInt(grade, 10);
										const firstName = name
											.trim()
											.split(" ")
											.slice(0, -1)
											.join(" ");
										const lastName =
											name.trim().indexOf(" ") > -1
												? name
														.trim()
														.split(" ")
														.slice(-1)[0]
												: "";
										await Promise.all([
											firebase
												.firestore()
												.collection("users")
												.doc(user.uid)
												.set({
													firstName,
													lastName,
													email,
													grade: {
														grade: gradeNum,
														asOf: firebase.firestore.FieldValue.serverTimestamp(),
													},
													classOf: getClassOf(
														gradeNum
													),
												} as FirebaseStoredUserData),
											user.updateProfile({
												displayName: name,
											}),
											user.sendEmailVerification(),
											user.getIdToken().then((token) =>
												axios.post(
													"/.netlify/functions/update-email-list",
													{
														firstName,
														lastName,
														email,
														grade: gradeNum,
													},
													{
														headers: {
															authorization: `Bearer ${token}`,
														},
													}
												)
											),
										]);
										setVerificationEmailSent(true);
										setDone(true);
										setResendTimeLeft(59);
									} catch (error) {
										console.log({ ...error });
										switch (error.code) {
											case "auth/email-already-in-use":
												setError(
													<p>
														It looks like you
														already have an account.
														Try{" "}
														<Link
															to="/account/login"
															className="link"
														>
															logging in instead
														</Link>
														.
													</p>
												);
												break;
											case "auth/invalid-email":
												setError(
													"The email address you entered isn't valid."
												);
												break;
											case "auth/weak-password":
												setError(
													"Please enter a stronger password. Try increasing the length or adding numbers / special characters."
												);
												break;
											default:
												setError(
													<>
														<p>
															Error:{" "}
															{error.message}
														</p>
														<p>
															If this was
															unexpected, please
															email us at{" "}
															<a
																href={
																	"mailto:support@montavistamun.com"
																}
																className={
																	"link"
																}
															>
																support@montavistamun.com
															</a>
															.
														</p>
													</>
												);
										}
										setSubmitting(false);
									}
									setSubmitting(false);
								}}
							>
								<div>
									<label
										htmlFor="name"
										className="block text-sm font-medium leading-5 text-gray-700"
									>
										Full Name
									</label>
									<div className="mt-1 rounded-md shadow-sm">
										<input
											id="name"
											type="text"
											required
											value={name}
											onChange={(e) =>
												setName(e.target.value)
											}
											disabled={submitting}
											className="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-300 sm:text-sm sm:leading-5"
										/>
									</div>
								</div>
								<div className="mt-6">
									<legend className="block text-sm font-medium leading-5 text-gray-700">
										Grade
										{getIsSummer() && " (in fall)"}
									</legend>
									<div className="mt-1">
										{["9", "10", "11", "12"].map(
											(el, i) => (
												<label
													key={el}
													htmlFor={`grade${el}`}
													className={`${
														i == 0 ? "" : "pl-3"
													} pr-3 inline-flex items-center py-2`}
												>
													<input
														id={`grade${el}`}
														name="grade"
														type="radio"
														disabled={submitting}
														className={`form-radio h-4 w-4 transition duration-150 ease-in-out ${
															submitting
																? `text-gray-600 ${
																		grade ==
																		el
																			? ""
																			: "bg-gray-200"
																  }`
																: "text-indigo-600"
														}`}
														onChange={(e) =>
															e.target.checked &&
															setGrade(el)
														}
														checked={grade == el}
													/>
													<span className="block ml-2 text-sm font-medium leading-5 text-gray-700">
														{el}th
													</span>
												</label>
											)
										)}
									</div>
								</div>
								<div className="mt-6">
									<div className="flex justify-between">
										<label
											htmlFor="email"
											className="block text-sm font-medium leading-5 text-gray-700"
										>
											Email
										</label>
										<span className="text-sm leading-5 text-gray-500">
											We'll email you weekly updates
										</span>
									</div>
									<div className="mt-1 rounded-md shadow-sm">
										<input
											id="email"
											type="email"
											required
											value={email}
											onChange={(e) => {
												setEmail(e.target.value);

												// if a suggestion is already being displayed, update it so it doesn't become outdated
												// but otherwise don't check it until the user unfocuses the input
												if (emailSuggestion) {
													const result = Mailcheck.run(
														{
															email:
																e.target.value,
														}
													);
													setEmailSuggestion(
														result?.full
													);
												}
											}}
											onBlur={() => {
												const result = Mailcheck.run({
													email: email,
												});
												setEmailSuggestion(
													result?.full
												);
											}}
											disabled={submitting}
											className="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-300 sm:text-sm sm:leading-5"
										/>
									</div>
									{emailSuggestion && (
										<p
											className="mt-2 text-sm text-gray-500"
											id="email-description"
										>
											Did you mean{" "}
											<button
												type={"button"}
												onClick={() => {
													setEmail(emailSuggestion);
													setEmailSuggestion(
														undefined
													);
												}}
												className="link"
											>
												{emailSuggestion}
											</button>
											?
										</p>
									)}
								</div>

								<div className="mt-6">
									<div className="flex justify-between">
										<label
											htmlFor="password"
											className="block text-sm font-medium leading-5 text-gray-700"
										>
											Password
										</label>
										<span className="text-sm leading-5 text-gray-500">
											For Your Member Account
										</span>
									</div>
									<div className="relative mt-1 rounded-md shadow-sm">
										<input
											id="password"
											type={
												showPassword
													? "text"
													: "password"
											}
											required
											value={password}
											onChange={(e) =>
												setPassword(e.target.value)
											}
											disabled={submitting}
											className="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-300 sm:text-sm sm:leading-5"
										/>
										<div className="absolute inset-y-0 right-0 flex items-center">
											<button
												onClick={() =>
													setShowPassword(
														(old) => !old
													)
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
														? "focus:ring-blue-500 focus:border-blue-300 hover:text-gray-700 active:text-gray-900 "
														: "")
												}
											>
												{showPassword ? (
													<EyeOff />
												) : (
													<Eye />
												)}
											</button>
										</div>
									</div>
								</div>

								{error && (
									<div className="mt-6 text-left">
										<div className="text-sm leading-5 text-red-400">
											{typeof error === "string" ? (
												<p>{error}</p>
											) : (
												<>{error}</>
											)}
										</div>
									</div>
								)}

								<div className="mt-6">
									<p className="mt-2 text-sm text-gray-500">
										You must be a MVHS student to join.
									</p>
									<p className="mt-2 text-sm text-gray-500">
										When you create your MVMUN account, you
										will be automatically sent member
										updates every week.
									</p>

									<span className="block w-full mt-2 rounded-md shadow-sm">
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
												? "Creating Account..."
												: "Create Account"}
										</button>
									</span>
								</div>
							</form>
						</div>
					</div>
				</div>
			)}
		</AuthLayout>
	);
}
