import { User } from "firebase";
import React from "react";
import * as Yup from "yup";
import PreferenceList from "../../conferences/PreferenceList";
import RegisterFormSection from "../RegisterFormSection";
import {Field} from "formik";
import InputGroup from "../../shared/InputGroup";

interface PreferencesInformation {
	sbmun24Committee: string[];
	sbmun24CommitteeConfirm: boolean;
	sbmun24PartnerPrefs: string,
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
				sbmun24Committee: Yup.array().required(),
				sbmun24CommitteeConfirm: Yup.boolean().isTrue(),
				sbmun24PartnerPrefs: Yup.string(),
			})}
			loadingValues={{
				sbmun24Committee: ["Loading..."],
				sbmun24CommitteeConfirm: false,
				sbmun24PartnerPrefs: "",
			}}
			confirmContinue={() => false}
		>
			{({
				values: { sbmun24Committee, sbmun24CommitteeConfirm },
				errors,
				canEdit,
				touched,
				setFieldValue,
			}) => {
				return (
					<>
						<div className={"col-span-6"}>
							<span className="inline-flex my-2 mr-2 rounded-md shadow-sm">
								<a
									href={"https://www.southbaymun.com/committees"}
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
								interested in, please drag to reorder the list
								of committees below such that the committee you
								want the most is on top. We'll assign you a
								committee as close to the top of your list as
								possible, taking into account factors such as
								availability and experience.
							</p>
							<p className="mt-4">
								If you'd like to start over, you can{" "}
								<a
									role={"button"}
									onClick={(e) => {
										e.preventDefault();

										setFieldValue("sbmun24Committee", [
										"UNHRC",
										"DISEC",
										"ECOSOC",
										"CSTD",
										"US Senate",
										"SACC",
										"Red Scare",
										"Catherine the Great's Coup",
										"Atlantic City Crime Conference",
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
								items={sbmun24Committee}
								setItems={(items) =>
									setFieldValue("sbmun24Committee", items)
								}
							/>
							<p className={"mt-1"}>
								<b>Committee Least Wanted</b>
							</p>
							<p className={"mt-6"}>
								When you're done ordering your committees, check
								the checkbox below to continue:
							</p>

							<div className="relative flex items-start mt-1">
								<div className="flex items-center h-5">
									<input
										id="committeeConfirm"
										checked={sbmun24CommitteeConfirm}
										onChange={(e) => {
											setFieldValue(
												"sbmun24CommitteeConfirm",
												e.target.checked
											);
										}}
										type="checkbox"
										className={
											"h-4 w-4 border-gray-300 rounded " +
											(errors.sbmun24CommitteeConfirm &&
											touched.sbmun24CommitteeConfirm
												? "focus:ring-red-500 text-red-600"
												: "focus:ring-indigo-500 text-indigo-600")
										}
									/>
								</div>
								<div className="ml-3 text-sm">
									<label
										htmlFor="committeeConfirm"
										className={
											"font-medium " +
											(errors.sbmun24CommitteeConfirm &&
											touched.sbmun24CommitteeConfirm
												? "text-red-700"
												: "text-gray-700")
										}
									>
										I'm done ordering my committees.
									</label>
								</div>
							</div>
							{errors.sbmun24CommitteeConfirm &&
								touched.sbmun24CommitteeConfirm && (
									<p className={"mt-1 text-red-600"}>
										You must check confirm that you're done
										ordering your committees to continue.
									</p>
								)}
							<h3 className="text-xl leading-6 font-bold text-gray-900 mt-6">
								Partner Preferences
							</h3>
							<p className={"text-sm text-gray-800 mt-2"}>
								If you'd like to choose your partner for a double delegation committee, 
                                you can write their name below. Feel free to also leave this field
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
								id={"sbmun24PartnerPrefs"}
								name={"sbmun24PartnerPrefs"}
								label={"Your Requested Partner"}
								hint={"Optional"}
								placeholder={
									"If you'd like us to assign you one, feel free to leave this blank."
								}
								disabled={!canEdit}
								invalid={
									errors.sbmun24PartnerPrefs &&
									!!touched.sbmun24PartnerPrefs
								}
								error={errors.sbmun24PartnerPrefs}
							/>
						</div>
					</>
				);
			}}
		</RegisterFormSection>
	);
}
