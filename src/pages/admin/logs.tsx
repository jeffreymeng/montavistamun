import React, { useCallback, useEffect, useState } from "react";
import useRequireLogin from "../../components/accounts/useRequireLogin";
import LogDetailModal from "../../components/admin/logs/LogDetailModal";
import LogItem, { AdminLogItem } from "../../components/admin/logs/LogItem";
import AdminLayout from "../../components/layout/AdminLayout";
import useFirebase from "../../firebase/useFirebase";

export default function AdminLogPage(): React.ReactElement {
	useRequireLogin();

	const firebase = useFirebase();
	const [actions, setActions] = useState<Record<string, any>[]>([]);
	const [canLoadMore, setCanLoadMore] = useState(true);
	const [loadingMore, setLoadingMore] = useState(false);
	const [usersData, setUsersData] = useState<{
		[uid: string]: {
			name: string;
			email: string;
		};
	}>({});
	const [requestedUsers, setRequestedUsers] = useState<string[]>([]);
	const [showDetailModal, setShowDetailModal] = useState(false);
	const [detailModalData, setDetailModalData] = useState<{
		id: string;
		loading: boolean;
		data?: AdminLogItem;
	}>({ loading: true, id: "" });
	const requestUserData = useCallback(
		(uid: string) => {
			if (!firebase) return;
			if (requestedUsers.includes(uid)) return;
			setRequestedUsers((old) => [...old, uid]);
			firebase
				.firestore()
				.collection("users")
				.doc(uid)
				.get()
				.then((snapshot) => {
					const data = snapshot.data();
					setUsersData((old) => {
						return {
							...old,
							[uid]: {
								name:
									data?.firstName || data?.lastName
										? `${data?.firstName || ""}${
												data?.firstName &&
												data?.lastName
													? " "
													: ""
										  }${data?.lastName || ""}`
										: "User " + uid,
								email: data?.email,
							},
						};
					});
				});
		},
		[firebase, requestedUsers]
	);
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
			.limit(16)
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
	useEffect(() => {
		if (!firebase) return;
		const handler = () => {
			const id = window.location.hash?.substring(1) || "";
			if (id) {
				const data = actions.find((a) => a.id == id) || null;
				if (data) {
					setDetailModalData({
						id: id,
						data: data.data,
						loading: false,
					});
					setShowDetailModal(true);
				} else {
					setDetailModalData({
						id: id,
						loading: true,
					});
					setShowDetailModal(true);
					firebase
						.firestore()
						.collection("admin-log")
						.doc(id)
						.get()
						.then((snapshot) => {
							const data = snapshot.data() as AdminLogItem;
							requestUserData(data?.user);
							if (data?.action == "update-user-permissions") {
								requestUserData(data?.target);
							}
							setDetailModalData({
								id: id,
								loading: false,
								data: data,
							});
						});
				}
			} else {
				setShowDetailModal(false);
			}
		};
		window.addEventListener("hashchange", handler);
		handler();
		return () => window.removeEventListener("hashchange", handler);
	}, [firebase, actions]);
	return (
		<AdminLayout title={"Admin Logs"}>
			<h1
				className={
					"text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 mb-6"
				}
			>
				Live Admin Logs
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
							<LogItem
								key={id}
								id={id}
								data={data}
								requestUserData={requestUserData}
								usersData={usersData}
							/>
						))}
						<li>
							<a
								className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
								onClick={() => {
									if (!firebase) return;
									if (loadingMore || !canLoadMore) return;
									setLoadingMore(true);
									firebase
										.firestore()
										.collection("admin-log")
										.orderBy("timestamp", "desc")
										.startAfter(
											actions[actions.length - 1].data
												.timestamp
										)
										.limit(8)
										.get()
										.then((snapshot) => {
											if (
												snapshot
													.docChanges()
													.filter(
														(change) =>
															change.type ===
															"added"
													).length < 8
											) {
												setCanLoadMore(false);
												return;
											}
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
										{!canLoadMore
											? "No more to load"
											: loadingMore
											? "Loading More..."
											: "Load More"}
									</div>
								</div>
							</a>
						</li>
					</ul>
				)}
			</div>
			<LogDetailModal
				show={showDetailModal}
				data={detailModalData}
				usersData={usersData}
			/>
		</AdminLayout>
	);
}
