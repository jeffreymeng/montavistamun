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
	const { user, loading, verified, admin } = React.useContext(AuthContext);
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
		{
			subtitle: "Next Member Meeting",
			title: nextMeeting,
			primaryAction: {
				title: "Join Meeting",
				link: "/zoom",
			},
			secondaryAction: {
				title: "View All Events",
				link: "/calendar",
			},
			icon: "UserGroup",
		},

		// {
		// 	subtitle: "Registration Now Open",
		// 	title: "San Fransisco Model United Nations (SFMUN)",
		// 	primaryAction: {
		// 		title: "Register Now",
		// 		link: "/conferences/sfmun/register",
		// 	},
		// 	// secondaryAction: {
		// 	// 	title: "Learn More",
		// 	// 	link: "/conferences/bmun",
		// 	// },
		// 	icon: "Calendar",
		// },
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
			<div className="min-h-screen flex overflow-hidden bg-cool-gray-100">
				<div
					className="flex-1 overflow-auto focus:outline-none"
					tabIndex={0}
				>
					<main className="flex-1 relative pb-8 z-0">
						{/* Page header */}
						<div className="bg-white shadow">
							<div className="px-4 sm:px-6 lg:max-w-7xl lg:mx-auto lg:px-8">
								<div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-cool-gray-200">
									<div className="flex-1 min-w-0">
										{/* Profile */}
										<div className="flex items-center">
											<div>
												<div className="flex items-center">
													<h1 className="ml-3 text-2xl font-bold leading-7 text-cool-gray-900 sm:leading-9 sm:truncate">
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
												<dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
													{verified && (
														<>
															<dt className="sr-only">
																Account status
															</dt>
															<dd className="mt-3 flex items-center text-sm leading-5 text-cool-gray-500 font-medium sm:mr-6 sm:mt-0">
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
																	className="link ml-2"
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
									<div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
										{/*<span className="shadow-sm rounded-md">*/}
										{/*	<button*/}
										{/*		type="button"*/}
										{/*		className="inline-flex items-center px-4 py-2 border border-cool-gray-300 text-sm leading-5 font-medium rounded-md text-cool-gray-700 bg-white hover:text-cool-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-cool-gray-800 active:bg-cool-gray-50 transition duration-150 ease-in-out"*/}
										{/*	>*/}
										{/*		Add money*/}
										{/*	</button>*/}
										{/*</span>*/}
										{user && !user.emailVerified && (
											<span className="shadow-sm rounded-md">
												<Link
													to="/account/create"
													className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-teal-600 hover:bg-teal-500 focus:outline-none focus:shadow-outline-teal focus:border-teal-700 active:bg-teal-700 transition duration-150 ease-in-out"
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
							<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
								<div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
									{/* Card */}

									{cards.map((card) => (
										<div
											key={card.title + card.subtitle}
											className="bg-white overflow-hidden shadow rounded-lg flex flex-col justify-between"
										>
											<div className="p-5">
												<div className="flex items-top">
													<div className="flex-shrink-0 mt-3">
														{React.createElement(
															// eslint-disable-next-line @typescript-eslint/ban-ts-comment
															// @ts-ignore
															Icons[card.icon],
															{
																className:
																	"h-6 w-6 text-cool-gray-400",
															},
															null
														)}
													</div>
													<div className="ml-5 w-0 flex-1">
														<dl>
															<dt className="text-sm leading-5 font-medium text-cool-gray-500 truncate">
																{card.subtitle}
															</dt>
															<dd>
																<div className="text-lg leading-7 font-medium text-cool-gray-900">
																	{card.title}
																</div>
															</dd>
														</dl>
													</div>
												</div>
											</div>
											<div className="bg-cool-gray-50 px-5 py-3">
												<div className="text-sm leading-5 flex justify-between">
													{card.primaryAction && (
														<a
															href={
																card
																	.primaryAction
																	.link
															}
															target={"_blank"}
															rel={
																"noopener noreferrer"
															}
															className={
																"font-medium text-teal-600 hover:text-teal-900 transition ease-in-out duration-150"
															}
														>
															{
																card
																	.primaryAction
																	.title
															}
														</a>
													)}
													{card.secondaryAction && (
														<a
															href={
																card
																	.secondaryAction
																	.link
															}
															target={"_blank"}
															rel={
																"noopener noreferrer"
															}
															className={
																"font-medium text-gray-500 hover:text-gray-900 transition ease-in-out duration-150"
															}
														>
															{
																card
																	.secondaryAction
																	.title
															}
														</a>
													)}
												</div>
											</div>
										</div>
									))}
								</div>
							</div>

							<h2 className="max-w-7xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-cool-gray-900 sm:px-6 lg:px-8">
								Your Member Updates
							</h2>
							<p className="text-gray-500 text-md mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-2 mb-4">
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
	const { user, loading, verified, admin } = React.useContext(AuthContext);
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
				<ul className="mt-2 divide-y divide-cool-gray-200 overflow-hidden shadow sm:hidden">
					{(!data || data.length == 0) && (
						<li className="block px-4 py-4 bg-white">
							<div className="flex items-center space-x-4">
								<div className="flex-1 flex space-x-2 truncate">
									<div className="text-cool-gray-500 text-sm truncate">
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
											className="block px-4 py-4 bg-white hover:bg-cool-gray-50"
										>
											<div className="flex items-center space-x-4">
												<div className="flex-1 flex space-x-2 truncate">
													<div className="text-cool-gray-900 text-md truncate">
														<p className="truncate">
															{
																email.settings
																	.subject_line
															}
														</p>
														<p className="text-cool-gray-500 font-medium text-sm truncate">
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
														className="flex-shrink-0 h-5 w-5 text-cool-gray-400"
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
				<nav className="bg-white px-4 py-3 flex items-center justify-between border-t border-cool-gray-200">
					<div className="flex-1 flex justify-between">
						<button
							onClick={() => setPage((current) => current - 1)}
							disabled={page == 1}
							className={
								(page == numPages
									? "bg-gray-50"
									: "hover:text-cool-gray-500 ") +
								" relative inline-flex items-center px-4 py-2 border border-cool-gray-300 text-sm leading-5 font-medium rounded-md text-cool-gray-700 bg-white focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-cool-gray-100 active:text-cool-gray-700 transition ease-in-out duration-150"
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
									: "hover:text-cool-gray-500 ") +
								" ml-3 relative inline-flex items-center px-4 py-2 border border-cool-gray-300 text-sm leading-5 font-medium rounded-md text-cool-gray-700 bg-white focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-cool-gray-100 active:text-cool-gray-700 transition ease-in-out duration-150"
							}
						>
							Next
						</button>
					</div>
				</nav>
			</div>
			<div className="hidden sm:block">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col mt-2">
						<div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
							<table className="min-w-full divide-y divide-cool-gray-200">
								<thead>
									<tr>
										<th className="px-6 py-3 bg-cool-gray-50 text-left text-xs leading-4 font-medium text-cool-gray-500 uppercase tracking-wider">
											Subject
										</th>
										<th className="px-6 py-3 bg-cool-gray-50 text-right text-xs leading-4 font-medium text-cool-gray-500 uppercase tracking-wider">
											Date Sent
										</th>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-cool-gray-200">
									{(!data || data.length == 0) && (
										<tr className="bg-white">
											<td className="max-w-0 w-full px-6 py-4 whitespace-no-wrap text-sm leading-5 text-cool-gray-900">
												<p className="text-cool-gray-500 truncate group-hover:text-cool-gray-900 text-base transition ease-in-out duration-150">
													{loadingData
														? "Loading..."
														: "We haven't sent you any member update emails yet."}
												</p>
											</td>
											{/* Spacer so the column header fits (text is hidden) */}
											<td className="px-6 py-4 text-right whitespace-no-wrap text-sm leading-5">
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
														className="bg-white hover:bg-gray-100 cursor-pointer"
														onClick={() =>
															window.open(
																email.long_archive_url +
																	"?e=" +
																	mailchimpID,
																"_blank"
															)
														}
													>
														<td className="max-w-0 w-full px-6 py-4 whitespace-no-wrap text-sm leading-5 text-cool-gray-900">
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
																<p className="text-cool-gray-500 truncate group-hover:text-cool-gray-900 text-base transition ease-in-out duration-150">
																	{
																		email
																			.settings
																			.subject_line
																	}
																</p>
																<p className="text-cool-gray-400 truncate group-hover:text-cool-gray-700 text-sm transition ease-in-out duration-150">
																	{
																		email
																			.settings
																			.preview_text
																	}
																</p>
															</a>
														</td>

														<td className="px-6 py-4 text-right whitespace-no-wrap text-sm leading-5 text-cool-gray-500 hover:text-cool-gray-900 ">
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
							<nav className="bg-white px-4 py-3 flex items-center justify-between border-t border-cool-gray-200 sm:px-6">
								{data && data.length > 0 && (
									<div className="hidden sm:block">
										<p className="text-sm leading-5 text-cool-gray-700">
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
								<div className="flex-1 flex justify-between sm:justify-end">
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
												: "hover:text-cool-gray-500") +
											" relative inline-flex items-center p-2 border border-cool-gray-300 text-sm leading-5 font-medium rounded-md text-cool-gray-700 bg-white focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-cool-gray-100 active:text-cool-gray-700 transition ease-in-out duration-150"
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
												: "hover:text-cool-gray-500") +
											" ml-3 relative inline-flex items-center p-2 border border-cool-gray-300 text-sm leading-5 font-medium rounded-md text-cool-gray-700 bg-white focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-cool-gray-100 active:text-cool-gray-700 transition ease-in-out duration-150"
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
