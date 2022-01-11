import axios from "axios";
import { PDFDocument, PDFTextField } from "pdf-lib";
import React from "react";
import { Layout, Main } from "../../components/layout";
import blobToBuffer from "../../components/registration2/blobToBuffer";
import * as pdfform from "../../components/registration2/PDFForm";


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
	fallbackPath: string = name
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
		window.location.href = fallbackPath;
	} else {
		return pdfform.openOrDownload(form, "", true, name);
	}
	return Promise.resolve();
};
export default function AboutPage(): React.ReactElement {
	React.useEffect(() => {
		(async () => {
			const response = await axios.get("/forms/test4.pdf", {
				responseType: "arraybuffer",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/pdf",
				},
			});
			const blob = new Blob([response.data]);
			const pdf = (await blobToBuffer(blob)) as ArrayBuffer;

			// PDF Modification
			const pdfDoc = await PDFDocument.load(pdf);
			const form = pdfDoc.getForm();
			const data = {
				NAME: "Jeffrey Meng",
				ADDRESS: "1234 Some Road",
			};
			form.getFields().forEach((field) => {
				if (field instanceof PDFTextField) {
					console.log(field.getName(), field.getText(), field.getText() == null ? "" : replaceText(field.getText(), data));
					if (field.getText() && field.getText().indexOf("$") > -1) {
						field.setText(replaceText(field.getText(), data));
					}
				} else {
					console.log(`Skipped ${field.getName()}`);
				}
			});
			const filledPDF = await pdfDoc.save();
			openOrDownload("FUHSD-FTF.pdf", filledPDF, "/forms/test4.pdf");
		})();
	}, []);
	return (
		<Layout title={"404 Error"}>
			<Main>
				<h1
					className={
						"text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10"
					}
				>
					Test Page
				</h1>
				<p className={"mt-4 mb-20"}>Open the console</p>
			</Main>
		</Layout>
	);
}
