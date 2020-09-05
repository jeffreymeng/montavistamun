import "flatpickr/dist/themes/light.css";
import * as Icons from "heroicons-react";
import React, { useState } from "react";
import Flatpickr from "react-flatpickr";
import Select from "react-select";
import useFirebase from "../../auth/useFirebase";
import SaveModal from "../../components/admin/awards/SaveModal";
import ConfirmationModal from "../../components/ConfirmModal";
import AdminLayout from "../../components/layout/AdminLayout";
import AuthContext from "../../context/AuthContext";
import {
	ConferenceAwardCard,
	ConferenceAwardsData,
	SpotlightConference,
} from "../awards";

export default function AboutPage(): React.ReactElement {
	const [showSpotlightView, setShowSpotlightView] = useState(false);
	const firebase = useFirebase();
	const { loading } = React.useContext(AuthContext);
	const [data, setData] = React.useState<
		{ id: string; award: ConferenceAwardsData }[]
	>([]);
	const [selectedConference, setSelectedConference] = useState("(NEW)");
	React.useEffect(() => {
		if (!firebase || loading) return;
		firebase
			.firestore()
			.collection("awards")
			.orderBy("time", "desc")
			.get()
			.then((snapshot) => {
				const awardsData: {
					id: string;
					award: ConferenceAwardsData;
				}[] = [];
				snapshot.forEach((document) => {
					const id = document.id;
					const award = document.data() as ConferenceAwardsData;
					awardsData.push({
						id,
						award,
					});
				});
				setData(awardsData);
			});
	}, [firebase, loading]);
	const options = React.useMemo(() => {
		console.log(data);
		return [
			{
				value: "(NEW)",
				label: `Add New Conference`,
			},
			...data.map(({ award, id }) => ({
				value: id,
				label: `${award.name} (${award.month} ${award.year})`,
			})),
		];
	}, [data]);

	const [name, setName] = useState("");
	const [delegationAward, setDelegationAward] = useState("");
	const [imageURL, setImageURL] = useState("");
	const [endDate, setEndDate] = useState<Date>(() => new Date());
	const awardTypes = [
		"Best Delegate",
		"Outstanding Delegate",
		"Honorable Mention",
		"Verbal Commendation",
		"Research Award",
	];
	// exactly 5 strings long
	const [awards, setAwards] = useState<
		[string, string, string, string, string]
	>(["", "", "", "", ""]);
	const awardsObject: {
		type:
			| "Best Delegate"
			| "Outstanding"
			| "Honorable"
			| "Verbal"
			| "Research";
		awards: string[];
	}[] = React.useMemo(
		() =>
			awards
				.map((value, i) => {
					const type = [
						"Best Delegate",
						"Outstanding",
						"Honorable",
						"Verbal",
						"Research",
					][i];
					return {
						type: type as
							| "Best Delegate"
							| "Outstanding"
							| "Honorable"
							| "Verbal"
							| "Research",
						awards: value ? value.split("\n") : [],
					};
				})
				.filter((a) => a.awards.length > 0),
		[awards]
	);
	let conferenceData: ConferenceAwardsData | null = null;
	if (firebase) {
		conferenceData = {
			name,
			time: firebase.firestore.Timestamp.fromDate(endDate),
			year: endDate.getFullYear(),
			imageURL,
			month: [
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December",
			][endDate.getMonth()],

			delegateAwards: awardsObject,
			delegationAward,
		};
	}
	const edits = React.useMemo(() => {
		const changes = [];
		const conferenceData = data.find((c) => c.id === selectedConference)
			?.award;
		if (name !== (conferenceData?.name || ""))
			changes.push("Conference Name");
		if (
			endDate.getFullYear() !==
				(conferenceData?.time.toDate() || new Date()).getFullYear() ||
			endDate.getMonth() !==
				(conferenceData?.time.toDate() || new Date()).getMonth() ||
			endDate.getDate() !==
				(conferenceData?.time.toDate() || new Date()).getDate()
		)
			changes.push("Conference End Date");
		if (imageURL !== (conferenceData?.imageURL || ""))
			changes.push("Image");
		if (delegationAward !== (conferenceData?.delegationAward || ""))
			changes.push("Delegation Awards");
		const newAwards = ["", "", "", "", ""];
		conferenceData?.delegateAwards.forEach((award) => {
			const index = [
				"Best Delegate",
				"Outstanding",
				"Honorable",
				"Verbal",
				"Research",
			].indexOf(award.type);
			newAwards[index] = award.awards.join("\n");
		});
		awards.forEach((award, i) => {
			const changeName = [
				"Best Delegates",
				"Outstanding Delegates",
				"Honorable Mentions",
				"Verbal Commendations",
				"Research Awards",
			][i];
			if (
				award
					.split("\n")
					.filter((e) => e)
					.join("\n") !== newAwards[i]
			) {
				changes.push(changeName);
			}
		});

		return changes;
	}, [data, name, awards, endDate, delegationAward, imageURL]);
	const hasChanges = edits.length > 0;
	React.useEffect(() => {
		if (hasChanges) {
			const handler = (e: BeforeUnloadEvent) => {
				e.returnValue = "You have unsaved changes.";
			};
			window.addEventListener("beforeunload", handler);
			return () => {
				window.removeEventListener("beforeunload", handler);
			};
		}
	}, [hasChanges]);
	const [showResetModal, setShowResetModal] = useState(false);
	const [showSaveModal, setShowSaveModal] = useState(false);
	const setFields = (conferenceId: string) => {
		const conferenceData = data.find((c) => c.id === conferenceId)?.award;
		setName(conferenceData?.name || "");
		const newAwards = ["", "", "", "", ""];
		conferenceData?.delegateAwards.forEach((award) => {
			const index = [
				"Best Delegate",
				"Outstanding",
				"Honorable",
				"Verbal",
				"Research",
			].indexOf(award.type);
			newAwards[index] = award.awards.join("\n");
		});
		setEndDate(conferenceData?.time.toDate() || new Date());
		setAwards(newAwards as [string, string, string, string, string]);
		setDelegationAward(conferenceData?.delegationAward || "");
		setImageURL(conferenceData?.imageURL || "");
	};
	return (
		<AdminLayout title={"Admin Dashboard"}>
			<ConfirmationModal
				show={showResetModal}
				setShow={setShowResetModal}
				onConfirm={() => {
					setFields(selectedConference);
					setShowResetModal(false);
				}}
				Icon={Icons.ExclamationOutline}
				title={"Discard Changes?"}
				confirmButtonText={"Discard Changes"}
			>
				<p className="text-sm leading-5 text-gray-500">
					You will be discarding your changes to the following fields:
				</p>
				<ul
					className={
						"list-disc text-sm leading-5 text-gray-500 ml-6 mt-3"
					}
				>
					{edits.map((c) => (
						<li key={c}>{c}</li>
					))}
				</ul>
			</ConfirmationModal>
			<SaveModal
				show={showSaveModal}
				setShow={setShowSaveModal}
				setData={setData}
				conferenceData={conferenceData}
				edits={edits}
				selectedConference={selectedConference}
			/>
			<h1
				className={
					"text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 mb-6"
				}
			>
				Add and Edit Awards
			</h1>
			<div className="lg:flex lg:-mx-5">
				<div
					className={
						(showSpotlightView ? "lg:w-1/3 " : "lg:w-2/3 ") +
						"lg:px-5"
					}
				>
					<div>
						<label
							htmlFor="conference-select"
							className="block text-sm font-medium leading-5 text-gray-700"
						>
							Conference To Edit
						</label>
						<Select
							isDisabled={hasChanges}
							id={"conference-select"}
							className={"mt-1"}
							placeholder={"Select a conference to edit..."}
							options={options}
							value={
								options.find(
									(o) => o.value == selectedConference
								) || options.find((o) => o.value == "(NEW)")
							}
							onChange={(o) => {
								setSelectedConference(
									(o as { value: string }).value
								);
								setFields((o as { value: string }).value);
							}}
						/>
						{hasChanges && (
							<p className="mt-2 text-sm text-gray-500">
								To change the conference you are editing, you
								must first discard or save your changes.
							</p>
						)}
					</div>
					<form className={"mt-8"}>
						<div className="flex justify-between">
							<button
								onClick={() => setShowResetModal(true)}
								type="button"
								disabled={!hasChanges}
								className={
									(hasChanges
										? "bg-indigo-200 hover:bg-indigo-50 focus:outline-none focus:border-indigo-300 focus:shadow-outline-indigo active:bg-indigo-200 "
										: "bg-indigo-100") +
									" inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-indigo-700 transition ease-in-out duration-150"
								}
							>
								{hasChanges
									? "Discard Changes"
									: "No Changes to Discard"}
							</button>
							<span className="inline-flex rounded-md shadow-sm">
								<button
									type="button"
									onClick={() => setShowSaveModal(true)}
									disabled={!hasChanges}
									className={
										(hasChanges
											? "bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
											: "bg-indigo-300") +
										" inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white transition ease-in-out duration-150"
									}
								>
									{hasChanges
										? "Save Changes"
										: "No Changes to Save"}
								</button>
							</span>
						</div>
						<h3 className="text-2xl font-bold mt-6">
							Conference Details
						</h3>
						<div>
							<label
								htmlFor="edit-conference-name"
								className="block text-sm font-medium leading-5 text-gray-700"
							>
								Name
							</label>
							<div className="mt-1 relative rounded-md shadow-sm">
								<input
									value={name}
									onChange={(e) => setName(e.target.value)}
									id="edit-conference-name"
									className="form-input block w-full sm:text-sm sm:leading-5"
								/>
							</div>
							<p className="mt-2 text-sm text-gray-500">
								The name should either include the year, or the
								iteration. (e.g. "GMUNC IV" or "BMUN 2020" are
								acceptable, but not just "GMUNC" or "BMUN").
							</p>
						</div>
						<div className={"mt-4"}>
							<label
								htmlFor="edit-conference-end-date"
								className="block text-sm font-medium leading-5 text-gray-700"
							>
								End Date
							</label>
							<div className="mt-1 relative rounded-md shadow-sm">
								<Flatpickr
									value={endDate}
									onChange={(d) => setEndDate(d[0])}
									id={"edit-conference-end-date"}
									className="form-input block w-full sm:text-sm sm:leading-5"
									options={{
										dateFormat: "F j, Y",
									}}
								/>
							</div>
							<p className="mt-2 text-sm text-gray-500">
								The entire date is used to sort conferences, but
								only the month and year will be displayed on the
								website.
							</p>
						</div>
						<div className={"mt-4"}>
							<label
								htmlFor="edit-conference-imageurl"
								className="block text-sm font-medium leading-5 text-gray-700"
							>
								Image URL
							</label>
							<div className="mt-1 relative rounded-md shadow-sm">
								<input
									value={imageURL}
									onChange={(e) =>
										setImageURL(e.target.value)
									}
									id="edit-conference-imageurl"
									className="form-input block w-full sm:text-sm sm:leading-5"
									placeholder={"Must include https://"}
								/>
							</div>
							<p className="mt-2 text-sm text-gray-500">
								The image will be shown if this conference is
								the spotlighted conference (typically if it is
								the most recent conference). You can test it by{" "}
								<a
									className="link"
									onClick={(e) => {
										setShowSpotlightView(true);
										e.preventDefault();
									}}
								>
									entering spotlight preview mode
								</a>
								. You can use images from your computer by
								uploading them to{" "}
								<a
									href={"https://imgur.com/upload"}
									target={"_blank"}
									rel={"noreferrer noopener"}
									className={"link"}
								>
									imgur
								</a>
								, then right clicking the image after it is
								uploaded and copying the image address, which
								starts with https://i.imgur.com.
							</p>
						</div>
						<h3 className="text-2xl font-bold mt-6">Awards</h3>
						<div className={"mt-4"}>
							<label
								htmlFor="edit-conference-delegation-award"
								className="block text-sm font-medium leading-5 text-gray-700"
							>
								Delegation Award
							</label>
							<div className="mt-1 relative rounded-md shadow-sm">
								<input
									value={delegationAward}
									onChange={(e) =>
										setDelegationAward(e.target.value)
									}
									id="edit-conference-delegation-award"
									className="form-input block w-full sm:text-sm sm:leading-5"
								/>
							</div>
						</div>

						{awardTypes.map((name, i) => (
							<div className={"mt-4"} key={name}>
								<label
									htmlFor={"edit-conference-award-" + i}
									className="block text-sm font-medium leading-5 text-gray-700"
								>
									{name}
								</label>
								<div className="mt-1 rounded-md shadow-sm">
									<textarea
										value={awards[i]}
										onChange={(e) => {
											const val = e.target.value;
											setAwards((old) => {
												const clone = old.slice();
												clone[i] = val;
												return clone as [
													string,
													string,
													string,
													string,
													string
												];
											});
										}}
										id={"edit-conference-award-" + i}
										rows={3}
										className="form-textarea block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
									/>
								</div>
								<p className="mt-2 text-sm text-gray-500">
									One per line. "First Last (Committee)" or
									"First1 Last1 & First2 Last2 (Committee)"
									Prefer the ampersand (&) over the word
									"and".
								</p>
							</div>
						))}
					</form>
				</div>
				<div
					className={
						(showSpotlightView ? "lg:w-2/3 " : "lg:w-1/3 ") +
						"lg:px-5"
					}
				>
					{/* LG: Spacer to align button with input. SM: Header */}
					<span className="lg:invisible block text-xl mt-6 lg:mt-0 lg:text-sm font-medium leading-5 text-gray-700">
						Preview
					</span>
					<button
						type="button"
						onClick={() => setShowSpotlightView((o) => !o)}
						className="mt-1 mb-10 w-full items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-50 focus:outline-none focus:border-indigo-300 focus:shadow-outline-indigo active:bg-indigo-200 transition ease-in-out duration-150"
					>
						{showSpotlightView
							? "Preview in Normal Mode"
							: "Preview in Spotlight Mode"}
					</button>

					{conferenceData &&
						firebase?.firestore.Timestamp.fromDate &&
						(showSpotlightView ? (
							<SpotlightConference data={conferenceData} />
						) : (
							<div>
								<ConferenceAwardCard
									imageURL={
										conferenceData?.imageURL ||
										"https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80"
									}
									{...conferenceData}
								/>
							</div>
						))}
				</div>
			</div>
		</AdminLayout>
	);
}
