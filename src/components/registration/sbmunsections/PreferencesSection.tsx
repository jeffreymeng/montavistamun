import { User } from "firebase";
import React from "react";
import * as Yup from "yup";
import PreferenceList from "../../conferences/PreferenceList";
import RegisterFormSection from "../RegisterFormSection";

interface PreferencesInformation {
	sbmunCommittee: string[];
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
				sbmunCommittee: Yup.array().required(),
			})}
			loadingValues={{
				sbmunCommittee: ["Loading..."],
			}}
			confirmContinue={(values: { sbmunCommittee: string[] }) =>
				[
					"WHO",
					"UNESCO",
					"DISEC",
					"World Economic Forum",
					"JCC East Germany (Crisis)",
					"JCC West Germany (Crisis)",
				].every((el, i) => el === values.sbmunCommittee[i])
					? "It doesn't look like you've re-ordered any of the committees."
					: false
			}
		>
			{({
				values: { sbmunCommittee },
				errors,
				canEdit,
				touched,
				setFieldValue,
			}) => (
				<>
					<div className={"col-span-6"}>
						<span className="inline-flex rounded-md shadow-sm my-2 mr-2">
							<a
								href={"https://www.southbaymun.com/committees/"}
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

									setFieldValue("sbmunCommittee", [
										"WHO",
										"UNESCO",
										"DISEC",
										"World Economic Forum",
										"JCC East Germany (Crisis)",
										"JCC West Germany (Crisis)",
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
							items={sbmunCommittee}
							setItems={(items) =>
								setFieldValue("sbmunCommittee", items)
							}
						/>
						<p className={"mt-1"}>
							<b>Committee Least Wanted</b>
						</p>
					</div>
				</>
			)}
		</RegisterFormSection>
	);
}
