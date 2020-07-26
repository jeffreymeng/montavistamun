import React from "react";

import Navbar from "./Navbar";
import Footer from "./Footer";
import SEO from "./SEO";

type LayoutProps =
	| {
			children: React.ReactNode | React.ReactNodeArray | Element[];
			/**
			 * A title for the page, to be displayed in the browser tab
			 */
			title: string;
			empty?: false;
			/**
			 * A list of space delimited classes to be added to the topmost div of the page (parent to the navbar and body).
			 */
			className?: string;
			/**
			 * A list of space delimited classes to be added to the content wrapper.
			 */
			wrapperClassName?: string;

			navbarUnscrolledClassName?: string;
			navbarScrolledClassName?: string;
	  }
	| {
			children: React.ReactNode | React.ReactNodeArray;
			/**
			 * If provided and set to true, the page will be rendered without a navbar, wrapper, or footer. It will still have the title set.
			 * @default false
			 */
			empty: true;

			/**
			 * A title for the page, to be displayed in the browser tab
			 */
			title: string;
	  };

export default function Layout(props: LayoutProps): React.ReactElement {
	if (props.empty) {
		return (
			<>
				<SEO
					keywords={[
						"cuptertino",
						"model un",
						"mun",
						"monta vista",
						"club",
						"model united nations",
					]}
					title={props.title}
				/>
				{props.children}
			</>
		);
	}
	return (
		<div
			className={
				"flex flex-col min-h-screen font-sans text-gray-900 " +
				(props.className || "")
			}
		>
			<Navbar
				scrolledClassName={props.navbarScrolledClassName}
				unscrolledClassName={props.navbarUnscrolledClassName}
			/>
			<SEO
				keywords={[
					"cuptertino",
					"model un",
					"mun",
					"monta vista",
					"club",
					"model united nations",
				]}
				title={props.title}
			/>

			<main
				className={
					props.wrapperClassName
						? props.wrapperClassName
						: "flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16"
				}
			>
				{props.children}
			</main>

			<Footer dark />
		</div>
	);
}
