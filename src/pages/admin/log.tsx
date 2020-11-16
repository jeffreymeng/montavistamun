import React, { useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import AuthContext from "../../context/AuthContext";
import useFirebase from "../../firebase/useFirebase";
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
				<ul>
					<li>
						<a
							href="/"
							className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
						>
							<div className="px-4 py-4 flex items-center sm:px-6">
								<div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
									<div>
										<div className="text-sm leading-5 font-medium text-indigo-600 truncate">
											Jeffrey Meng Promoted 5 Users
										</div>
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
													Closing on
													<time dateTime="2020-01-07">
														January 7, 2020
													</time>
												</span>
											</div>
										</div>
									</div>
									<div className="mt-4 flex-shrink-0 sm:mt-0">
										<div className="flex overflow-hidden">
											<img
												className="inline-block h-6 w-6 rounded-full text-white shadow-solid"
												src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
												alt=""
											/>
											<img
												className="-ml-1 inline-block h-6 w-6 rounded-full text-white shadow-solid"
												src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
												alt=""
											/>
											<img
												className="-ml-1 inline-block h-6 w-6 rounded-full text-white shadow-solid"
												src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
												alt=""
											/>
											<img
												className="-ml-1 inline-block h-6 w-6 rounded-full text-white shadow-solid"
												src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
												alt=""
											/>
										</div>
									</div>
								</div>
								<div className="ml-5 flex-shrink-0">
									{/* Heroicon name: chevron-right */}
									<svg
										className="h-5 w-5 text-gray-400"
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
					<li className="border-t border-gray-200">
						<a
							href="/"
							className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
						>
							<div className="px-4 py-4 flex items-center sm:px-6">
								<div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
									<div>
										<div className="text-sm leading-5 font-medium text-indigo-600 truncate">
											Back End Developer
											<span className="ml-1 font-normal text-gray-500">
												in Engineering
											</span>
										</div>
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
													Closing on
													<time dateTime="2020-01-07">
														January 7, 2020
													</time>
												</span>
											</div>
										</div>
									</div>
									<div className="mt-4 flex-shrink-0 sm:mt-0">
										<div className="flex overflow-hidden">
											<img
												className="inline-block h-6 w-6 rounded-full text-white shadow-solid"
												src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
												alt=""
											/>
											<img
												className="-ml-1 inline-block h-6 w-6 rounded-full text-white shadow-solid"
												src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
												alt=""
											/>
											<img
												className="-ml-1 inline-block h-6 w-6 rounded-full text-white shadow-solid"
												src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
												alt=""
											/>
											<img
												className="-ml-1 inline-block h-6 w-6 rounded-full text-white shadow-solid"
												src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
												alt=""
											/>
										</div>
									</div>
								</div>
								<div className="ml-5 flex-shrink-0">
									{/* Heroicon name: chevron-right */}
									<svg
										className="h-5 w-5 text-gray-400"
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
					<li className="border-t border-gray-200">
						<a
							href="/"
							className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
						>
							<div className="px-4 py-4 flex items-center sm:px-6">
								<div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
									<div>
										<div className="text-sm leading-5 font-medium text-indigo-600 truncate">
											Back End Developer
											<span className="ml-1 font-normal text-gray-500">
												in Engineering
											</span>
										</div>
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
													Closing on
													<time dateTime="2020-01-07">
														January 7, 2020
													</time>
												</span>
											</div>
										</div>
									</div>
									<div className="mt-4 flex-shrink-0 sm:mt-0">
										<div className="flex overflow-hidden">
											<img
												className="inline-block h-6 w-6 rounded-full text-white shadow-solid"
												src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
												alt=""
											/>
											<img
												className="-ml-1 inline-block h-6 w-6 rounded-full text-white shadow-solid"
												src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
												alt=""
											/>
											<img
												className="-ml-1 inline-block h-6 w-6 rounded-full text-white shadow-solid"
												src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
												alt=""
											/>
											<img
												className="-ml-1 inline-block h-6 w-6 rounded-full text-white shadow-solid"
												src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
												alt=""
											/>
										</div>
									</div>
								</div>
								<div className="ml-5 flex-shrink-0">
									{/* Heroicon name: chevron-right */}
									<svg
										className="h-5 w-5 text-gray-400"
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
				</ul>
			</div>
		</AdminLayout>
	);
}
