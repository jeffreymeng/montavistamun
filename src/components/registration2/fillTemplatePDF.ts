import axios from "axios";
import { PDFDocument, PDFTextField } from "pdf-lib";
import blobToBuffer from "./blobToBuffer";
function replaceText(text: string | undefined, data: Record<string, any>) {
	if (!text) return "";
	const tokenRegex = /$[A-Za-z_][A-Za-z0-9_]/g;
	let result;
console.log("ref")
	while ((result = tokenRegex.exec(text)) !== null) {
		console.log(result, `Found ${result[0]}. Next starts at ${tokenRegex.lastIndex}.`);
		// expected output: "Found foo. Next starts at 9."
		// expected output: "Found foo. Next starts at 19."
	}

	return text
		.split(/$[A-Za-z_][A-Za-z0-9_]/g)
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
