import React from "react";

export default function Main({
	children,
	wide,
	className,
}: {
	children: React.ReactNode;
	wide?: boolean;
	className?: string;
}): React.ReactElement {
	return (
		<main
			className={
				"flex-1 w-full px-4 py-8 mx-auto md:px-8 md:py-16 min-h-ca " +
				(wide ? "lg:px-16 max-w-8xl" : "max-w-4xl") +
				" " +
				(className ? className : "")
			}
		>
			{children}
		</main>
	);
}
