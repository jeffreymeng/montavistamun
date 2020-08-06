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
											<svg
												aria-hidden="true"
												focusable="false"
												data-prefix="far"
												data-icon="handshake"
												className="svg-inline--fa fa-handshake fa-w-20"
												role="img"
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 640 512"
											>
												<path
													fill="currentColor"
													d="M519.2 127.9l-47.6-47.6A56.252 56.252 0 0 0 432 64H205.2c-14.8 0-29.1 5.9-39.6 16.3L118 127.9H0v255.7h64c17.6 0 31.8-14.2 31.9-31.7h9.1l84.6 76.4c30.9 25.1 73.8 25.7 105.6 3.8 12.5 10.8 26 15.9 41.1 15.9 18.2 0 35.3-7.4 48.8-24 22.1 8.7 48.2 2.6 64-16.8l26.2-32.3c5.6-6.9 9.1-14.8 10.9-23h57.9c.1 17.5 14.4 31.7 31.9 31.7h64V127.9H519.2zM48 351.6c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16c0 8.9-7.2 16-16 16zm390-6.9l-26.1 32.2c-2.8 3.4-7.8 4-11.3 1.2l-23.9-19.4-30 36.5c-6 7.3-15 4.8-18 2.4l-36.8-31.5-15.6 19.2c-13.9 17.1-39.2 19.7-55.3 6.6l-97.3-88H96V175.8h41.9l61.7-61.6c2-.8 3.7-1.5 5.7-2.3H262l-38.7 35.5c-29.4 26.9-31.1 72.3-4.4 101.3 14.8 16.2 61.2 41.2 101.5 4.4l8.2-7.5 108.2 87.8c3.4 2.8 3.9 7.9 1.2 11.3zm106-40.8h-69.2c-2.3-2.8-4.9-5.4-7.7-7.7l-102.7-83.4 12.5-11.4c6.5-6 7-16.1 1-22.6L367 167.1c-6-6.5-16.1-6.9-22.6-1l-55.2 50.6c-9.5 8.7-25.7 9.4-34.6 0-9.3-9.9-8.5-25.1 1.2-33.9l65.6-60.1c7.4-6.8 17-10.5 27-10.5l83.7-.2c2.1 0 4.1.8 5.5 2.3l61.7 61.6H544v128zm48 47.7c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16c0 8.9-7.2 16-16 16z"
												></path>
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
											<Icons.GlobeAlt className="h-6 w-6" />
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
												<Icons.UserGroup className="h-6 w-6" />
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
												<Icons.Library className="h-6 w-6" />
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
