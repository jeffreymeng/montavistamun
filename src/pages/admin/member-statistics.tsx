import React, { useEffect, useMemo, useState } from "react";
import { Bar as BarChart } from "react-chartjs-2";
import UserData from "../../components/admin/UserData";
import AdminLayout from "../../components/layout/AdminLayout";
import AuthContext from "../../context/AuthContext";
import useFirebase from "../../firebase/useFirebase";
import { getGrade } from "../../utils/schoolYearUtils";

export default function AdminStatsPage(): React.ReactElement {
	const firebase = useFirebase();
	const {
		user,
		loading,
		verified: userVerified,
		admin: userAdmin,
	} = React.useContext(AuthContext);
	const [allUsers, setAllUsers] = useState<{ id: string; data: UserData }[]>(
		[]
	);
	const [allRegistration, setAllRegistration] = useState([]);
	useEffect(() => {
		if (!firebase) return;

		firebase
			.firestore()
			.collection("users")
			.get()
			.then(function (querySnapshot) {
				const temp = [];
				querySnapshot.forEach(function (doc) {
					temp.push({
						id: doc.id,
						data: doc.data(),
					});
				});
				setAllUsers(temp);
			})
			.catch(function (error) {
				console.log("Error getting documents: ", error);
			});
		firebase
			.firestore()
			.collection("registration")
			.get()
			.then(function (querySnapshot) {
				const temp = [];
				querySnapshot.forEach(function (doc) {
					temp.push({
						id: doc.id,
						data: doc.data(),
					});
				});
				setAllRegistration(temp);
			})
			.catch(function (error) {
				console.log("Error getting documents: ", error);
			});
	}, [firebase]);
	const [expanded, setExpanded] = useState(Array(8).fill(false));

	const hasConfirmedConference = (el) =>
		el &&
		(el.data.confirm?.scvmunConfirmed ||
			el.data.confirm?.smuncConfirmed ||
			el.data.confirm?.bmunConfirmed ||
			el.data.confirm?.sfmunConfirmed);
	const chartData = useMemo(
		() => ({
			labels: ["Freshmen", "Sophomores", "Juniors", "Seniors"],
			datasets: [
				{
					label: "No Conferences",
					data: [9, 10, 11, 12].map(
						(grade) =>
							allUsers.filter(
								(el) =>
									getGrade(el.data.classOf) == grade &&
									!hasConfirmedConference(
										allRegistration.find(
											(reg) => reg.id == el.id
										)
									)
							).length
					),
					backgroundColor: "rgb(75, 192, 192)",
				},
				{
					label: "One Or More Conferences",
					data: [9, 10, 11, 12].map(
						(grade) =>
							allUsers.filter(
								(el) =>
									getGrade(el.data.classOf) == grade &&
									hasConfirmedConference(
										allRegistration.find(
											(reg) => reg.id == el.id
										)
									)
							).length
					),
					backgroundColor: "rgb(54, 162, 235)",
				},
			],
		}),
		[allUsers, allRegistration]
	);
	return (
		<AdminLayout title={"Admin Dashboard"}>
			<h1
				className={
					"text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 mb-6"
				}
			>
				Member Statistics
			</h1>
			<BarChart
				data={chartData}
				options={{
					tooltips: { yAlign: "bottom" },
					scales: {
						yAxes: [
							{
								stacked: true,
								ticks: {
									suggestedMax:
										// take 5 more than the highest value, and round up to nearest 10
										Math.ceil(
											([9, 10, 11, 12].reduce(
												(maxVal, grade) => {
													const numInGrade = allUsers.filter(
														(el) =>
															getGrade(
																el.data.classOf
															) == grade
													).length;
													if (numInGrade > maxVal) {
														return numInGrade;
													}
													return maxVal;
												},
												0
											) +
												5) /
												10
										) * 10,
									beginAtZero: true,
								},
							},
						],
						xAxes: [
							{
								stacked: true,
							},
						],
					},
				}}
			/>
			{/*<p className={"text-gray-700 mt-1"}>*/}
			{/*	{*/}
			{/*		<button*/}
			{/*			className="link active:outline-none focus:outline-none"*/}
			{/*			onClick={() => {*/}
			{/*				setExpanded(*/}
			{/*					new Array(expanded.length).fill(*/}
			{/*						!expanded.every((e) => e)*/}
			{/*					)*/}
			{/*				);*/}
			{/*			}}*/}
			{/*		>*/}
			{/*			/!* Allow user to show all steps unless every step with users is already shown *!/*/}
			{/*			{expanded.every((e) => e)*/}
			{/*				? "Collapse All Steps"*/}
			{/*				: "Expand All Steps"}*/}
			{/*		</button>*/}
			{/*	}*/}
			{/*</p>*/}
			{allUsers.length == 0 || allRegistration.length == 0 ? (
				<p>Loading...</p>
			) : (
				<>
					<ul className={"mb-4"}>
						{[
							[9, "freshmen"],
							[10, "sophomores"],
							[11, "juniors"],
							[12, "seniors"],
						].map(([grade, gradeWord], i) => (
							<li key={grade}>
								{
									allUsers.filter(
										(el) =>
											getGrade(el.data.classOf) == grade
									).length
								}{" "}
								{gradeWord} with accounts (
								<a
									className={"link"}
									onClick={() =>
										setExpanded((old) => {
											const newArr = old.slice();
											newArr[i] = !newArr[i];
											return newArr;
										})
									}
								>
									{!expanded[i] ? "show" : "hide"}
								</a>
								)
								{expanded[i] && (
									<ul className={"list-disc ml-5"}>
										{allUsers
											.filter(
												(el) =>
													getGrade(el.data.classOf) ==
													grade
											)
											.sort((a, b) =>
												a.data.lastName.localeCompare(
													b.data.lastName
												)
											)
											.map((u) => (
												<li key={u.id}>
													{u.data.firstName}{" "}
													{u.data.lastName}
												</li>
											))}
									</ul>
								)}
							</li>
						))}
					</ul>
					<ul>
						{[
							[9, "freshmen"],
							[10, "sophomores"],
							[11, "juniors"],
							[12, "seniors"],
						].map(([grade, gradeWord], i) => (
							<li key={grade}>
								{
									allUsers.filter(
										(el) =>
											getGrade(el.data.classOf) ==
												grade &&
											hasConfirmedConference(
												allRegistration.find(
													(reg) => reg.id == el.id
												)
											)
									).length
								}{" "}
								{gradeWord} with 1+ registrations (
								<a
									className={"link"}
									onClick={() =>
										setExpanded((old) => {
											const newArr = old.slice();
											newArr[i + 4] = !newArr[i + 4];
											return newArr;
										})
									}
								>
									{!expanded[i + 4] ? "show" : "hide"}
								</a>
								)
								{expanded[i + 4] && (
									<ul className={"list-disc ml-5"}>
										{allUsers
											.filter(
												(el) =>
													getGrade(el.data.classOf) ==
														grade &&
													hasConfirmedConference(
														allRegistration.find(
															(reg) =>
																reg.id == el.id
														)
													)
											)
											.sort((a, b) =>
												a.data.lastName.localeCompare(
													b.data.lastName
												)
											)
											.map((u) => (
												<li key={u.id}>
													{u.data.firstName}{" "}
													{u.data.lastName} (
													{Object.keys(
														allRegistration.find(
															(reg) =>
																reg.id == u.id
														)?.data.confirm || {}
													)
														.map((name) =>
															name
																.replace(
																	"Confirmed",
																	""
																)
																.toUpperCase()
														)
														.sort()
														.join(", ")}
													)
												</li>
											))}
									</ul>
								)}
							</li>
						))}
					</ul>
				</>
			)}
		</AdminLayout>
	);
}
