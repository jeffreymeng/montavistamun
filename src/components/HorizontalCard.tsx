import Img, { FluidObject } from "gatsby-image";
import React from "react";

export default function HorizontalCard({
	subtitle,
	title,
	image,
	children,
	buttonText,
}: {
	image: {
		childImageSharp: {
			fluid: FluidObject;
		};
	};
	title: React.ReactNode; // (can be string)
	children: React.ReactNode;
	subtitle: React.ReactNode;
	buttonText?: string;
}) {
	return (
		<div className="max-w-sm w-full md:max-w-full md:flex my-10 mx-auto">
			<div className="h-64 md:h-auto md:w-64 flex-none bg-cover rounded-t md:rounded-t-none md:rounded-l text-center overflow-hidden">
				<Img
					className={"w-full h-full"}
					fluid={image.childImageSharp.fluid}
				/>
			</div>
			<div className="border-r border-b border-l border-gray-300 md:border-l-0 md:border-t md:border-gray-300 bg-white rounded-b md:rounded-b-none md:rounded-r p-4 flex flex-col justify-between leading-normal">
				<div className={`mb-${buttonText ? "2" : "4"}`}>
					<p className="text-md text-gray-600 flex items-center font-semibold">
						{subtitle}
					</p>
					<div className="text-gray-900 font-bold text-xl mb-2">
						{title}
					</div>
					{typeof children === "string" ? (
						<p className="text-gray-700 text-base">{children}</p>
					) : (
						<div className={"text-gray-700 text-base"}>
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
