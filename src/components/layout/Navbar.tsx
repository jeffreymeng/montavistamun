import { useLocation } from "@reach/router";
import { graphql, Link, useStaticQuery } from "gatsby";
import Img from "gatsby-image";
import * as Icon from "heroicons-react";
import React, { ReactElement, useState } from "react";
import AuthContext from "../../context/AuthContext";
import Transition from "../Transition";
import navLinks from "./navLinks";

function Navbar({
	unscrolledClassName,
	scrolledClassName,
	shadow,
	noMaxWidth,
}: {
	/**
	 * Defines a set of classes to be added to the navbar when the page has not been scrolled (i.e. the navbar doesn't have a drop shadow)
	 */
	unscrolledClassName?: string;
	/**
	 * Defines a set of classes to be added to the navbar when the page has been scrolled (i.e. the navbar a drop shadow)
	 */
	scrolledClassName?: string;
	shadow?: "always" | "scroll" | "never";
	noMaxWidth?: boolean;
}): React.ReactElement {
	shadow = shadow || "scroll";
	const [isExpanded, setIsExpanded] = useState(false);
	const auth = React.useContext(AuthContext);
	const toggleExpansion = () => setIsExpanded((old) => !old);

	// only show a box shadow when the user has scrolled a little bit
	const [showShadow, setShowShadow] = useState(shadow === "always");
	React.useEffect(() => {
		if (shadow !== "scroll") return;
		const scrollHandler = () => {
			setShowShadow(window.scrollY > 10);
		};
		window.addEventListener("scroll", scrollHandler);
		return () => window.removeEventListener("scroll", scrollHandler);
	}, []);
	const location = useLocation();

	const logoData = useStaticQuery(graphql`
		query {
			logo: file(relativePath: { eq: "logo/nav-logo.png" }) {
				childImageSharp {
					# Specify a fixed image and fragment.
					# The default width is 400 pixels
					fixed(height: 32) {
						...GatsbyImageSharpFixed_withWebp_noBase64
					}
				}
			}
		}
	`);

	return (
		<>
			<nav
				className={`bg-white fixed w-full z-30 md:transition md:ease-in-out md:duration-200 ${
					showShadow || isExpanded
						? "shadow " + (scrolledClassName || "")
						: unscrolledClassName || ""
				}`}
			>
				<div
					className={
						"mx-auto px-4 sm:px-6 lg:px-8 " +
						(noMaxWidth ? "" : "max-w-7xl")
					}
				>
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
										<Icon.Menu className="h-6 w-6" />
									) : (
										<Icon.X className="h-6 w-6" />
									)}
								</button>
							</div>
							<div className="flex-shrink-0 flex items-center">
								<Link to="/" aria-label="Home">
									<Img
										className="h-8 w-auto"
										fixed={
											logoData.logo.childImageSharp.fixed
										}
										alt="MVMUN logo"
									/>
								</Link>
							</div>
							<div className="hidden md:ml-6 md:flex">
								{[
									...navLinks,
									...(auth.verified ? ["Resources"] : []),
								].map((page) => (
									<Link
										to={`/${page.toLowerCase()}`}
										key={page}
										className={
											"ml-8 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none " +
											(location.pathname
												.toLowerCase()
												.replace(/\//g, "") ==
											page.toLowerCase()
												? /*     ACTIVE: */ "border-indigo-500 text-gray-900 focus:border-indigo-700"
												: /* NOT ACTIVE: */ "border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300")
										}
									>
										{page}
									</Link>
								))}
							</div>
						</div>
						<div className="flex items-center">
							{auth.loading || !auth.user ? (
								<div className="flex-shrink-0">
									<Link
										to={"/account/create"}
										className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
									>
										<span>Join Today</span>
									</Link>
									<Link
										to={"/account/login"}
										className="hidden md:inline-block ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-900 bg-white hover:text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
									>
										<span>Login</span>
									</Link>
								</div>
							) : (
								<div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
									<ProfileDropdown />
								</div>
							)}
						</div>
					</div>
				</div>

				{isExpanded && (
					<div>
						<div className="pt-2 pb-3">
							{navLinks.map((page, i) => (
								<Link
									to={"/" + page.toLowerCase()}
									key={page}
									className={
										(i !== 0 ? "mt-1 " : "") +
										"block pl-3 pr-4 py-2 border-l-4 text-base font-medium focus:outline-none transition duration-150 ease-in-out sm:pl-5 sm:pr-6 " +
										(location.pathname
											.toLowerCase()
											.replace(/\//g, "") ==
										page.toLowerCase()
											? /*     ACTIVE: */ "border-indigo-500 text-indigo-700 bg-indigo-50 focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700"
											: /* NOT ACTIVE: */ "border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300")
									}
								>
									{page}
								</Link>
							))}
							{!auth.user && (
								<>
									<Link
										to={"/account/create"}
										className={
											"block pl-3 pr-4 py-2 border-l-4 text-base font-medium focus:outline-none transition duration-150 ease-in-out sm:pl-5 sm:pr-6 " +
											(location.pathname
												.toLowerCase()
												.replace(/\//g, "") ==
											"/account/create"
												? /*     ACTIVE: */ "border-indigo-500 text-indigo-700 bg-indigo-50 focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700"
												: /* NOT ACTIVE: */ "border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300")
										}
									>
										Join Today
									</Link>
									<Link
										to={"/account/login"}
										className={
											"block pl-3 pr-4 py-2 border-l-4 text-base font-medium focus:outline-none transition duration-150 ease-in-out sm:pl-5 sm:pr-6 " +
											(location.pathname
												.toLowerCase()
												.replace(/\//g, "") ==
											"/account/login"
												? /*     ACTIVE: */ "border-indigo-500 text-indigo-700 bg-indigo-50 focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700"
												: /* NOT ACTIVE: */ "border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300")
										}
									>
										Login
									</Link>
								</>
							)}
						</div>
						{auth.user && (
							<div className="pt-4 pb-3 border-t border-gray-200">
								<div className="flex items-center px-4 sm:px-6">
									<div>
										<div className="text-base leading-6 text-gray-800 font-semibold">
											{auth.user?.displayName}
										</div>
										<div className="text-sm font-medium leading-5 text-gray-500">
											{auth.user?.email}
										</div>
									</div>
								</div>
								<div className="mt-3">
									<Link
										to="/dashboard"
										className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out sm:px-6"
									>
										Member Dashboard
									</Link>
									{auth.admin && (
										<Link
											to="/admin"
											className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out sm:px-6"
										>
											Admin Dashboard
										</Link>
									)}
									<Link
										to="/account/settings"
										className="mt-1 block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out sm:px-6"
									>
										Settings
									</Link>
									<div className="border-t border-gray-100"></div>
									<Link
										to="/account/logout"
										state={{
											cancelReturnURL: location.pathname,
										}}
										className="mt-1 block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out sm:px-6"
									>
										Sign out
									</Link>
								</div>
							</div>
						)}
					</div>
				)}
			</nav>
			<div className={"w-full h-16"} />
		</>
	);
}
function ProfileDropdown(): ReactElement {
	const [expanded, setExpanded] = useState(false);
	const { user, loading, admin } = React.useContext(AuthContext);
	const toggleExpanded = () => {
		setExpanded((old) => !old);
	};
	const ref = React.useRef<HTMLDivElement>(null);
	React.useEffect(() => {
		// https://stackoverflow.com/a/42234988, https://stackoverflow.com/a/43851475
		const handleClickOutside = (e: Event) => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
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
					className="flex text-sm text-gray-500 hover:text-gray-700 font-medium leading-5 border-2 border-transparent rounded-md focus:outline-none focus:border-gray-300 py-2 px-3 transition duration-150 ease-in-out"
					id="user-menu"
					aria-label="User menu"
					aria-haspopup="true"
					onClick={toggleExpanded}
				>
					Hello, {user?.displayName || user?.email}
					<Icon.ChevronDown className="-mr-1 ml-2 h-5 w-5" />
				</button>
			</div>
			{/*}<!--
              Profile dropdown panel, show/hide based on dropdown state.

              Entering: "transition ease-out duration-200"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
              Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            -->*/}
			<Transition
				show={expanded}
				enter="transition ease-out duration-200 transform"
				enterFrom="opacity-0 scale-95"
				enterTo="opacity-100 scale-100"
				leave="transition ease-in duration-75 transform"
				leaveFrom="opacity-100 scale-100"
				leaveTo="opacity-0 scale-95"
			>
				<div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
					<div
						className="py-1 rounded-md bg-white shadow-xs"
						role="menu"
						aria-orientation="vertical"
						aria-labelledby="user-menu"
					>
						<Link
							to="/dashboard"
							className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
							role="menuitem"
						>
							Member Dashboard
						</Link>
						{admin && (
							<Link
								to="/admin"
								className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
								role="menuitem"
							>
								Admin Dashboard
							</Link>
						)}

						<Link
							to="/account/settings"
							className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
							role="menuitem"
						>
							Settings
						</Link>
						<div className="border-t border-gray-200"></div>
						<Link
							to="/account/logout"
							state={{
								cancelReturnURL: location.pathname,
							}}
							className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
							role="menuitem"
						>
							Sign out
						</Link>
					</div>
				</div>
			</Transition>
		</div>
	);
}

export default Navbar;
