import axios from "axios";
// Import React FilePond
import cx from "classnames";
import { FilePond } from "filepond";
import { User } from "firebase";
import React, { Reducer, useMemo, useReducer, useState } from "react";
import { File } from "react-filepond";
import "../../../css/file-upload.css";
import useFirebase from "../../../firebase/useFirebase";
import blobToBuffer from "../blobToBuffer";
import fillTemplatePDF from "../fillTemplatePDF";
import FormUpload from "../FormUpload";
import * as pdfform from "../PDFForm";
interface WaiverForms {
	scvmunFuhsdForm: string;
}

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

export default function FormsSection({
	data,
	setStepHasChanges,
	handleUpdateData,
	setStep,
	setMaxStep,
	user,
	forms,
	name,
	regKey,
}: {
	name: string;
	regKey: string;
	user: User;
	data: Record<string, any>;
	handleUpdateData: (
		name: string,
		data: WaiverForms | ((oldData: WaiverForms) => WaiverForms)
	) => Promise<void>;
	setStepHasChanges: (hasChanges: boolean) => void;
	setStep: (step: number) => void;
	setMaxStep: (maxStep: number | ((old: number) => number)) => void;
	forms: {
		url: string;
		fallbackUrl: string;
		key: string;
		name: string;
		fileName: string;
	}[];
}) {
	const firebase = useFirebase();

	const [filledForms, filledFormsDispatch] = useReducer<
		Reducer<(Uint8Array | null)[], [number, Uint8Array | null]>
	>((state, action) => {
		const newState = state.slice();
		newState[action[0]] = action[1];
		return newState;
	}, Array(forms.length).fill(null));
	const setFilledForm = (i: number, data: Uint8Array | null) =>
		filledFormsDispatch([i, data]);

	const [uploadedFiles, uploadedFileDispatch] = useReducer<
		Reducer<(File | null)[], [number, File | null]>
	>((state, action) => {
		const newState = state.slice();
		newState[action[0]] = action[1];
		return newState;
	}, Array(forms.length).fill(null));
	const setUploadedFiles = (i: number, data: File | null) =>
		uploadedFileDispatch([i, data]);

	const [uploadingFiles, uploadingFilesDispatch] = useReducer<
		Reducer<boolean[], [number, boolean]>
	>((state, action) => {
		const newState = state.slice();
		newState[action[0]] = action[1];
		return newState;
	}, Array(forms.length).fill(false));
	const setUploadingFile = (i: number, data: boolean) =>
		uploadingFilesDispatch([i, data]);

	React.useEffect(() => {
		setStepHasChanges(
			uploadingFiles.some((f) => !!f) ||
				uploadedFiles.some((f) => f && f[0] && f[0].serverId === null)
		);
	}, [uploadingFiles, uploadedFiles]);

	React.useEffect(() => {
		if (!user || !data) return;
		(async () => {
			const filledPDF = await fillTemplatePDF(
				"/forms/scvmun-ftf-filled.pdf",
				{
					FNAME: user?.displayName?.split(" ")[0] || "",
					LNAME:
						user?.displayName?.split(" ").slice(1).join(" ") || "",

					ADDR_ONE: data.personalInformation.addressOne,
					ADDR_TWO: data.personalInformation.addressTwo,
					ADDR_STREET:
						data.personalInformation.addressOne +
						(data.personalInformation.addressTwo
							? ", " + data.personalInformation.addressTwo
							: ""),
					ADDR_CITY: data.personalInformation.city,
					ADDR_STATE: data.personalInformation.state,
					ADDR_ZIP: data.personalInformation.zip,

					INSURANCE_ADDR_ONE:
						data.emergencyInformation.healthInsuranceAddressOne,
					INSURANCE_ADDR_TWO:
						data.emergencyInformation.healthInsuranceAddressTwo,
					INSURANCE_ADDR_STREET:
						data.emergencyInformation.healthInsuranceAddressOne +
						(data.emergencyInformation.healthInsuranceAddressTwo
							? ", " +
							  data.emergencyInformation
									.healthInsuranceAddressTwo
							: ""),
					INSURANCE_ADDR_CITY:
						data.emergencyInformation.healthInsuranceCity,
					INSURANCE_ADDR_STATE:
						data.emergencyInformation.healthInsuranceState,
					INSURANCE_ADDR_ZIP:
						data.emergencyInformation.healthInsuranceZip,
					INSURANCE_CARRIER:
						data.emergencyInformation.healthInsuranceCarrier,
					INSURANCE_POLICY_NUMBER:
						data.emergencyInformation.healthInsurancePolicyNumber,

					CONTACT_ONE_NAME: data.emergencyInformation.contactOneName,
					CONTACT_ONE_PHONE:
						data.emergencyInformation.contactOnePhone,
					CONTACT_ONE_RELATIONSHIP:
						data.emergencyInformation.contactOneRelationship,
					CONTACT_ONE_EMAIL:
						data.emergencyInformation.contactOneEmail,

					CONTACT_TWO_NAME: data.emergencyInformation.contactTwoName,
					CONTACT_TWO_PHONE:
						data.emergencyInformation.contactTwoPhone,
					CONTACT_TWO_RELATIONSHIP:
						data.emergencyInformation.contactTwoRelationship,

					HOUSEHOLD_LANGUAGE:
						data.emergencyInformation.householdMainLanguage,
				}
			);
			setFilledForm(0, filledPDF);
			return;
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
			setFilledForm(0, filled);
		})();
	}, [user, data]);
	const [uploadInstances, setUploadInstances] = useState<(FilePond | null)[]>(
		[]
	);

	const hasInProgressUploads = useMemo(
		() => uploadingFiles.some((f) => !!f),
		[uploadingFiles]
	);
	const allFilesSelected = useMemo(
		() => uploadedFiles.every((f) => !!f && f.length !== 0),
		[uploadedFiles]
	);
	const allFilesUploaded = useMemo(
		() =>
			data?.forms &&
			forms.every((form) => !!data.forms[regKey + "__" + form.key]),
		[data?.forms, forms]
	);

	return (
		<div className="mt-8 shadow rounded-md sm:overflow-hidden">
			<div className={"px-4 bg-white sm:p-6 py-4"}>
				<h3 className="text-xl leading-6 font-bold text-gray-900">
					Liability Forms
				</h3>
				<p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
					You'll need to print out, sign, scan, and upload the
					following forms.
				</p>
				{forms.map((form, i) => (
					<div className={"mt-4"} key={form.key}>
						<h3 className="text-lg leading-6 font-medium text-gray-900">
							1. {form.name}
						</h3>
						<div>
							<span className="inline-flex rounded-md shadow-sm my-2 mr-2">
								<button
									onClick={() =>
										openOrDownload(
											form.fileName,
											filledForms[i],
											form.fallbackUrl
										)
									}
									className={
										"py-1 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white shadow-sm " +
										(filledForms[i] === null
											? "bg-indigo-300"
											: "bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-blue-500 active:bg-indigo-600 transition duration-150 ease-in-out")
									}
									disabled={filledForms[i] === null}
								>
									{filledForms[i] === null
										? "Generating Form..."
										: "Download the form, "}
								</button>
							</span>
							<span>
								print it, sign it, scan it, then upload it
								below:
							</span>
						</div>

						<FormUpload
							onInstanceChange={(instance: FilePond | null) =>
								setUploadInstances([instance])
							}
							user={user}
							file={uploadedFiles[i]}
							setFile={(f) => setUploadedFiles(i, f)}
							uploading={uploadingFiles[i]}
							setUploading={(u) => setUploadingFile(i, u)}
							fieldName={regKey + "__" + form.key}
							data={data}
							handleUpdateData={handleUpdateData}
						/>
					</div>
				))}
			</div>

			<div className="px-4 py-3 bg-gray-50 text-right sm:px-6 flex justify-between">
				<span className="inline-flex rounded-md shadow-sm">
					<button
						type="button"
						onClick={() => {
							setStep(1);
						}}
						disabled={!allFilesUploaded}
						className={cx(
							"py-2 px-4 border border-gray-300 rounded-md text-sm leading-5 font-medium text-gray-700",
							!allFilesUploaded
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
						if (!allFilesUploaded) {
							uploadInstances.forEach((instance, i) => {
								// process first (and only) file
								if (!instance) return;
								setUploadingFile(i, true);
								instance.processFile();
								console.log(uploadInstances);
							});
							return;
						}
						setStep(3);
						setMaxStep((o) => Math.max(o, 3));
					}}
					disabled={!hasInProgressUploads || !allFilesSelected}
					className={cx(
						"ml-4 py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white shadow-sm",
						!hasInProgressUploads || !allFilesSelected
							? "bg-indigo-300"
							: "bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-blue-500 active:bg-indigo-600 transition duration-150 ease-in-out"
					)}
				>
					{hasInProgressUploads
						? "Uploading..."
						: !allFilesSelected
						? "Upload All Files to Continue"
						: !allFilesUploaded
						? "Upload Files"
						: "Continue"}
				</button>
			</div>
		</div>
	);
}
