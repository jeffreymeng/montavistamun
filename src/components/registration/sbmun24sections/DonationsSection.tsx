// Import React FilePond
import axios from "axios";
import cx from "classnames";
import { FilePond } from "filepond";
import { User } from "firebase";
import React, { useState } from "react";
import "../../../css/file-upload.css";
import useFirebase from "../../../firebase/useFirebase";
import FormUpload from "../FormUpload";
import { getGrade } from "../../../utils/schoolYearUtils";

interface DonationForms {
	sbmun24Donation?: string;
	sbmun24DonationOptOut?: boolean;
}
interface ConfirmationData {
	sbmun24Confirmed: true;
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
		<div className="mt-8 shadow rounded-md sm:overflow-hidden">
			<div className={"px-4 bg-white sm:p-6 py-4"}>
				<h3 className="text-xl leading-6 font-bold text-gray-900">
					Hang in there — you’re almost done!
				</h3>
				<p className="mt-2">
                    Because Monta Vista MUN is cohosting SBMUN, you don't have to pay a delegation fee!
                    To submit your registration for SBMUN, please click the button below.
                    Note that after submitting you cannot go back and change the details of your registration.
				</p>
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
						if (data.confirm?.sbmun24Confirmed) {
							setStep(5);
							return;
						}
						setSubmitting(true);
						handleUpdateData("forms", {
							sbmun24DonationOptOut: true,
						}).then(() => {
						handleUpdateData("confirm", {
							sbmun24Confirmed: true,
						})
						})
							.then(() => {
								if (!firebase) {
									return;
								}
                                //uncomment this code if possible
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
								setSubmitting(false);
								//upload once to the sheet
								try {
									axios.post(
										"/.netlify/functions/update-google-sheet", 
										{
											spreadsheetID: "1eB5yjKsHS5Pug_ip7mxzzZ4UwFWXKF1RSGxIb3l0wHo",
											data: [
												user.displayName, 
												getGrade(data.classOf), 
												user.email, 
												data.emergencyInformation.contactOneName, 
												data.emergencyInformation.contactOnePhone, 
												data.preferences.sbmun24Committee.join(', '), 
												data.preferences.sbmun24PartnerPrefs, 
												`https://console.firebase.google.com/u/0/project/montavistamodelun/storage/montavistamodelun.appspot.com/files/~2Fforms~2Fsbmun24~2F${user?.uid}~2Fsbmun24FuhsdForm`,
												`https://console.firebase.google.com/u/0/project/montavistamodelun/storage/montavistamodelun.appspot.com/files/~2Fforms~2Fsbmun24~2F${user?.uid}~2Fsbmun24Form`,
											],
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
						skipping
					}
					className={cx(
						"ml-4 py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white shadow-sm",
						uploading ||
							submitting ||
							skipping
							? "bg-indigo-300"
							: "bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-blue-500 active:bg-indigo-600 transition duration-150 ease-in-out"
					)}
				>
					Finish Registration
				</button>
			</div>
		</div>
	);
}
