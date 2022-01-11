import axios from "axios";
import { PDFDocument, PDFTextField } from "pdf-lib";
import blobToBuffer from "./blobToBuffer";
function replaceText(text: string | undefined, data: Record<string, any>) {
	if (!text) return "";

	return text
		.split(" ")
		.map((token) => {
			if (token.indexOf("$") === 0) {
				const id = token.substring(1);
				if (id in data) {
					return data[id];
				}
			}
			return token;
		})
		.join(" ");
}

export default async function fillTemplatePDF(
	url: string,
	data: Record<string, any>
) {
	const response = await axios.get(url, {
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

	form.getFields().forEach((field) => {
		if (field instanceof PDFTextField) {
			console.log(
				field.getName(),
				field.getText(),
				field.getText() == null
					? ""
					: replaceText(field.getText(), data)
			);
			if (field.getText() && (field.getText() ?? "").indexOf("$") > -1) {
				field.setText(replaceText(field.getText(), data));
			}
		} else {
			console.log(`Skipped ${field.getName()}`);
		}
	});
	return await pdfDoc.save();
}
