import Img, { FluidObject } from "gatsby-image";
import React from "react";

export default function HorizontalCard({
	subtitle,
	title,
	children,
	buttonText,
	large,
	...props
}: {
	title: React.ReactNode; // (can be string)
	children: React.ReactNode;
	subtitle: React.ReactNode;
	buttonText?: string;
	large?: boolean;
} & (
	| {
			imageURL?: undefined;
			image: {
				childImageSharp: {
					fluid: FluidObject;
				};
			};
	  }
	| {
			image?: undefined;
			imageURL: string;
	  }
)): React.ReactElement {
	return (
		<div className="max-w-sm w-full md:max-w-full md:flex my-10 mx-auto">
			<div
				className={
					"h-64 w-full md:w-64 md:h-auto flex-none bg-cover rounded-t md:rounded-t-none md:rounded-l text-center overflow-hidden " +
					(large ? "md:w-1/2" : "")
				}
			>
				{props.image ? (
					<Img
						className={"w-full h-full"}
						imgStyle={{
							objectPosition: "top",
						}}
						fluid={props.image.childImageSharp.fluid}
					/>
				) : (
					<img className={"w-full h-full"} src={props.imageURL} />
				)}
			</div>
			<div className="border-r border-b border-l border-gray-300 md:border-l-0 md:border-t md:border-gray-300 bg-white rounded-b md:rounded-b-none md:rounded-r p-4 flex flex-col justify-between leading-normal w-full">
				<div className={`mb-${buttonText ? "2" : "4"}`}>
					<p
						className={
							"text-md text-gray-600 flex items-center font-semibold " +
							(large ? "md:text-lg lg:text-xl" : "")
						}
					>
						{subtitle}
					</p>
					<div
						className={
							"text-gray-900 font-bold mb-2 " +
							(large ? "md:text-2xl lg:text-3xl" : "")
						}
					>
						{title}
					</div>
					{typeof children === "string" ? (
						<p
							className={
								"text-gray-700 text-base" +
								(large ? "md:text-lg lg:text-xl" : "")
							}
						>
							{children}
						</p>
					) : (
						<div
							className={
								"text-gray-700 text-base" +
								(large ? "md:text-lg lg:text-xl" : "")
							}
						>
							{children}
						</div>
					)}
					{buttonText && (
						<div className={"mt-4"}>
							<button
								type="button"
								className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
							>
								<span>{buttonText}</span>
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
