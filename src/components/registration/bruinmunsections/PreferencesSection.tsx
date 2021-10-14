import { User } from "firebase";
import React from "react";
import * as Yup from "yup";
import PreferenceList from "../../conferences/PreferenceList";
import RegisterFormSection from "../RegisterFormSection";

interface PreferencesInformation {
	bruinmunCommittee: string[];
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
				bruinmunCommittee: Yup.array().required(),
				bruinmunCommitteeConfirm: Yup.boolean().isTrue(),
			})}
			loadingValues={{
				bruinmunCommittee: ["Loading..."],
			}}
			confirmContinue={false}
		>
			{({
				values: { bruinmunCommittee, bruinmunCommitteeConfirm },
				errors,
				canEdit,
				touched,
				setFieldValue,
			}) => {
				return (
					<>
						<div className={"col-span-6"}>
							<span className="inline-flex rounded-md shadow-sm my-2 mr-2">
								<a
									href={"https://www.bruinmun.org/committees"}
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

										setFieldValue("bruinmunCommittee", [
											"UNDP",
											"ECOSOC",
											"UNESCAP",
											"UNHCR",
											"SPECPOL",
											"Ukrainskaya Revolyutsiya",
											"Novice SOCHUM",
											"Novice UNEP",
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
								items={bruinmunCommittee}
								setItems={(items) =>
									setFieldValue("bruinmunCommittee", items)
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
										checked={bruinmunCommitteeConfirm}
										onChange={(e) => {
											setFieldValue(
												"bruinmunCommitteeConfirm",
												e.target.checked
											);
										}}
										type="checkbox"
										className={
											"h-4 w-4 border-gray-300 rounded " +
											(errors.bruinmunCommitteeConfirm &&
											touched.bruinmunCommitteeConfirm
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
											(errors.bruinmunCommitteeConfirm &&
											touched.bruinmunCommitteeConfirm
												? "text-red-700"
												: "text-gray-700")
										}
									>
										I'm done ordering my committees.
									</label>
								</div>
							</div>
							{errors.bruinmunCommitteeConfirm &&
								touched.bruinmunCommitteeConfirm && (
									<p className={"mt-1 text-red-600"}>
										You must check confirm that you're done
										ordering your committees to continue.
									</p>
								)}
						</div>
					</>
				);
			}}
		</RegisterFormSection>
	);
}
