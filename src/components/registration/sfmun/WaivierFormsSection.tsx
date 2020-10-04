import axios from "axios";
import React, { useContext, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import * as pdfform from "../PDFForm";
export default function WaivierFormsSection({
	data,
}: {
	data: Record<string, any>;
}) {
	const [filledForms, setFilledForms] = useState<(Uint8Array | null)[]>([
		null,
		null,
	]);
	const { user } = useContext(AuthContext);
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
			const pdf = await pdfform.blob2Buffer(blob);
			const keys = Object.keys(pdfform.list_fields(pdf));
			console.log(keys.sort());
			const filled = pdfform.fillForm(pdf, {
				"Student's Name": [user?.displayName],
				Destination: ["Online"],
				"Date(s)": ["12/12/20 - 12/13/20"],
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
			setFilledForms([filled]);
		})();
	}, [user, data]);
	return (
		<div className="mt-8 shadow rounded-md sm:overflow-hidden px-4 bg-white sm:p-6 py-4">
			<div>
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
					<span className="inline-flex rounded-md shadow-sm mt-2">
						<button
							onClick={() =>
								filledForms[0] !== null &&
								pdfform.openOrDownload(filledForms[0])
							}
							className={
								"ml-4 py-1 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white shadow-sm " +
								(filledForms[0] === null
									? "bg-indigo-300"
									: "bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-blue active:bg-indigo-600 transition duration-150 ease-in-out")
							}
							disabled={filledForms[0] === null}
						>
							{filledForms[0] === null
								? "Generating PDF..."
								: "Print"}
						</button>
					</span>
				</div>
			</div>
		</div>
	);
}
