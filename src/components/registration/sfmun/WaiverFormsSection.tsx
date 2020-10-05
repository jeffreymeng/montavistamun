import axios from "axios";
// Import React FilePond
import callbackBlobToBuffer from "blob-to-buffer";
import cx from "classnames";
import fileType from "file-type/browser";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginGetFile from "filepond-plugin-get-file";
import "filepond-plugin-get-file/dist/filepond-plugin-get-file.min.css";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import firebaseType from "firebase";
import React, { useContext, useState } from "react";
import {
	File,
	FilePond,
	registerPlugin as registerFilepondPlugin,
} from "react-filepond";
import useFirebase from "../../../auth/useFirebase";
import AuthContext from "../../../context/AuthContext";
import "../../../css/file-upload.css";
import * as pdfform from "../PDFForm";

registerFilepondPlugin(
	FilePondPluginFileValidateSize,
	FilePondPluginFileValidateType,
	FilePondPluginGetFile
);
interface WaiverForms {
	fuhsdForm: string;
}
// make promise based
const blobToBuffer = (blob: Blob) =>
	new Promise((res, rej) =>
		callbackBlobToBuffer(blob, (err, buffer) => {
			if (err) rej();
			else res(buffer);
		})
	);
const loadOrRestoreFile = (
	firebase: firebaseType.app.App,
	user: firebaseType.User,
	fileName: string,
	load: (f: string | Blob) => void,
	error: (msg: string) => void,
	progress: (isCalculable: boolean, current: number, max: number) => void,
	abort: () => void,
	request: any
) => {
	console.log("ytouwantmeloading");
	console.log("Loading", fileName, !firebase);
	if (!firebase) return;
	// reset our progress
	progress(false, 0, 1024);

	// fetch the download URL from firebase
	firebase
		.storage()
		.ref(`forms/sfmun/${user?.uid}/${fileName}`)
		.getDownloadURL()
		.then((url) => {
			console.log(url);
			axios.get(url).then((response) => {
				const blob = new Blob([response.data]);
				progress(true, blob.size, blob.size);

				load(blob);
			});
		})
		.catch((err) => {
			error(err.message);
			abort();
		});
};
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
		console.log(name, form, unfilledPath);
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
}: {
	data: Record<string, any>;
	handleUpdateData: (name: string, data: WaiverForms) => Promise<void>;
	setStepHasChanges: (hasChanges: boolean) => void;
	setStep: (step: number) => void;
	setMaxStep: (maxStep: number) => void;
}) {
	const firebase = useFirebase();

	const [filledForms, setFilledForms] = useState<(Uint8Array | null)[]>([
		null,
		null,
	]);
	const { user } = useContext(AuthContext);
	const [fuhsdForm, setFuhsdForm] = useState<File | null>(null);
	const [fuhsdUploading, setFuhsdUploading] = useState(false);
	const [sfmunForm, setSfmunForm] = useState<File | null>(null);
	const [sfmunUploading, setSfmunUploading] = useState(false);

	React.useEffect(() => {
		setStepHasChanges(
			fuhsdUploading ||
				sfmunUploading ||
				(fuhsdForm && fuhsdForm[0] && fuhsdForm[0].serverId === null) ||
				(sfmunForm && sfmunForm[0] && sfmunForm[0].serverId === null)
		);
	}, [
		fuhsdUploading,
		sfmunUploading,
		fuhsdForm && fuhsdForm[0],
		fuhsdForm && fuhsdForm[0]?.serverId,
		sfmunForm && sfmunForm[0],
		sfmunForm && sfmunForm[0]?.serverId,
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
				Destination: ["Online"],
				"Date(s)": ["12/12/20 - 12/13/20"],
				"Depature Time": ["None (Virtual)"],
				"Return Time": ["None (Virtual)"],
				// TODO is this correct
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
	React.useEffect(() => {
		if (!user || !data) return;
		(async () => {
			const response = await axios.get(
				"/forms/SFMUN-liability-release.pdf",
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
				"agreement is clear and unambiguous as to its terms and that no other evidence shall be used or": [
					user?.displayName,
				],
				"I HEREBY CERTIFY that I am the parent or guardian of": [
					user?.displayName,
				],
				"1_2": [user?.displayName],
				"1": [data.emergencyInformation.contactOneName],
				"1_cr": [data.emergencyInformation.contactOneRelationship],
				"1_ct": [data.emergencyInformation.contactOnePhone],
				"2_ec": [data.emergencyInformation.contactTwoName],
				"2_cr": [data.emergencyInformation.contactTwoRelationship],
				"2_ct": [data.emergencyInformation.contactTwoPhone],
				"2_2": [
					data.personalInformation.addressOne +
						(data.personalInformation.addressTwo
							? ", " + data.personalInformation.addressTwo
							: ""),
				],
				"3_2": [
					data.personalInformation.city +
						", " +
						data.personalInformation.state +
						", " +
						data.personalInformation.zip,
				],
			});
			setFilledForms((o) => [o[0], filled]);
		})();
	}, [user, data]);

	return (
		<div className="mt-8 shadow rounded-md sm:overflow-hidden">
			<div className={" px-4 bg-white sm:p-6 py-4"}>
				<h3 className="text-lg leading-6 font-medium text-gray-900">
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
										"sfmun-fuhsd-form.pdf",
										filledForms[0],
										"/forms/FUHSD-field-trip-form.pdf"
									)
								}
								className={
									"py-1 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white shadow-sm " +
									(filledForms[0] === null
										? "bg-indigo-300"
										: "bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-blue active:bg-indigo-600 transition duration-150 ease-in-out")
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
						file={fuhsdForm}
						setFile={setFuhsdForm}
						uploading={fuhsdUploading}
						setUploading={setFuhsdUploading}
						fieldName={"fuhsdForm"}
						fileName={"sfmun-fuhsd-form.pdf"}
						data={data}
						handleUpdateData={handleUpdateData}
					/>
				</div>
				<div className={"mt-4"}>
					<h3 className="text-lg leading-6 font-medium text-gray-900">
						2. SFMUN Liability Release
					</h3>
					<div>
						<span className="inline-flex rounded-md shadow-sm my-2 mr-2">
							<button
								onClick={() =>
									openOrDownload(
										"sfmun-liability-form.pdf",
										filledForms[1],
										"/forms/SFMUN-liability-release.pdf"
									)
								}
								className={
									"py-1 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white shadow-sm " +
									(filledForms[1] === null
										? "bg-indigo-300"
										: "bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-blue active:bg-indigo-600 transition duration-150 ease-in-out")
								}
								disabled={filledForms[1] === null}
							>
								{filledForms[1] === null
									? "Generating Form..."
									: "Download the form, "}
							</button>
						</span>
						<span>
							print it, sign it, scan it, then upload it below:
						</span>
					</div>
					<FormUpload
						file={sfmunForm}
						setFile={setSfmunForm}
						uploading={sfmunUploading}
						setUploading={setSfmunUploading}
						fieldName={"sfmunForm"}
						fileName={"sfmun-liability-form.pdf"}
						data={data}
						handleUpdateData={handleUpdateData}
					/>
				</div>
			</div>
			<div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
				<button
					type={"button"}
					onClick={() => {
						setStep(3);
						setMaxStep(3);
					}}
					disabled={
						fuhsdUploading ||
						sfmunUploading ||
						!data?.forms?.fuhsdForm ||
						!data?.forms?.sfmunForm
					}
					className={cx(
						"ml-4 py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white shadow-sm",
						fuhsdUploading ||
							sfmunUploading ||
							!data?.forms?.fuhsdForm ||
							!data?.forms?.sfmunForm
							? "bg-indigo-300"
							: "bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-blue active:bg-indigo-600 transition duration-150 ease-in-out"
					)}
				>
					{fuhsdUploading || sfmunUploading
						? "Uploading..."
						: !data?.forms?.fuhsdForm || !data?.forms?.sfmunForm
						? "Upload all forms to continue"
						: "Continue"}
				</button>
			</div>
		</div>
	);
}
function FormUpload({
	file,
	setFile,
	uploading,
	setUploading,
	fieldName,
	fileName,
	data,
	handleUpdateData,
}: {
	file?: File;
	setFile: (file: File | null) => void;
	uploading: boolean;
	setUploading: (uploading: boolean) => void;
	fieldName: string;
	fileName: string;
	data: Record<string, any>;
	handleUpdateData: (name: string, data: WaiverForms) => Promise<void>;
}) {
	const firebase = useFirebase();
	const { user } = useContext(AuthContext);
	React.useEffect(() => {
		if (!data || !firebase || !user) return;
		if (!file && data.forms && data.forms[fieldName]) {
			const fileName = data.forms[fieldName];
			firebase
				.storage()
				.ref(`forms/sfmun/${user?.uid}/${fileName}`)
				.getDownloadURL()
				.then((url) => {
					setFile([
						{
							source: fileName,

							options: {
								type: "limbo",
								metadata: {
									url,
								},
							},
						},
					]);
				});
		}
	}, [data, firebase, user]);
	return (
		<FilePond
			files={file}
			onupdatefiles={setFile}
			allowMultiple={false}
			// If enabled, you also have to handle undoing delete off server
			instantUpload={false}
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			maxFileSize={"3MB"}
			allowDownloadByUrl={true}
			fileValidateTypeDetectType={(source: Blob) =>
				fileType.fromBlob(source).then((type) => type?.mime)
			}
			acceptedFileTypes={["application/pdf"]}
			labelFileTypeNotAllowed={"That's not a PDF!"}
			fileValidateTypeLabelExpectedTypes={"You may only upload pdfs"}
			fileValidateTypeLabelExpectedTypesMap={{
				"application/pdf": "pdf",
			}}
			server={{
				process: (
					inputName,
					file,
					metadata,
					load,
					onError,
					updateProgress,
					abort
				) => {
					if (!firebase) return;
					setUploading(true);
					const uploadTask = firebase
						.storage()
						.ref(`forms/sfmun/${user?.uid}/${fileName}`)
						.put(file);

					uploadTask.on(
						"state_changed",
						(snapshot) => {
							updateProgress(
								true,
								snapshot.bytesTransferred,
								snapshot.totalBytes
							);

							switch (snapshot.state) {
								case firebase.storage.TaskState.PAUSED: // or 'paused'
									console.log("Upload is paused");
									break;
								case firebase.storage.TaskState.RUNNING: // or 'running'
									console.log("Upload is running");
									break;
							}
						},
						(error) => {
							console.log(error);
							setUploading(false);
							switch ((error as { code?: string })?.code) {
								case "storage/canceled":
									console.log("Cancelled");
									break;
								case "storage/quota-exceeded":
									onError(
										"Sorry, but our server has run out of space for your file. Please email us at support@montavistamun.com and let us know."
									);
									break;
								case "storage/invalid-checksum":
									onError(
										"It looks like this file got corrupted while we were uploading it. Please try again."
									);
									break;
								case "storage/retry-limit-exceeded":
									onError(
										"The upload timed out. Please try again."
									);
									break;
								default:
									onError(
										"An unknown error occurred. Please try again or email us at support@montavistamun.com"
									);
							}
						},
						() => {
							// done!
							handleUpdateData("forms", {
								...(data?.forms || {}),
								[fieldName]: fileName,
							}).then(() => {
								setUploading(false);
								load(fileName);
							});
						}
					);
					return {
						abort: () => {
							// This function is entered if the user has tapped the cancel button
							uploadTask.cancel();
							setUploading(false);
							handleUpdateData("forms", {
								...(data?.forms || {}),
								[fieldName]: "",
							}).then(() => {
								// Let FilePond know the request has been cancelled
								abort();
							});
						},
					};
				},
				restore: (...props) =>
					loadOrRestoreFile(
						firebase,
						user,

						...props
					),
				revert: (fileName, load, error) => {
					if (!firebase) return;
					setUploading(true);
					firebase
						.storage()
						.ref(`forms/sfmun/${user?.uid}/${fileName}`)
						.delete()
						.then(() =>
							handleUpdateData("forms", {
								...(data?.forms || {}),
								[fieldName]: "",
							})
						)
						.then(() => {
							load();
							setUploading(false);
						})
						.catch((e) => {
							setUploading(false);
							switch (error.code) {
								default:
									error(
										"An unknown error occurred while deleting your file."
									);
							}
						});
				},
				// this loads an already uploaded image to firebase
				load: (...props) => loadOrRestoreFile(firebase, user, ...props),
			}}
			labelIdle="Drag a pdf here or click to browse"
		/>
	);
}
