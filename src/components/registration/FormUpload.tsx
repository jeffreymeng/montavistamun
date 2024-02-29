import axios from "axios";
import { FilePond, registerPlugin as registerFilepondPlugin } from "filepond";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginGetFile from "filepond-plugin-get-file";
import "filepond-plugin-get-file/dist/filepond-plugin-get-file.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import type firebaseType from "firebase";
import { User } from "firebase";
import React, { useState } from "react";
import { File, FilePond as ReactFilePond } from "react-filepond";
import useFirebase from "../../firebase/useFirebase";

registerFilepondPlugin(
	FilePondPluginImageExifOrientation,
	FilePondPluginFileValidateSize,
	FilePondPluginFileValidateType,
	FilePondPluginGetFile,
	FilePondPluginImagePreview
);
const loadOrRestoreFile = (
	firebase: typeof firebaseType | null,
	user: firebaseType.User | null,
	fieldName: string,
	fileName: string,
	load: (f: string | Blob) => void,
	error: (msg: string) => void,
	progress: (isCalculable: boolean, current: number, max: number) => void,
	abort: () => void,
	request: any,
	conferenceName?: string,
) => {
	if (!firebase || !user) return;
	// reset our progress
	progress(false, 0, 1024);
	// fetch the download URL from firebase
	firebase
		.storage()
		.ref(conferenceName ? `forms/${conferenceName}/${user?.uid}/${fieldName}/${fileName}` : `forms/sfmun/${user?.uid}/${fieldName}/${fileName}`)
		.getDownloadURL()
		.then((url: string) => {
			return axios.get(url, {
				responseType: "arraybuffer",
				headers: {
					"Content-Type": "application/json",
				},
			});
		})
		.then((response) => {
			return new Blob([response.data]);
		})
		.then((blob: Blob) => {
			progress(true, blob.size, blob.size);
			load(blob);
		})
		.catch((err) => {
			error(err.message);
			abort();
		});
};
export default function FormUpload<Data>({
	onInstanceChange,
	file,
	setFile,
	uploading,
	setUploading,
	fieldName,
	data,
	labelIdle,
	acceptedFileTypes,
	labelFileTypeNotAllowed,
	fileValidateTypeLabelExpectedTypes,
	handleUpdateData,
	allowImagePreview,
	user,
	conferenceName,
}: {
	onInstanceChange: (newInstance: FilePond | null) => void;
	user: User;
	file?: File;
	allowImagePreview?: boolean;
	setFile: (file: File | null) => void;
	uploading: boolean;
	setUploading: (uploading: boolean) => void;
	fieldName: string;
	acceptedFileTypes?: string[];
	labelFileTypeNotAllowed?: string;
	fileValidateTypeLabelExpectedTypes?: string;
	labelIdle?: string;
	data: Record<string, any>;
	handleUpdateData: (name: string, data: any) => Promise<void>;
	conferenceName?: string;
}) {
	const firebase = useFirebase();
	const [instance, setInstance] = useState<FilePond | null>(null);
	React.useEffect(() => {
		onInstanceChange(instance);
	}, [instance]);
	React.useEffect(() => {
		if (!data || !firebase || !user) return;
		if (!file && data.forms && data.forms[fieldName]) {
			const fileName = data.forms[fieldName];
			const filePath = conferenceName ? `forms/${conferenceName}/${user?.uid}/${fieldName}/${fileName}` : `forms/sfmun/${user?.uid}/${fieldName}/${fileName}`;
			firebase
				.storage()
				.ref(filePath)
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
		<ReactFilePond
			ref={(ref) => setInstance(ref)}
			files={file}
			onupdatefiles={setFile}
			allowMultiple={false}
			// If enabled, you also have to handle undoing delete off server
			instantUpload={false}
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			maxFileSize={"20MB"}
			credits={false} // TODO: credit somewhere
			allowImagePreview={allowImagePreview}
			allowDownloadByUrl={true}
			fileValidateTypeDetectType={(source: File, type: string) =>
				Promise.resolve(source.type)
			}
			imagePreviewMaxFileSize={"2MB"}
			acceptedFileTypes={acceptedFileTypes || ["application/pdf", "pdf"]}
			labelFileTypeNotAllowed={
				labelFileTypeNotAllowed || "That's not a PDF!"
			}
			fileValidateTypeLabelExpectedTypes={
				fileValidateTypeLabelExpectedTypes || "You may only upload pdfs"
			}
			fileValidateTypeLabelExpectedTypesMap={{
				"application/pdf": "pdf",
				"image/jpeg": "jpg",
				"image/png": "png",
				"image/gif": "gif",
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

					const fileName = file.name;
					setUploading(true);
					// console.log(file, file.name, file.type);
					const uploadTask = firebase
						.storage()
						.ref(
							conferenceName ? `forms/${conferenceName}/${user?.uid}/${fieldName}/${fileName}` : `forms/sfmun/${user?.uid}/${fieldName}/${fileName}`
						)
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
							handleUpdateData(
								"forms." + fieldName,
								fileName
							).then(() => {
								// console.log("DONE", fieldName, fileName);
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
							handleUpdateData("forms." + fieldName, "").then(
								() => {
									// Let FilePond know the request has been cancelled
									abort();
								}
							);
						},
					};
				},
				restore: (...props) =>
					loadOrRestoreFile(firebase, user, fieldName, ...props, conferenceName),
				revert: (fileName, load, error) => {
					if (!firebase) return;
					setUploading(true);
					console.log(fileName);
					firebase
						.storage()
						.ref(
							conferenceName ? `forms/${conferenceName}/${user?.uid}/${fieldName}/${fileName}` : `forms/sfmun/${user?.uid}/${fieldName}/${fileName}`
						)
						.delete()
						.then(() => handleUpdateData("forms." + fieldName, ""))
						.then(() => {
							load();
							setUploading(false);
						})
						.catch((e) => {
							setUploading(false);
							switch (e?.code) {
								default:
									error(
										"An unknown error occurred while deleting your file."
									);
							}
						});
				},
				// this loads an already uploaded image to firebase
				load: (...props) =>
					loadOrRestoreFile(firebase, user, fieldName, ...props, conferenceName),
			}}
			labelIdle={labelIdle || "Drag a pdf here or click to browse"}
		/>
	);
}