import React from "react";

export default function Main({
	children,
	wide,
	className,
	noMobileXPadding,
}: {
	children: React.ReactNode;
	wide?: boolean;
	className?: string;
	noMobileXPadding?: boolean;
}): React.ReactElement {
	return (
		<main
			className={
				"flex-1 w-full py-8 mx-auto md:px-8 md:py-16 min-h-ca " +
				(wide ? "lg:px-16 max-w-8xl" : "max-w-4xl") +
				" " +
				(noMobileXPadding ? "" : "px-4") +
				" " +
				(className ? className : "")
			}
		>
			{children}
		</main>
	);
}
