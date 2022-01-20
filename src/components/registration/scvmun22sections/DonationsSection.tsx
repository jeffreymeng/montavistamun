// Import React FilePond
import cx from "classnames";
import { FilePond } from "filepond";
import { User } from "firebase";
import React, { useState } from "react";
import "../../../css/file-upload.css";
import useFirebase from "../../../firebase/useFirebase";
import FormUpload from "../FormUpload";

interface DonationForms {
	scvmun22Donation?: string;
	scvmun22DonationOptOut?: boolean;
}
interface ConfirmationData {
	scvmun22Confirmed: true;
}

export default function DonationsSection({
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
		data: DonationForms | ConfirmationData
	) => Promise<void>;
	setStepHasChanges: (hasChanges: boolean) => void;
	setStep: (step: number) => void;
	setMaxStep: (maxStep: number | ((old: number) => number)) => void;
}) {
	const firebase = useFirebase();

	const [receipt, setReceipt] = useState<
		(File & { serverId: string | null })[] | null
	>(null);
	const [uploading, setUploading] = useState(false);

	React.useEffect(() => {
		setStepHasChanges(
			uploading ||
				!!(receipt && receipt[0] && receipt[0].serverId === null)
		);
	}, [uploading, receipt && receipt[0], receipt && receipt[0]?.serverId]);
	const [submitting, setSubmitting] = useState(false);
	const [skipping, setSkipping] = useState(false);
	const [uploadInstance, setUploadInstance] = useState<FilePond | null>(null);
	return (
		<div className="mt-8 rounded-md shadow sm:overflow-hidden">
			<div className={"px-4 bg-white sm:p-6 py-4"}>
				<h3 className="text-xl font-bold leading-6 text-gray-900">
					Hang in there — you’re almost done!
				</h3>
				<p className="mt-2">
					Before you submit, we just have one last step. To cover the
					fees charged by SCVMUN, we are requesting that you include a
					donation of <b>$35</b> with your registration. Your
					donations will go directly towards covering conference fees
					and making this conference possible.
				</p>
				{data.forms?.scvmun22DonationOptOut && (
					<>
						<p className="mt-2">
							You've indicated that you are financially unable to
							donate, or do not wish to do so, and that{" "}
							<b>
								you've talked to Mr. Pelkey about your situation
							</b>
							. You may now move on to the next step by clicking
							the continue button below.
						</p>
						<button
							className={cx(
								"mt-4 py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white shadow-sm",
								submitting
									? "bg-indigo-300"
									: "bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-blue-500 active:bg-indigo-600 transition duration-150 ease-in-out"
							)}
							disabled={skipping}
							onClick={(e) => {
								setSkipping(true);
								handleUpdateData("forms", {
									scvmun22DonationOptOut: false,
								}).then(() => setSkipping(false));
							}}
						>
							{skipping ? "Cancelling..." : "Cancel"}
						</button>
					</>
				)}
				{!data.forms?.scvmun22DonationOptOut && (
					<>
						<p className="mt-2">
							If you are financially unable to donate, or do not
							wish to do so,{" "}
							<b>
								please contact Mr. Pelkey during tutorial in
								room C107
							</b>
							, then{" "}
							<a
								className={"link"}
								onClick={(e) => {
									e.preventDefault();
									if (skipping) return;
									setSkipping(true);
									handleUpdateData("forms", {
										scvmun22DonationOptOut: true,
									}).then(() => setSkipping(false));
								}}
							>
								{skipping
									? "skipping donating..."
									: "click here to skip donating"}
							</a>
							.
						</p>

						<h3 className="mt-6 mb-2 text-lg font-medium leading-6 text-gray-900">
							How to Donate
						</h3>

						<ul className="ml-8 list-decimal">
							<li>
								Head to Monta Vista’s online Student Store and
								find our SCVMUN conference donation{" "}
								<a
									target={"_blank"}
									rel={"noopener noreferrer"}
									href={
										"https://montavistahs.3dcartstores.com/Santa-Theresa-MUN-Conference_p_68.html"
									}
									className={"link"}
								>
									here
								</a>
								.
							</li>
							<li>Fill out the fields listed and pay.</li>
							<li>
								Make sure you save a copy of your receipt
								(screenshot or print &gt; save as PDF the
								confirmation page).
							</li>
							<li>Upload your receipt below.</li>
						</ul>
						<p className={"mt-4"}>
							Unfortunately, we are unable to process refunds with
							the online system. Please confirm you can attend the
							conference (<b>January 28-29, 2021</b>) before
							donating!
						</p>

						<div className={"mt-4"}>
							<FormUpload
								onInstanceChange={(instance) =>
									setUploadInstance(instance)
								}
								user={user}
								file={receipt}
								setFile={setReceipt}
								uploading={uploading}
								setUploading={setUploading}
								fieldName={"scvmun22Donation"}
								data={data}
								allowImagePreview
								acceptedFileTypes={[
									"application/pdf",
									"image/*",
								]}
								labelFileTypeNotAllowed={
									"That's not an image or PDF!"
								}
								fileValidateTypeLabelExpectedTypes={
									"You may only upload images or pdfs"
								}
								labelIdle={
									"Drag a image / pdf here or click to browse"
								}
								handleUpdateData={handleUpdateData}
							/>
						</div>
					</>
				)}
			</div>
			<div className="flex justify-between px-4 py-3 text-right bg-gray-50 sm:px-6">
				<span className="inline-flex rounded-md shadow-sm">
					<button
						type="button"
						onClick={() => setStep(2)}
						disabled={uploading || skipping}
						className={cx(
							"py-2 px-4 border border-gray-300 rounded-md text-sm leading-5 font-medium text-gray-700",
							uploading || skipping
								? "bg-gray-300"
								: "bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring-blue-500 active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
						)}
					>
						Back
					</button>
				</span>
				<button
					type={"button"}
					onClick={() => {
						if (
							!data?.forms?.scvmun22Donation &&
							!data?.forms?.scvmun22DonationOptOut
						) {
							if (!uploadInstance) return;
							setUploading(true);
							uploadInstance.processFile();
							return;
						}
						if (data.confirm?.scvmun22Confirmed) {
							setStep(5);
							return;
						}
						setSubmitting(true);
						handleUpdateData("confirm", {
							scvmun22Confirmed: true,
						})
							.then(() => {
								if (!firebase) return;
								return firebase
									.firestore()
									.collection("users")
									.doc(user?.uid)
									.update({
										scvmun22Registered: true,
										scvmun22RegistrationTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
									});
							})
							.then(() => {
								setSubmitting(false);
								setStep(5);
								setMaxStep((o) => 6); // maxStep is one higher to check it
							});
					}}
					disabled={
						uploading ||
						submitting ||
						skipping ||
						((!receipt || receipt.length == 0) &&
							!data?.forms?.scvmun22DonationOptOut)
					}
					className={cx(
						"ml-4 py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white shadow-sm",
						uploading ||
							submitting ||
							skipping ||
							((!receipt || receipt.length == 0) &&
								!data?.forms?.scvmun22DonationOptOut)
							? "bg-indigo-300"
							: "bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-blue-500 active:bg-indigo-600 transition duration-150 ease-in-out"
					)}
				>
					{uploading
						? "Uploading..."
						: (!receipt || receipt.length == 0) &&
						  !data?.forms?.scvmun22DonationOptOut
						? "Upload all forms to finish registration"
						: !data?.forms?.scvmun22Donation &&
						  !data?.forms?.scvmun22DonationOptOut
						? "Upload"
						: !data.confirm?.scvmun22Confirmed
						? "Finish Registration"
						: "Continue"}
				</button>
			</div>
		</div>
	);
}
