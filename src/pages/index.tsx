import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";

function IndexPage(): React.ReactElement {
	return (
		<Layout empty>
			<SEO
				keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
				title="Home"
			/>
			<div className="relative bg-white overflow-hidden">
				<div className="max-w-screen-xl mx-auto ">
					<div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
						<svg
							className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
							fill="currentColor"
							viewBox="0 0 100 100"
							preserveAspectRatio="none"
						>
							<polygon points="50,0 100,0 50,100 0,100" />
						</svg>

						<div className="relative pt-6 px-4 sm:px-6 lg:px-8">
							<nav className="relative flex items-center justify-between sm:h-10 lg:justify-start">
								<div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
									<div className="flex items-center justify-between w-full md:w-auto">
										<a href="#" aria-label="Home">
											<img
												className="h-8 w-auto sm:h-10"
												src="/images/logo.png"
												alt="Logo"
											/>
										</a>
										<div className="-mr-2 flex items-center md:hidden">
											<button
												type="button"
												className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
												id="main-menu"
												aria-label="Main menu"
												aria-haspopup="true"
											>
												<svg
													className="h-6 w-6"
													stroke="currentColor"
													fill="none"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M4 6h16M4 12h16M4 18h16"
													/>
												</svg>
											</button>
										</div>
									</div>
								</div>
								<div className="hidden md:block md:ml-10 md:pr-4">
									<a
										href="#"
										className="ml-8 font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out"
									>
										Marketplace
									</a>
									<a
										href="#"
										className="ml-8 font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out"
									>
										Company
									</a>
									<a
										href="#"
										className="ml-8 font-medium text-indigo-600 hover:text-indigo-900 transition duration-150 ease-in-out"
									>
										Log in
									</a>
								</div>
							</nav>
						</div>

						{/*<!--*/}
						{/*  Mobile menu, show/hide based on menu open state.*/}

						{/*  Entering: "duration-150 ease-out"*/}
						{/*    From: "opacity-0 scale-95"*/}
						{/*    To: "opacity-100 scale-100"*/}
						{/*  Leaving: "duration-100 ease-in"*/}
						{/*    From: "opacity-100 scale-100"*/}
						{/*    To: "opacity-0 scale-95"*/}
						{/*-->*/}
						<div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
							<div className="rounded-lg shadow-md">
								<div
									className="rounded-lg bg-white shadow-xs overflow-hidden"
									role="menu"
									aria-orientation="vertical"
									aria-labelledby="main-menu"
								>
									<div className="px-5 pt-4 flex items-center justify-between">
										<div>
											<img
												className="h-8 w-auto"
												src="/images/logo.png"
												alt=""
											/>
										</div>
										<div className="-mr-2">
											<button
												type="button"
												className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
												aria-label="Close menu"
											>
												<svg
													className="h-6 w-6"
													stroke="currentColor"
													fill="none"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M6 18L18 6M6 6l12 12"
													/>
												</svg>
											</button>
										</div>
									</div>
									<div className="px-2 pt-2 pb-3">
										<a
											href="#"
											className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out"
											role="menuitem"
										>
											Product
										</a>
										<a
											href="#"
											className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out"
											role="menuitem"
										>
											Features
										</a>
										<a
											href="#"
											className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out"
											role="menuitem"
										>
											Marketplace
										</a>
										<a
											href="#"
											className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out"
											role="menuitem"
										>
											Company
										</a>
									</div>
									<div>
										<a
											href="#"
											className="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100 hover:text-indigo-700 focus:outline-none focus:bg-gray-100 focus:text-indigo-700 transition duration-150 ease-in-out"
											role="menuitem"
										>
											Log in
										</a>
									</div>
								</div>
							</div>
						</div>

						<main className="mt-10 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
							<div className="sm:text-center lg:text-left">
								<h2 className="text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
									<span className="text-indigo-600">
										Monta Vista
									</span>
									<br />
									Model United Nations
								</h2>
								<p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
									Anim aute id magna aliqua ad ad non deserunt
									sunt. Qui irure qui lorem cupidatat commodo.
									Elit sunt amet fugiat veniam occaecat fugiat
									aliqua.
								</p>
								<div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
									<div className="rounded-md shadow">
										<a
											href="#"
											className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
										>
											Get started
										</a>
									</div>
									<div className="mt-3 sm:mt-0 sm:ml-3">
										<a
											href="#"
											className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-300 transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
										>
											Live demo
										</a>
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
			<div className="bg-gray-800">
				<div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center">
					<div className="lg:w-0 lg:flex-1">
						<h2
							className="text-3xl leading-9 font-extrabold tracking-tight text-white sm:text-4xl sm:leading-10"
							id="newsletter-headline"
						>
							Interested? Sign up for our summer updates
						</h2>
						<p className="mt-3 max-w-3xl text-lg leading-6 text-gray-300">
							Anim aute id magna aliqua ad ad non deserunt sunt.
							Qui irure qui Lorem cupidatat commodo. Elit sunt
							amet fugiat veniam occaecat fugiat.
						</p>
					</div>
					<div className="mt-8 lg:mt-0 lg:ml-8">
						<form
							className="sm:flex"
							aria-labelledby="newsletter-headline"
						>
							<input
								aria-label="Email address"
								type="email"
								required
								className="appearance-none w-full px-5 py-3 border border-transparent text-base leading-6 rounded-md text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 transition duration-150 ease-in-out sm:max-w-xs"
								placeholder="Enter your email"
							/>
							<div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
								<button className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-400 focus:outline-none focus:bg-indigo-400 transition duration-150 ease-in-out">
									Join
								</button>
							</div>
						</form>
						<p className="mt-3 text-sm leading-5 text-gray-300">
							You can unsubscribe at any time. Your email
							won&apos;t be shared with anyone.
						</p>
					</div>
				</div>
			</div>
		</Layout>
	);
}

export default IndexPage;
