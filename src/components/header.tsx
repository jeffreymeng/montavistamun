import { graphql, useStaticQuery, Link } from "gatsby";
import React, { ReactElement, useState } from "react";
import { Transition } from "react-transition-group";
import { useLocation } from "@reach/router";

import classNames from "classnames";
function ProfileDropdown(): ReactElement {
	const [expanded, setExpanded] = React.useState(false);
	const toggle = () => setExpanded((old) => !old);
	const ref = React.useRef<HTMLDivElement>(null);
	React.useEffect(() => {
		// https://stackoverflow.com/a/42234988, https://stackoverflow.com/a/43851475
		const handleClickOutside = (e: Event) => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-ignore
			if (ref.current && !ref.current?.contains(e.target as Node)) {
				setExpanded(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, [ref]);
	return (
		<div className="ml-3 relative" ref={ref}>
			<div>
				<button
					onClick={toggle}
					className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
					id="user-menu"
					aria-label="User menu"
					aria-haspopup="true"
				>
					<img
						className="h-8 w-8 rounded-full"
						src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
						alt=""
					/>
				</button>
			</div>
			{/*<!--
                                  Profile dropdown panel, show/hide based on dropdown state.

                                  Entering: "transition ease-out duration-200"
                                    From: "transform opacity-0 scale-95"
                                    To: "transform opacity-100 scale-100"
                                  Leaving: "transition ease-in duration-75"
                                    From: "transform opacity-100 scale-100"
                                    To: "transform opacity-0 scale-95"
                                -->*/}
			<Transition
				in={expanded}
				timeout={{
					enter: 200,
					exit: 75,
				}}
			>
				{(state: "entering" | "entered" | "exiting" | "exited") => (
					<div
						className={classNames(
							"origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg transition transform ",
							["entering", "exited"].includes(state)
								? "opacity-0 scale-95"
								: "opacity-100 scale-100",
							["entering", "entered"].includes(state)
								? "ease-out duration-200"
								: "ease-in duration-75"
						)}
					>
						<div
							className="py-1 rounded-md bg-white shadow-xs"
							role="menu"
							aria-orientation="vertical"
							aria-labelledby="user-menu"
						>
							<a
								href="#"
								className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
								role="menuitem"
							>
								Your Profile
							</a>
							<a
								href="#"
								className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
								role="menuitem"
							>
								Settings
							</a>
							<a
								href="#"
								className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
								role="menuitem"
							>
								Sign out
							</a>
						</div>
					</div>
				)}
			</Transition>
		</div>
	);
}
function Header() {
	const [isExpanded, setIsExpanded] = useState(false);
	const location = useLocation();
	console.log(location);
	const toggleExpansion = () => setIsExpanded((old) => !old);
	const { site } = useStaticQuery(graphql`
		query SiteTitleQuery {
			site {
				siteMetadata {
					title
				}
			}
		}
	`);

	return (
		<nav className="bg-white shadow">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16">
					<div className="flex">
						<div className="-ml-2 mr-2 flex items-center md:hidden">
							<button
								onClick={toggleExpansion}
								className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
								aria-label="Main menu"
								aria-expanded="false"
							>
								{!isExpanded ? (
									<svg
										className="h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M4 6h16M4 12h16M4 18h16"
										/>
									</svg>
								) : (
									<svg
										className="h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								)}
							</button>
						</div>
						<div className="flex-shrink-0 flex items-center">
							<Link to="/" aria-label="Home">
								<img
									className="h-8 w-auto"
									src="/images/logo/short-name.svg"
									alt="Workflow logo"
								/>
							</Link>
						</div>
						<div className="hidden md:ml-6 md:flex">
							{[
								"About",
								"Conferences",
								"Resources",
								"Calendar",
							].map((page) => (
								<Link
									to={`/${page.toLowerCase()}`}
									key={page}
									className={
										location.pathname.toLowerCase() ==
										`/${page.toLowerCase()}`
											? "ml-8 inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out"
											: "ml-8 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
									}
								>
									{page}
								</Link>
							))}
						</div>
					</div>
					<div className="flex items-center">
						<div className="flex-shrink-0">
							<button
								type="button"
								className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
							>
								<svg
									className="-ml-1 mr-2 h-5 w-5"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fillRule="evenodd"
										d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
										clipRule="evenodd"
									/>
								</svg>
								<span>Login</span>
							</button>
						</div>
						<div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
							<button
								className="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100 transition duration-150 ease-in-out"
								aria-label="Notifications"
							>
								<svg
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
									/>
								</svg>
							</button>
							<ProfileDropdown />
						</div>
					</div>
				</div>
			</div>

			{isExpanded && (
				<div>
					<div className="pt-2 pb-3">
						<a
							href="#"
							className="block pl-3 pr-4 py-2 border-l-4 border-indigo-500 text-base font-medium text-indigo-700 bg-indigo-50 focus:outline-none focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700 transition duration-150 ease-in-out sm:pl-5 sm:pr-6"
						>
							Dashboard
						</a>
						<a
							href="#"
							className="mt-1 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out sm:pl-5 sm:pr-6"
						>
							Team
						</a>
						<a
							href="#"
							className="mt-1 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out sm:pl-5 sm:pr-6"
						>
							Projects
						</a>
						<a
							href="#"
							className="mt-1 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out sm:pl-5 sm:pr-6"
						>
							Calendar
						</a>
					</div>
					<div className="pt-4 pb-3 border-t border-gray-200">
						<div className="flex items-center px-4 sm:px-6">
							<div className="flex-shrink-0">
								<img
									className="h-10 w-10 rounded-full"
									src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
									alt=""
								/>
							</div>
							<div className="ml-3">
								<div className="text-base font-medium leading-6 text-gray-800">
									Tom Cook
								</div>
								<div className="text-sm font-medium leading-5 text-gray-500">
									tom@example.com
								</div>
							</div>
						</div>
						<div className="mt-3">
							<a
								href="#"
								className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out sm:px-6"
							>
								Your Profile
							</a>
							<a
								href="#"
								className="mt-1 block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out sm:px-6"
							>
								Settings
							</a>
							<a
								href="#"
								className="mt-1 block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out sm:px-6"
							>
								Sign out
							</a>
						</div>
					</div>
				</div>
			)}
		</nav>
	);
}

export default Header;
