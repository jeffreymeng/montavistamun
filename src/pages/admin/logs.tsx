import type firebaseType from "firebase";
import moment from "moment";
import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import AuthContext from "../../context/AuthContext";
import useFirebase from "../../firebase/useFirebase";

const actionNameMap: Record<string, string> = {
	"update-user-permissions": "updated a user",
	"create-award": "created an award",
	"update-award": "updated an award",
};

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
	const [actions, setActions] = useState<Record<string, any>[]>([]);
	const [names, setNames] = useState<Record<string, string>>({});
	const [loadingMore, setLoadingMore] = useState(false);
	useEffect(() => {
		if (!firebase) return;
		const newNames: Record<string, string> = {};
		firebase
			.firestore()
			.collection("users")
			.get()
			.then((snapshot) => {
				snapshot.docs.forEach((docSnapshot) => {
					const data = docSnapshot.data();
					newNames[docSnapshot.id] =
						(data.firstName || "Unknown First Name") +
						" " +
						(data.lastName || "Unknown Last Name");
				});
			});
		setNames(newNames);
	}, [firebase]);
	useEffect(() => {
		if (!firebase) return;
		// fetch the most recent 20 and listen for new documents
		const newActionListener = firebase
			.firestore()
			.collection("admin-log")
			.orderBy("timestamp", "asc")
			.startAfter(firebase.firestore.Timestamp.now())
			.onSnapshot((snapshot) => {
				setActions((oldActions) => [
					...snapshot
						.docChanges()
						.filter((change) => change.type === "added")
						.map((change) => ({
							id: change.doc.id,
							data: change.doc.data(),
						})),
					...oldActions,
				]);
			});

		return () => newActionListener();
	}, [firebase]);
	useEffect(() => {
		if (!firebase) return;
		if (actions.length > 0) return;
		firebase
			.firestore()
			.collection("admin-log")
			.orderBy("timestamp", "desc")
			.limit(12)
			.get()
			.then((snapshot) => {
				setActions((oldActions) => [
					...oldActions,
					...snapshot
						.docChanges()
						.filter((change) => change.type === "added")
						.map((change) => ({
							id: change.doc.id,
							data: change.doc.data(),
						})),
				]);
			});
	}, [firebase]);
	console.log(actions);
	return (
		<AdminLayout title={"Admin Logs"}>
			<h1
				className={
					"text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 mb-6"
				}
			>
				Admin Logs
			</h1>
			<div className="bg-white shadow overflow-hidden sm:rounded-md">
				{actions.length === 0 ? (
					<ul>
						<li>
							<div className="px-4 py-4 flex items-center sm:px-6">
								<div className="text-md leading-5 font-medium truncate">
									Loading...
								</div>
							</div>
						</li>
					</ul>
				) : (
					<ul>
						{actions.map(({ id, data }) => (
							<li key={id}>
								<a
									href="/"
									className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
								>
									<div className="px-4 py-4 flex items-center sm:px-6">
										<div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
											<div>
												<div className="text-sm leading-5 font-medium truncate">
													{names[data.user]}{" "}
													{actionNameMap[data.action]
														? actionNameMap[
																data.action
														  ]
														: data.action}
												</div>
											</div>
											<div className="mt-4 flex-shrink-0 sm:mt-0">
												<div className="mt-2 flex">
													<div className="flex items-center text-sm leading-5 text-gray-500">
														{/* Heroicon name: calendar */}
														<svg
															className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
															viewBox="0 0 20 20"
															fill="currentColor"
														>
															<path
																fillRule="evenodd"
																d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
																clipRule="evenodd"
															/>
														</svg>
														<span>
															<time dateTime="2020-01-07">
																{moment(
																	(data.timestamp as firebaseType.firestore.Timestamp).toDate()
																).format(
																	"M/D/YY h:mm:ss A"
																)}
															</time>
														</span>
													</div>
												</div>
											</div>
										</div>
									</div>
								</a>
							</li>
						))}
						<li>
							<a
								className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
								onClick={() => {
									if (!firebase) return;
									if (loadingMore) return;
									setLoadingMore(true);
									firebase
										.firestore()
										.collection("admin-log")
										.orderBy("timestamp", "desc")
										.startAfter(
											actions[actions.length - 1].data
												.timestamp
										)
										.limit(6)
										.get()
										.then((snapshot) => {
											setActions((oldActions) => [
												...oldActions,
												...snapshot
													.docChanges()
													.filter(
														(change) =>
															change.type ===
															"added"
													)
													.map((change) => ({
														id: change.doc.id,
														data: change.doc.data(),
													})),
											]);
											setLoadingMore(false);
										});
								}}
							>
								<div className="px-4 py-4 flex items-center sm:px-6">
									<div className="text-md leading-5 font-medium truncate">
										{loadingMore
											? "Loading More..."
											: "Load More"}
									</div>
								</div>
							</a>
						</li>
					</ul>
				)}
			</div>
		</AdminLayout>
	);
}
