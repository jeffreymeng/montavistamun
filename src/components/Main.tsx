import React from "react";

export default function Main({
	children,
}: {
	children: React.ReactNode;
}): React.ReactElement {
	return (
		<main
			className={
				"flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16"
			}
		>
			{children}
		</main>
	);
}
