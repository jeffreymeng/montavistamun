import * as Icons from "heroicons-react";
import React, { useState } from "react";
import useFirebase from "../../auth/useFirebase";
import AdminLayout from "../../components/layout/AdminLayout";
import AuthContext from "../../context/AuthContext";
export default function AboutPage(): React.ReactElement {
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
	return (
		<AdminLayout title={"Dashboard Management"}>
			<h1
				className={
					"text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 mb-6"
				}
			>
				Edit Member Dashboard Cards (not functional)
			</h1>
			{/* TODO: figure out if this is a good idea. Are meetings going to be based on a schedule (e.g. every wednesday)?
			TODO should we just have a list of times for the meetings, and just display the next one? (this seems like a good idea)
			TODO Should cards be conditionally displayed based on conference registration? (currently it says "register now" vs "update registration" */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{/* Card */}

					{[
						{
							title: "Next Member Meeting",
							subtitle: "August 18, 3:30 PM",
							primaryAction: {
								title: "Join via Zoom",
								link: "https://google.com",
							},
							secondaryAction: {
								title: "View All Events",
								link: "/calendar",
							},
							icon: "UserGroup",
						},
						{
							title: "Upcoming Conference",
							subtitle:
								"Berkeley Model United Nations Conference (BMUN)",
							primaryAction: {
								title: "Update Registration",
								link: "/conferences/bmun/register",
							},
							secondaryAction: {
								title: "Learn More",
								link: "/conferences/bmun",
							},
							icon: "Calendar",
						},
						{
							title: "Upcoming Conference",
							subtitle:
								"Santa Clara Valley Model United Nations (SCVMUN)",
							primaryAction: {
								title: "Update Registration",
								link: "/conferences/scvmun/register",
							},
							secondaryAction: {
								title: "Learn More",
								link: "/conferences/scvmun",
							},
							icon: "Calendar",
						},
					].map((card) => (
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
												<input
													className={
														"h-full w-full border border-gray-400 p-2 focus:border-blue-400 rounded-md"
													}
													value={card.title}
												/>
											</dt>
											<dd>
												<div className="text-lg leading-7 font-medium text-cool-gray-900">
													<textarea
														className={
															"h-full w-full mt-2 border border-gray-400 p-2 focus:border-blue-400 rounded-md resize-none"
														}
													>
														{card.subtitle}
													</textarea>
												</div>
											</dd>
										</dl>
									</div>
								</div>
							</div>
							<div className="bg-cool-gray-50 px-5 py-3">
								<div className="text-sm leading-5 flex justify-between">
									<input
										className={
											"font-medium text-teal-600 hover:text-teal-900 transition ease-in-out duration-150 h-full w-1/2 mt-2 border border-gray-400 p-2 focus:border-blue-400 rounded-md m-2"
										}
										value={card.primaryAction.title}
									/>

									<input
										className={
											"font-medium text-gray-500 hover:text-gray-900 transition ease-in-out duration-150 h-full w-1/2 mt-2 border border-gray-400 p-2 focus:border-blue-400 rounded-md m-2"
										}
										value={card.secondaryAction.title}
									/>
								</div>
								<div className="text-sm leading-5 flex justify-between">
									<input
										className={
											"font-medium text-xs text-teal-600 hover:text-teal-900 transition ease-in-out duration-150 h-full w-1/2 mt-2 border border-gray-400 p-2 focus:border-blue-400 rounded-md m-2"
										}
										value={card.primaryAction.link}
									/>

									<input
										className={
											"font-medium text-xs text-gray-500 hover:text-gray-900 transition ease-in-out duration-150 h-full w-1/2 mt-2 border border-gray-400 p-2 focus:border-blue-400 rounded-md m-2"
										}
										value={card.secondaryAction.link}
									/>
								</div>
								<div className="text-sm leading-5 flex justify-between">
									{card.primaryAction && (
										<a
											href={card.primaryAction.link}
											target={"_blank"}
											rel={"noopener noreferrer"}
											className={
												"font-medium text-teal-600 hover:text-teal-900 transition ease-in-out duration-150"
											}
										>
											Test Primary
										</a>
									)}
									{card.secondaryAction && (
										<a
											href={card.secondaryAction.link}
											target={"_blank"}
											rel={"noopener noreferrer"}
											className={
												"font-medium text-gray-500 hover:text-gray-900 transition ease-in-out duration-150"
											}
										>
											Test Secondary
										</a>
									)}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</AdminLayout>
	);
}
