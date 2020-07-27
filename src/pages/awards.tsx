import React from "react";
import awardsData, {
	ConferenceAwardData,
} from "../components/awards/awardsData";
import FluidImage from "../components/FluidImage";
import Header from "../components/Header";
import HorizontalCard from "../components/HorizontalCard";
import { Layout } from "../components/layout";
import Main from "../components/Main";

export default function AboutPage({
	data,
}: {
	data: {
		smunc: FluidImage;
		gmunc: FluidImage;
	};
}): React.ReactElement {
	return (
		<Layout title={"Awards"}>
			<Header
				title={"Awards"}
				backgroundImage={
					"https://previews.123rf.com/images/annagolant/annagolant1612/annagolant161200049/70849730-orange-stripes-on-white-background-striped-diagonal-pattern-blue-diagonal-lines-background-winter-or.jpg"
				}
			>
				Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
				lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
				fugiat aliqua.
			</Header>
			<Main wide>
				<HorizontalCard
					imageURL={
						"https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80"
					}
					large
					title={awardsData[0].name}
					subtitle={awardsData[0].time}
				>
					{awardsData[0].delegationAward && (
						<p
							className={
								"text-lg md:text-xl lg:text-2xl text-indigo-600 font-bold italic pb-3"
							}
						>
							{awardsData[0].delegationAward}
						</p>
					)}
					{awardsData[0].delegateAwards.map((group) => (
						<div key={group.type}>
							<h3
								className={
									"pt-2" +
									(group.type === "Best Delegate"
										? "text-lg md:text-xl lg:text-2xl"
										: "")
								}
							>
								<b>{group.type}</b>
							</h3>
							<ul className={"list-disc ml-5"}>
								{group.awards.map((delegate) => (
									<li key={delegate}>{delegate}</li>
								))}
							</ul>
						</div>
					))}
				</HorizontalCard>
				<div className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
					{awardsData.slice(1).map((conf) => {
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

function ConferenceAwardCard({
	imageURL,
	time,
	name,
	delegationAward,
	delegateAwards,
}: ConferenceAwardData) {
	return (
		<div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
			<div className="flex-shrink-0">
				<img
					className="h-48 w-full object-cover"
					src={imageURL}
					alt=""
				/>
			</div>
			<div className="flex-1 bg-white p-6 flex flex-col justify-between">
				<div className="flex-1">
					<p className="text-sm leading-5 font-medium text-indigo-600">
						{time}
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
						{delegateAwards.map((group) => (
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
												Honorable: "Honorable Mention",
												Verbal: "Verbal Commendation",
												Research: "Resarch Award",
											}[group.type]
										}
									</b>
								</h3>
								<ul className={"list-disc ml-5"}>
									{group.awards.map((delegate) => (
										<li
											key={delegate}
											className={
												group.type === "Best Delegate"
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
