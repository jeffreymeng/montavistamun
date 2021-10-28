import BackgroundImage from "gatsby-background-image";
import React, { ReactNode } from "react";
import FluidImage from "./FluidImage";
export default function Header({
	backgroundImage,
	backgroundImageURL,
	title,
	children,
	buttons,
}: {
	title: React.ReactNode;
	children: React.ReactNode;
	buttons?: React.ReactNode;
} & (
	| {
			backgroundImage: FluidImage;
			backgroundImageURL?: undefined | false | null;
	  }
	| {
			backgroundImage?: undefined | false | null;
			backgroundImageURL: string;
	  }
)): React.ReactElement {
	if (backgroundImage) {
		return (
			<BackgroundImage
				className="relative overflow-hidden bg-no-repeat bg-center bg-cover"
				fluid={[
					"linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))",
					backgroundImage.childImageSharp.fluid,
				]}
			>
				<Inner title={title} buttons={buttons}>
					{children}
				</Inner>
			</BackgroundImage>
		);
	}
	return (
		<div
			className="relative overflow-hidden bg-no-repeat bg-center bg-cover"
			style={{
				backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://scpd.stanford.edu/sites/default/files/2020-08/stanford-oval.jpg")`,
			}}
		>
			<Inner title={title} buttons={buttons}>
				{children}
			</Inner>
		</div>
	);
}

function Inner({
	title,
	children,
	buttons,
}: {
	title: ReactNode;
	children: ReactNode;
	buttons: ReactNode;
}) {
	return (
		<div className="relative pt-6 pb-12 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
			<div className="mt-10 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 xl:mt-28">
				<div className="text-center">
					<h2 className="text-4xl tracking-tight leading-10 font-extrabold text-gray-100 sm:text-5xl sm:leading-none md:text-6xl">
						{title}
					</h2>
					<p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
						{children}
					</p>
				</div>
				{buttons}
			</div>
		</div>
	);
}
