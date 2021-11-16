import axios from "axios";
import { Link } from "gatsby";
import { calendar_v3 } from "googleapis";
import * as Icons from "heroicons-react";
import moment from "moment";
import React, { useState } from "react";
import useRequireLogin from "../components/accounts/useRequireLogin";
import { Layout } from "../components/layout";
import AuthContext from "../context/AuthContext";
type CalendarEvent = calendar_v3.Schema$Event;
export default function AboutPage(): React.ReactElement {
	const { user, verified } = React.useContext(AuthContext);
	useRequireLogin();
	const [eventsCache, setEventsCache] = useState<CalendarEvent[]>([]);
	const [nextMeeting, setNextMeeting] = useState("Loading...");

	const [nextUpdateTimeoutId, setNextUpdateTimeoutId] = useState<
		number | null
	>(null);
	React.useEffect(() => {
		const calendarId =
			"g9h6cqiso966e96uqj1cv2ohgc@group.calendar.google.com";
		const calendarAPIKey = "AIzaSyAWBRPsh5fXjotQ0IT9DZQhygkpzu-SL4w";
		const FORMAT = "dddd, MMMM Do, h:mm A";
		(async () => {
			const fetchData = async (): Promise<CalendarEvent[]> => {
				const response = await axios.get(
					`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
						calendarId
					)}/events`,
					{
						params: {
							key: calendarAPIKey,
							orderBy: "startTime",
							singleEvents: true,
							maxResults: 250,
							timeMin: moment().format(),
							timeMax: moment().add(6, "months").format(),
						},
					}
				);
				return response.data?.items || [];
			};

			const update = async () => {
				let events;
				if (eventsCache.length === 0) {
					events = await fetchData();
					setEventsCache(events);
				} else {
					events = eventsCache;
				}
				const times = events
					.filter(
						(event) =>
							event.summary &&
							event.start &&
							event.summary
								.toLowerCase()
								.indexOf("member meeting") > -1
					)
					.filter((event) =>
						moment(event.end?.dateTime).isAfter(moment())
					)
					.map((event) => ({
						name: event.summary,
						startTime: moment(event.start?.dateTime),
						endTime: moment(event.end?.dateTime),
					}))
					.map((event) => ({
						...event,
						formattedStartTime: event.startTime.format(FORMAT),
						formattedEndTime: event.endTime.format(FORMAT),
					}));
				if (times.length == 0) {
					setNextMeeting(null);
					return;
				}
				setNextMeeting(times[0].formattedStartTime);
				const secondsUntilNextUpdate = Math.abs(
					moment().diff(times[0].endTime, "milliseconds")
				);

				if (nextUpdateTimeoutId !== null) {
					clearTimeout(nextUpdateTimeoutId);
				}

				const timeoutId = window.setTimeout(() => {
					update();
				}, secondsUntilNextUpdate);

				setNextUpdateTimeoutId(timeoutId);

				if (times.length < 2) {
					// cache data for next time
					fetchData().then((events) => setEventsCache(events));
				}
			};
			await update();
		})();

		return () => {
			nextUpdateTimeoutId && clearTimeout(nextUpdateTimeoutId);
		};
	}, []);
	const cards: {
		subtitle: string;
		title: string;
		primaryAction: {
			title: string;
			link: string;
		};
		secondaryAction?: {
			title: string;
			link: string;
		};
		icon: string;
	}[] = [
		...(nextMeeting
			? [
					{
						subtitle: "Next Member Meeting",
						title: nextMeeting,
						primaryAction: {
							title: "Room C107",
							link: "#",
						},
						secondaryAction: {
							title: "View All Events",
							link: "/calendar",
						},
						icon: "UserGroup",
					},
			  ]
			: []),

		{
			subtitle: "Application Now Open",
			title: "NAIMUN",
			primaryAction: {
				title: "Apply Now",
				link: "https://bit.ly/naimun2022app",
			},
			secondaryAction: {
				title: "Learn More",
				link: "/conferences",
			},
			icon: "Calendar",
		},
		// {
		// 	subtitle:
		// 		"Conference You're Attending",
		// 	title:
		// 		"Santa Clara Valley Model United Nations (SCVMUN)",
		// 	primaryAction: {
		// 		title: "Update Registration",
		// 		link:
		// 			"/conferences/scvmun/register",
		// 	},
		// 	secondaryAction: {
		// 		title: "Learn More",
		// 		link: "/conferences/scvmun",
		// 	},
		// 	icon: "Calendar",
		// },
	];
	return (
		<Layout title={"Member Dashboard"}>
			<div className="flex min-h-screen overflow-hidden bg-gray-100">
				<div
					className="flex-1 overflow-auto focus:outline-none"
					tabIndex={0}
				>
					<main className="relative z-0 flex-1 pb-8">
						{/* Page header */}
						<div className="bg-white shadow">
							<div className="px-4 sm:px-6 lg:max-w-7xl lg:mx-auto lg:px-8">
								<div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
									<div className="flex-1 min-w-0">
										{/* Profile */}
										<div className="flex items-center">
											<div>
												<div className="flex items-center">
													<h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
														{new Date().getHours() <
														6
															? "Hello"
															: new Date().getHours() <
															  12
															? "Good Morning"
															: new Date().getHours() <
															  18
															? "Good Afternoon"
															: "Good Evening"}
														{user &&
															`, ${user?.displayName}`}
													</h1>
												</div>
												<dl className="flex flex-col mt-6 sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
													{verified && (
														<>
															<dt className="sr-only">
																Account status
															</dt>
															<dd className="flex items-center mt-3 text-sm font-medium leading-5 text-gray-500 sm:mr-6 sm:mt-0">
																<svg
																	className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
																	viewBox="0 0 20 20"
																	fill="currentColor"
																>
																	<path
																		fillRule="evenodd"
																		d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
																		clipRule="evenodd"
																	/>
																</svg>
																You're a
																verified member.
																<Link
																	to="/resources"
																	className="ml-2 link"
																>
																	View member
																	resources
																</Link>
															</dd>
														</>
													)}
												</dl>
											</div>
										</div>
									</div>
									<div className="flex mt-6 space-x-3 md:mt-0 md:ml-4">
										{/*<span className="rounded-md shadow-sm">*/}
										{/*	<button*/}
										{/*		type="button"*/}
										{/*		className="inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-300 active:text-gray-800 active:bg-gray-50"*/}
										{/*	>*/}
										{/*		Add money*/}
										{/*	</button>*/}
										{/*</span>*/}
										{user && !user.emailVerified && (
											<span className="rounded-md shadow-sm">
												<Link
													to="/account/create"
													className="inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-teal-600 border border-transparent rounded-md hover:bg-teal-500 focus:outline-none focus:ring-teal-500 focus:border-teal-700 active:bg-teal-700"
												>
													Verify Your Email
												</Link>
											</span>
										)}
									</div>
								</div>
							</div>
						</div>

						<div className="mt-8">
							<div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
								<div className="grid grid-cols-1 gap-5 mt-2 sm:grid-cols-2 lg:grid-cols-3">
									{/* Card */}

									{cards.map((card) => (
										<div
											key={card.title + card.subtitle}
											className="overflow-hidden bg-white rounded-lg shadow"
										>
											<div className="p-5">
												<div className="flex items-center">
													<div className="flex-shrink-0">
														{React.createElement(
															// eslint-disable-next-line @typescript-eslint/ban-ts-comment
															// @ts-ignore
															Icons[card.icon],
															{
																className:
																	"h-6 w-6 text-gray-400",
															},
															null
														)}
													</div>
													<div className="flex-1 w-0 ml-5">
														<dl>
															<dt className="text-sm font-medium text-gray-500 truncate">
																{card.subtitle}
															</dt>
															<dd>
																<div className="text-lg font-medium text-gray-900">
																	{card.title}
																</div>
															</dd>
														</dl>
													</div>
												</div>
											</div>
											<div className="px-5 py-3 bg-gray-50">
												<div className="flex justify-between text-sm">
													{card.primaryAction && (
														<Link
															to={
																card
																	.primaryAction
																	.link
															}
															className="font-medium text-indigo-700 hover:text-indigo-900"
														>
															{
																card
																	.primaryAction
																	.title
															}
														</Link>
													)}
													{card.secondaryAction && (
														<Link
															to={
																card
																	.secondaryAction
																	.link
															}
															className="font-medium text-gray-700 hover:text-gray-900"
														>
															{
																card
																	.secondaryAction
																	.title
															}
														</Link>
													)}
												</div>
											</div>
										</div>
									))}
								</div>
							</div>

							<h2 className="px-4 mx-auto mt-8 text-lg font-medium leading-6 text-gray-900 max-w-7xl sm:px-6 lg:px-8">
								Your Member Updates
							</h2>
							<p className="px-4 mx-auto mt-2 mb-4 text-gray-500 text-md max-w-7xl sm:px-6 lg:px-8">
								View all the member update emails we have sent
								to {user?.email || "you"}. Click any update to
								view it in a new tab.
							</p>

							<UpdatesTable />
						</div>
					</main>
				</div>
			</div>
		</Layout>
	);
}

function UpdatesTable() {
	const { user } = React.useContext(AuthContext);
	const [loadingData, setLoadingData] = useState(true);
	const [data, setData] = useState([]);
	const [numPages, setNumPages] = useState(0);
	const [numResults, setNumResults] = useState(0);
	const [mailchimpID, setMailchimpID] = useState("");
	const [page, setPage] = useState(1);
	// initial load
	React.useEffect(() => {
		if (!user || !user.email) return;

		user.getIdToken().then((token) => {
			axios
				.get(
					`/.netlify/functions/get-sent-emails?page=1&count=250&email=${user.email}`,
					{
						headers: {
							authorization: `Bearer ${token}`,
						},
					}
				)
				.then((response) => {
					setLoadingData(false);
					if (
						!response?.data ||
						Object.keys(response.data).length == 0 ||
						response.data.total_items <= 0
					) {
						return;
					}

					setData(response.data.campaigns);
					setNumResults(response.data.total_items);
					setMailchimpID(response.data.mailchimpEmailID);
					setNumPages(Math.ceil(response.data.total_items / 10));
				})
				.catch((e) => {
					console.log({ ...e });
					setLoadingData(false);
				});
		});
	}, [user, user?.email]);

	return (
		<>
			<div className="shadow sm:hidden">
				<ul className="mt-2 overflow-hidden divide-y divide-gray-200 shadow sm:hidden">
					{(!data || data.length == 0) && (
						<li className="block px-4 py-4 bg-white">
							<div className="flex items-center space-x-4">
								<div className="flex flex-1 space-x-2 truncate">
									<div className="text-sm text-gray-500 truncate">
										<p className="truncate">
											{loadingData
												? "Loading..."
												: "We haven't sent you any member update emails yet."}
										</p>
									</div>
								</div>
							</div>
						</li>
					)}
					{data &&
						data.length > 0 &&
						data
							.slice(
								page * 10 - 9 - 1,
								page == numPages ? undefined : page * 10
							)
							.map(
								(email: {
									settings: {
										subject_line: string;
										preview_text: string;
										title: string;
									};
									send_time: string;
									id: string;
									long_archive_url: string;
								}) => (
									<li key={email.id}>
										<a
											href={
												email.long_archive_url +
												"?e=" +
												mailchimpID
											}
											target={"_blank"}
											rel={"noopener noreferrer"}
											className="block px-4 py-4 bg-white hover:bg-gray-50"
										>
											<div className="flex items-center space-x-4">
												<div className="flex flex-1 space-x-2 truncate">
													<div className="text-gray-900 truncate text-md">
														<p className="truncate">
															{
																email.settings
																	.subject_line
															}
														</p>
														<p className="text-sm font-medium text-gray-500 truncate">
															{
																email.settings
																	.preview_text
															}
														</p>{" "}
														<p>
															{moment(
																email.send_time
															).format(
																"MMMM D, YYYY h:mm A"
															)}
														</p>
													</div>
												</div>
												<div>
													<svg
														className="flex-shrink-0 w-5 h-5 text-gray-400"
														viewBox="0 0 20 20"
														fill="currentColor"
													>
														<path
															fillRule="evenodd"
															d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
															clipRule="evenodd"
														/>
													</svg>
												</div>
											</div>
										</a>
									</li>
								)
							)}
				</ul>
				<nav className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200">
					<div className="flex justify-between flex-1">
						<button
							onClick={() => setPage((current) => current - 1)}
							disabled={page == 1}
							className={
								(page == numPages
									? "bg-gray-50"
									: "hover:text-gray-500 ") +
								" relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
							}
						>
							Previous
						</button>
						<button
							onClick={() => setPage((current) => current + 1)}
							disabled={page >= numPages}
							className={
								(page >= numPages
									? "bg-gray-50"
									: "hover:text-gray-500 ") +
								" ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
							}
						>
							Next
						</button>
					</div>
				</nav>
			</div>
			<div className="hidden sm:block">
				<div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
					<div className="flex flex-col mt-2">
						<div className="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
							<table className="min-w-full divide-y divide-gray-200">
								<thead>
									<tr>
										<th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-50">
											Subject
										</th>
										<th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-right text-gray-500 uppercase bg-gray-50">
											Date Sent
										</th>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
									{(!data || data.length == 0) && (
										<tr className="bg-white">
											<td className="w-full px-6 py-4 text-sm leading-5 text-gray-900 max-w-0 whitespace-nowrap">
												<p className="text-base text-gray-500 truncate transition duration-150 ease-in-out group-hover:text-gray-900">
													{loadingData
														? "Loading..."
														: "We haven't sent you any member update emails yet."}
												</p>
											</td>
											{/* Spacer so the column header fits (text is hidden) */}
											<td className="px-6 py-4 text-sm leading-5 text-right whitespace-nowrap">
												<span className={"invisible"}>
													Not Applicable
												</span>
											</td>
										</tr>
									)}
									{data &&
										data.length > 0 &&
										data
											.slice(
												page * 10 - 9 - 1,
												page == numPages
													? undefined
													: page * 10
											)
											.map(
												(email: {
													settings: {
														subject_line: string;
														preview_text: string;
														title: string;
													};
													send_time: string;
													id: string;
													long_archive_url: string;
												}) => (
													<tr
														key={email.id}
														className="bg-white cursor-pointer hover:bg-gray-100"
														onClick={() =>
															window.open(
																email.long_archive_url +
																	"?e=" +
																	mailchimpID,
																"_blank"
															)
														}
													>
														<td className="w-full px-6 py-4 text-sm leading-5 text-gray-900 max-w-0 whitespace-nowrap">
															{/*fake link to show preview*/}
															<a
																href={
																	email.long_archive_url +
																	"?e=" +
																	mailchimpID
																}
																onClick={(e) =>
																	e.preventDefault()
																}
															>
																<p className="text-base text-gray-500 truncate transition duration-150 ease-in-out group-hover:text-gray-900">
																	{
																		email
																			.settings
																			.subject_line
																	}
																</p>
																<p className="text-sm text-gray-400 truncate transition duration-150 ease-in-out group-hover:text-gray-700">
																	{
																		email
																			.settings
																			.preview_text
																	}
																</p>
															</a>
														</td>

														<td className="px-6 py-4 text-sm leading-5 text-right text-gray-500 whitespace-nowrap hover:text-gray-900 ">
															{/*fake link to show preview*/}
															<a
																href={
																	email.long_archive_url +
																	(email.long_archive_url.indexOf(
																		"?"
																	) > -1
																		? "&e="
																		: "?e=") +
																	mailchimpID
																}
																onClick={(e) =>
																	e.preventDefault()
																}
															>
																{moment(
																	email.send_time
																).format(
																	"MMMM D, YYYY h:mm A"
																)}
															</a>
														</td>
													</tr>
												)
											)}
								</tbody>
							</table>

							{/* Pagination */}
							<nav className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
								{data && data.length > 0 && (
									<div className="hidden sm:block">
										<p className="text-sm leading-5 text-gray-700">
											Showing{" "}
											<span className="font-medium">
												{page * 10 - 9}
											</span>{" "}
											to{" "}
											<span className="font-medium">
												{page == numPages
													? numResults
													: page * 10}
											</span>{" "}
											of{" "}
											<span className="font-medium">
												{numResults}
											</span>{" "}
											results
										</p>
									</div>
								)}
								<div className="flex justify-between flex-1 sm:justify-end">
									<button
										onClick={() =>
											setPage((current) => current - 1)
										}
										disabled={
											!data ||
											data.length == 0 ||
											page == 1
										}
										className={
											(!data ||
											data.length == 0 ||
											page == 1
												? "bg-gray-100"
												: "hover:text-gray-500") +
											" relative inline-flex items-center p-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
										}
									>
										<Icons.ChevronLeft />
									</button>
									<button
										onClick={() =>
											setPage((current) => current + 1)
										}
										disabled={
											!data ||
											data.length == 0 ||
											page >= numPages
										}
										className={
											(!data ||
											data.length == 0 ||
											page >= numPages
												? "bg-gray-100"
												: "hover:text-gray-500") +
											" ml-3 relative inline-flex items-center p-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
										}
									>
										<Icons.ChevronRight />
									</button>
								</div>
							</nav>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
