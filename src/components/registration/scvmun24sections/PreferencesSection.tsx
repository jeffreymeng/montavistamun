import { User } from "firebase";
import { Field } from "formik";
import React from "react";
import * as Yup from "yup";
import PreferenceList from "../../conferences/PreferenceList";
import InputGroup from "../../shared/InputGroup";
import RegisterFormSection from "../RegisterFormSection";

interface PreferencesInformation {
	scvmun24Committee: string[];
	scvmun24PartnerPrefs: string;
}

export default function PreferencesSection({
	data,
	setStepHasChanges,
	handleUpdateData,
	setStep,
	setMaxStep,
	user,
}: {
	user: User;
	data?: PreferencesInformation;
	handleUpdateData: (
		name: string,
		data: PreferencesInformation
	) => Promise<void>;
	setStepHasChanges: (hasChanges: boolean) => void;
	setStep: (step: number) => void;
	setMaxStep: (fn: (oldMaxStep: number) => number) => void;
}) {
	return (
		<RegisterFormSection<PreferencesInformation>
			user={user}
			title={"Committee Preferences"}
			data={data}
			showBack
			onBack={() => setStep(2)}
			onSubmit={(data: PreferencesInformation) =>
				handleUpdateData("preferences", {
					...data,
				})
			}
			onHasChangesChange={(hasChanges: boolean) =>
				setStepHasChanges(hasChanges)
			}
			onContinue={() => {
				setStep(4);
				setMaxStep((old: number) => Math.max(old, 4));
			}}
			schema={Yup.object().shape({
				scvmun24Committee: Yup.array().required(),
				scvmun24PartnerPrefs: Yup.string(),
			})}
			loadingValues={{
				scvmun24Committee: ["Loading..."],
				scvmun24PartnerPrefs: "",
			}}
			confirmContinue={(values: { scvmun24Committee: string[] }) =>
				[
					"IAEA",
					"DISEC",
					"WHO",
					"UNEP",
					"SOCHUM",
					"UNDP",
					"LEGAL",
					"UNESCO",
					"Security Council",
					"Historical Crisis",
					"NATO",
					"World Bank",
					"UNHCR",
					"ECOSOC/CSW",
				].every((el, i) => el === values.scvmun24Committee[i])
					? "It doesn't look like you've re-ordered any of the committees."
					: false
			}
		>
			{({
				values: { scvmun24Committee, scvmun24PartnerPrefs },
				errors,
				canEdit,
				touched,
				setFieldValue,
			}) => (
				<>
					<div className={"col-span-6"}>
						<span className="inline-flex rounded-md shadow-sm my-2 mr-2">
							<a
								href={"https://www.scvmun.com/committees"}
								rel={"noopener noreferrer"}
								target={"_blank"}
								className={
									"py-1 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white shadow-sm bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-blue-500 active:bg-indigo-600 transition duration-150 ease-in-out"
								}
							>
								View Committees
							</a>
						</span>
						<p>
							To indicate to us which committees you are more
							interested in, please drag to reorder the list of
							committees below such that the committee you want
							the most is on top. We'll assign you a committee as
							close to the top of your list as possible, taking
							into account factors such as availability and
							experience.
						</p>
						<p className="mt-4">
							If you'd like to start over, you can{" "}
							<a
								role={"button"}
								onClick={(e) => {
									e.preventDefault();

									setFieldValue("scvmun24Committee", [
										"IAEA",
										"DISEC",
										"WHO",
										"UNEP",
										"SOCHUM",
										"UNDP",
										"LEGAL",
										"UNESCO",
										"Security Council",
										"Historical Crisis",
										"NATO",
										"World Bank",
										"UNHCR",
										"ECOSOC/CSW",
									]);
								}}
								className="link"
							>
								reset the ordering
							</a>
							.
						</p>
						<p className={"mt-4 mb-1"}>
							<b>Committee Most Wanted</b>
						</p>
						<PreferenceList
							items={scvmun24Committee}
							setItems={(items) =>
								setFieldValue("scvmun24Committee", items)
							}
						/>
						<p className={"mt-1"}>
							<b>Committee Least Wanted</b>
						</p>
						<h3 className="text-xl leading-6 font-bold text-gray-900 mt-6">
							Partner Preferences
						</h3>
						<p className={"text-sm text-gray-800 mt-2"}>
							All SCVMUN committees are double delegation
							committees, so you'll be competing with a partner!
							If you'd like to choose your partner, you can write
							their name below. Feel free to also leave this field
							blank, and we'll assign you a partner.{" "}
							<b>
								If you are choosing a partner, make sure you
								coordinate with them so they also writes down
								your name!
							</b>{" "}
							Only mutual partner requests will be considered.
						</p>
						<Field
							className={"mt-2"}
							as={InputGroup}
							id={"scvmun24PartnerPrefs"}
							name={"scvmun24PartnerPrefs"}
							label={"Your Requested Partner"}
							hint={"Optional"}
							placeholder={
								"If you'd like us to assign you one, feel free to leave this blank."
							}
							disabled={!canEdit}
							invalid={
								errors.scvmun24PartnerPrefs &&
								!!touched.scvmun24PartnerPrefs
							}
							error={errors.scvmun24PartnerPrefs}
						/>
					</div>
				</>
			)}
		</RegisterFormSection>
	);
}
