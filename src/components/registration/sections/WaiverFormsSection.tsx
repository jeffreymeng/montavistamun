import axios from "axios";
// Import React FilePond
import callbackBlobToBuffer from "blob-to-buffer";
import cx from "classnames";
import { FilePond } from "filepond";
import { User } from "firebase";
import React, { useState } from "react";
import { File } from "react-filepond";
import "../../../css/file-upload.css";
import useFirebase from "../../../firebase/useFirebase";
import FormUpload from "../FormUpload";
import * as pdfform from "../PDFForm";

interface WaiverForms {
	scvmunFuhsdForm: string;
}
// make promise based
const blobToBuffer = (blob: Blob) =>
	new Promise((res, rej) =>
		callbackBlobToBuffer(blob, (err, buffer) => {
			if (err) rej();
			else res(buffer);
		})
	);

const isIOS = () => {
	return (
		[
			"iPad Simulator",
			"iPhone Simulator",
			"iPod Simulator",
			"iPad",
			"iPhone",
			"iPod",
		].includes(navigator.platform) ||
		// iPad on iOS 13 detection
		(navigator.userAgent.includes("Mac") && "ontouchend" in document)
	);
};
const openOrDownload = (
	name: string,
	form: Uint8Array | null,
	unfilledPath: string = name
): Promise<void> => {
	if (isIOS()) {
		const shouldContinue = confirm(
			"Autofilled forms are not available on iOS browsers, so an unfilled form will be opened. If you'd like an autofilled PDF form, please visit this page on a non-mobile browser."
		);
		if (!shouldContinue) {
			return Promise.resolve();
		}
	}
	if (form === null || isIOS()) {
		window.location.href = unfilledPath;
	} else {
		return pdfform.openOrDownload(form, "", true, name);
	}
	return Promise.resolve();
};

export default function WaiverFormsSection({
	data,
	setStepHasChanges,
	handleUpdateData,
	setStep,
	setMaxStep,
	user,
	conferenceData
}: {
	user: User;
	data: Record<string, any>;
	handleUpdateData: (
		name: string,
		data: WaiverForms | ((oldData: WaiverForms) => WaiverForms)
	) => Promise<void>;
	setStepHasChanges: (hasChanges: boolean) => void;
	setStep: (step: number) => void;
	setMaxStep: (maxStep: number | ((old: number) => number)) => void;
	conferenceData:any;
}) {
	const firebase = useFirebase();

	const [filledForms, setFilledForms] = useState<(Uint8Array | null)[]>([
		null,
	]);

	const [fuhsdForm, setFuhsdForm] = useState<File | null>(null);
	const [fuhsdUploading, setFuhsdUploading] = useState(false);

	React.useEffect(() => {
		setStepHasChanges(
			fuhsdUploading ||
				(fuhsdForm && fuhsdForm[0] && fuhsdForm[0].serverId === null)
		);
	}, [
		fuhsdUploading,
		fuhsdForm && fuhsdForm[0],
		fuhsdForm && fuhsdForm[0]?.serverId,
	]);
	React.useEffect(() => {
		if (!user || !data) return;
		(async () => {
			const response = await axios.get(
				"/forms/FUHSD-field-trip-form.pdf",
				{
					responseType: "arraybuffer",
					headers: {
						"Content-Type": "application/json",
						Accept: "application/pdf",
					},
				}
			);
			const blob = new Blob([response.data]);
			const pdf = (await blobToBuffer(blob)) as ArrayBuffer;
			// const keys = Object.keys(pdfform.list_fields(pdf));

			const filled = pdfform.fillForm(pdf, {
				"Student's Name": [user?.displayName],
				Destination: ["Online Model UN Conference (SCVMUN)"],
				"Date(s)": ["1/29/21 - 1/30/21"],
				"Depature Time": ["None (Virtual)"],
				"Return Time": ["None (Virtual)"],
				"Person in Charge": ["David Hartford"],
				"Home Address": [
					data.personalInformation.addressOne +
						(data.personalInformation.addressTwo
							? ", " + data.personalInformation.addressTwo
							: "") +
						", " +
						data.personalInformation.city +
						", " +
						data.personalInformation.state +
						", " +
						data.personalInformation.zip,
				],
				"Insurance Address": [
					data.emergencyInformation.healthInsuranceAddressOne +
						(data.emergencyInformation.healthInsuranceAddressTwo
							? ", " +
							  data.emergencyInformation
									.healthInsuranceAddressTwo
							: ""),
				],
				"City/State": [
					data.emergencyInformation.healthInsuranceCity +
						", " +
						data.emergencyInformation.healthInsuranceState,
				],
				Zip: [data.emergencyInformation.healthInsuranceZip],
				"Family Health Insurance Carrier": [
					data.emergencyInformation.healthInsuranceCarrier,
				],
				"Policy Number": [
					data.emergencyInformation.healthInsurancePolicyNumber,
				],
				Telephone: [data.personalInformation.phone],
				Language: [data.emergencyInformation.householdMainLanguage],
				"Emergency Contact Name and Telephone": [
					data.emergencyInformation.contactOneName +
						", " +
						data.emergencyInformation.contactOnePhone,
				],
			});
			setFilledForms((o) => [filled, o[1]]);
		})();
	}, [user, data]);
	const [uploadInstances, setUploadInstances] = useState<(FilePond | null)[]>(
		[]
	);
	return (
		<div className="mt-8 shadow rounded-md sm:overflow-hidden">
			<div className={" px-4 bg-white sm:p-6 py-4"}>
				<h3 className="text-xl leading-6 font-bold text-gray-900">
					Liability Forms
				</h3>
				<p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
					You'll need to print out, sign, scan, and upload the
					following forms.
				</p>
				<div className={"mt-4"}>
					<h3 className="text-lg leading-6 font-medium text-gray-900">
						1. FUHSD Field Trip Form
					</h3>
					<div>
						<span className="inline-flex rounded-md shadow-sm my-2 mr-2">
							<button
								onClick={() =>
									openOrDownload(
										"scvmun-fuhsd-form.pdf",
										filledForms[0],
										"/forms/FUHSD-field-trip-form.pdf"
									)
								}
								className={
									"py-1 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white shadow-sm " +
									(filledForms[0] === null
										? "bg-indigo-300"
										: "bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-blue-500 active:bg-indigo-600 transition duration-150 ease-in-out")
								}
								disabled={filledForms[0] === null}
							>
								{filledForms[0] === null
									? "Generating Form..."
									: "Download the form, "}
							</button>
						</span>
						<span>
							print it, sign it, scan it, then upload it below:
						</span>
					</div>

					<FormUpload
						onInstanceChange={(instance: FilePond | null) =>
							setUploadInstances([instance])
						}
						user={user}
						file={fuhsdForm}
						setFile={setFuhsdForm}
						uploading={fuhsdUploading}
						setUploading={setFuhsdUploading}
						fieldName={"scvmunFuhsdForm"}
						data={data}
						handleUpdateData={handleUpdateData}
					/>
				</div>
			</div>
			<div className="px-4 py-3 bg-gray-50 text-right sm:px-6 flex justify-between">
				<span className="inline-flex rounded-md shadow-sm">
					<button
						type="button"
						onClick={() => {
							setStep(1);
						}}
						disabled={fuhsdUploading}
						className={cx(
							"py-2 px-4 border border-gray-300 rounded-md text-sm leading-5 font-medium text-gray-700",
							fuhsdUploading
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
						if (!data?.forms?.scvmunFuhsdForm) {
							uploadInstances.forEach((instance) => {
								// process first (and only) file
								if (!instance) return;
								setFuhsdUploading(true);
								instance.processFile();
								console.log(uploadInstances);
							});
							return;
						}
						setStep(3);
						setMaxStep((o) => Math.max(o, 3));
					}}
					disabled={
						fuhsdUploading || !fuhsdForm || fuhsdForm.length === 0
					}
					className={cx(
						"ml-4 py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white shadow-sm",
						fuhsdUploading || !fuhsdForm || fuhsdForm.length === 0
							? "bg-indigo-300"
							: "bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-blue-500 active:bg-indigo-600 transition duration-150 ease-in-out"
					)}
				>
					{fuhsdUploading
						? "Uploading..."
						: !fuhsdForm || fuhsdForm.length === 0
						? "Upload All Files to Continue"
						: !data?.forms?.scvmunFuhsdForm
						? "Upload Files"
						: "Continue"}
				</button>
			</div>
		</div>
	);
}
