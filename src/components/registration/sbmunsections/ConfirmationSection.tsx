// Import React FilePond
import cx from "classnames";
import { User } from "firebase";
import React, { useState } from "react";
import "../../../css/file-upload.css";
import useFirebase from "../../../firebase/useFirebase";

export default function ConfirmationSection({
	data,
	setStepHasChanges,
	handleUpdateData,
	setStep,
	setMaxStep,
	user,
}: {
	user: User;

	data: Record<string, any>;
	handleUpdateData: (
		name: string,
		data: Record<string, any>
	) => Promise<void>;
	setStepHasChanges: (hasChanges: boolean) => void;
	setStep: (step: number) => void;
	setMaxStep: (maxStep: number | ((old: number) => number)) => void;
}) {
	const firebase = useFirebase();

	const [submitting, setSubmitting] = useState(false);
	return (
		<div className="mt-8 shadow rounded-md sm:overflow-hidden">
			<div className={"px-4 bg-white sm:p-6 py-4"}>
				<h3 className="text-xl leading-6 font-bold text-gray-900">
					You're done!
				</h3>
				<p className="mt-2">
					{user?.displayName ? user?.displayName + ", y" : "Y"}ou are
					now registered for SBMUN!
				</p>
				<p className="mt-2">
					If you'd like to help us improve the conference registration
					experience, please fill out{" "}
					<a
						href="https://forms.gle/RFhr4TUbaWpSPDNX7"
						className="link"
						target={"_blank"}
						rel={"noopener noreferrer"}
					>
						this short survey
					</a>
					.
				</p>
				<p className="mt-4">
					You can edit or cancel your registration until the deadline.
					To edit your registration, simply go back to any step using
					the back button or by clicking a step on the steps list. To
					cancel your registration,{" "}
					<a
						href={"mailto:conferenceregistration@montavistamun.com"}
						className={"link"}
					>
						email us
					</a>
					. Note: unfortunately, we are unable to process refunds for
					donations if you cancel.
				</p>
			</div>
			<div className="px-4 py-3 bg-gray-50 text-right sm:px-6 flex justify-between">
				<span className="inline-flex rounded-md shadow-sm">
					<button
						type="button"
						onClick={() => setStep(3)}
						className={cx(
							"py-2 px-4 border border-gray-300 rounded-md text-sm leading-5 font-medium text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
						)}
					>
						Back
					</button>
				</span>
				<div />
			</div>
		</div>
	);
}
