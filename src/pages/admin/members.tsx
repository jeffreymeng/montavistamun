import axios from "axios";
import firebaseType from "firebase";
import * as Icons from "heroicons-react";
import React from "react";
import useFirebase from "../../auth/useFirebase";
import AdminLayout from "../../components/layout/AdminLayout";
import Transition from "../../components/Transition";
import AuthContext from "../../context/AuthContext";
import { getGrade } from "../../utils/schoolYearUtils";
interface UserData {
	classOf: number;
	email: string;
	firstName: string;
	lastName: string;
	grade: {
		grade: number;
		asOf: firebaseType.firestore.Timestamp;
	};

	admin?: boolean;
	verified?: boolean;
}
function SelectAllCheckbox({
	selectedUsers,
	setSelectedUsers,
	setLastActionID,
	users,
	setUsers,
}: {
	selectedUsers: Set<string>;
	setSelectedUsers: React.Dispatch<Set<string>>;
	setLastActionID: React.Dispatch<string>;
	users: {
		id: string;
		data: UserData;
	}[];
	setUsers: React.Dispatch<
		{
			id: string;
			data: UserData;
		}[]
	>;
}) {
	const [selectAllDropdownOpen, setSelectAllDropdownOpen] = React.useState(
		false
	);
	const [emails, setEmails] = React.useState("");
	const [errors, setErrors] = React.useState<[string, string][]>([]);
	const parsedEmails = emails
		.split(",")
		.flatMap((e) => e.split("\n"))
		.map((e) => e.trim())
		.filter((e) => e);
	const [listModalOpen, setListModalOpen] = React.useState(false);
	const selectDropdownRef = React.useRef(null);

	React.useEffect(() => {
		// https://stackoverflow.com/a/42234988, https://stackoverflow.com/a/43851475
		const handleClickOutside = (e: Event) => {
			if (
				selectDropdownRef.current &&
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				!selectDropdownRef.current?.contains(e.target as Node)
			) {
				setSelectAllDropdownOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, [selectDropdownRef]);

	const allUsers = users.map((u) => u.id);

	return (
		<span className="z-0 inline-flex shadow-sm rounded-md">
			<button
				type="button"
				className="inline-flex items-center px-2 py-1 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
				onClick={() =>
					selectedUsers.size > 0
						? setSelectedUsers(new Set())
						: setSelectedUsers(new Set(allUsers))
				}
			>
				<input
					type="checkbox"
					className={
						"form-checkbox h-6 w-6 " +
						(selectedUsers.size > 0 &&
						selectedUsers.size < users.length
							? "indeterminate"
							: "")
					}
					checked={selectedUsers.size > 0}
					onChange={() => {
						if (selectedUsers.size > 0) {
							setSelectedUsers(new Set());
						} else {
							setSelectedUsers(new Set(allUsers));
						}
						setLastActionID("");
					}}
				/>
			</button>
			<span className="-ml-px block" ref={selectDropdownRef}>
				<button
					type="button"
					className="inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150 h-full"
					aria-label="Expand"
					onClick={() => setSelectAllDropdownOpen((old) => !old)}
				>
					<Icons.ChevronDown className="h-5 w-5" />
				</button>
				<Transition
					show={selectAllDropdownOpen}
					enter="transition ease-out duration-100"
					enterFrom="transform opacity-0 scale-95"
					enterTo="transform opacity-100 scale-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95"
				>
					<div className="origin-top-right absolute left-0 mt-2 -mr-1 w-56 rounded-md shadow-lg normal-case tracking-normal">
						<div className="rounded-md bg-white shadow-xs">
							<div className="px-4 pt-3 pb-1">
								<p className="text-xs leading-5">
									Select users that are
								</p>
							</div>
							<div className="py-1">
								{[
									{
										name: "Admin",
										onClick: () =>
											setSelectedUsers(
												new Set(
													users
														.map((user) =>
															user.data.admin
																? user.id
																: ""
														)
														.filter((user) => user)
												)
											),
									},
									{
										name: "Verified",
										onClick: () =>
											setSelectedUsers(
												new Set(
													users
														.map((user) =>
															user.data.verified
																? user.id
																: ""
														)
														.filter((user) => user)
												)
											),
									},
									{
										name: "In a List",
										onClick: () => setListModalOpen(true),
									},
								].map((btn) => (
									<button
										key={btn.name}
										className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900 w-full text-left"
										onClick={btn.onClick}
									>
										{btn.name}
									</button>
								))}
							</div>
						</div>
					</div>
				</Transition>
			</span>
			<Transition show={listModalOpen}>
				<div className="fixed bottom-0 inset-x-0 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center normal-case tracking-normal">
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

					<Transition
						enter="ease-out duration-300"
						enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						enterTo="opacity-100 translate-y-0 sm:scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 translate-y-0 sm:scale-100"
						leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					>
						<div
							className="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full sm:p-6"
							role="dialog"
							aria-modal="true"
							aria-labelledby="modal-headline"
						>
							<div>
								<div className="mt-3 text-center sm:mt-5">
									<h3
										className="text-lg leading-6 font-medium text-gray-900"
										id="modal-headline"
									>
										Select All In a List
									</h3>
									<div className="mt-2">
										<p className="text-sm leading-5 text-gray-500">
											Enter a list of emails delimited by
											commas and/or line breaks.
										</p>
									</div>
									<div className="mt-2">
										<textarea
											value={emails}
											onChange={(e) =>
												setEmails(e.target.value)
											}
											placeholder={
												"Type or paste some emails here..."
											}
											className={
												"form-textarea w-full resize-none h-64"
											}
										/>
									</div>
									{errors.length > 0 && (
										<div className="mt-4">
											<p className="text-sm leading-5 text-red-500 font-bold">
												No users were selected because
												of the following error
												{errors.length != 1 && "s"}
											</p>
											<ul
												className={
													"list-disc mx-9 text-base text-left my-2"
												}
											>
												{errors.map(
													([email, reason]) => (
														<li key={email}>
															<b>{email}</b>
															{reason == "invalid"
																? " is not a valid email address."
																: " is not the email address of a user."}
														</li>
													)
												)}
											</ul>
											Either fix their emails or{" "}
											<button
												className="link"
												onClick={() => {
													setEmails((current) => {
														const parsed = current
															.split(",")
															.flatMap((e) =>
																e.split("\n")
															)
															.map((e) =>
																e.trim()
															)
															.filter((e) => e);
														setErrors([]);
														return parsed
															.filter(
																(email) =>
																	!errors.some(
																		(e) =>
																			e[0] ==
																			email
																	)
															)
															.join("\n");
													});
												}}
											>
												{errors.length == 1
													? `remove the ${
															errors[0][1] ==
															"invalid"
																? "invalid email"
																: "email of the nonexistent user"
													  }`
													: `remove all ${
															errors.length
													  }${
															errors.some(
																(e) =>
																	e[1] ==
																	"invalid"
															)
																? " invalid emails"
																: ""
													  }${
															errors.some(
																(e) =>
																	e[1] ==
																	"not_a_user"
															)
																? `${
																		errors.some(
																			(
																				e
																			) =>
																				e[1] ==
																				"invalid"
																		)
																			? " and"
																			: ""
																  } emails of nonexistent users`
																: ""
													  }`}
												.
											</button>
										</div>
									)}
								</div>
							</div>
							<div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
								<span className="flex w-full rounded-md shadow-sm sm:col-start-2">
									<button
										type="button"
										onClick={() => {
											const newErrors: [
												string,
												string
											][] = [];

											for (
												let i = 0;
												i < parsedEmails.length;
												i++
											) {
												const email = parsedEmails[i];
												if (email.indexOf("@") == -1) {
													newErrors.push([
														email,
														"invalid",
													]);
												} else if (
													!users.find(
														(u) =>
															u.data.email ==
															email
													)
												) {
													newErrors.push([
														email,
														"not_a_user",
													]);
												}
											}
											setErrors(newErrors);
											if (newErrors.length == 0) {
												setSelectedUsers(
													new Set(
														parsedEmails.map(
															(email) =>
																users.find(
																	(u) =>
																		u.data
																			.email ==
																		email
																)?.id || ""
														)
													)
												);
												setListModalOpen(false);
											}
										}}
										className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5"
									>
										Select {parsedEmails.length} User
										{parsedEmails.length !== 1 && "s"}
									</button>
								</span>
								<span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:col-start-1">
									<button
										onClick={() => setListModalOpen(false)}
										type="button"
										className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
									>
										Cancel
									</button>
								</span>
							</div>
						</div>
					</Transition>
				</div>
			</Transition>
		</span>
	);
}
export default function MembersPage(): React.ReactElement {
	const [lastActionID, setLastActionID] = React.useState("");

	const [selectedUsers, setSelectedUsers] = React.useState<Set<string>>(
		() => new Set()
	);
	const [loadingUsers, setLoadingUsers] = React.useState(true);

	const firebase = useFirebase();
	const {
		user,
		loading,
		verified: userVerified,
		admin: userAdmin,
	} = React.useContext(AuthContext);
	const [users, setUsers] = React.useState<
		{
			id: string;
			data: UserData;
		}[]
	>([]);
	const [dataRequiresUpdate, setDataRequiresUpdate] = React.useState(true);
	const scheduleDataUpdate = () => {
		console.log("DU scheduled");
		setDataRequiresUpdate(true);
	};
	React.useEffect(() => {
		if (!dataRequiresUpdate) {
			return;
		}

		if (!firebase || !user) {
			return;
		}
		if (!userAdmin) {
			return;
		}
		(async () => {
			const snapshot = (await firebase
				.firestore()
				.collection("users")
				.get()) as firebaseType.firestore.QuerySnapshot<UserData>;
			const newUsers: {
				id: string;
				data: UserData;
			}[] = [];
			snapshot.forEach((doc) => {
				newUsers.push({
					id: doc.id,
					data: doc.data(),
				});
			});
			console.log(newUsers);
			setUsers(newUsers);
			setLoadingUsers(false);
			setDataRequiresUpdate(false);
		})();
	}, [firebase, dataRequiresUpdate, user, userAdmin]);

	const allUsers = users.map((u) => u.id);
	const updateCheckbox = (
		id: string,
		checked: boolean,
		shiftKey: boolean
	) => {
		setSelectedUsers((set) => {
			const clone = new Set(set);
			if (shiftKey && lastActionID) {
				let startIndex = allUsers.indexOf(lastActionID);
				let endIndex = allUsers.indexOf(id);
				if (startIndex === -1 || endIndex === -1) {
					if (checked || startIndex == endIndex) {
						clone.add(id);
					} else {
						clone.delete(id);
					}
					return clone;
				}
				if (startIndex > endIndex) {
					const temp = startIndex;
					startIndex = endIndex;
					endIndex = temp;
				}
				for (let i = startIndex; i <= endIndex; i++) {
					if (checked) {
						clone.add(allUsers[i]);
					} else {
						clone.delete(allUsers[i]);
					}
				}
			} else {
				if (checked) {
					clone.add(id);
				} else {
					clone.delete(id);
				}
			}
			return clone;
		});
		setLastActionID(id);
	};
	const [showConfirmModal, setShowConfirmModal] = React.useState(false);
	const [confirmModal, setConfirmModal] = React.useState<{
		title: string;
		text: string;
		users: {
			name: string;
			email: string;
		}[];
		onConfirm: () => void;
		buttonText: string;
		error?: string;
	}>();
	// const Checkbox = ({
	// 	indeterminate,
	// 	checked,
	// 	onChange,
	// }: {
	// 	indeterminate: boolean;
	// 	checked: boolean;
	// 	onChange: ChangeEventHandler;
	// }) => {
	// 	const ref = React.useRef(null);
	// 	React.useEffect(() => {
	// 		if (ref.current) {
	// 			ref.current.indeterminate = indeterminate;
	// 		}
	// 	}, [indeterminate, checked]);
	// 	return (
	// 		<input
	// 			type="checkbox"
	// 			className="form-checkbox h-6 w-6"
	// 			checked={checked}
	// 			onChange={onChange}
	// 			ref={ref}
	// 		/>
	// 	);
	// };
	const updatePermissions = (
		mode: "verify" | "unverify" | "make_admin" | "remove_admin"
	) => {
		const isBulkAction = selectedUsers.size > 1;
		// firstUser is only needed if its not a bulk action
		const firstUser = isBulkAction
			? null
			: users.find(
					(user) => user.id === selectedUsers.values().next().value
			  );
		const mappedUsers = Array.from(selectedUsers).map((id) => {
			const user = users.find((user) => user.id === id);
			if (!user) {
				return {
					name: "Unknown",
					email: "Unknown",
				};
			}
			return {
				name: user.data.firstName + " " + user.data.lastName,
				email: user.data.email,
				id: user.id,
			};
		});
		const actionWord =
			mode == "verify" || mode == "unverify"
				? mode
				: mode == "make_admin"
				? "Promote"
				: "Demote";
		const actionWordUpper =
			actionWord.charAt(0).toUpperCase() + actionWord.substring(1);
		setConfirmModal({
			title: isBulkAction
				? `${actionWordUpper} ${selectedUsers.size} members?`
				: `${actionWordUpper} member?`,
			text: isBulkAction
				? `Are you sure you would like to ${actionWord} these members${
						mode == "make_admin"
							? " to administrator"
							: mode == "remove_admin"
							? " from administrator"
							: ""
				  }?`
				: `Are you should you would like to ${actionWord} ${
						firstUser?.data.firstName
				  } ${firstUser?.data.lastName} (${firstUser?.data.email})${
						mode == "make_admin"
							? " to administrator"
							: mode == "remove_admin"
							? " from administrator"
							: ""
				  }?`,
			buttonText: isBulkAction
				? `${actionWordUpper} ${selectedUsers?.size} Members`
				: `${actionWordUpper} Member`,
			users: mappedUsers,
			onConfirm: async () => {
				const users = mappedUsers;

				try {
					const token = await user?.getIdToken(true);
					const start = new Date().getTime();
					await Promise.all(
						users.map((targetUser) =>
							axios.post(
								"/.netlify/functions/set-user-permissions",
								{
									newPermissions:
										mode == "verify" || mode == "unverify"
											? { verified: mode == "verify" }
											: { admin: mode == "make_admin" },
									target: targetUser.id,
								},
								{
									headers: {
										authorization: `Bearer ${token}`,
									},
								}
							)
						)
					).then(() =>
						console.log(
							users.length +
								" Requests Took " +
								(new Date().getTime() - start) / 1000 +
								" seconds"
						)
					);
					scheduleDataUpdate();
					setShowConfirmModal(false);
				} catch (error) {
					setConfirmModal((current) =>
						current
							? {
									...current,
									error:
										"An error occurred. Please try again later.",
							  }
							: undefined
					);
					console.log(error);
					console.log({ ...error });
					if (error.response) {
						console.log(error.response.data);
						console.log(error.response.status);
						console.log(error.response.headers);
					}
				}
			},
		});
		setShowConfirmModal(true);
	};
	const tableHeaders = ["Basic Information", "Permissions"];

	return (
		<AdminLayout title={"Members"}>
			<h1
				className={
					"text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 mb-6"
				}
			>
				Members
			</h1>

			<div className={"my-4"}>
				<span className="relative z-0 inline-flex shadow-sm rounded-md mr-4">
					<button
						type="button"
						onClick={() => updatePermissions("verify")}
						disabled={selectedUsers.size === 0}
						className={
							(selectedUsers.size === 0
								? "bg-gray-200"
								: "bg-white hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 ") +
							" " +
							"relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 text-sm leading-5 font-medium text-gray-700 transition ease-in-out duration-150"
						}
					>
						<Icons.CheckCircleOutline
							className={"h-5 w-5 text-gray-600 mr-3"}
						/>{" "}
						Verify
					</button>
					<button
						type="button"
						disabled={selectedUsers.size === 0}
						className={
							(selectedUsers.size === 0
								? "bg-gray-200"
								: "bg-white hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 ") +
							" " +
							"-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 text-sm leading-5 font-medium text-gray-700 transition ease-in-out duration-150"
						}
						onClick={() => updatePermissions("unverify")}
					>
						Unverify
					</button>
				</span>
				<span className="relative z-0 inline-flex shadow-sm rounded-md mx-4">
					<button
						type="button"
						disabled={selectedUsers.size === 0}
						className={
							(selectedUsers.size === 0
								? "bg-gray-200"
								: "bg-white hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 ") +
							" " +
							"relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 text-sm leading-5 font-medium text-gray-700 transition ease-in-out duration-150"
						}
						onClick={() => updatePermissions("make_admin")}
					>
						<Icons.ShieldCheckOutline
							className={"h-5 w-5 text-gray-600 mr-3"}
						/>{" "}
						Promote to Admin
					</button>
					<button
						type="button"
						disabled={
							selectedUsers.size === 0 ||
							selectedUsers.has(user?.uid || "")
						}
						className={
							(selectedUsers.size === 0 ||
							selectedUsers.has(user?.uid || "")
								? "bg-gray-200"
								: "bg-white hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 ") +
							" " +
							"-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 text-sm leading-5 font-medium text-gray-700 transition ease-in-out duration-150"
						}
						onClick={() => updatePermissions("remove_admin")}
					>
						Demote from Admin
					</button>
				</span>
			</div>
			<Transition show={showConfirmModal}>
				<div className="fixed bottom-0 inset-x-0 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center normal-case tracking-normal">
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

					<Transition
						enter="ease-out duration-300"
						enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						enterTo="opacity-100 translate-y-0 sm:scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 translate-y-0 sm:scale-100"
						leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					>
						<div
							className="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full sm:p-6"
							role="dialog"
							aria-modal="true"
							aria-labelledby="modal-headline"
						>
							<div>
								<div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
									<Icons.Exclamation className="h-6 w-6 text-red-600" />
								</div>
								<div className="mt-3 text-center sm:mt-5">
									<h3
										className="text-lg leading-6 font-medium text-gray-900"
										id="modal-headline"
									>
										{confirmModal?.title}
									</h3>
									<div className="mt-2">
										<p className="text-sm leading-5 text-gray-500">
											{confirmModal?.text}
										</p>
										{
											<ul
												className={
													"list-disc mx-9 text-base text-left my-2 overflow-auto px-12 py-6"
												}
												style={{
													maxHeight: "40vh",
												}}
											>
												{confirmModal &&
													confirmModal?.users.length >
														1 &&
													confirmModal?.users.map(
														(user) => (
															<li
																key={
																	user.email +
																	"" +
																	user.name
																}
															>
																<b>
																	{user.name}
																</b>
																, {user.email}
															</li>
														)
													)}
											</ul>
										}
									</div>
									{confirmModal?.error && (
										<div className="mt-4">
											<p className="text-sm leading-5 text-red-500 font-bold">
												{confirmModal.error}
											</p>
										</div>
									)}
								</div>
							</div>
							<div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
								<span className="flex w-full rounded-md shadow-sm sm:col-start-2">
									<button
										type="button"
										onClick={() =>
											confirmModal?.onConfirm()
										}
										className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5"
									>
										{confirmModal?.buttonText}
									</button>
								</span>
								<span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:col-start-1">
									<button
										onClick={() =>
											setShowConfirmModal(false)
										}
										type="button"
										className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
									>
										Cancel
									</button>
								</span>
							</div>
						</div>
					</Transition>
				</div>
			</Transition>
			<div className="flex flex-col">
				<div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
					<div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
						<table className="min-w-full">
							<thead>
								<tr>
									<th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
										<SelectAllCheckbox
											selectedUsers={selectedUsers}
											setSelectedUsers={setSelectedUsers}
											setLastActionID={setLastActionID}
											users={users}
											setUsers={setUsers}
										/>
									</th>
									{tableHeaders.map((name) => (
										<th
											key={name}
											className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
										>
											{name}
										</th>
									))}
								</tr>
							</thead>
							<tbody className="bg-white">
								{loadingUsers && (
									<tr>
										<td
											className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 w-full"
											colSpan={tableHeaders.length + 1}
										>
											<div className="text-sm leading-5 font-medium text-gray-900">
												Loading...
											</div>
										</td>
									</tr>
								)}
								{!loadingUsers && users.length === 0 && (
									<tr>
										<td
											className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 w-full"
											colSpan={tableHeaders.length + 1}
										>
											<div className="text-sm leading-5 font-medium text-gray-900">
												Error: unable to load users
											</div>
										</td>
									</tr>
								)}
								{users.map(({ id: id, data: data }) => (
									<tr key={id}>
										<td
											className="pl-9 pr-0 py-4 border-b border-gray-200"
											onMouseDown={() =>
												window
													.getSelection()
													?.removeAllRanges()
											}
											onClick={(e) =>
												updateCheckbox(
													id,
													!selectedUsers.has(id),
													e.shiftKey
												)
											}
										>
											<input
												type="checkbox"
												className="form-checkbox h-6 w-6"
												checked={selectedUsers.has(id)}
												onChange={() => null}
												onClick={(e) => {
													updateCheckbox(
														id,
														!selectedUsers.has(id),
														e.shiftKey
													);
												}}
											/>
											{/*<button*/}
											{/*	className={*/}
											{/*		"rounded-md bg-blue-200 m-0 px-4 py-2 align-middle"*/}
											{/*	}*/}
											{/*>*/}
											{/*	<Icons.Check />*/}
											{/*</button>*/}
										</td>
										<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
											<div>
												<div className="text-sm leading-5 font-medium text-gray-900">
													{`${data.firstName} ${
														data.lastName
													}, ${getGrade(
														data.classOf
													)}th Grade`}
												</div>
												<div className="text-sm leading-5 text-gray-500">
													{data.email}
												</div>
											</div>
										</td>
										{/*<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">*/}
										{/*	<div className="text-sm leading-5 text-yellow-800">*/}
										{/*		Registered, Not Paid*/}
										{/*	</div>*/}
										{/*	<div className="text-sm leading-5 text-gray-500">*/}
										{/*		ECOSOC (partner: John Doe)*/}
										{/*	</div>*/}
										{/*</td>*/}
										<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
											<div
												className={
													"flex flex-row space-x-4"
												}
											>
												<span
													className={
														"inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-4 " +
														(data.verified
															? "bg-green-100 text-green-800"
															: "bg-yellow-100 text-yellow-800")
													}
												>
													{!data.verified && "Not "}
													Verified
												</span>

												{data.admin && (
													<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-4 bg-green-100 text-green-800">
														Admin
													</span>
												)}
											</div>
										</td>
										{/*<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">*/}
										{/*	Owner*/}
										{/*</td>*/}
										{/*<td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">*/}
										{/*	<Link*/}
										{/*		to="#"*/}
										{/*		className="text-indigo-600 hover:text-indigo-900"*/}
										{/*	>*/}
										{/*		Manage*/}
										{/*	</Link>*/}
										{/*</td>*/}
									</tr>
								))}
							</tbody>
						</table>
						<div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
							<div className="flex-1 flex justify-between sm:hidden">
								<a
									href="/"
									className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
								>
									Previous
								</a>
								<a
									href="/"
									className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
								>
									Next
								</a>
							</div>
							<div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
								<div>
									<p className="text-sm leading-5 text-gray-700">
										Showing All{" "}
										<span className="font-medium">
											{users.length}
										</span>
										Users
									</p>
								</div>
								<div>
									{/*<nav className="relative z-0 inline-flex shadow-sm">*/}
									{/*	<a*/}
									{/*		href="/"*/}
									{/*		className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"*/}
									{/*		aria-label="Previous"*/}
									{/*	>*/}
									{/*		<svg*/}
									{/*			className="h-5 w-5"*/}
									{/*			viewBox="0 0 20 20"*/}
									{/*			fill="currentColor"*/}
									{/*		>*/}
									{/*			<path*/}
									{/*				fillRule="evenodd"*/}
									{/*				d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"*/}
									{/*				clipRule="evenodd"*/}
									{/*			/>*/}
									{/*		</svg>*/}
									{/*	</a>*/}
									{/*	<a*/}
									{/*		href="/"*/}
									{/*		className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"*/}
									{/*	>*/}
									{/*		1*/}
									{/*	</a>*/}
									{/*	<a*/}
									{/*		href="/"*/}
									{/*		className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"*/}
									{/*	>*/}
									{/*		2*/}
									{/*	</a>*/}
									{/*	<a*/}
									{/*		href="/"*/}
									{/*		className="hidden md:inline-flex -ml-px relative items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"*/}
									{/*	>*/}
									{/*		3*/}
									{/*	</a>*/}
									{/*	<span className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700">*/}
									{/*		...*/}
									{/*	</span>*/}
									{/*	<a*/}
									{/*		href="/"*/}
									{/*		className="hidden md:inline-flex -ml-px relative items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"*/}
									{/*	>*/}
									{/*		8*/}
									{/*	</a>*/}
									{/*	<a*/}
									{/*		href="/"*/}
									{/*		className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"*/}
									{/*	>*/}
									{/*		9*/}
									{/*	</a>*/}
									{/*	<a*/}
									{/*		href="/"*/}
									{/*		className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"*/}
									{/*	>*/}
									{/*		10*/}
									{/*	</a>*/}
									{/*	<a*/}
									{/*		href="/"*/}
									{/*		className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"*/}
									{/*		aria-label="Next"*/}
									{/*	>*/}
									{/*		<svg*/}
									{/*			className="h-5 w-5"*/}
									{/*			viewBox="0 0 20 20"*/}
									{/*			fill="currentColor"*/}
									{/*		>*/}
									{/*			<path*/}
									{/*				fillRule="evenodd"*/}
									{/*				d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"*/}
									{/*				clipRule="evenodd"*/}
									{/*			/>*/}
									{/*		</svg>*/}
									{/*	</a>*/}
									{/*</nav>*/}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</AdminLayout>
	);
}
