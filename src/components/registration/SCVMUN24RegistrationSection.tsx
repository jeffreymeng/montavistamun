import * as Icons from "heroicons-react";
import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import useFirebase from "../../firebase/useFirebase";
import useRequireLogin from "../accounts/useRequireLogin";
import { Main } from "../layout";
import VerticalSteps from "../shared/VerticalSteps";
import Transition from "../Transition";
import ConfirmationSection from "./scvmun24sections/ConfirmationSection";
import DonationsSection from "./scvmun24sections/DonationsSection";
import PreferencesSection from "./scvmun24sections/PreferencesSection";
import WaiverFormsSection from "./scvmun24sections/WaiverFormsSection";
import EmergencyInformationSection from "./sections/EmergencyInformationSection";
import PersonalInformationSection from "./sections/PersonalInformationSection";

function isFunction(
	functionToCheck: any
): functionToCheck is (oldData: Record<string, any>) => Record<string, any> {
	return (
		functionToCheck &&
		{}.toString.call(functionToCheck) === "[object Function]"
	);
}
export default function SCVMUN24RegistrationSection() {
	const name = "SCVMUN 2024";
	const key = "scvmun24";
	useRequireLogin();
	const firebase = useFirebase();
	const { user, loading: userLoading } = useContext(AuthContext);
	const [step, setStep] = useState(0);
	const [stepHasChanges, setStepHasChanges] = useState(false);

	const [maxStep, setMaxStep] = useState(0);

	const [data, updateData] = React.useReducer(
		(
			state: Record<string, any>,
			action:
				| Record<string, any>
				| ((legacyData: Record<string, any>) => Record<string, any>)
		) => {
			let updates;
			if (isFunction(action)) {
				updates = action(state);
			} else {
				updates = action;
			}

			return {
				...state,
				...updates,
			};
		},
		{}
	);
	const [loadingData, setLoadingData] = useState(true);
	const [showChangesNotSavedModal, setShowChangesNotSavedModal] =
		useState(false);

	/**
	 * Updates the data with a section. Dot notation up to one deep is supported (so max one dot in the section).
	 */
	const handleUpdateData = React.useCallback(
		async (section: string, validatedData: any) => {
			if (!firebase) return;

			await Promise.all([
				firebase
					.firestore()
					.collection("registration")
					.doc(user?.uid)
					.set(
						{
							[section.split(".")[0]]:
								section.split(".").length > 1
									? { [section.split(".")[1]]: validatedData }
									: validatedData,
						},
						{ merge: true }
					),
				firebase
					.firestore()
					.collection("registration")
					.doc(user?.uid)
					.collection("history")
					.add({
						timestamp:
							firebase.firestore.FieldValue.serverTimestamp(),
						section,
						newData: validatedData,
					}),
			]);
			updateData((current) => {
				if (section.indexOf(".") > -1) {
					const sectionFragments = section.split(".");
					return {
						[sectionFragments[0]]: {
							...current[sectionFragments[0]],
							[sectionFragments[1]]: validatedData,
						},
					};
				} else {
					return { [section]: validatedData };
				}
			});
		},
		[firebase, data, updateData]
	);
	React.useEffect(() => {
		const handler = (e: BeforeUnloadEvent) => {
			e.returnValue = "You have unsaved changes!";
			return false;
		};
		if (stepHasChanges) {
			window.addEventListener("beforeunload", handler);
		}
		return () => window.removeEventListener("beforeunload", handler);
	}, [stepHasChanges]);
	React.useEffect(() => {
		if (!firebase || !user) return;
		if (!loadingData) return;
		firebase
			.firestore()
			.collection("registration")
			.doc(user?.uid)
			.get()
			.then((snapshot) => {
				if (!loadingData) {
					// two requests were started for the data, and this is the second one to return
					// to avoid overwriting any data that the user may have started entering, don't update the data
					return;
				}
				const data = snapshot.data() || {
					personalInformation: {},
					emergencyInformation: {},
				};
				console.log(data, user);
				updateData({
					personalInformation: {
						phone: "",
						addressOne: "",
						addressTwo: "",
						city: "",
						zip: "",
						state: "CA",
						...data.personalInformation,
					},
					emergencyInformation: {
						contactOneName: "",
						contactOnePhone: "",
						contactOneRelationship: "",
						contactTwoName: "",
						contactTwoPhone: "",
						contactTwoRelationship: "",

						householdMainLanguage: "English",

						healthInsuranceCarrier: "",
						healthInsurancePolicyNumber: "",
						healthInsuranceAddressOne: "",
						healthInsuranceAddressTwo: "",
						healthInsuranceCity: "",
						healthInsuranceState: "",
						healthInsuranceZip: "",
						...data.emergencyInformation,
					},
					preferences: {
						scvmun24Committee: [
							"IAEA",
							"DISEC",
							"WHO",
							"UNEP",
							"SOCHUM",
							"UNESCO",
							"LEGAL",
							"UNDP",
							"ECOSOC/CSW",
							"UNHCR",
							"World Bank",
							"NATO",
							"Security Council",
							"Historical Crisis",
						],
						scvmun24CommitteeConfirm: false,
						scvmun24PartnerPrefs: "",
						...data.preferences,
					},
					forms: {
						...data.forms,
					},
				});
				const rawData = snapshot.data();
				let step;
				if (!rawData?.personalInformation) {
					step = 0;
				} else if (!rawData.emergencyInformation) {
					step = 1;
				} else if (!rawData.forms?.scvmun24FuhsdForm) {
					step = 2;
				} else if (!rawData.preferences.scvmun24CommitteeConfirm) {
					step = 3;
				} else if (
					!rawData.forms?.scvmun24Donation &&
					!rawData.forms?.scvmun24DonationOptOut
				) {
					step = 4;
				} else {
					step = 5;
				}
				setStep(step);

				// typically, the current step will be displayed as incomplete circle
				// the last step cannot be completed, so we want to display it as completed whenever we are on it
				// also lock when maxStep = 6
				setMaxStep(step === 5 ? 6 : step);

				setLoadingData(false);
				setStepHasChanges(false);
			});
	}, [firebase, user]);

	const commonProps = {
		handleUpdateData,
		setStepHasChanges,
		setStep,
		setMaxStep,
		user,
	};

	return (
		<div className={"bg-gray-100 w-full"}>
			<Main wide noMobileXPadding>
				<div className="md:grid md:grid-cols-3 md:gap-6">
					<div className="md:col-span-1">
						<div className="sticky px-4 sm:px-0 top-24">
							<h3 className="text-2xl font-bold leading-6 text-gray-900">
								SCVMUN Registration
							</h3>
							<p className="max-w-2xl mt-1 text-sm leading-5 text-gray-500">
								Your information will be saved when you click
								the save button for each step, so you don't need
								to complete this all at once.
							</p>
							<VerticalSteps
								steps={[
									{
										title: "Personal Information",
										description:
											"This information will be saved to speed up registration for future conferences.",
									},
									{
										title: "Emergency Information",
										description:
											"This information will be saved to speed up registration for future conferences.",
									},
									{
										title: "Liability Forms",
										description:
											"These forms will be mostly autofilled with the information you provide us in earlier steps, but you'll still need to get them signed.",
									},
									{
										title: "Committee Preferences",
										description:
											"Now comes the fun part! Look into the different committees offered at SCVMUN and indicate how much you like each one.",
									},
									{
										title: "Donations",
										description:
											"To cover conference fees charged by SCVMUN, we request a donation, which will go directly towards making this conference possible.",
									},
									{
										title: "You're Done!",
										description:
											"You're now registered for SCVMUN! You may still edit or cancel your registration until the deadline.",
									},
								]}
								currentStep={step}
								maxSwitchableStep={Math.min(
									!data.forms?.scvmun24FuhsdForm ? 2 : 1000,
									maxStep,
									maxStep === 6 ? -1 : 1000 // If the registration is complete, lock the ability to go to a previous step
								)}
								onStepSwitch={(i) => {
									if (stepHasChanges) {
										setShowChangesNotSavedModal(true);
									} else {
										setStep(i);
									}
								}}
							/>
						</div>
					</div>
					<div className={"mt-10 mt-5 md:mt-0 md:col-span-2 h-full"}>
						{step === 0 && (
							<PersonalInformationSection
								data={data?.personalInformation}
								{...commonProps}
							/>
						)}
						{step === 1 && (
							<EmergencyInformationSection
								data={data?.emergencyInformation}
								{...commonProps}
							/>
						)}
						{step === 2 && (
							<WaiverFormsSection data={data} {...commonProps} />
						)}
						{step === 3 && (
							<PreferencesSection
								data={data?.preferences}
								{...commonProps}
							/>
						)}
						{step === 4 && (
							<DonationsSection data={data} {...commonProps} />
						)}
						{step === 5 && (
							<ConfirmationSection data={data} {...commonProps} />
						)}
					</div>
				</div>
			</Main>
			<Transition show={showChangesNotSavedModal}>
				<div className="fixed inset-0 z-10 overflow-y-auto">
					<div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
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
						{/* This element is to trick the browser into centering the modal contents. */}
						<span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
						&#8203;
						<Transition
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<div
								className="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
								role="dialog"
								aria-modal="true"
								aria-labelledby="modal-headline"
							>
								<div>
									<div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
										<Icons.ExclamationOutline className="w-6 h-6 text-red-600" />
									</div>
									<div className="mt-3 text-center sm:mt-5">
										<h3
											className="text-lg font-medium leading-6 text-gray-900"
											id="modal-headline"
										>
											You Have Unsaved Changes
										</h3>
										<div className="mt-2">
											<p className="text-sm leading-5 text-gray-500">
												{step == 2 &&
													"Please upload or delete your un-uploaded (gray) files first."}
												{step !== 2 &&
													"Please save or discard your changes first."}
											</p>
										</div>
									</div>
								</div>
								<div className="mt-5 sm:mt-6">
									<span className="flex w-full rounded-md shadow-sm">
										<button
											type="button"
											onClick={() =>
												setShowChangesNotSavedModal(
													false
												)
											}
											className="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:ring-indigo-500 sm:text-sm sm:leading-5"
										>
											Back
										</button>
									</span>
								</div>
							</div>
						</Transition>
					</div>
				</div>
			</Transition>
		</div>
	);
}