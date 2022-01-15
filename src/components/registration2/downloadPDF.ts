function isIOS() {
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
}
function openOrDownload(
	buf: Uint8Array,
	newWindow = true,
	downloadName?: string
): Promise<void> {
	return new Promise((r, j) => {
		const newBlob = new Blob([buf], { type: "application/pdf" });

		const data = window.URL.createObjectURL(newBlob);
		const link = document.createElement("a");
		link.href = data;
		if (newWindow) link.target = "_blank";
		if (downloadName) link.download = downloadName;
		document.body.appendChild(link);
		link.click();
		setTimeout(() => {
			document.body.removeChild(link);
			window.URL.revokeObjectURL(data);
			r();
		}, 100);
	});
}
export default function downloadPDF(
	name: string,
	form: Uint8Array | null,
	fallbackPath: string = name
): Promise<void> {
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
		return openOrDownload(form, true, name);
	}
	return Promise.resolve();
}
