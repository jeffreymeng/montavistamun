import firebaseType from "firebase";
import moment from "moment";
import React from "react";
import Transition from "../../Transition";
import { AdminLogItem, getLogItemText } from "./LogItem";

export default function LogDetailModal({
	show,
	data: { id, data, loading },
	usersData,
}: {
	show: boolean;
	data: {
		id: string;
		data?: AdminLogItem;
		loading: boolean;
	};
	usersData: {
		[uid: string]: {
			email: string;
			name: string;
		};
	};
}) {
	let updates = <p>Loading...</p>;
	if (data?.action) {
		switch (data.action) {
			case "update-user-permissions": {
				if (
					data.newData?.verified === data.oldData?.verified &&
					data.newData?.admin === data.oldData?.admin
				) {
					// No actual updates were made
					updates = (
						<p>
							No effective changes were made during this log item.
							This can happen when, for example, an admin verifies
							a user that was already verified.
						</p>
					);
				}
				const permissionUpdates = [];
				if (data.newData?.verified !== data.oldData?.verified) {
					permissionUpdates.push(
						<li key={"verified"}>
							{!data.newData?.verified
								? "Unverified"
								: "Verified"}{" "}
							{usersData[data.target]?.name} (
							{usersData[data.target]?.email})
						</li>
					);
				}
				if (data.newData?.admin !== data.oldData?.admin) {
					permissionUpdates.push(
						<li key={"admin"}>
							{!data.newData?.admin ? "Demoted" : "Promoted"}{" "}
							{usersData[data.target]?.name} (
							{usersData[data.target]?.email}){" "}
							{data.newData?.verified ? "from" : "to"}{" "}
							administrator.
						</li>
					);
				}
				updates = <ul>{permissionUpdates}</ul>;
				break;
			}
			case "update-award": {
				updates = (
					<ul>
						{(data.previousData.name || "") !==
							(data.newData.name || "") && (
							<li className={"mt-1"}>
								<b>Name:</b> {data.previousData.name}{" "}
								<b>changed to</b> {data.newData.name}
							</li>
						)}
						{(data.previousData.delegationAward || "") !=
							(data.newData.delegationAward || "") && (
							<li className={"mt-1"}>
								<b>Delegation Award:</b>{" "}
								{data.previousData.delegationAward || "<empty>"}{" "}
								<b>changed to</b>{" "}
								{data.newData.delegationAward || "<empty>"}
							</li>
						)}
						{(data.previousData.imageURL || "") !=
							(data.newData.imageURL || "") && (
							<li className={"mt-1"}>
								<b>Image URL:</b>{" "}
								{data.previousData.imageURL || "<empty>"}{" "}
								<b>changed to</b>{" "}
								{data.newData.imageURL || "<empty>"}
							</li>
						)}
						{((data.previousData.month || "") !==
							(data.newData.month || "") ||
							(data.previousData.year || "") !==
								(data.newData.year || "")) && (
							<li className={"mt-1"}>
								<b>Time:</b> {data.previousData.month}{" "}
								{data.previousData.year} <b>changed to</b>{" "}
								{data.newData.month} {data.newData.year}
							</li>
						)}
						{data.newData.delegateAwards
							.filter(
								(award, i) =>
									data.previousData.delegateAwards[
										i
									].awards.some(
										(a, j) =>
											!data.newData.delegateAwards[
												i
											].awards[j].includes(a)
									) ||
									award.awards.some(
										(a, j) =>
											!data.previousData.delegateAwards[
												i
											].awards[j].includes(a)
									)
							)
							.map((award, i) => (
								<li key={i} className={"mt-1"}>
									<b>
										{[
											"Best Delegate",
											"Outstanding",
											"Honorable",
											"Verbal",
											"Research",
										].find(
											(a) => a.indexOf(award.type) > -1
										)}
										:
									</b>
									<ul className={"list-disc ml-5"}>
										{data.previousData.delegateAwards[
											i
										].awards
											.filter(
												(a, j) =>
													!data.newData.delegateAwards[
														i
													]?.awards[j]?.includes(a)
											)
											.map((a, j) => (
												<li key={j}>
													<b>Removed</b> {a}
												</li>
											))}
									</ul>
									<ul className={"list-disc ml-5"}>
										{award.awards
											.filter(
												(a, j) =>
													!data.previousData.delegateAwards[
														i
													]?.awards[j]?.includes(a)
											)
											.map((a, j) => (
												<li key={j}>
													<b>Added</b> {a}
												</li>
											))}
									</ul>
								</li>
							))}
					</ul>
				);
				break;
			}
			case "create-award": {
				updates = (
					<ul>
						<li className={"mt-1"}>
							<b>Name:</b> {data.newData.name}
						</li>
						<li className={"mt-1"}>
							<b>Delegation Award:</b>{" "}
							{data.newData.delegationAward}
						</li>
						<li className={"mt-1"}>
							<b>Image URL:</b> {data.newData.imageURL}
						</li>
						<li className={"mt-1"}>
							<b>Time:</b> {data.newData.month}{" "}
							{data.newData.year}
						</li>
						{data.newData.delegateAwards.map((award, i) => (
							<li key={i} className={"mt-1"}>
								<b>
									{[
										"Best Delegate",
										"Outstanding",
										"Honorable",
										"Verbal",
										"Research",
									].find((a) => a.indexOf(award.type) > -1)}
									:
								</b>
								<ul className={"list-disc ml-5"}>
									{award.awards.map((a, j) => (
										<li key={j}>{a}</li>
									))}
								</ul>
							</li>
						))}
					</ul>
				);
				break;
			}
			default: {
				updates = (
					<>
						<p>
							Unknown action {(data as any).action} by user{" "}
							{(data as any).user}.
						</p>
					</>
				);
			}
		}
	}
	return (
		<Transition show={show}>
			<div className="fixed z-10 inset-0 overflow-y-auto mt-16">
				<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
					<Transition
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 transition-opacity">
							<div className="absolute inset-0 bg-gray-500 opacity-75"></div>
						</div>
					</Transition>
					{/* This element is to trick the browser into centering the modal contents. */}
					<span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
					&#8203;
					<Transition
						enter="ease-out duration-300"
						enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						enterTo="opacity-100 translate-y-0 sm:scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 translate-y-0 sm:scale-100"
						leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					>
						<div
							className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
							role="dialog"
							aria-modal="true"
							aria-labelledby="modal-headline"
						>
							<div className="sm:flex sm:items-start">
								<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
									<h3
										className="text-lg leading-6 font-medium text-gray-900"
										id="modal-headline"
									>
										{loading || !data
											? `Loading log item ${id}...`
											: getLogItemText(data, usersData)}
									</h3>
									<div className={"mt-2"}>
										<p>
											<b>Log Item ID: </b> {id}
										</p>
										<p>
											<b>Author: </b>{" "}
											{usersData[data?.user || ""]
												?.name || "Loading..."}{" "}
											(
											{usersData[data?.user || ""]
												?.email || "Loading..."}
											)
										</p>
										<p>
											<b>Time: </b>{" "}
											{!data?.timestamp
												? "Loading..."
												: moment(
														(data.timestamp as firebaseType.firestore.Timestamp).toDate()
												  ).format(
														"M/D/YY h:mm:ss A"
												  )}{" "}
											(converted to your local time zone).
										</p>
									</div>
									<div className="mt-2">{updates}</div>
								</div>
							</div>
							<div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
								<span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
									<button
										onClick={() => {
											window.location.hash = "#";
										}}
										type="button"
										className={
											"bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue" +
											" inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm transition ease-in-out duration-150 sm:text-sm sm:leading-5"
										}
									>
										Close
									</button>
								</span>
							</div>
						</div>
					</Transition>
				</div>
			</div>
		</Transition>
	);
}
