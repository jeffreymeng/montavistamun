import { Link } from "gatsby";
import React from "react";
import Video from "./hero/Video";

export default function Hero({
	aboutRef,
}: {
	aboutRef: React.Ref<HTMLDivElement>; // ref to the about element for scrolling
}): React.ReactElement {
	return (
		<div className="relative overflow-hidden bg-white">
			<div className="hidden lg:block lg:absolute lg:inset-0">
				<svg
					className="absolute top-0 transform translate-x-64 -translate-y-8 left-1/2"
					width="640"
					height="784"
					fill="none"
					viewBox="0 0 640 784"
				>
					<defs>
						<pattern
							id="9ebea6f4-a1f5-4d96-8c4e-4c2abf658047"
							x="118"
							y="0"
							width="20"
							height="20"
							patternUnits="userSpaceOnUse"
						>
							<rect
								x="0"
								y="0"
								width="4"
								height="4"
								className="text-gray-200"
								fill="currentColor"
							/>
						</pattern>
					</defs>
					<rect
						y="72"
						width="640"
						height="640"
						className="text-gray-50"
						fill="currentColor"
					/>
					<rect
						x="118"
						width="404"
						height="784"
						fill="url(#9ebea6f4-a1f5-4d96-8c4e-4c2abf658047)"
					/>
				</svg>
			</div>
			<div className="relative pt-6 pb-16 md:pb-20 lg:pb-24 xl:pb-32">
				<main className="max-w-screen-xl px-4 mx-auto mt-8 sm:mt-12 sm:px-6 md:mt-20 xl:mt-24">
					<div className="lg:grid lg:grid-cols-12 lg:gap-8">
						<div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
							<h2 className="text-4xl font-extrabold leading-10 tracking-tight text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
								<span className="text-indigo-600">
									Stand out
								</span>{" "}
								from the crowd.
							</h2>
							<p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
								We’re a close-knit community that strives for
								experiences in leadership, diplomacy, and
								problem-solving by simulating the United
								Nations.
							</p>
							{/* <p className="mt-3 text-base font-bold text-indigo-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
								Meetings every Thursday at lunch in C207!
							</p> */}
							<div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
								<div className="rounded-md shadow">
									<Link
										className="flex items-center justify-center w-full px-8 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:ring-indigo-500 md:py-4 md:text-lg md:px-10"
										to={"/account/create"}
									>
										Join Us
									</Link>
								</div>
								<div className="mt-3 sm:mt-0 sm:ml-3 ">
									<button
										className="flex items-center justify-center w-full px-8 py-3 text-base font-medium leading-6 text-indigo-700 transition duration-150 ease-in-out bg-indigo-100 border border-transparent rounded-md hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-indigo-500 focus:border-indigo-300 md:py-4 md:text-lg md:px-10"
										onClick={() =>
											aboutRef &&
											// eslint-disable-next-line @typescript-eslint/ban-ts-comment
											// @ts-ignore
											aboutRef.current.scrollIntoView({
												behavior: "smooth",
											})
										}
									>
										Read More
									</button>
								</div>
							</div>
						</div>
						<div className="relative mt-12 sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
							<svg
								className="absolute top-0 origin-top transform scale-75 -translate-x-1/2 -translate-y-8 left-1/2 sm:scale-100 lg:hidden"
								width="640"
								height="784"
								fill="none"
								viewBox="0 0 640 784"
							>
								<defs>
									<pattern
										id="4f4f415c-a0e9-44c2-9601-6ded5a34a13e"
										x="118"
										y="0"
										width="20"
										height="20"
										patternUnits="userSpaceOnUse"
									>
										<rect
											x="0"
											y="0"
											width="4"
											height="4"
											className="text-gray-200"
											fill="currentColor"
										/>
									</pattern>
								</defs>
								<rect
									y="72"
									width="640"
									height="640"
									className="text-gray-50"
									fill="currentColor"
								/>
								<rect
									x="118"
									width="404"
									height="784"
									fill="url(#4f4f415c-a0e9-44c2-9601-6ded5a34a13e)"
								/>
							</svg>
							<Video />
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}
