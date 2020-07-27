import React from "react";

export default function Main({
	children,
	wide,
}: {
	children: React.ReactNode;
	wide?: boolean;
}): React.ReactElement {
	return (
		<main
			className={
				"flex-1 w-full px-4 py-8 mx-auto md:px-8 md:py-16 " +
				(wide ? "lg:px-16 max-w-8xl" : "max-w-4xl")
			}
		>
			{children}
		</main>
	);
}
