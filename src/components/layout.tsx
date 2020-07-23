import PropTypes from "prop-types";
import React from "react";

import Header from "./header";
import SEO from "./seo";

function Layout({
	children,
	empty,
	title,
	className,
}: {
	children: React.ReactNode | React.ReactNodeArray;
	empty?: boolean;
	title: string;
	className?: string;
}): React.ReactElement {
	if (empty) {
		if (className) {
			return <div className={className}>{children}</div>;
		} else {
			return children as React.ReactElement;
		}
	}
	return (
		<div
			className={
				"flex flex-col min-h-screen font-sans text-gray-900 " +
				(className || "")
			}
		>
			<Header />
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

			<main className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16">
				{children}
			</main>

			<footer className="bg-blue-700">
				<nav className="flex justify-between max-w-4xl p-4 mx-auto text-sm md:p-8">
					<p className="text-white">
						&copy; Monta Vista Model United Nations. Developed by
						Jeffrey Meng
					</p>
				</nav>
			</footer>
		</div>
	);
}

Layout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Layout;
