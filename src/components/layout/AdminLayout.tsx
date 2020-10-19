import { useLocation } from "@reach/router";
import { Link } from "gatsby";
import * as Icons from "heroicons-react";
import React, { useState } from "react";
import AuthContext from "../../context/AuthContext";
import useRequireLogin from "../accounts/useRequireLogin";
import Transition from "../Transition";
import { Layout, Main } from "./index";
import Navbar from "./Navbar";
import SEO from "./SEO";

const AdminLinks: TypedPageOrDropdown[] = [
	{
		type: "page",
		name: "Manage Members",
		path: "/admin/members",
		icon: <Icons.UsersOutline />,
	},
	{
		type: "page",
		name: "Edit Awards",
		path: "/admin/awards",
		icon: <Icons.AcademicCapOutline />,
	},
	{
		type: "page",
		name: "Conference Registration",
		path: "/admin/conference-registration",
		icon: <Icons.PencilAltOutline />,
	},
	// {
	// 	type: "page",
	// 	name: "Edit Member Dashboard",
	// 	path: "/admin/edit-member-dashboard",
	// 	icon: <Icons.PencilOutline />,
	// },
];
export default function AdminLayout({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode | React.ReactNodeArray;
}) {
	const [mobileSidebarExpanded, setMobileSidebarExpanded] = useState(false);
	useRequireLogin();
	const { loading, admin } = React.useContext(AuthContext);
	const location = useLocation();

	if (!loading && !admin) {
		return (
			<Layout title={"Permission Denied"}>
				<Main>
					<h1
						className={
							"text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10"
						}
					>
						Permission Denied
					</h1>
					<p className={"mt-4 mb-20"}>
						Sorry, but you don't have permission to view this page.
					</p>
				</Main>
			</Layout>
		);
	}
	return (
		<div className={"flex flex-col min-h-screen font-sans text-gray-900 "}>
			<Navbar shadow={"always"} noMaxWidth />
			<SEO
				keywords={[
					"cuptertino",
					"model un",
					"mun",
					"monta vista",
					"club",
					"model united nations",
				]}
				title={title}
			/>
			<div className="h-ca-no-footer flex overflow-hidden bg-gray-100">
				{/* Off-canvas menu for mobile */}

				<div className="md:hidden">
					<Transition show={mobileSidebarExpanded}>
						<div className="fixed inset-0 flex z-40">
							<Transition
								enter="transition-opacity ease-linear duration-300"
								enterFrom="opacity-0"
								enterTo="opacity-100"
								leave="transition-opacity ease-linear duration-300"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<div className="fixed inset-0">
									<div className="absolute inset-0 bg-gray-600 opacity-75"></div>
								</div>
							</Transition>
							{/*
            Off-canvas menu, show/hide based on off-canvas menu state.

            Entering: "transition ease-in-out duration-300 transform"
              From: "-translate-x-full"
              To: "translate-x-0"
            Leaving: "transition ease-in-out duration-300 transform"
              From: "translate-x-0"
              To: "-translate-x-full"
          */}
							<Transition
								enter="transition ease-in-out duration-300 transform"
								enterFrom="-translate-x-full"
								enterTo="translate-x-0"
								leave="transition ease-in-out duration-300 transform"
								leaveFrom="translate-x-0"
								leaveTo="-translate-x-full"
							>
								<>
									<div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
										<div className="absolute top-0 right-0 -mr-14 p-1">
											<button
												className="flex items-top pt-3 justify-center h-32 w-12 rounded-sm focus:outline-none focus:bg-gray-600"
												aria-label="Close sidebar"
												onClick={() =>
													setMobileSidebarExpanded(
														false
													)
												}
											>
												<Icons.X className="h-6 w-6 text-white" />
											</button>
										</div>
										<div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
											<h1
												className={
													"text-lg leading-5 font-medium pl-4"
												}
											>
												Admin Dashboard
											</h1>

											<nav className="mt-5 px-2">
												{AdminLinks.map(
													(
														page: TypedPageOrDropdown
													) =>
														page.type ==
														"dropdown" ? (
															<SidebarDropdown
																name={page.name}
																pages={
																	page.pages
																}
																key={page.name}
															/>
														) : (
															<PageLink
																key={page.name}
																name={page.name}
																path={page.path}
																icon={page.icon}
																mobile
															/>
														)
												)}
											</nav>
										</div>
									</div>
									<div className="flex-shrink-0 w-14">
										{/* Force sidebar to shrink to fit close icon */}
									</div>
								</>
							</Transition>
						</div>
					</Transition>
				</div>

				{/* Static sidebar for desktop */}
				<div className="hidden md:flex md:flex-shrink-0">
					<div className="flex flex-col w-64">
						{/* Sidebar component, swap this element with another sidebar if you like */}
						<div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
							<div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
								<Link
									to={"/admin/"}
									className={
										"text-lg leading-5 font-bold pl-4 text-gray-700 hover:text-black"
									}
								>
									Admin Dashboard
								</Link>
								<nav className="mt-5 flex-1 px-2 bg-white">
									{/*<SidebarDropdown*/}
									{/*	name={"Members"}*/}
									{/*	icon={<Icons.UsersOutline />}*/}
									{/*	basePath={"/admin/members"}*/}
									{/*	pages={[*/}
									{/*		{*/}
									{/*			name: "List",*/}
									{/*			path: "members",*/}
									{/*			icon: <Icons.ViewListOutline />,*/}
									{/*		},*/}
									{/*		{*/}
									{/*			name: "Lookup",*/}
									{/*			path: "members",*/}
									{/*			icon: <Icons.SearchOutline />,*/}
									{/*		},*/}
									{/*	]}*/}
									{/*/>*/}
									{AdminLinks.map(
										(page: TypedPageOrDropdown) =>
											page.type == "dropdown" ? (
												<SidebarDropdown
													key={page.name}
													name={page.name}
													pages={page.pages}
												/>
											) : (
												<PageLink
													key={page.name}
													name={page.name}
													path={page.path}
													icon={page.icon}
												/>
											)
									)}
								</nav>
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col w-0 flex-1 overflow-hidden">
					<div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
						<button
							className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150"
							aria-label="Open sidebar"
							onClick={() => setMobileSidebarExpanded(true)}
						>
							<Icons.Menu className="h-6 w-6" />
						</button>
					</div>
					<main
						className="flex-1 relative z-0 overflow-y-auto focus:outline-none"
						tabIndex={0}
					>
						<div className="pt-2 pb-6 md:py-6">
							<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
								<nav className="hidden sm:flex items-center text-sm leading-5 font-medium mt-2 mb-4">
									{location.pathname
										.split("/")
										.filter((el) => el !== "") // get rid of leading slash, if it exists
										.map((name, i, arr) => (
											<React.Fragment key={name}>
												<Link
													to={
														"/" +
														arr
															.slice(0, i + 1)
															.join("/")
													}
													className="text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out"
												>
													{name
														.replace(/-/g, " ")
														.split(" ")
														.map(
															(word) =>
																word
																	.charAt(0)
																	.toUpperCase() +
																word
																	.substring(
																		1
																	)
																	.toLowerCase()
														)
														.join(" ")}
												</Link>
												{i !== arr.length - 1 && (
													<Icons.ChevronRight className="flex-shrink-0 mx-2 h-5 w-5 text-gray-400" />
												)}
											</React.Fragment>
										))}
								</nav>
								{children}
							</div>
						</div>
					</main>
				</div>
			</div>
		</div>
	);
}
interface Page {
	name: string;
	/**
	 * Path relative to base path
	 */
	path: string;

	icon?: React.ReactElement;
}
interface TypedPage extends Page {
	type: "page";
}
interface TypedDropdown {
	type: "dropdown";
	name: string;
	pages: Page[];
}
type TypedPageOrDropdown = TypedPage | TypedDropdown;
function SidebarDropdown({
	name,
	basePath,
	pages,
	icon,
}: {
	name: string;
	/**
	 * Defaults to root
	 */
	basePath?: string;

	icon?: React.ReactElement;
	pages: Page[];
}) {
	const [expanded, setExpanded] = useState(false);

	return (
		<div>
			<button
				className="mt-1 group w-full flex items-center pl-2 pr-1 py-2 text-sm leading-5 font-medium rounded-md bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150"
				onClick={() => setExpanded((old) => !old)}
			>
				{icon &&
					React.cloneElement(icon, {
						className:
							"mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-600 group-focus:text-gray-600 transition ease-in-out duration-150",
						fill: "none",
						stroke: "currentColor",
					})}
				{name}
				<Icons.ChevronRight
					className={
						"ml-auto h-5 w-5 transform group-hover:text-gray-400 group-focus:text-gray-400 transition-colors ease-in-out duration-150 " +
						(expanded ? "text-gray-400 rotate-90" : "text-gray-300")
					}
				/>
			</button>
			{expanded && (
				<div className="mt-1">
					{pages.map((page) => (
						<PageLink
							{...page}
							path={(basePath || "/") + page.path}
							key={page.path}
							dropdownElement
						/>
					))}
				</div>
			)}
		</div>
	);
}

function PageLink({
	path,
	icon,
	name,
	dropdownElement,
	mobile,
}: Page & {
	dropdownElement?: boolean;

	mobile?: boolean;
}) {
	return (
		<Link
			to={path}
			className={
				!dropdownElement
					? `mt-1 group flex items-center px-2 py-2 ${
							mobile ? "text-base" : "text-sm"
					  } ${
							mobile ? "leading-5" : "leading-6"
					  } font-medium  rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 ${
							mobile ? "focus:bg-gray-50" : "focus:bg-gray-100"
					  } transition ease-in-out duration-150`
					: "group w-full flex items-center pl-11 pr-2 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150"
			}
		>
			{icon &&
				React.cloneElement(icon, {
					className: `${
						mobile ? "mr-4" : "mr-3"
					} h-6 w-6 text-gray-400 group-hover:text-gray-600 group-focus:text-gray-600 transition ease-in-out duration-150`,
					fill: "none",
					stroke: "currentColor",
				})}
			{name}
		</Link>
	);
}
