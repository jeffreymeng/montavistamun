import type firebaseType from "firebase";
import { graphql, useStaticQuery } from "gatsby";
import React, { ReactElement } from "react";
import Header from "../components/Header";
import HorizontalCard from "../components/HorizontalCard";
import { Layout, Main } from "../components/layout";
export interface ConferenceAwardsData {
	name: string;
	month: string;
	year: number;
	time: firebaseType.firestore.Timestamp;
	delegationAward: string | null;
	delegateAwards: {
		type:
			| "Best Delegate"
			| "Outstanding"
			| "Honorable"
			| "Verbal"
			| "Research";
		awards: string[];
	}[];
	imageURL?: string;
}

export default function AwardsPage(): React.ReactElement {
	const {
		awardsData: { nodes: awardsData },
		headerImage,
	} = useStaticQuery<GatsbyTypes.awardsPageQueryQuery>(graphql`
		query awardsPageQuery {
			headerImage: file(relativePath: { eq: "headers/awards.jpg" }) {
				childImageSharp {
					fluid(maxWidth: 1200, quality: 90) {
						...GatsbyImageSharpFluid_withWebp
					}
				}
			}
			awardsData: allConferenceAwardsData(
				sort: { fields: time, order: DESC }
			) {
				nodes {
					delegateAwards {
						awards
						type
					}
					delegationAward
					id
					month
					name
					time
					year
					imageURL
				}
			}
		}
	`);

	// const highlightTitle = "SMUNC 2019";
	const highlightIndex = -1; // Set to -1 to not highlight any conference
	// if (highlightTitle) {
	// 	highlightIndex = awardsData.findIndex((p) => p.name == highlightTitle);
	// }

	// SMUNC XXIX data
	const smuncData: ConferenceAwardsData = {
		name: "SMUNC XXIX",
		month: "November",
		year: 2025,
		time: null as any,
		delegationAward: null,
		delegateAwards: [
			{
				type: "Honorable",
				awards: [
					"Parth Samdadiya [WHO]",
					"Shreya Rao [FAO]",
					"Sophie Xu [FAO]",
					"Leo Wang [FAO]",
					"Harly Liu [WHO]"
				]
			},
			{
				type: "Verbal",
				awards: ["Hruday Mulky [IUCN]"]
			},
			{
				type: "Research",
				awards: ["Yashavi Sehgal [WHO]"]
			}
		]
	};

	return (
		<Layout title={"Awards"} className={"bg-gray-50"}>
			<Header title={"Awards"} backgroundImage={headerImage}>
				{""}
			</Header>
			<Main wide>
				<SpotlightConference data={smuncData} />
				{highlightIndex >= 0 && <SpotlightConference data={awardsData[highlightIndex]} />}
				<div className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
					{awardsData
						.filter((e, i) => highlightIndex < 0 || i !== highlightIndex)
						.map((conf) => {
							const { imageURL, name, ...props } = conf;
							return (
								<ConferenceAwardCard
									key={name}
									name={name}
									imageURL={
										imageURL ||
										"https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80"
									}
									{...props}
								/>
							);
						})}
				</div>
			</Main>
		</Layout>
	);
}
export function SpotlightConference({
	data,
}: {
	data: ConferenceAwardsData;
}): ReactElement {
	console.log(data);
	return (
		<div className="max-w-full my-10 mx-auto">
			<div className="md:flex bg-white rounded-lg shadow-lg overflow-hidden">
				<div className="h-48 md:h-auto md:w-96 flex-shrink-0">
					<img
						className="w-full h-full object-cover"
						alt="Conference Image"
						src={
							data.imageURL ||
							"https://images.unsplash.com/photo-1561137260-bf428bc5e6a5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&h=800&q=80"
						}
					/>
				</div>
				<div className="p-6 flex-1">
					<p className="text-lg md:text-xl lg:text-2xl text-gray-600 font-semibold">
						{data.month + " " + data.year}
					</p>
					<h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
						{data.name}
					</h2>
					<div className="text-gray-700">
						{data.delegationAward && (
							<p className="text-lg md:text-xl lg:text-2xl text-indigo-600 font-bold italic pb-3">
								{data.delegationAward}
							</p>
						)}
						{data.delegateAwards
							.sort((a, b) => {
								const awards = [
									"Best Delegate",
									"Outstanding",
									"Honorable",
									"Verbal",
									"Research",
								];
								return awards.indexOf(a.type) - awards.indexOf(b.type);
							})
							.map((group) => (
								<div key={group.type}>
									<h3
										className={
											"pt-2 " +
											(group.type === "Best Delegate"
												? "text-lg md:text-xl lg:text-2xl"
												: "")
										}
									>
										<b>
											{
												{
													"Best Delegate": "Best Delegate",
													Outstanding: "Outstanding Delegate",
													Honorable: "Honorable Mention",
													Verbal: "Verbal Commendation",
													Research: "Research Award",
												}[
													group.type as
														| "Best Delegate"
														| "Outstanding"
														| "Honorable"
														| "Verbal"
														| "Research"
												]
											}
										</b>
									</h3>
									<ul className="list-none">
										{group.awards.map((delegate) => (
											<li key={delegate}>{delegate}</li>
										))}
									</ul>
								</div>
							))}
					</div>
				</div>
			</div>
		</div>
	);
}
export function ConferenceAwardCard({
	month,
	year,
	name,
	delegationAward,
	delegateAwards,
}: ConferenceAwardsData): ReactElement {
	return (
		<div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
			<div className="flex-1 bg-white p-6 flex flex-col justify-between">
				<div className="flex-1">
					<p className="text-sm leading-5 font-medium text-indigo-600">
						{month + " " + year}
					</p>
					<h3 className="mt-2 text-xl leading-7 font-semibold text-gray-900">
						{name}
					</h3>
					<div className="mt-3 text-base leading-6 text-gray-500">
						{delegationAward && (
							<p
								className={
									"text-lg text-indigo-600 font-bold italic pb-3"
								}
							>
								{delegationAward}
							</p>
						)}
						{delegateAwards
							.sort((a, b) => {
								const awards = [
									"Best Delegate",
									"Outstanding",
									"Honorable",
									"Verbal",
									"Research",
								];

								return (
									awards.indexOf(a.type) -
									awards.indexOf(b.type)
								);
							})
							.map((group) => (
								<div key={group.type}>
									<h3
										className={
											"pt-2 " +
											(group.type === "Best Delegate"
												? "text-lg"
												: "")
										}
									>
										<b>
											{
												{
													"Best Delegate":
														"Best Delegate",
													Outstanding:
														"Outstanding Delegate",
													Honorable:
														"Honorable Mention",
													Verbal:
														"Verbal Commendation",
													Research: "Research Award",
												}[
													group.type as
														| "Best Delegate"
														| "Outstanding"
														| "Honorable"
														| "Verbal"
														| "Research"
												]
											}
										</b>
									</h3>
									<ul className={"list-none"}>
										{group.awards.map((delegate) => (
											<li
												key={delegate}
												className={
													group.type ===
													"Best Delegate"
														? "text-lg"
														: ""
												}
											>
												{delegate}
											</li>
										))}
									</ul>
								</div>
							))}
					</div>
				</div>
			</div>
		</div>
	);
}
