import { graphql, useStaticQuery } from "gatsby";
import Img from "gatsby-image";
import * as Icons from "heroicons-react";
import React from "react";
export default function About({
	aboutRef,
}: {
	aboutRef: React.Ref<HTMLDivElement>;
}): React.ReactElement {
	const socialsImage = useStaticQuery(graphql`
		query {
			socialsImage: file(relativePath: { eq: "socials.png" }) {
				childImageSharp {
					fixed(width: 490) {
						...GatsbyImageSharpFixed
					}
				}
			}
		}
	`).socialsImage.childImageSharp.fixed;
	return (
		<div
			className="py-16 bg-gray-50 overflow-hidden lg:py-24"
			ref={aboutRef}
		>
			<div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-screen-xl">
				<svg
					className="hidden lg:block absolute left-full transform -translate-x-1/2 -translate-y-1/4"
					width="404"
					height="784"
					fill="none"
					viewBox="0 0 404 784"
				>
					<defs>
						<pattern
							id="b1e6e422-73f8-40a6-b5d9-c8586e37e0e7"
							x="0"
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
						width="404"
						height="784"
						fill="url(#b1e6e422-73f8-40a6-b5d9-c8586e37e0e7)"
					/>
				</svg>

				<div className="relative">
					<h3 className="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
						Club. Delegation. Community.
					</h3>
					<p className="mt-4 max-w-xl mx-auto text-center text-3xl leading-7 text-gray-500">
						This is what makes us different.
					</p>
				</div>

				<div className="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
					<div className="relative">
						<h4 className="text-2xl leading-8 font-extrabold text-gray-900 tracking-tight sm:text-3xl sm:leading-9">
							Build Lasting Skills
						</h4>
						<p className="mt-3 text-lg leading-7 text-gray-500">
							We aim to promote a wide range of skills while
							debating world affairs and leading others toward
							global solutions and individual goals. Our
							philosophy is centered around providing real
							experiences for our members and tackling real-world
							issues, in order to build a stronger sense of
							leadership and a better understanding of our world.
							There's so much more to global politics than giving
							speeches or debating policies; we provide our
							members with nuanced lessons from experienced
							veterans as well as plenty of practice at our
							conferences.
						</p>

						<ul className="mt-10">
							<li>
								<div className="flex">
									<div className="flex-shrink-0">
										<div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
											{/* todo: steal font awesome handshake icon from https://github.com/encharm/Font-Awesome-SVG-PNG/ */}
											<svg
												className="h-6 w-6"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
												/>
											</svg>
										</div>
									</div>
									<div className="ml-4">
										<h5 className="text-lg leading-6 font-medium text-gray-900">
											Develop Your Leadership Skills
										</h5>
										<p className="mt-2 text-base leading-6 text-gray-500">
											Working with others is a key part of
											Model UN. Our conferences offer a
											unique opportunity to practice
											working with others, honing your
											skills in negotiatin, and leading
											your peers.
										</p>
									</div>
								</div>
							</li>
							<li className="mt-10">
								<div className="flex">
									<div className="flex-shrink-0">
										{/* todo new icon?  light-bulb ??????? (think on the fly?) think there’s a lightning icon idk if that’s any better or worse */}
										<div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
											<Icons.LightBulb
												className={"h-6 w-6"}
											/>
										</div>
									</div>
									<div className="ml-4">
										<h5 className="text-lg leading-6 font-medium text-gray-900">
											Think on the Fly
										</h5>
										<p className="mt-2 text-base leading-6 text-gray-500">
											You might not think of Model UN as a
											fast-paced activity, but when
											participating, you always need to
											stay on your feet and be ready to
											adapt. It's why we're overhauling
											our approach to meetings,
											conferences, and more, in order to
											adapt to the global pandemic — but
											this isn’t as hard as it sounds!
											With a bit of practice in Model UN,
											you can learn to think on the fly as
											well… and it just might help you
											wing your next class presentation.
										</p>
									</div>
								</div>
							</li>
							<li className="mt-10">
								<div className="flex">
									<div className="flex-shrink-0">
										<div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
											<svg
												className="h-6 w-6"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M13 10V3L4 14h7v7l9-11h-7z"
												/>
											</svg>
										</div>
									</div>
									<div className="ml-4">
										<h5 className="text-lg leading-6 font-medium text-gray-900">
											Learn About the World
										</h5>
										<p className="mt-2 text-base leading-6 text-gray-500">
											In Model UN, you'll learn about some
											of the biggest issues our world
											faces — and you'll have a chance to
											come up with real solutions to those
											issues. In the process, working with
											delegates from around the world,
											you’ll gain a better understanding
											of global perspectives.
										</p>
									</div>
								</div>
							</li>
						</ul>
					</div>

					<div className="mt-10 -mx-4 relative lg:mt-0">
						<svg
							className="absolute left-1/2 transform -translate-x-1/2 translate-y-16 lg:hidden"
							width="784"
							height="404"
							fill="none"
							viewBox="0 0 784 404"
						>
							<defs>
								<pattern
									id="ca9667ae-9f92-4be7-abcb-9e3d727f2941"
									x="0"
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
								width="784"
								height="404"
								fill="url(#ca9667ae-9f92-4be7-abcb-9e3d727f2941)"
							/>
						</svg>
						<img
							className="relative mx-auto"
							width="490"
							src="https://www.un.org/en/ga/images/featured-image-index-new.jpg"
							alt=""
						/>
					</div>
				</div>

				<svg
					className="hidden lg:block absolute right-full transform translate-x-1/2 translate-y-12"
					width="404"
					height="784"
					fill="none"
					viewBox="0 0 404 784"
				>
					<defs>
						<pattern
							id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
							x="0"
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
						width="404"
						height="784"
						fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"
					/>
				</svg>

				<div className="relative mt-12 sm:mt-16 lg:mt-24">
					<div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
						<div className="lg:col-start-2">
							<h4 className="text-2xl leading-8 font-extrabold text-gray-900 tracking-tight sm:text-3xl sm:leading-9">
								Build Lasting Connections
							</h4>
							<p className="mt-3 text-lg leading-7 text-gray-500">
								It's not just the skills you'll learn in Model
								UN that will stay with you throughout your life;
								it's the connections as well. Many of us have
								made new friends — and we promise, you'll fit
								right in!
							</p>

							<ul className="mt-10">
								<li>
									<div className="flex">
										<div className="flex-shrink-0">
											<div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
												<svg
													className="h-6 w-6"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
													/>
												</svg>
											</div>
										</div>
										<div className="ml-4">
											<h5 className="text-lg leading-6 font-medium text-gray-900">
												Make New Friends
											</h5>
											<p className="mt-2 text-base leading-6 text-gray-500">
												We know most things are more fun
												when you do them with friends,
												and Model UN is no exception.
												But especially with online
												classes, we know that can be
												easier said than done. That's
												why we emphasize our club
												community not just in our social
												events, but in our regular club
												meetings as well.
											</p>
										</div>
									</div>
								</li>
								<li className="mt-10">
									<div className="flex">
										<div className="flex-shrink-0">
											<div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
												<svg
													className="h-6 w-6"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
													/>
												</svg>
											</div>
										</div>
										<div className="ml-4">
											<h5 className="text-lg leading-6 font-medium text-gray-900">
												Join Our Community
											</h5>
											<p className="mt-2 text-base leading-6 text-gray-500">
												Beyond meeting new friends, at
												MV Model UN you’ll also be
												joining a community of not just
												fellow delegates, but also
												veterans, mentors, and alumni.
												No matter who you are, our
												community will be here to
												support you. Everybody is
												welcome — don’t be shy!
											</p>
										</div>
									</div>
								</li>
							</ul>
						</div>

						<div className="mt-10 -mx-4 relative lg:mt-0 lg:col-start-1">
							<svg
								className="absolute left-1/2 transform -translate-x-1/2 translate-y-16 lg:hidden"
								width="784"
								height="404"
								fill="none"
								viewBox="0 0 784 404"
							>
								<defs>
									<pattern
										id="e80155a9-dfde-425a-b5ea-1f6fadd20131"
										x="0"
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
									width="784"
									height="404"
									fill="url(#e80155a9-dfde-425a-b5ea-1f6fadd20131)"
								/>
							</svg>
							<Img
								className="relative mx-auto"
								fixed={socialsImage}
								alt=""
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
