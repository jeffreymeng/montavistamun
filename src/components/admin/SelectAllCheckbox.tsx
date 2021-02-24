import * as Icons from "heroicons-react";
import React, { useState } from "react";
import Transition from "../Transition";
import UserData from "./UserData";

export default function SelectAllCheckbox({
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
	const [selectAllDropdownOpen, setSelectAllDropdownOpen] = useState(false);
	const [emails, setEmails] = useState("");
	const [errors, setErrors] = React.useState<[string, string][]>([]);
	const parsedEmails = emails
		.split(",")
		.flatMap((e) => e.split("\n"))
		.map((e) => e.trim())
		.filter((e) => e);
	const [listModalOpen, setListModalOpen] = useState(false);
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
				className="inline-flex items-center px-2 py-1 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:ring-blue-500 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
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
					className="inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:ring-blue-500 active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150 h-full"
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
										className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:ring-indigo-500 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
									>
										Select {parsedEmails.length} User
										{parsedEmails.length !== 1 && "s"}
									</button>
								</span>
								<span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:col-start-1">
									<button
										onClick={() => setListModalOpen(false)}
										type="button"
										className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring-blue-500 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
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
