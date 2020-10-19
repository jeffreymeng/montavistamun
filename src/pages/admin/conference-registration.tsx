import axios from "axios";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import moment from "moment";
import React, { useState } from "react";
import useFirebase from "../../auth/useFirebase";
import UserData from "../../components/admin/UserData";
import AdminLayout from "../../components/layout/AdminLayout";
import AuthContext from "../../context/AuthContext";
import { getGrade } from "../../utils/schoolYearUtils";

export default function AdminLogPage(): React.ReactElement {
	const [target, setTarget] = useState("");
	const [admin, setAdmin] = useState("same");
	const [verified, setVerified] = useState("same");
	const firebase = useFirebase();
	const {
		user,
		loading,
		verified: userVerified,
		admin: userAdmin,
	} = React.useContext(AuthContext);
	const [data, setData] = React.useState<
		{
			id: string;
			data: any;
			userData: {
				id: string;
				data: UserData;
			};
		}[]
	>([]);
	const [usersData, setUsersData] = useState<
		{ id: string; data: UserData }[]
	>([]);
	const [expandStatistics, setExpandStatistics] = useState(() =>
		new Array(5).fill(false)
	);
	React.useEffect(() => {
		if (!firebase) return;
		let unsubscribe = () => {
			/*noop*/
		};
		firebase
			.firestore()
			.collection("users")
			.get()
			.then((querySnapshot) => {
				const tempUserData: { id: string; data: UserData }[] = [];
				querySnapshot.forEach(function (doc) {
					tempUserData.push({ id: doc.id, data: doc.data() });
				});
				setUsersData(tempUserData);

				unsubscribe = firebase
					.firestore()
					.collection("registration")
					.onSnapshot(function (querySnapshot) {
						setData((legacyData) => {
							let users: {
								id: string;
								data: any;
								userData: { id: string; data: UserData };
							}[] = legacyData.slice();
							querySnapshot.forEach(function (doc) {
								users = users.filter((u) => u.id !== doc.id);
								const userUserData = tempUserData.find(
									(u) => u.id === doc.id
								);
								if (!userUserData) {
									throw new Error(
										"Unable to find user data for registration with id:" +
											doc.id
									);
								}
								users.push({
									id: doc.id,
									data: doc.data(),
									userData: userUserData,
								});
							});
							return users;
						});
					});
			});

		return () => unsubscribe();
	}, [firebase]);
	const statistics: string[][] = React.useMemo(() => {
		// use object internally for clarity, but an array is easier to manipulate into elements
		const temp: {
			personalInformation: string[];
			emergencyInformation: string[];
			liabilityForms: string[];
			preferences: string[];
			registered: string[];
		} = {
			personalInformation: [],
			emergencyInformation: [],
			liabilityForms: [],
			preferences: [],
			registered: [],
		};
		data.forEach((user) => {
			console.log(user);

			if (user.data.confirm?.sfmunConfirmed) {
				temp.registered.push(
					user.userData.data.firstName +
						" " +
						user.userData.data.lastName
				);
			} else if (user.data.preferences) {
				temp.preferences.push(
					user.userData.data.firstName +
						" " +
						user.userData.data.lastName
				);
			} else if (user.data.forms) {
				temp.liabilityForms.push(
					user.userData.data.firstName +
						" " +
						user.userData.data.lastName
				);
			} else if (user.data.emergencyInformation) {
				temp.emergencyInformation.push(
					user.userData.data.firstName +
						" " +
						user.userData.data.lastName
				);
			} else if (user.data.personalInformation) {
				temp.personalInformation.push(
					user.userData.data.firstName +
						" " +
						user.userData.data.lastName
				);
			} else {
				// this should never happen
				console.log(user);
				throw new Error(
					"User with no registration data:" + user.userData.id
				);
			}
		});
		return [
			temp.personalInformation,
			temp.emergencyInformation,
			temp.liabilityForms,
			temp.preferences,
			temp.registered,
		];
	}, [data]);
	const [exportAllFields, setExportAllFields] = useState(false);
	const exportRegistration = React.useCallback(
		async (includeIncomplete: boolean, allFields: boolean) => {
			if (!firebase) return;
			const allFieldsHeaders = [
				"Address Line One",
				"Address Line Two",
				"City",
				"State",
				"Zip Code",
				"Emergency Contact One Name",
				"Emergency Contact One Phone Number",
				"Emergency Contact One Relationship",
				"Emergency Contact Two Name",
				"Emergency Contact Two Phone Number",
				"Emergency Contact Two Relationship",
				"Health Insurance Carrier",
				"Health Insurance Address Line One",
				"Health Insurance Address Line Two",
				"Health Insurance City",
				"Health Insurance State",
				"Health Insurance Zip",
				`FUHSD Field Trip Form Link (valid through ${moment()
					.add(6, "days")
					.format("M/D/Y")})`,
				`SFMUN Liability Trip Form Link (valid through ${moment()
					.add(6, "days")
					.format("M/D/Y")})`,
				`Donation Receipt Link (valid through ${moment()
					.add(6, "days")
					.format("M/D/Y")})`,
			];
			const headers = [
				"Registration Complete",
				"User ID",
				"First Name",
				"Last Name",
				"Grade",
				"Email",
				"Phone Number",
				...(allFields ? allFieldsHeaders : []),
				...[
					"First",
					"Second",
					"Third",
					"Fourth",
					"Fifth",
					"Sixth",
					"Seventh",
					"Eighth",
				].map((el) => `${el} Choice Committee`),
				...[
					"DISEC",
					"IAEA",
					"UNODC",
					"SPECPOL",
					"UNHCR",
					"Catherine The Great's Coup",
					"UNSC",
					"Senate",
				].map((el) => `${el} Committee Ranking`),
			];
			const registrations: {
				files: { file: Blob | null; name?: string }[];
				csvRow: string;
				fullName: string;
			}[] = await Promise.all(
				(includeIncomplete
					? data
					: data.filter((r) => r.data.confirm?.sfmunConfirmed)
				).map((registration) =>
					Promise.all(
						["fuhsdForm", "sfmunForm", "donation"]
							.map((field) =>
								registration.data.forms &&
								registration.data.forms[field]
									? firebase
											.storage()
											.ref(
												`forms/sfmun/${registration.userData.id}/${field}/${registration.data.forms[field]}`
											)
											.getDownloadURL()
											.then((link) =>
												axios
													.get(link, {
														responseType:
															"arraybuffer",
														headers: {
															"Content-Type":
																"application/json",
															Accept:
																"application/pdf",
														},
													})
													.then((response) => ({
														file: new Blob([
															response.data,
														]),
														link: link,
														name:
															registration.data
																.forms[field],
													}))
											)
									: Promise.reject({
											code: "storage/object-not-found",
									  })
							)
							.map((promise) =>
								promise.catch((e) => {
									if (e.code === "storage/object-not-found") {
										// user probably deleted file
										return Promise.resolve({
											file: null,
											link: "",
										});
									} else {
										return Promise.resolve({
											file: null,
											link:
												"Unable to get file URL (error code: " +
												e.code +
												")",
										});
									}
								})
							)
					).then((forms) => ({
						fullName:
							registration.userData.data.firstName +
							" " +
							registration.userData.data.lastName,
						files: forms,
						csvRow: [
							!!registration.data.confirm?.sfmunConfirmed,
							registration.userData.id,
							registration.userData.data.firstName,
							registration.userData.data.lastName,
							getGrade(registration.userData.data.classOf),
							registration.userData.data.email,
							registration.data?.personalInformation?.phone,
							...(allFields
								? [
										registration.data.personalInformation
											?.addressOne,
										registration.data.personalInformation
											?.addressTwo,
										registration.data.personalInformation
											?.city,
										registration.data.personalInformation
											?.state,
										registration.data.personalInformation
											?.zip,
										registration.data.emergencyInformation
											?.contactOneName,
										registration.data.emergencyInformation
											?.contactOnePhone,
										registration.data.emergencyInformation
											?.contactOneRelationship,
										registration.data.emergencyInformation
											?.contactTwoName,
										registration.data.emergencyInformation
											?.contactTwoPhone,
										registration.data.emergencyInformation
											?.contactTwoRelationship,
										registration.data.emergencyInformation
											?.healthInsuranceCarrier,
										registration.data.emergencyInformation
											?.healthInsuranceAddressOne,
										registration.data.emergencyInformation
											?.healthInsuranceAddressTwo,
										registration.data.emergencyInformation
											?.healthInsuranceCity,
										registration.data.emergencyInformation
											?.healthInsuranceState,
										registration.data.emergencyInformation
											?.healthInsuranceZip,
										forms[0].link,
										forms[1].link,
										forms[2].link,
								  ].map((field) => field || "")
								: []),
							...(registration.data.preferences?.committee ||
								Array(8).fill("")),
							...(registration.data.preferences?.committee
								? [
										"DISEC",
										"IAEA",
										"UNODC",
										"SPECPOL",
										"UNHCR",
										"Catherine The Great's Coup (Crisis)",
										"UNSC (Crisis)",
										"Senate (Crisis)",
								  ].map(
										(committee) =>
											registration.data.preferences.committee.indexOf(
												committee
											) + 1
								  )
								: Array(8).fill("")),
						].join(","),
					}))
				)
			);
			const zip = new JSZip();
			const fuhsdForms = zip.folder("FUHSD Field Trip Forms");
			const sfmunForms = zip.folder("SFMUN Liability Forms");
			const donationReceipts = zip.folder("Donation Receipts");
			if (!fuhsdForms || !sfmunForms || !donationReceipts) {
				throw new Error("Unable to create zip folders.");
			}
			console.log(registrations);
			registrations.forEach((r) => {
				const name = r.fullName.replace(/\s/g, "-");
				if (r.files[0] && r.files[0].file) {
					fuhsdForms.file(
						"FUHSD-field-trip-form-for-SFMUN-" + name + ".pdf",
						r.files[0].file
					);
				}
				if (r.files[1] && r.files[1].file) {
					sfmunForms.file(
						"SFMUN-liability-form-" + name + ".pdf",
						r.files[1].file
					);
				}
				if (r.files[2] && r.files[2].file) {
					const ext = r.files[2].name?.split(".").pop();
					donationReceipts.file(
						"SFMUN-donation-receipt-" + name + "." + ext,
						r.files[2].file
					);
				}
			});
			const csv = [
				headers.join(","),
				...registrations.map((r) => r.csvRow),
			].join("\n");
			zip.file(
				"SFMUN-registration-data-" +
					(allFields ? "all-fields" : "preferences") +
					".csv",
				csv
			);
			const zipFile = await zip.generateAsync({
				type: "blob",
			});
			saveAs(
				zipFile,
				"SFMUN-registration-export-" +
					(allFields ? "all-fields" : "preferences-and-forms") +
					"-" +
					(includeIncomplete
						? "including-incomplete-registrations"
						: "only-complete-registrations") +
					".zip"
			);
		},
		[data, firebase]
	);
	return (
		<AdminLayout title={"Conference Registration"}>
			<h1
				className={
					"text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 mb-6"
				}
			>
				Conference Registration
			</h1>
			<p>
				Displaying live data for <b>SFMUN Registration</b>.
			</p>
			<h3 className={"text-xl leading-7 font-bold tracking-tight mt-4"}>
				Registration Progress
			</h3>
			<p className={"text-gray-700 mt-1"}>
				{statistics.some((s) => s.length > 0) && (
					<button
						className="link active:outline-none focus:outline-none"
						onClick={() => {
							setExpandStatistics(
								new Array(5).fill(
									!expandStatistics.every((e) => e)
								)
							);
						}}
					>
						{/* Allow user to show all steps unless every step is already shown */}
						{expandStatistics.every((e) => e)
							? "Hide All Steps"
							: "Show All Steps"}
					</button>
				)}
			</p>
			<ul className={"list-disc ml-5 mt-2"}>
				{statistics.map((step, i) => (
					<li key={i}>
						{step.length} user
						{i < 4
							? `${
									step.length !== 1 ? "s are " : " is "
							  } on the ${
									[
										"emergency information",
										"liability forms",
										"preferences",
										"donations",
									][i]
							  } step.`
							: `${
									step.length !== 1 ? "s have " : " has "
							  } finished registering for SFMUN.`}{" "}
						{step.length > 0 && (
							<>
								(
								<button
									onClick={(e) => {
										setExpandStatistics((o: boolean[]) => {
											const newValue = o.slice();
											newValue[i] = !newValue[i];
											return newValue;
										});
									}}
									className="link active:outline-none focus:outline-none"
								>
									{expandStatistics[i] ? "hide" : "show"}
								</button>
								)
							</>
						)}
						{expandStatistics[i] && step.length > 0 && (
							<ul className={"list-circle ml-5"}>
								{step.map((name) => (
									<li key={name}>{name}</li>
								))}
							</ul>
						)}
					</li>
				))}
			</ul>
			<h3 className={"text-xl leading-7 font-bold tracking-tight mt-4"}>
				Export
			</h3>
			<div className={"mt-2"}>
				<p className={"mb-3"}>
					Currently exporting{" "}
					{exportAllFields
						? "all fields"
						: "only forms and preferences"}{" "}
					(
					<button
						className="link active:outline-none focus:outline-none"
						onClick={() => setExportAllFields((o) => !o)}
					>
						export{" "}
						{!exportAllFields
							? "all fields"
							: "only forms and preferences"}{" "}
						instead
					</button>
					)
				</p>
				<button
					onClick={() => exportRegistration(false, exportAllFields)}
					type="button"
					className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
				>
					<span>Export completed registrations</span>
				</button>
				<button
					onClick={() => exportRegistration(true, exportAllFields)}
					type="button"
					className="mt-3 md:mt-0 md:ml-3 relative inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
				>
					<span>
						Export all registrations (including incomplete
						registrations)
					</span>
				</button>
			</div>
		</AdminLayout>
	);
}
