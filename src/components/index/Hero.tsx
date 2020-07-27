import React from "react";
export default function Hero({
	aboutRef,
	joinRef,
}: {
	aboutRef: React.Ref<HTMLDivElement>; // ref to the about element for scrolling
	joinRef: React.Ref<HTMLDivElement>;
}) {
	return (
		<div className="relative bg-white overflow-hidden">
			<div className="max-w-screen-xl mx-auto">
				<div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
					<svg
						className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
						fill="currentColor"
						viewBox="0 0 100 100"
						preserveAspectRatio="none"
					>
						<polygon points="50,0 100,0 50,100 0,100" />
					</svg>

					<div className="relative pt-6 px-4 sm:px-6 lg:px-8" />

					<main className="mt-10 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
						<div className="sm:text-center lg:text-left">
							<h2 className="text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
								Build real-world{" "}
								<span className="text-indigo-600">
									leadership skills
								</span>.
							</h2>
							<p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
								Monta Vista Model UN a close-knit community that strives to provide experiences in teamwork, negotiation, and diplomacy by simulating the United Nations.
							</p>
							<div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
								<div className="rounded-md shadow">
									<button
										className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
										onClick={() =>
											joinRef &&
											// eslint-disable-next-line @typescript-eslint/ban-ts-comment
											// @ts-ignore
											joinRef.current.scrollIntoView({
												behavior: "smooth",
											})
										}
									>
										Join Us
									</button>
								</div>
								<div className="mt-3 sm:mt-0 sm:ml-3 ">
									<button
										className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-300 transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
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
					</main>
				</div>
			</div>
			<div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
				<img
					className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
					src="https://scontent-sjc3-1.xx.fbcdn.net/v/t1.0-9/p960x960/84347383_185126385916191_4275987186978914304_o.jpg?_nc_cat=107&_nc_sid=730e14&_nc_ohc=5GidYRT9pt8AX89gE95&_nc_ht=scontent-sjc3-1.xx&_nc_tp=6&oh=6509163283c87102ad36a249fc1b4643&oe=5F219892"
					alt=""
				/>
			</div>
		</div>
	);
}
