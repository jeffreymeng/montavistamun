// Import React FilePond
import axios from "axios";
import cx from "classnames";
import { FilePond } from "filepond";
import { User } from "firebase";
import React, { useState } from "react";
import "../../../css/file-upload.css";
import useFirebase from "../../../firebase/useFirebase";
import FormUpload from "../FormUpload";

interface DonationForms {
	scvmun24Donation?: string;
	scvmun24DonationOptOut?: boolean;
}
interface ConfirmationData {
	scvmun24Confirmed: true;
}
//TODO: Replace example.com with actual donation link, find actual spreadsheet ID
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
		<div className="mt-8 shadow rounded-md sm:overflow-hidden">
			<div className={"px-4 bg-white sm:p-6 py-4"}>
				<h3 className="text-xl leading-6 font-bold text-gray-900">
					Hang in there — you’re almost done!
				</h3>
				<p className="mt-2">
					Before you submit, we just have one last step. To cover the
					fees charged by SCVMUN, we are requesting that you include a
					donation of <b>$25</b> with your registration. Your
					donations will go directly towards covering conference fees
					and making this conference possible.
				</p>
				{data.forms?.scvmun24DonationOptOut && (
					<>
						<p className="mt-2">
							You've indicated that you are financially unable to
							donate, or do not wish to do so, and that{" "}
							<b>
								you've talked to Mr Pelkey about your
								situation
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
									scvmun24DonationOptOut: false,
								}).then(() => setSkipping(false));
							}}
						>
							{skipping ? "Cancelling..." : "Cancel"}
						</button>
					</>
				)}
				
				{!data.forms?.scvmun24DonationOptOut && (
					<>
						<p className="mt-2">
							If you are financially unable to donate, or do not
							wish to do so,{" "}
							<b>
								please contact Mr. Pelkey during tutorial in room C107
							</b>
							, then{" "}
							<a
								className={"link"}
								onClick={(e) => {
									e.preventDefault();
									if (skipping) return;
									setSkipping(true);
									handleUpdateData("forms", {
										scvmun24DonationOptOut: true,
									}).then(() => setSkipping(false));
								}}
							>
								{skipping
									? "skipping donating..."
									: "click here to skip donating"}
							</a>
							.
						</p>

						<h3 className="text-lg leading-6 font-medium text-gray-900 mt-6 mb-2">
							How to Donate
						</h3>

						<ul className="list-decimal ml-8">
							<li>
								Head to Monta Vista’s online Student Store and
								find our scvmun conference donation{" "}
								<a
									target={"_blank"}
									rel={"noopener noreferrer"}
									href={
										"example.com"
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
							conference (<b>February 2-3, 2024</b>) before
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
								fieldName={"scvmun24Donation"}
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
								conferenceName={"scvmun24"}
							/>
						</div>
					</>
				)}
			</div>
			<div className="px-4 py-3 bg-gray-50 text-right sm:px-6 flex justify-between">
				<span className="inline-flex rounded-md shadow-sm">
					<button
						type="button"
						onClick={() => setStep(3)}
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
							!data?.forms?.scvmun24Donation &&
							!data?.forms?.scvmun24DonationOptOut
						) {
							if (!uploadInstance) return;
							setUploading(true);
							uploadInstance.processFile();
							return;
						}
						if (data.confirm?.scvmun24Confirmed) {
							setStep(5);
							return;
						}
						setSubmitting(true);
						handleUpdateData("confirm", {
							scvmun24Confirmed: true,
						})
							.then(() => {
								if (!firebase) {
									console.log("no firebase");
									return;
								}
								console.log("firesroe upload");
								/*return firebase
									.firestore()
									.collection("users")
									.doc(user?.uid)
									.update({
										scvmun24Registered: true,
										scvmun24RegistrationTimestamp:
											firebase.firestore.FieldValue.serverTimestamp(),
									});
								*/
							})
							.then(() => {
								console.log("UPLOAD SUCCESS!");
								setSubmitting(false);
								//upload once to the sheet
								try {
									axios.post(
										"/.netlify/functions/update-google-sheet", 
										{
											spreadsheetID: "1eB5yjKsHS5Pug_ip7mxzzZ4UwFWXKF1RSGxIb3l0wHo",
											UID: user?.uid,
											data: [user.displayName ?? "none", data.personalInformation.city ?? false],
										}
									);
								} catch(error) {
									console.log("failed to upload to google sheets");
									console.log(error);
								}
								setStep(5);
								setMaxStep((o) => Math.max(6)); // maxStep is one higher to check it
							})
					}}
					disabled={
						uploading ||
						submitting ||
						skipping ||
						((!receipt || receipt.length == 0) &&
							!data?.forms?.scvmun24DonationOptOut)
					}
					className={cx(
						"ml-4 py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white shadow-sm",
						uploading ||
							submitting ||
							skipping ||
							((!receipt || receipt.length == 0) &&
								!data?.forms?.scvmun24DonationOptOut)
							? "bg-indigo-300"
							: "bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-blue-500 active:bg-indigo-600 transition duration-150 ease-in-out"
					)}
				>
					{uploading
						? "Uploading..."
						: (!receipt || receipt.length == 0) &&
						  !data?.forms?.scvmun24DonationOptOut
						? "Upload all forms to finish registration"
						: !data?.forms?.scvmun24Donation &&
						  !data?.forms?.scvmun24DonationOptOut
						? "Upload"
						: !data.confirm?.scvmun24Confirmed
						? "Finish Registration"
						: "Continue"}
				</button>
			</div>
		</div>
	);
}
