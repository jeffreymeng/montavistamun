import axios from "axios";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import moment from "moment";
import React, { useState } from "react";
import Select from "react-select";
import UserData from "../../components/admin/UserData";
import AdminLayout from "../../components/layout/AdminLayout";
import AuthContext from "../../context/AuthContext";
import useFirebase from "../../firebase/useFirebase";
import { getGrade } from "../../utils/schoolYearUtils";
import { approvedUserIds } from "../conferences/smunc/register";

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
	const conferenceOptions = [
		{ label: "SFMUN 2021 Registration", value: "sfmun21" },

		{ label: "BruinMUN Registration", value: "bruinmun" },
		{ label: "SBMUN Registration", value: "sbmun" },
		{ label: "BMUN Registration", value: "bmun" },
		{ label: "SCVMUN Registration", value: "scvmun" },
		{ label: "SFMUN 2020 Registration", value: "sfmun" },
		{ label: "SMUNC Registration", value: "smunc" },
	];
	const hash =
		typeof window !== "undefined" ? window.location.hash?.substring(1) : "";
	const selectedConference = [
		"sfmun21",
		"bruinmun",
		"sfmun",
		"smunc",
		"scvmun",
		"bmun",
		"sbmun",
	].includes(hash)
		? hash
		: "sfmun21";
	if (
		![
			"bruinmun",
			"sfmun",
			"smunc",
			"scvmun",
			"bmun",
			"sbmun",
			"sfmun21",
		].includes(selectedConference)
	) {
		window.location.hash = "sfmun21";
	}
	const setSelectedConference = (conf: string) => {
		window.location.hash = conf;
	};
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
		new Array(3).fill(false)
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
									console.log(users, tempUserData);
									throw new Error(
										"Unable to find user data for registration with id: " +
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

		(selectedConference === "smunc"
			? data.filter((u) => approvedUserIds.includes(u.userData.id))
			: data
		).forEach((user) => {
			console.log(user);

			if (
				(selectedConference === "sfmun" &&
					user.data.confirm?.sfmunConfirmed) ||
				(selectedConference === "sfmun21" &&
					user.data.confirm?.sfmun21Confirmed) ||
				(selectedConference === "smunc" &&
					user.data.confirm?.smuncConfirmed) ||
				(selectedConference === "scvmun" &&
					user.data.confirm?.scvmunConfirmed) ||
				(selectedConference === "bmun" &&
					user.data.confirm?.bmunConfirmed) ||
				(selectedConference === "bruinmun" &&
					user.data.confirm?.bruinmunConfirmed) ||
				(selectedConference === "sbmun" &&
					user.data.confirm?.sbmunConfirmed)
			) {
				temp.registered.push(
					user.userData.data.firstName +
						" " +
						user.userData.data.lastName
				);
			} else if (
				(selectedConference === "sfmun" &&
					user.data.preferences?.committee) ||
				(selectedConference === "sfmun21" &&
					user.data.preferences?.sfmun21Committee) ||
				(selectedConference === "scvmun" &&
					user.data.preferences?.scvmunCommittee &&
					user.data.preferences?.scvmunPartnerPrefs) ||
				(selectedConference === "sbmun" &&
					user.data.preferences?.sbmunCommittee) ||
				(selectedConference === "bruinmun" &&
					user.data.preferences?.bruinmunCommittee)
			) {
				temp.preferences.push(
					user.userData.data.firstName +
						" " +
						user.userData.data.lastName
				);
			} else if (
				(selectedConference === "sfmun" &&
					user.data.forms?.sfmunForm) ||
				(selectedConference === "sfmun21" &&
					user.data.forms?.sfmun21FuhsdForm) ||
				(selectedConference === "smunc" &&
					user.data.forms?.smuncFuhsdForm) ||
				(selectedConference === "scvmun" &&
					user.data.forms?.scvmunFuhsdForm) ||
				(selectedConference === "bmun" &&
					user.data.forms?.bmunFuhsdForm) ||
				(selectedConference === "bruinmun" &&
					user.data.forms?.bruinmunFuhsdForm) ||
				(selectedConference === "sbmun" &&
					user.data.forms?.sbmunFuhsdForm)
			) {
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
					"User with no registration data: " + user.userData.id
				);
			}
		});
		return [
			// temp.personalInformation,
			// temp.emergencyInformation,
			temp.liabilityForms,
			temp.preferences,
			temp.registered,
		];
	}, [data, selectedConference]);
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
				...(selectedConference === "sfmun"
					? [
							`SFMUN Liability Trip Form Link (valid through ${moment()
								.add(6, "days")
								.format("M/D/Y")})`,
					  ]
					: selectedConference === "sbmun"
					? [
							`SBMUN Delegate Information Trip Form Link (valid through ${moment()
								.add(6, "days")
								.format("M/D/Y")})`,
					  ]
					: []),
				`Donation Receipt Link (valid through ${moment()
					.add(6, "days")
					.format("M/D/Y")})`,
				"Donation Opt Out",
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
				...(selectedConference === "scvmun" ||
				selectedConference === "sfmun21"
					? ["Requested Partner"]
					: []),
				...(selectedConference === "sfmun" ||
				selectedConference === "sfmun21" ||
				selectedConference === "scvmun" ||
				selectedConference === "sbmun" ||
				selectedConference === "bruinmun"
					? [
							...[
								"First",
								"Second",
								"Third",
								"Fourth",
								"Fifth",
								"Sixth",
								...(selectedConference === "scvmun" ||
								selectedConference === "sfmun" ||
								selectedConference === "bruinmun"
									? ["Seventh", "Eighth"]
									: []),
								...(selectedConference === "scvmun"
									? [
											"Ninth",
											"Tenth",
											"Eleventh",
											"Twelfth",
											"Thirteenth",
											"Fourteenth",
									  ]
									: []),
							].map((el) => `${el} Choice Committee`),
							...(selectedConference === "sfmun"
								? [
										"DISEC",
										"IAEA",
										"UNODC",
										"SPECPOL",
										"UNHCR",
										"Catherine The Great's Coup",
										"UNSC",
										"Senate",
								  ]
								: selectedConference === "sfmun21"
								? [
										"WHO",
										"Atlantic City Crime",
										"UNESCO",
										"Brundtland",
										"UNHCR",
										"UNSC",
								  ]
								: selectedConference === "bruinmun"
								? [
										"UNDP",
										"ECOSOC",
										"UNESCAP",
										"UNHCR",
										"SPECPOL",
										"Ukrainskaya Revolyutsiya",
										"Novice SOCHUM",
										"Novice UNEP",
								  ]
								: selectedConference === "sbmun"
								? [
										"WHO",
										"UNESCO",
										"DISEC",
										"World Economic Forum",
										"JCC East Germany (Crisis)",
										"JCC West Germany (Crisis)",
								  ]
								: [
										"IAEA",
										"DISEC",
										"WHO",
										"UNEP",
										"SOCHUM",
										"UNDP",
										"LEGAL",
										"UNESCO",
										"Security Council (Spec)",
										"Historic Security Council (Spec)",
										"NATO (Spec)",
										"World Bank (Spec)",
										"UNHCR (Spec)",
										"CSW (Spec)",
								  ]
							).map((el) => `${el} Committee Ranking`),
					  ]
					: []),
			];
			let filteredRegistrationData = data;
			if (selectedConference === "smunc") {
				filteredRegistrationData = filteredRegistrationData.filter(
					(u) => approvedUserIds.includes(u.userData.id)
				);
			}
			if (!includeIncomplete) {
				filteredRegistrationData = filteredRegistrationData.filter(
					(r) =>
						(selectedConference === "sfmun" &&
							r.data.confirm?.sfmunConfirmed) ||
						(selectedConference === "sfmun21" &&
							r.data.confirm?.sfmun21Confirmed) ||
						(selectedConference === "smunc" &&
							r.data.confirm?.smuncConfirmed) ||
						(selectedConference === "scvmun" &&
							r.data.confirm?.scvmunConfirmed) ||
						(selectedConference === "bmun" &&
							r.data.confirm?.bmunConfirmed) ||
						(selectedConference === "sbmun" &&
							r.data.confirm?.sbmunConfirmed) ||
						(selectedConference === "bruinmun" &&
							r.data.confirm?.bruinmunConfirmed)
				);
			}
			const registrations: {
				files: { file: Blob | null; name?: string }[];
				csvRow: string;
				fullName: string;
			}[] = await Promise.all(
				filteredRegistrationData.map((registration) =>
					Promise.all(
						(selectedConference === "sfmun"
							? ["fuhsdForm", "sfmunForm", "donation"]
							: selectedConference === "sfmun21"
							? ["sfmun21FuhsdForm", "donation"]
							: selectedConference === "smunc"
							? ["smuncFuhsdForm", "smuncDonation"]
							: selectedConference === "scvmun"
							? ["scvmunFuhsdForm", "scvmunDonation"]
							: selectedConference === "bruinmun"
							? ["bruinmunFuhsdForm", "bruinmunDonation"]
							: selectedConference === "sbmun"
							? ["sbmunFuhsdForm", "sbmunForm", "sbmunDonation"]
							: ["bmunFuhsdForm", "bmunDonation"]
						)
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
							(selectedConference === "sfmun" &&
								registration.data.confirm?.sfmunConfirmed) ||
							(selectedConference === "sfmun21" &&
								registration.data.confirm?.sfmun21Confirmed) ||
							(selectedConference === "smunc" &&
								registration.data.confirm?.smuncConfirmed) ||
							(selectedConference === "scvmun" &&
								registration.data.confirm?.scvmunConfirmed) ||
							(selectedConference === "bmun" &&
								registration.data.confirm?.bmunConfirmed) ||
							(selectedConference === "bruinmun" &&
								registration.data.confirm?.bruinmunConfirmed) ||
							(selectedConference === "sbmun" &&
								registration.data.confirm?.sbmunConfirmed)
								? "TRUE"
								: "FALSE",
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
										...(selectedConference === "sfmun" ||
										selectedConference === "sbmun"
											? [forms[2].link]
											: []),
										(selectedConference === "sfmun" &&
											registration.data.forms
												?.sfmunDonationOptOut) ||
										(selectedConference === "sfmun21" &&
											registration.data.forms
												?.sfmun21DonationOptOut) ||
										(selectedConference === "smunc" &&
											registration.data.forms
												?.smuncDonationOptOut) ||
										(selectedConference === "scvmun" &&
											registration.data.forms
												?.scvmunDonationOptOut) ||
										(selectedConference === "bmun" &&
											registration.data.forms
												?.bmunDonationOptOut) ||
										(selectedConference === "bruinmun" &&
											registration.data.forms
												?.bruinmunDonationOptOut) ||
										(selectedConference === "sbmun" &&
											registration.data.forms
												?.sbmunDonationOptOut)
											? "TRUE"
											: "FALSE",
								  ]
								: []),
							...(selectedConference === "scvmun"
								? [
										registration.data.preferences
											?.scvmunPartnerPrefs,
								  ]
								: []),
							...(selectedConference === "sfmun21"
								? [
										registration.data.preferences
											?.sfmun21PartnerPrefs,
								  ]
								: []),
							...(selectedConference === "sfmun"
								? [
										...(registration.data.preferences
											?.committee || Array(8).fill("")),
										...(registration.data.preferences
											?.committee
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
								  ]
								: selectedConference === "sfmun21"
								? [
										...(registration.data.preferences
											?.sfmun21Committee || Array(6).fill("")),
										...(registration.data.preferences
											?.sfmun21Committee
											? [
												"World Health Organization",
												"1929 Atlantic City Crime Conference",
												"UNESCO",
												"Commission",
												"UNHCR",
												"UNSC",
												
											  ].map(
													(committee) =>
														registration.data.preferences.sfmun21Committee.findIndex(
															(el: string) => el.indexOf(committee) > -1
														) + 1 ?? "ERROR"
											  )
											: Array(6).fill("")),
								  ]
								: selectedConference === "sbmun"
								? [
										...(registration.data.preferences
											?.sbmunCommittee ||
											Array(6).fill("")),
										...(registration.data.preferences
											?.sbmunCommittee
											? [
													"WHO",
													"UNESCO",
													"DISEC",
													"World Economic Forum",
													"JCC East Germany (Crisis)",
													"JCC West Germany (Crisis)",
											  ].map(
													(committee) =>
														registration.data.preferences.sbmunCommittee.indexOf(
															committee
														) + 1
											  )
											: Array(6).fill("")),
								  ]
								: selectedConference === "bruinmun"
								? [
										...(registration.data.preferences
											?.bruinmunCommittee ||
											Array(8).fill("")),
										...(registration.data.preferences
											?.bruinmunCommittee
											? [
													"UNDP",
													"ECOSOC",
													"UNESCAP",
													"UNHCR",
													"SPECPOL",
													"Ukrainskaya Revolyutsiya",
													"Novice SOCHUM",
													"Novice UNEP",
											  ].map(
													(committee) =>
														registration.data.preferences.bruinmunCommittee.indexOf(
															committee
														) + 1
											  )
											: Array(6).fill("")),
								  ]
								: selectedConference === "scvmun"
								? [
										...(registration.data.preferences?.scvmunCommittee?.map(
											(el: string) =>
												[
													el,
													"IAEA",
													"DISEC",
													"WHO",
													"UNEP",
													"SOCHUM",
													"UNDP",
													"LEGAL",
													"UNESCO",
													"Security Council (Spec)",
													"Historic Security Council (Spec)",
													"NATO (Spec)",
													"World Bank (Spec)",
													"UNHCR (Spec)",
													"CSW (Spec)",
												][
													[
														"IAEA (International Atomic Energy Association)",
														"DISEC (Disarmament and International Security Committee)",
														"WHO (World Health Organization)",
														"UNEP (United Nations Environmental Programme)",
														"SOCHUM (Social, Humanitarian and Cultural)",
														"UNDP (United Nations Development Programme)",
														"LEGAL (Legal Committee)",
														"UNESCO (United Nations Educational, Scientific and Cultural Organization)",
														"Security Council (Specialty Committee)",
														"Historic Security Council (Specialty Committee)",
														"NATO (Specialty Committee)",
														"World Bank (Specialty Committee)",
														"UNHCR (United Nations High Commissioner for Refugees) (Specialty Committee)",
														"CSW (Commission on the Status of Women) (Specialty Committee)",
													].indexOf(el) + 1
												]
										) || Array(14).fill("")),
										...(registration.data.preferences
											?.scvmunCommittee
											? [
													"IAEA (International Atomic Energy Association)",
													"DISEC (Disarmament and International Security Committee)",
													"WHO (World Health Organization)",
													"UNEP (United Nations Environmental Programme)",
													"SOCHUM (Social, Humanitarian and Cultural)",
													"UNDP (United Nations Development Programme)",
													"LEGAL (Legal Committee)",
													"UNESCO (United Nations Educational, Scientific and Cultural Organization)",
													"Security Council (Specialty Committee)",
													"Historic Security Council (Specialty Committee)",
													"NATO (Specialty Committee)",
													"World Bank (Specialty Committee)",
													"UNHCR (United Nations High Commissioner for Refugees) (Specialty Committee)",
													"CSW (Commission on the Status of Women) (Specialty Committee)",
											  ].map(
													(committee) =>
														registration.data.preferences.scvmunCommittee.indexOf(
															committee
														) + 1
											  )
											: Array(14).fill("")),
								  ]
								: []),
						]
							.map((field) =>
								(field + "").indexOf(",") > -1
									? `"${field}"`
									: field || ""
							)
							.join(","),
					}))
				)
			);
			const zip = new JSZip();
			const fuhsdForms = zip.folder("FUHSD Field Trip Forms");

			const sfmunForms =
				selectedConference === "sfmun"
					? zip.folder("SFMUN Liability Forms")
					: null;
			const sbmunForms =
				selectedConference === "sbmun"
					? zip.folder("SBMUN Delegate Information Forms")
					: null;
			const donationReceipts = zip.folder("Donation Receipts");
			if (
				!fuhsdForms ||
				(selectedConference === "sfmun" && !sfmunForms) ||
				!donationReceipts
			) {
				throw new Error("Unable to create zip folders.");
			}
			console.log(registrations);
			registrations.forEach((r) => {
				const name = r.fullName.replace(/\s/g, "-");
				if (r.files[0] && r.files[0].file) {
					fuhsdForms.file(
						`FUHSD-field-trip-form-for-${selectedConference.toUpperCase()}-${name}.pdf`,
						r.files[0].file
					);
				}
				if (selectedConference === "sfmun" && sfmunForms) {
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
				} else if (selectedConference === "sbmun" && sbmunForms) {
					if (r.files[1] && r.files[1].file) {
						sbmunForms.file(
							"SBMUN-information-form-" + name + ".pdf",
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
				} else {
					if (r.files[1] && r.files[1].file) {
						const ext = r.files[1].name?.split(".").pop();
						donationReceipts.file(
							selectedConference.toUpperCase() +
								"-donation-receipt-" +
								name +
								"." +
								ext,
							r.files[1].file
						);
					}
				}
			});
			const csv = [
				headers.join(","),
				...registrations.map((r) => r.csvRow),
			].join("\n");
			zip.file(
				`${selectedConference.toUpperCase()}-registration-data-${
					allFields ? "all-fields" : "preferences"
				}.csv`,
				csv
			);
			const zipFile = await zip.generateAsync({
				type: "blob",
			});
			saveAs(
				zipFile,
				`${selectedConference.toUpperCase()}-registration-export-${
					allFields ? "all-fields" : "preferences-and-forms"
				}-${
					includeIncomplete
						? "including-incomplete-registrations"
						: "only-complete-registrations"
				}.zip`
			);
		},
		[data, selectedConference, firebase]
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
			<b>Displaying live data for:</b>
			<Select
				options={conferenceOptions}
				value={conferenceOptions.find(
					(c) => c.value === selectedConference
				)}
				onChange={(o) =>
					Array.isArray(o)
						? setSelectedConference(o[0].value)
						: setSelectedConference(o.value)
				}
				className={"tw-forms-disable"}
			/>
			<h3 className={"text-xl leading-7 font-bold tracking-tight mt-4"}>
				Registration Progress
			</h3>
			<p className={"text-gray-700 mt-1"}>
				{statistics.some((s) => s.length > 0) && (
					<button
						className="link active:outline-none focus:outline-none"
						onClick={() => {
							setExpandStatistics(
								new Array(statistics.length).fill(
									!expandStatistics.every(
										(e, i) =>
											e || statistics[i].length === 0
									)
								)
							);
						}}
					>
						{/* Allow user to show all steps unless every step with users is already shown */}
						{expandStatistics.every(
							(e, i) => e || statistics[i].length === 0
						)
							? "Collapse All Steps"
							: "Expand All Steps"}
					</button>
				)}
			</p>
			{/*<p>*/}
			{/*	Note: The personal and emergency information steps are shared */}
			{/*	between all conferences. Thus, a member can be on the emergency */}
			{/*	information or liability forms step without necessarily having */}
			{/*	explicitly started to register for this specific conference. */}
			{/*</p>*/}
			<ul className={"list-disc ml-5 mt-2"}>
				{statistics.map((step, i) => (
					// don't show first two steps because they are misleading
					<li key={i}>
						{step.length} user
						{i < statistics.length - 1
							? `${
									step.length !== 1 ? "s are " : " is "
							  } on the ${["preferences", "donations"][i]} step.`
							: `${
									step.length !== 1 ? "s have " : " has "
							  } finished registering for ${selectedConference.toUpperCase()}.`}{" "}
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
				{selectedConference == "sfmun21" && (
					<p>
						<b>
							Warning: SFMUN Reg export is not fully done yet, so the
							export might be kind of sketchy
						</b>
					</p>
				)}
				<button
					onClick={() => exportRegistration(false, exportAllFields)}
					type="button"
					className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:ring-indigo-500 active:bg-indigo-700 transition ease-in-out duration-150"
				>
					<span>
						Export completed {selectedConference.toUpperCase()}{" "}
						registrations
					</span>
				</button>
				<button
					onClick={() => exportRegistration(true, exportAllFields)}
					type="button"
					className="mt-3 md:mt-0 md:ml-3 relative inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:ring-indigo-500 active:bg-indigo-700 transition ease-in-out duration-150"
				>
					<span>
						Export all {selectedConference.toUpperCase()}{" "}
						registrations (including incomplete registrations)
					</span>
				</button>
			</div>
		</AdminLayout>
	);
}
