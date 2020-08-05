import classNames from "classnames";
import { Link } from "gatsby";
import { Eye, EyeOff } from "heroicons-react";
import moment from "moment";
import React from "react";
import FirebaseStoredUserData from "../../auth/FirebaseStoredUserData";
import useFirebase from "../../auth/useFirebase";
import { Layout } from "../../components/layout";
import {
	getClassOf,
	getFirstDayOfSchool,
	getIsSummer,
	getLastDayOfSchool,
} from "../../utils/schoolYearUtils";
export default function CreatePage(): React.ReactElement {
	const [name, setName] = React.useState("");
	const [grade, setGrade] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [showPassword, setShowPassword] = React.useState(false);
	const [error, setError] = React.useState<React.ReactNode | null>(null);
	const [submitting, setSubmitting] = React.useState(false);
	const [done, setDone] = React.useState(false);
	const [resendTimeLeft, setResendTimeLeft] = React.useState(120);
	const [timesResent, setTimesResent] = React.useState(0);
	const [verificationComplete, setVerificationComplete] = React.useState(
		false
	);
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
	React.useEffect(
		() =>
			console.log(
				getFirstDayOfSchool().toString(),
				getLastDayOfSchool().toString(),
				getClassOf(11),
				getIsSummer(),
				moment().month()
			),
		[]
	);
	React.useEffect(() => {
		import("sysend").then((module) => setSysend(module));
	}, []);
	React.useEffect(() => {
		if (!sysend) return;

		const handler = (email: string) => {
			console.log("EMAIL_VERIFIED", email);
			setVerificationComplete(true);
		};
		sysend.on("email-verified", handler);
		return () => sysend.off("email-verified", handler);
	}, [sysend]);
	return (
		<Layout title={"Join MVMUN"} navbarShadow="always">
			<div className="min-h-ca bg-gray-50 flex">
				<div className="flex-1 flex flex-col py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
					{done ? (
						<div className="mx-auto w-full max-w-sm">
							<div>
								<h2 className="mt-6 text-3xl leading-9 font-extrabold text-gray-900">
									Welcome,{" "}
									{name.split(" ").slice(0, -1).join(" ")}!
								</h2>
								<h3 className="mt-3 text-xl font-bold text-gray-700">
									You're now a member of Monta Vista Model
									United Nations!
								</h3>
							</div>
							{verificationComplete && (
								<div className="mt-8">
									<h4 className="text-xl font-bold">
										Hooray! You've verified your email in
										another tab.
									</h4>
									<Link
										to="/account/"
										className={classNames(
											"mt-4 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white transition duration-150 ease-in-out bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
										)}
									>
										Continue to Account Overview
									</Link>
								</div>
							)}
							{!verificationComplete && (
								<div className="mt-8">
									<h4 className="text-lg">
										We've sent a verification email to{" "}
										<b>{email}</b>. <br />
										In order to fully use your account,
										you'll need to click the link in that
										email.
									</h4>
									<p className="text-md italic mt-4">
										Once you've verified your email, you can
										close this tab.
									</p>
									<span className="block w-full rounded-md shadow-sm mt-5">
										<button
											type="submit"
											disabled={resendTimeLeft > 0}
											className={classNames(
												"w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white transition duration-150 ease-in-out",
												resendTimeLeft > 0
													? "bg-indigo-400 cursor-not-allowed"
													: "bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
											)}
											onClick={() => {
												if (resendTimeLeft > 0) return;
												setResendTimeLeft(120);
												setTimesResent(
													(old) => old + 1
												);
											}}
										>
											{resendTimeLeft > 0
												? `If you don't get the email after ${resendTimeLeft} second${
														resendTimeLeft === 1
															? ""
															: "s"
												  }, you can resend it`
												: "Didn't get the email? Resend it"}
										</button>
									</span>
									{timesResent >= 1 && (
										<p className="text-md mt-5">
											<b>
												Having problems getting our
												emails?
											</b>
											<br />
											Remeber to check your spam folder.
											If you still don't see it, send us
											an email at{" "}
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
						<div className="mx-auto w-full max-w-sm">
							<div>
								<h2 className="mt-6 text-3xl leading-9 font-extrabold text-gray-900">
									Start your MUN journey today
								</h2>
								<p className="mt-2 text-sm leading-5 text-gray-600 max-w">
									<Link
										to="/account/login"
										className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
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
												setError(
													"All fields are required."
												);
												return;
											}
											// check the grade field seperately because it is the one they are most likely to not notice
											// since it's a radio and not an input field
											// for any other field, once they realize all fields are required, it should be easy
											// to instantly identify the empty input field(s)
											if (!grade) {
												setError(
													"Please enter your grade."
												);
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
												setError(
													"Please enter a valid email."
												);
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
											console.log(
												name,
												email,
												password,
												grade
											);

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

												const gradeNum = parseInt(
													grade,
													10
												);
												await Promise.all([
													firebase
														.firestore()
														.collection("users")
														.doc(user.uid)
														.set({
															firstName: name
																.trim()
																.split(" ")
																.slice(0, -1)
																.join(" "),
															lastName:
																name
																	.trim()
																	.indexOf(
																		" "
																	) > -1
																	? name
																			.trim()
																			.split(
																				" "
																			)
																			.slice(
																				-1
																			)[0]
																	: "",
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
												]);
												setDone(true);
												setResendTimeLeft(59);
											} catch (error) {
												console.log(error);
												switch (error.code) {
													case "auth/email-already-in-use":
														setError(
															<p>
																It looks like
																you already have
																an account. Try{" "}
																<Link
																	to="/account/login"
																	className="link"
																>
																	logging in
																	instead
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
													className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
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
																i == 0
																	? ""
																	: "pl-3"
															} pr-3 inline-flex items-center py-2`}
														>
															<input
																id={`grade${el}`}
																name="form-input grade"
																type="radio"
																disabled={
																	submitting
																}
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
																	e.target
																		.checked &&
																	setGrade(el)
																}
																checked={
																	grade == el
																}
															/>
															<span className="ml-2 block text-sm leading-5 font-medium text-gray-700">
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
													Choose one you check often
												</span>
											</div>
											<div className="mt-1 rounded-md shadow-sm">
												<input
													id="email"
													type="email"
													required
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
													type={
														showPassword
															? "text"
															: "password"
													}
													required
													value={password}
													onChange={(e) =>
														setPassword(
															e.target.value
														)
													}
													disabled={submitting}
													className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
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
																? "focus:shadow-outline-blue focus:border-blue-300 hover:text-gray-700 active:text-gray-900 "
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
												<div className="text-sm  text-red-400 leading-5">
													{typeof error ===
													"string" ? (
														<p>{error}</p>
													) : (
														<>{error}</>
													)}
												</div>
											</div>
										)}

										<div className="mt-6">
											<p className="mt-2 text-sm text-gray-500">
												You must be a MVHS student to
												join.
											</p>
											<p className="mt-2 text-sm text-gray-500">
												When you create your MVMUN
												account, you will be
												automatically sent member
												updates every week.
											</p>

											<span className="block w-full rounded-md shadow-sm mt-2">
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
