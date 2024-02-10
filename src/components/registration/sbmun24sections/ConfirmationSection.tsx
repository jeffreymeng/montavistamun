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
					To cancel your registration,{" "}
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
		</div>
	);
}