import axios from "axios";
import type firebaseType from "firebase";
import { Check, InformationCircle } from "heroicons-react";
import moment from "moment";
import React, { useState } from "react";
import Select from "react-select";
import useRequireLogin from "../../components/accounts/useRequireLogin";
import { Layout, Main } from "../../components/layout";
import Transition from "../../components/Transition";
import AuthContext from "../../context/AuthContext";
import "../../css/select.css";
import FirebaseStoredUserData from "../../firebase/FirebaseStoredUserData";
import useFirebase from "../../firebase/useFirebase";
import { getGrade, getLastDayOfSchool } from "../../utils/schoolYearUtils";
export default function SettingsPage(): React.ReactElement {
	const { user, loading } = React.useContext(AuthContext);
	const firebase = useFirebase();

	const [passwordModalOpen, setPasswordModalOpen] = useState(false);
	const [emailModalOpen, setEmailModalOpen] = useState(false);
	useRequireLogin();

	return (
		<Layout title="Account Settings" gray>
			<Main wide className={"min-h-ca"}>
				<h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate">
					Account Settings
				</h2>
				<p className="text-lg font-semibold mt-5 leading-6 text-gray-900 sm:text-xl sm:leading:7">
					These settings affect both your account and the member
					update emails we send you.
				</p>

				<div className="mt-15 sm:mt-10">
					<div className="md:grid md:grid-cols-3 md:gap-6">
						<div className="md:col-span-1">
							<div className="px-4 sm:px-0">
								<h3 className="text-lg font-medium leading-6 text-gray-900">
									Personal Information
								</h3>
							</div>
						</div>
						<div className="mt-5 md:mt-0 md:col-span-2">
							<PersonalInformationDisplay />
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
									Email and Password
								</h3>
								<p className="mt-1 text-sm leading-5 text-gray-600">
									This information allows you to log in to
									your account. This also controls where we
									send member update emails.
								</p>
							</div>
						</div>
						<div className="mt-5 md:mt-0 md:col-span-2">
							<div className="shadow sm:rounded-md">
								<div className="px-4 py-5 bg-white sm:p-6 rounded-b-md">
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
												<button
													onClick={() =>
														setEmailModalOpen(true)
													}
													className="link"
												>
													Change Your Email
												</button>
												)
											</span>
											<ChangeEmailModal
												user={user}
												isOpen={emailModalOpen}
												onClose={() =>
													setEmailModalOpen(false)
												}
											/>
										</div>
										<div className="col-span-6">
											<label className="block text-sm font-medium leading-5 text-gray-700">
												Password
											</label>
											<span className="mt-1 block w-full py-2 focus:outline-none sm:text-sm sm:leading-5">
												<button
													onClick={() =>
														setPasswordModalOpen(
															true
														)
													}
													className="link"
												>
													Change Your Password
												</button>
											</span>
											<ChangePasswordModal
												user={user}
												isOpen={passwordModalOpen}
												onClose={() =>
													setPasswordModalOpen(false)
												}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/*<div className="hidden sm:block">*/}
				{/*	<div className="py-5">*/}
				{/*		<div className="border-t border-gray-200"></div>*/}
				{/*	</div>*/}
				{/*</div>*/}
				{/*<div className="mt-10 sm:mt-0">*/}
				{/*	<div className="md:grid md:grid-cols-3 md:gap-6">*/}
				{/*		<div className="md:col-span-1">*/}
				{/*			<div className="px-4 sm:px-0">*/}
				{/*				<h3 className="text-lg font-medium leading-6 text-gray-900">*/}
				{/*					Disable Account*/}
				{/*				</h3>*/}
				{/*				<p className="mt-1 text-sm leading-5 text-gray-600">*/}
				{/*					Stop participating in MVMUN and be*/}
				{/*					unsubscribed from our emails.*/}
				{/*				</p>*/}
				{/*			</div>*/}
				{/*		</div>*/}
				{/*		<div className="mt-5 md:mt-0 md:col-span-2">*/}
				{/*			<form action="#" method="POST">*/}
				{/*				<div className="shadow overflow-hidden sm:rounded-md">*/}
				{/*					<div className="px-4 py-5 bg-white sm:p-6">*/}
				{/*						<fieldset>*/}
				{/*							<legend className="text-base leading-6 font-medium text-gray-900">*/}
				{/*								By Email*/}
				{/*							</legend>*/}
				{/*							<div className="mt-4">*/}
				{/*								<div className="flex items-start">*/}
				{/*									<div className="flex items-center h-5">*/}
				{/*										<input*/}
				{/*											id="comments"*/}
				{/*											type="checkbox"*/}
				{/*											className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"*/}
				{/*										/>*/}
				{/*									</div>*/}
				{/*									<div className="ml-3 text-sm leading-5">*/}
				{/*										<label*/}
				{/*											htmlFor="comments"*/}
				{/*											className="font-medium text-gray-700"*/}
				{/*										>*/}
				{/*											Comments*/}
				{/*										</label>*/}
				{/*										<p className="text-gray-500">*/}
				{/*											Get notified when*/}
				{/*											someones posts a*/}
				{/*											comment on a*/}
				{/*											posting.*/}
				{/*										</p>*/}
				{/*									</div>*/}
				{/*								</div>*/}
				{/*								<div className="mt-4">*/}
				{/*									<div className="flex items-start">*/}
				{/*										<div className="flex items-center h-5">*/}
				{/*											<input*/}
				{/*												id="candidates"*/}
				{/*												type="checkbox"*/}
				{/*												className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"*/}
				{/*											/>*/}
				{/*										</div>*/}
				{/*										<div className="ml-3 text-sm leading-5">*/}
				{/*											<label*/}
				{/*												htmlFor="candidates"*/}
				{/*												className="font-medium text-gray-700"*/}
				{/*											>*/}
				{/*												Candidates*/}
				{/*											</label>*/}
				{/*											<p className="text-gray-500">*/}
				{/*												Get notified*/}
				{/*												when a candidate*/}
				{/*												applies for a*/}
				{/*												job.*/}
				{/*											</p>*/}
				{/*										</div>*/}
				{/*									</div>*/}
				{/*								</div>*/}
				{/*								<div className="mt-4">*/}
				{/*									<div className="flex items-start">*/}
				{/*										<div className="flex items-center h-5">*/}
				{/*											<input*/}
				{/*												id="offers"*/}
				{/*												type="checkbox"*/}
				{/*												className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"*/}
				{/*											/>*/}
				{/*										</div>*/}
				{/*										<div className="ml-3 text-sm leading-5">*/}
				{/*											<label*/}
				{/*												htmlFor="offers"*/}
				{/*												className="font-medium text-gray-700"*/}
				{/*											>*/}
				{/*												Offers*/}
				{/*											</label>*/}
				{/*											<p className="text-gray-500">*/}
				{/*												Get notified*/}
				{/*												when a candidate*/}
				{/*												accepts or*/}
				{/*												rejects an*/}
				{/*												offer.*/}
				{/*											</p>*/}
				{/*										</div>*/}
				{/*									</div>*/}
				{/*								</div>*/}
				{/*							</div>*/}
				{/*						</fieldset>*/}
				{/*						<fieldset className="mt-6">*/}
				{/*							<legend className="text-base leading-6 font-medium text-gray-900">*/}
				{/*								Push Notifications*/}
				{/*							</legend>*/}
				{/*							<p className="text-sm leading-5 text-gray-500">*/}
				{/*								These are delivered via SMS to*/}
				{/*								your mobile phone.*/}
				{/*							</p>*/}
				{/*							<div className="mt-4">*/}
				{/*								<div className="flex items-center">*/}
				{/*									<input*/}
				{/*										id="push_everything"*/}
				{/*										name="form-input push_notifications"*/}
				{/*										type="radio"*/}
				{/*										className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"*/}
				{/*									/>*/}
				{/*									<label*/}
				{/*										htmlFor="push_everything"*/}
				{/*										className="ml-3"*/}
				{/*									>*/}
				{/*										<span className="block text-sm leading-5 font-medium text-gray-700">*/}
				{/*											Everything*/}
				{/*										</span>*/}
				{/*									</label>*/}
				{/*								</div>*/}
				{/*								<div className="mt-4 flex items-center">*/}
				{/*									<input*/}
				{/*										id="push_email"*/}
				{/*										name="form-input push_notifications"*/}
				{/*										type="radio"*/}
				{/*										className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"*/}
				{/*									/>*/}
				{/*									<label*/}
				{/*										htmlFor="push_email"*/}
				{/*										className="ml-3"*/}
				{/*									>*/}
				{/*										<span className="block text-sm leading-5 font-medium text-gray-700">*/}
				{/*											Same as email*/}
				{/*										</span>*/}
				{/*									</label>*/}
				{/*								</div>*/}
				{/*								<div className="mt-4 flex items-center">*/}
				{/*									<input*/}
				{/*										id="push_nothing"*/}
				{/*										name="form-input push_notifications"*/}
				{/*										type="radio"*/}
				{/*										className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"*/}
				{/*									/>*/}
				{/*									<label*/}
				{/*										htmlFor="push_nothing"*/}
				{/*										className="ml-3"*/}
				{/*									>*/}
				{/*										<span className="block text-sm leading-5 font-medium text-gray-700">*/}
				{/*											No push*/}
				{/*											notifications*/}
				{/*										</span>*/}
				{/*									</label>*/}
				{/*								</div>*/}
				{/*							</div>*/}
				{/*						</fieldset>*/}
				{/*					</div>*/}
				{/*					<div className="px-4 py-3 bg-gray-50 text-right sm:px-6">*/}
				{/*						<button className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-blue-500 focus:bg-indigo-500 active:bg-indigo-600 transition duration-150 ease-in-out">*/}
				{/*							Save*/}
				{/*						</button>*/}
				{/*					</div>*/}
				{/*				</div>*/}
				{/*			</form>*/}
				{/*		</div>*/}
				{/*	</div>*/}
				{/*</div>*/}
			</Main>
		</Layout>
	);
}
function PersonalInformationDisplay() {
	const { user, loading } = React.useContext(AuthContext);
	const firebase = useFirebase();
	const [currentFirstName, setCurrentFirstName] = useState("");
	const [currentLastName, setCurrentLastName] = useState("");

	const [firstName, setFirstName] = useState("Loading...");
	const [lastName, setLastName] = useState("Loading...");
	const [currentClassOf, setCurrentClassOf] = useState(-1);
	const [classOf, setClassOf] = useState(-1);
	const [loadingProfile, setLoadingProfile] = useState(true);
	const [profileChangeSuccess, setProfileChangeSuccess] = useState(false);
	const [
		profileChangeError,
		setProfileChangeError,
	] = React.useState<React.ReactNode>("");
	const [profileChangeSubmitting, setProfileChangeSubmitting] = useState(
		false
	);
	const hasUpdates = React.useMemo(
		() =>
			firstName !== currentFirstName ||
			lastName !== currentLastName ||
			classOf !== currentClassOf,
		[
			firstName,
			lastName,
			classOf,
			currentFirstName,
			currentLastName,
			currentClassOf,
		]
	);
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
				setCurrentFirstName(data.firstName);
				setCurrentLastName(data.lastName);
				setFirstName(data.firstName);
				setLastName(data.lastName);
				setClassOf(data.classOf);
				setCurrentClassOf(data.classOf);
				setLoadingProfile(false);
			});
	}, [firebase, user]);
	const classOfOptions = React.useMemo(() => {
		const temp = [];
		const yearOfNextLastDayOfSchool = moment().isAfter(getLastDayOfSchool())
			? moment().year() + 1
			: moment().year();
		for (
			let i = yearOfNextLastDayOfSchool;
			i < yearOfNextLastDayOfSchool + 4;
			i++
		) {
			temp.push({
				label: `${i} (Grade ${getGrade(i)})`,
				value: i,
			});
		}
		return temp;
	}, []);

	return (
		<form
			noValidate
			onSubmit={(e) => {
				e.preventDefault();

				if (!hasUpdates || loadingProfile || profileChangeSubmitting)
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
						displayName: firstName + " " + lastName,
					}),
					firebase
						.firestore()
						.collection("users")
						.doc(user.uid)
						.update({
							firstName,
							lastName,
							classOf,
						}),
				])
					.then(async () => {
						await user.getIdToken().then((token) => {
							return axios.post(
								"/.netlify/functions/update-email-list",
								{
									email: user.email,
									firstName,
									lastName,
									grade: getGrade(classOf),
								},
								{
									headers: {
										authorization: `Bearer ${token}`,
									},
								}
							);
						});

						setProfileChangeSubmitting(false);
						setProfileChangeSuccess(true);
						setCurrentFirstName(firstName);
						setCurrentLastName(lastName);
						setCurrentClassOf(classOf);
					})
					.catch((e) => {
						setProfileChangeSubmitting(false);
						setProfileChangeError(
							<>
								<p>Error: {e.message}</p>
								<p>
									If this was unexpected, please email us at{" "}
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
					});
			}}
		>
			<div className="shadow sm:rounded-md">
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
									loadingProfile || profileChangeSubmitting
								}
								value={firstName}
								onChange={(e) => {
									setFirstName(e.target.value);
									setProfileChangeError("");
								}}
								className={
									"mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 " +
									(loadingProfile || profileChangeSubmitting
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
									loadingProfile || profileChangeSubmitting
								}
								value={lastName}
								onChange={(e) => {
									setLastName(e.target.value);
									setProfileChangeError("");
								}}
								className={
									"mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 " +
									(loadingProfile || profileChangeSubmitting
										? "bg-gray-100"
										: "")
								}
							/>
						</div>
					</div>
					<div className="mt-6">
						<label
							htmlFor="class_of"
							className="block text-sm font-medium leading-5 text-gray-700"
						>
							Class Of
						</label>
						<Select
							isClearable={classOf !== currentClassOf}
							isDisabled={
								loadingProfile || profileChangeSubmitting
							}
							options={classOfOptions}
							value={classOfOptions.find(
								(opt) => opt.value == classOf
							)}
							onChange={(opt) => {
								setClassOf(
									Array.isArray(opt)
										? (() => {
												throw new Error(
													"Multiple grades selected"
												);
										  })()
										: opt === null
										? currentClassOf
										: // eslint-disable-next-line @typescript-eslint/ban-ts-comment
										  //@ts-ignore
										  opt.value
								);
							}}
							className={"mt-1 block w-full text-sm"}
						/>
						{/*<span id="class_of">*/}
						{/*	{classOf} (<a>this is wrong</a>)*/}
						{/*</span>*/}
					</div>

					{profileChangeSuccess && !profileChangeError && (
						<p className="text-green-600 my-2 mt-5">
							Your profile has been updated.
						</p>
					)}
					{/* don't show the error if they change it back to the original name */}
					{profileChangeError && hasUpdates && (
						<p className="text-red-600 my-2 mt-5">
							{profileChangeError}
						</p>
					)}
				</div>
				<div className="px-4 py-3 bg-gray-50 text-right sm:px-6 rounded-b-md">
					<button
						type="submit"
						disabled={
							!hasUpdates ||
							loadingProfile ||
							profileChangeSubmitting
						}
						className={`py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white ${
							!hasUpdates ||
							loadingProfile ||
							profileChangeSubmitting
								? "bg-indigo-300"
								: "bg-indigo-600 hover:bg-indigo-500 focus:ring-blue-500 active:bg-indigo-600"
						} shadow-sm focus:outline-none`}
					>
						{profileChangeSubmitting
							? "Loading..."
							: !hasUpdates || loadingProfile
							? "No Changes to Save"
							: "Save"}
					</button>
				</div>
			</div>
		</form>
	);
}
function ChangePasswordModal({
	isOpen,
	onClose,
	user,
}: {
	isOpen: boolean;
	onClose: () => void;
	// can be null until the form is submitted
	user?: firebaseType.User | null;
}) {
	const [submitting, setSubmitting] = useState(false);
	const [success, setSuccess] = useState(false);
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmNewPassword, setConfirmNewPassword] = useState("");
	const [error, setError] = React.useState<React.ReactNode>("");
	const resetForm = () => {
		setCurrentPassword("");
		setNewPassword("");
		setConfirmNewPassword("");
		setError("");
		setSubmitting(false);
		setTimeout(() => setSuccess(false), 300); // revert back to the normal view after the transition is over.
	};
	const firebase = useFirebase();
	return (
		<Transition show={isOpen}>
			<div className="fixed bottom-0 inset-x-0 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center">
				<Transition
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 transition-opacity">
						<div className="absolute inset-0 bg-gray-500 opacity-75"></div>
					</div>
				</Transition>

				<Transition
					enter="ease-out duration-300"
					enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					enterTo="opacity-100 translate-y-0 sm:scale-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100 translate-y-0 sm:scale-100"
					leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
				>
					{success ? (
						<div
							className="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-sm sm:w-full sm:p-6"
							role="dialog"
							aria-modal="true"
							aria-labelledby="modal-headline"
						>
							<div>
								<div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
									<Check
										className={"h-6 w-6 text-green-600"}
									/>
								</div>
								<div className="mt-3 text-center sm:mt-5">
									<h3
										className="text-lg leading-6 font-medium text-gray-900"
										id="modal-headline"
									>
										Your password has been updated
									</h3>
								</div>
							</div>
							<div className="mt-5 sm:mt-6">
								<span className="flex w-full rounded-md shadow-sm">
									<button
										type="button"
										onClick={() => {
											resetForm();
											onClose();
										}}
										className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:ring-indigo-500 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
									>
										Close
									</button>
								</span>
							</div>
						</div>
					) : (
						<div
							className="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full sm:p-6"
							role="dialog"
							aria-modal="true"
							aria-labelledby="modal-headline"
						>
							<form
								noValidate
								onSubmit={async (e) => {
									e.preventDefault();
									if (!firebase || !user) return;

									if (newPassword.length < 8) {
										setError(
											"Your new password isn't long enough. It must be at least 8 characters."
										);
										return;
									}
									if (newPassword !== confirmNewPassword) {
										setError(
											"Your new passwords don't match."
										);
										return;
									}

									setSubmitting(true);
									try {
										if (!user.email)
											throw {
												code:
													"internal/user-has-no-email",
												message:
													"The current user's email could not be identified. Please try signing in again.",
											};
										await user.reauthenticateWithCredential(
											firebase.auth.EmailAuthProvider.credential(
												user.email,
												currentPassword
											)
										);

										await user.updatePassword(newPassword);
										setSubmitting(false);
										setSuccess(true);
									} catch (error) {
										switch (error.code) {
											case "auth/wrong-password":
												setError(
													"Your current password is not correct."
												);
												setCurrentPassword("");
												setSubmitting(false);
												break;
											case "auth/weak-password":
												setError(
													"Your new password is not strong enough. Try adding more numbers and special characters. Avoid common passwords."
												);
												setCurrentPassword("");
												setSubmitting(false);
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
																	"text-blue-500 active:text-blue-700 hover:underline"
																}
															>
																support@montavistamun.com
															</a>
															.
														</p>
													</>
												);
												setCurrentPassword("");
												setSubmitting(false);
										}
									}
								}}
							>
								<div className="mt-3 text-center sm:mt-5">
									<h3
										className="text-lg leading-6 font-medium text-gray-900"
										id="modal-headline"
									>
										Change Your Password
									</h3>
									<div className="mt-2">
										<div className={"text-left"}>
											<div className="">
												<label
													htmlFor="current-password"
													className="block text-sm font-medium leading-5 text-gray-700"
												>
													Current Password
												</label>
												<input
													id="current-password"
													type={"password"}
													disabled={submitting}
													value={currentPassword}
													onChange={(e) => {
														setCurrentPassword(
															e.target.value
														);
														setError("");
													}}
													className={
														"mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 " +
														(submitting
															? "bg-gray-100"
															: "")
													}
												/>
											</div>
											<div className="mt-5">
												<div className="flex justify-between">
													<label
														htmlFor="new-password"
														className="block text-sm font-medium leading-5 text-gray-700"
													>
														New Password
													</label>
													<span className="text-sm leading-5 text-gray-500">
														8+ Characters
													</span>
												</div>
												<input
													id="new-password"
													type={"password"}
													disabled={submitting}
													value={newPassword}
													onChange={(e) => {
														setNewPassword(
															e.target.value
														);
														setError("");
													}}
													className={
														"mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 " +
														(submitting
															? "bg-gray-100"
															: "")
													}
												/>
											</div>
											<div className="mt-5">
												<label
													htmlFor="confirm-password"
													className="block text-sm font-medium leading-5 text-gray-700"
												>
													Confirm New Password
												</label>
												<input
													id="confirm-password"
													type={"password"}
													disabled={submitting}
													value={confirmNewPassword}
													onChange={(e) => {
														setConfirmNewPassword(
															e.target.value
														);
														setError("");
													}}
													className={
														"mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 " +
														(submitting
															? "bg-gray-100"
															: "")
													}
												/>
											</div>
										</div>
									</div>
									{error && (
										<p className="text-red-600 my-2 mt-5">
											{error}
										</p>
									)}
								</div>
								<div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
									<span className="flex w-full rounded-md shadow-sm sm:col-start-2">
										<button
											type="submit"
											disabled={submitting}
											className={
												(submitting
													? "bg-indigo-400"
													: "bg-indigo-600 hover:bg-indigo-500 focus:border-indigo-700 focus:ring-indigo-500") +
												" " +
												"inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 text-base leading-6 font-medium text-white shadow-sm focus:outline-none transition ease-in-out duration-150 sm:text-sm sm:leading-5"
											}
										>
											Change Password
										</button>
									</span>
									<span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:col-start-1">
										<button
											type="button"
											onClick={() => {
												resetForm();
												onClose();
											}}
											disabled={submitting}
											className={
												(submitting
													? "bg-gray-50 opacity-75"
													: "hover:text-gray-500 focus:border-blue-300 focus:ring-blue-500") +
												" " +
												"inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm focus:outline-none transition ease-in-out duration-150 sm:text-sm sm:leading-5"
											}
										>
											Cancel
										</button>
									</span>
								</div>
							</form>
						</div>
					)}
				</Transition>
			</div>
		</Transition>
	);
}

function ChangeEmailModal({
	isOpen,
	onClose,
	user,
}: {
	isOpen: boolean;
	onClose: () => void;
	// can be null until the form is submitted
	user?: firebaseType.User | null;
}) {
	const [submitting, setSubmitting] = useState(false);
	const [success, setSuccess] = useState(false);
	const [password, setPassword] = useState("");
	const [newEmail, setNewEmail] = useState("");
	const [error, setError] = React.useState<React.ReactNode>("");
	const resetForm = () => {
		setPassword("");
		setNewEmail("");
		setError("");
		setSubmitting(false);
		setTimeout(() => setSuccess(false), 300); // revert back to the normal view after the transition is over.
	};
	const firebase = useFirebase();
	return (
		<Transition show={isOpen}>
			<div className="fixed bottom-0 inset-x-0 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center">
				<Transition
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 transition-opacity">
						<div className="absolute inset-0 bg-gray-500 opacity-75"></div>
					</div>
				</Transition>

				<Transition
					enter="ease-out duration-300"
					enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					enterTo="opacity-100 translate-y-0 sm:scale-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100 translate-y-0 sm:scale-100"
					leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
				>
					{success ? (
						<div
							className="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-sm sm:w-full sm:p-6"
							role="dialog"
							aria-modal="true"
							aria-labelledby="modal-headline"
						>
							<div>
								{/*<div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">*/}
								{/*	<Check*/}
								{/*		className={"h-6 w-6 text-green-600"}*/}
								{/*	/>*/}
								{/*</div>*/}
								<div className="mt-3 text-center sm:mt-5">
									<h3
										className="text-lg leading-6 font-medium text-gray-900"
										id="modal-headline"
									>
										Verify Your New Email
									</h3>
									<div className="mt-2">
										<p className="text-sm leading-5 text-gray-500">
											In order to finish changing your
											email, you'll have to click on the
											link in the verification email that
											we've sent to <b>{newEmail}</b>.
										</p>
										<button
											className="link"
											onClick={() => resetForm()}
										>
											Typed the wrong email?
										</button>
									</div>
								</div>
							</div>
							<div className="mt-5 sm:mt-6">
								<span className="flex w-full rounded-md shadow-sm">
									<button
										type="button"
										onClick={() => {
											resetForm();
											onClose();
										}}
										className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:ring-indigo-500 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
									>
										Close
									</button>
								</span>
							</div>
						</div>
					) : (
						<div
							className="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full sm:p-6"
							role="dialog"
							aria-modal="true"
							aria-labelledby="modal-headline"
						>
							<form
								noValidate
								onSubmit={async (e) => {
									e.preventDefault();
									if (!firebase || !user) return;
									if (!newEmail) {
										setError("Please enter a new email.");
										return;
									}
									if (newEmail.indexOf("@") === -1) {
										setError(
											"Your new email doesn't appear to be formatted correctly."
										);
										return;
									}
									setSubmitting(true);
									try {
										if (!user.email)
											throw {
												code:
													"internal/user-has-no-email",
												message:
													"The current user's email could not be identified. Please try signing in again.",
											};
										await user.reauthenticateWithCredential(
											firebase.auth.EmailAuthProvider.credential(
												user.email,
												password
											)
										);

										await user.verifyBeforeUpdateEmail(
											newEmail
										);
										setSubmitting(false);
										setSuccess(true);
									} catch (error) {
										switch (error.code) {
											case "auth/wrong-password":
												setError(
													"Your password is not correct."
												);
												setPassword("");
												setSubmitting(false);
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
																	"text-blue-500 active:text-blue-700 hover:underline"
																}
															>
																support@montavistamun.com
															</a>
															.
														</p>
													</>
												);
												setPassword("");
												setSubmitting(false);
										}
									}
								}}
							>
								<div className="mt-3 text-center sm:mt-5">
									<h3
										className="text-lg leading-6 font-medium text-gray-900"
										id="modal-headline"
									>
										Change Your Email
									</h3>
									<p
										className={
											"text-sm leading-2 mt-4 mb-3 font-bold"
										}
									>
										This will change the email address you
										use to sign in, and also the email
										address where we send member updates.
									</p>
									<div className="mt-2">
										<div className={"text-left"}>
											<div className="">
												<label
													htmlFor="current-password-email-modal"
													className="block text-sm font-medium leading-5 text-gray-700"
												>
													Your Password
												</label>
												<input
													id="current-password-email-modal"
													type={"password"}
													disabled={submitting}
													value={password}
													onChange={(e) => {
														setPassword(
															e.target.value
														);
														setError("");
													}}
													className={
														"mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 " +
														(submitting
															? "bg-gray-100"
															: "")
													}
												/>
											</div>
											<div className="mt-5">
												<div className="flex justify-between">
													<label
														htmlFor="new-password"
														className="block text-sm font-medium leading-5 text-gray-700"
													>
														New Email
													</label>
												</div>
												<input
													id="new-email"
													type={"text"}
													disabled={submitting}
													value={newEmail}
													onChange={(e) => {
														setNewEmail(
															e.target.value
														);
														setError("");
													}}
													className={
														"mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 " +
														(submitting
															? "bg-gray-100"
															: "")
													}
												/>
											</div>
											<p
												className={
													"mt-4 text-gray-700 italic"
												}
											>
												<InformationCircle
													className={"inline-block"}
												/>{" "}
												To finalize your email change,
												you'll have to verify your new
												email.
											</p>
										</div>
									</div>
									{error && (
										<p className="text-red-600 my-2 mt-5">
											{error}
										</p>
									)}
								</div>
								<div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
									<span className="flex w-full rounded-md shadow-sm sm:col-start-2">
										<button
											type="submit"
											disabled={submitting}
											className={
												(submitting
													? "bg-indigo-400"
													: "bg-indigo-600 hover:bg-indigo-500 focus:border-indigo-700 focus:ring-indigo-500") +
												" " +
												"inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 text-base leading-6 font-medium text-white shadow-sm focus:outline-none transition ease-in-out duration-150 sm:text-sm sm:leading-5"
											}
										>
											Next
										</button>
									</span>
									<span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:col-start-1">
										<button
											type="button"
											onClick={() => {
												resetForm();
												onClose();
											}}
											disabled={submitting}
											className={
												(submitting
													? "bg-gray-50 opacity-75"
													: "hover:text-gray-500 focus:border-blue-300 focus:ring-blue-500") +
												" " +
												"inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm focus:outline-none transition ease-in-out duration-150 sm:text-sm sm:leading-5"
											}
										>
											Cancel
										</button>
									</span>
								</div>
							</form>
						</div>
					)}
				</Transition>
			</div>
		</Transition>
	);
}
