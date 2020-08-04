import React from "react";
import FirebaseStoredUserData from "../../auth/FirebaseStoredUserData";
import useFirebase from "../../auth/useFirebase";
import { Layout, Main } from "../../components/layout";
import AuthContext from "../../context/AuthContext";

export default function SettingsPage(): React.ReactElement {
	const { user, loading } = React.useContext(AuthContext);
	const firebase = useFirebase();
	const [currentFirstName, setCurrentFirstName] = React.useState("");
	const [currentLastName, setCurrentLastName] = React.useState("");
	const [firstName, setFirstName] = React.useState("Loading...");
	const [lastName, setLastName] = React.useState("Loading...");
	const [loadingProfile, setLoadingProfile] = React.useState(true);
	const [profileChangeSuccess, setProfileChangeSuccess] = React.useState(
		false
	);
	const [profileChangeError, setProfileChangeError] = React.useState<
		React.ReactNode
	>("");
	const [
		profileChangeSubmitting,
		setProfileChangeSubmitting,
	] = React.useState(false);
	const profileNotChanged =
		firstName == currentFirstName && lastName == currentLastName;
	React.useEffect(() => {
		if (!firebase || !user) return;
		if (currentFirstName != "") return;
		firebase
			.firestore()
			.collection("users")
			.doc(user?.uid)
			.get()
			.then((snapshot) => snapshot.data() as FirebaseStoredUserData)
			.then((data) => {
				console.log(data);
				setCurrentFirstName(data.firstName);
				setCurrentLastName(data.lastName);
				setFirstName(data.firstName);
				setLastName(data.lastName);
				setLoadingProfile(false);
			});
	}, [firebase, user]);
	return (
		<Layout title="Account Settings">
			<Main wide>
				<div className="mt-10 sm:mt-0">
					<div className="md:grid md:grid-cols-3 md:gap-6">
						<div className="md:col-span-1">
							<div className="px-4 sm:px-0">
								<h3 className="text-lg font-medium leading-6 text-gray-900">
									Personal Information
								</h3>
								<p className="mt-1 text-sm leading-5 text-gray-600">
									This will be kept private.
								</p>
							</div>
						</div>
						<div className="mt-5 md:mt-0 md:col-span-2">
							<form
								noValidate
								onSubmit={(e) => {
									e.preventDefault();

									if (
										profileNotChanged ||
										loadingProfile ||
										profileChangeSubmitting
									)
										return;
									setProfileChangeError("");
									setProfileChangeSuccess(false);
									if (!firebase || !user) return;
									if (!firstName || !lastName) {
										setProfileChangeError(
											"Please enter a first and last name."
										);
										return;
									}

									setProfileChangeSubmitting(true);
									Promise.all([
										user.updateProfile({
											displayName:
												firstName + " " + lastName,
										}),
										firebase
											.firestore()
											.collection("users")
											.doc(user.uid)
											.update({
												firstName: firstName,
												lastName: lastName,
											}),
									])
										.then(() => {
											setProfileChangeSubmitting(false);
											setProfileChangeSuccess(true);
											setCurrentFirstName(firstName);
											setCurrentLastName(lastName);
										})
										.catch((e) => {
											setProfileChangeSubmitting(false);
											setProfileChangeError(
												<>
													<p>Error: {e.message}</p>
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
										});
								}}
							>
								<div className="shadow overflow-hidden sm:rounded-md">
									<div className="px-4 py-5 bg-white sm:p-6">
										<div className="grid grid-cols-6 gap-6">
											<div className="col-span-6 sm:col-span-3">
												<label
													htmlFor="first_name"
													className="block text-sm font-medium leading-5 text-gray-700"
												>
													First name
												</label>
												<input
													id="first_name"
													disabled={
														loadingProfile ||
														profileChangeSubmitting
													}
													value={firstName}
													onChange={(e) => {
														setFirstName(
															e.target.value
														);
														setProfileChangeError(
															""
														);
													}}
													className={
														"mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" +
														(loadingProfile ||
														profileChangeSubmitting
															? "bg-gray-100"
															: "")
													}
												/>
											</div>

											<div className="col-span-6 sm:col-span-3">
												<label
													htmlFor="last_name"
													className="block text-sm font-medium leading-5 text-gray-700"
												>
													Last name
												</label>
												<input
													id="last_name"
													disabled={
														loadingProfile ||
														profileChangeSubmitting
													}
													value={lastName}
													onChange={(e) => {
														setLastName(
															e.target.value
														);
														setProfileChangeError(
															""
														);
													}}
													className={
														"mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" +
														(loadingProfile ||
														profileChangeSubmitting
															? "bg-gray-100"
															: "")
													}
												/>
											</div>
										</div>
										{profileChangeSuccess &&
											!profileChangeError && (
												<p className="text-green-600 my-2 mt-5">
													Your profile has been
													updated.
												</p>
											)}
										{/* don't show the error if they change it back to the original name */}
										{profileChangeError &&
											!profileNotChanged && (
												<p className="text-red-600 my-2 mt-5">
													{profileChangeError}
												</p>
											)}
									</div>
									<div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
										<button
											type="submit"
											disabled={
												profileNotChanged ||
												loadingProfile ||
												profileChangeSubmitting
											}
											className={`py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white ${
												profileNotChanged ||
												loadingProfile ||
												profileChangeSubmitting
													? "bg-indigo-300"
													: "bg-indigo-600 hover:bg-indigo-500 focus:shadow-outline-blue active:bg-indigo-600"
											} shadow-sm focus:outline-none transition duration-150 ease-in-out`}
										>
											{profileChangeSubmitting
												? "Loading..."
												: profileNotChanged ||
												  loadingProfile
												? "No Changes to Save"
												: "Save"}
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>

				<div className="hidden sm:block">
					<div className="py-5">
						<div className="border-t border-gray-200"></div>
					</div>
				</div>
				<div className="mt-10 sm:mt-0">
					<div className="md:grid md:grid-cols-3 md:gap-6">
						<div className="md:col-span-1">
							<div className="px-4 sm:px-0">
								<h3 className="text-lg font-medium leading-6 text-gray-900">
									Sign In and Security
								</h3>
								<p className="mt-1 text-sm leading-5 text-gray-600">
									This information allows you to log in to
									your account.
								</p>
							</div>
						</div>
						<div className="mt-5 md:mt-0 md:col-span-2">
							<form action="#" method="POST">
								<div className="shadow overflow-hidden sm:rounded-md">
									<div className="px-4 py-5 bg-white sm:p-6">
										<div className="grid grid-cols-6 gap-3 sm:gap-6">
											<div className="col-span-6">
												<label className="block text-sm font-medium leading-5 text-gray-700">
													Email Address
												</label>
												<span className="mt-1 block w-full py-2 focus:outline-none sm:text-sm sm:leading-5">
													{user?.email
														? user.email
														: "loading..."}{" "}
													(
													<a
														href="#"
														className="link"
													>
														Change Your Email
													</a>
													)
												</span>
											</div>
											<div className="col-span-6">
												<label className="block text-sm font-medium leading-5 text-gray-700">
													Password
												</label>
												<span className="mt-1 block w-full py-2 focus:outline-none sm:text-sm sm:leading-5">
													<a
														href="#"
														className="link"
													>
														Change Your Password
													</a>
												</span>
											</div>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>

				<div className="hidden sm:block">
					<div className="py-5">
						<div className="border-t border-gray-200"></div>
					</div>
				</div>
				<div className="mt-10 sm:mt-0">
					<div className="md:grid md:grid-cols-3 md:gap-6">
						<div className="md:col-span-1">
							<div className="px-4 sm:px-0">
								<h3 className="text-lg font-medium leading-6 text-gray-900">
									Disable Account
								</h3>
								<p className="mt-1 text-sm leading-5 text-gray-600">
									Stop participating in MVMUN and be
									unsubscribed from our emails.
								</p>
							</div>
						</div>
						<div className="mt-5 md:mt-0 md:col-span-2">
							<form action="#" method="POST">
								<div className="shadow overflow-hidden sm:rounded-md">
									<div className="px-4 py-5 bg-white sm:p-6">
										<fieldset>
											<legend className="text-base leading-6 font-medium text-gray-900">
												By Email
											</legend>
											<div className="mt-4">
												<div className="flex items-start">
													<div className="flex items-center h-5">
														<input
															id="comments"
															type="checkbox"
															className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
														/>
													</div>
													<div className="ml-3 text-sm leading-5">
														<label
															htmlFor="comments"
															className="font-medium text-gray-700"
														>
															Comments
														</label>
														<p className="text-gray-500">
															Get notified when
															someones posts a
															comment on a
															posting.
														</p>
													</div>
												</div>
												<div className="mt-4">
													<div className="flex items-start">
														<div className="flex items-center h-5">
															<input
																id="candidates"
																type="checkbox"
																className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
															/>
														</div>
														<div className="ml-3 text-sm leading-5">
															<label
																htmlFor="candidates"
																className="font-medium text-gray-700"
															>
																Candidates
															</label>
															<p className="text-gray-500">
																Get notified
																when a candidate
																applies for a
																job.
															</p>
														</div>
													</div>
												</div>
												<div className="mt-4">
													<div className="flex items-start">
														<div className="flex items-center h-5">
															<input
																id="offers"
																type="checkbox"
																className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
															/>
														</div>
														<div className="ml-3 text-sm leading-5">
															<label
																htmlFor="offers"
																className="font-medium text-gray-700"
															>
																Offers
															</label>
															<p className="text-gray-500">
																Get notified
																when a candidate
																accepts or
																rejects an
																offer.
															</p>
														</div>
													</div>
												</div>
											</div>
										</fieldset>
										<fieldset className="mt-6">
											<legend className="text-base leading-6 font-medium text-gray-900">
												Push Notifications
											</legend>
											<p className="text-sm leading-5 text-gray-500">
												These are delivered via SMS to
												your mobile phone.
											</p>
											<div className="mt-4">
												<div className="flex items-center">
													<input
														id="push_everything"
														name="form-input push_notifications"
														type="radio"
														className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
													/>
													<label
														htmlFor="push_everything"
														className="ml-3"
													>
														<span className="block text-sm leading-5 font-medium text-gray-700">
															Everything
														</span>
													</label>
												</div>
												<div className="mt-4 flex items-center">
													<input
														id="push_email"
														name="form-input push_notifications"
														type="radio"
														className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
													/>
													<label
														htmlFor="push_email"
														className="ml-3"
													>
														<span className="block text-sm leading-5 font-medium text-gray-700">
															Same as email
														</span>
													</label>
												</div>
												<div className="mt-4 flex items-center">
													<input
														id="push_nothing"
														name="form-input push_notifications"
														type="radio"
														className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
													/>
													<label
														htmlFor="push_nothing"
														className="ml-3"
													>
														<span className="block text-sm leading-5 font-medium text-gray-700">
															No push
															notifications
														</span>
													</label>
												</div>
											</div>
										</fieldset>
									</div>
									<div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
										<button className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-500 focus:outline-none focus:shadow-outline-blue focus:bg-indigo-500 active:bg-indigo-600 transition duration-150 ease-in-out">
											Save
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</Main>
		</Layout>
	);
}
