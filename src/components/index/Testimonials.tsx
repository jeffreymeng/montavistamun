import React from "react";
import Flickity from "react-flickity-component";
import "../../css/flickity.css";

function Testimonial({
	name,
	university,
	content,
}: {
	name: string;
	university: string;
	content: React.ReactNode;
}) {
	// return (
	// 	<>
	// 		<h1>{name}</h1>
	// 		<h3>{university}</h3>
	// 		<p>{content}</p>
	// 	</>
	// );
	return (
		<section className="w-full py-8 overflow-hidden md:py-12 lg:py-18">
			<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<svg
					className="absolute top-full right-full transform translate-x-1/3 -translate-y-1/4 lg:translate-x-1/2 xl:-translate-y-1/2"
					width={404}
					height={404}
					fill="none"
					viewBox="0 0 404 404"
					role="img"
					aria-labelledby="svg-workcation"
				>
					<defs>
						<pattern
							id="ad119f34-7694-4c31-947f-5c9d249b21f3"
							x={0}
							y={0}
							width={20}
							height={20}
							patternUnits="userSpaceOnUse"
						>
							<rect
								x={0}
								y={0}
								width={4}
								height={4}
								className="text-gray-200"
								fill="currentColor"
							/>
						</pattern>
					</defs>
					<rect
						width={404}
						height={404}
						fill="url(#ad119f34-7694-4c31-947f-5c9d249b21f3)"
					/>
				</svg>
				<div className="relative">
					<blockquote className="mt-10">
						<div className="max-w-3xl mx-auto text-center text-2xl leading-9 font-medium text-gray-900">
							<p>{content}</p>
						</div>
						<footer className="mt-8">
							<div className="md:flex md:items-center md:justify-center">
								<div className="mt-3 text-center md:mt-0 md:ml-4 md:flex md:items-center">
									<div className="text-base font-medium text-gray-900">
										{name}
									</div>
									<svg
										className="hidden md:block mx-1 h-5 w-5 text-indigo-600"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path d="M11 0h3L9 20H6l5-20z" />
									</svg>
									<div className="text-base font-medium text-gray-500">
										{university}
									</div>{" "}
								</div>
							</div>
						</footer>
					</blockquote>
				</div>
			</div>
		</section>
	);
}
export default function TestimonialsSection() {
	return (
		<div className={"bg-gray-100 pb-16"}>
			<Flickity
				className={"carousel"} // default ''
				elementType={"div"} // default 'div'
				options={{ wrapAround: true }} // takes flickity options {}
				disableImagesLoaded={false} // default false
				reloadOnUpdate // default false
				static // default false
			>
				<Testimonial
					name={"Parth Asawa"}
					university={"UC Berkeley MET"}
					content={
						<>
							One of the things Model UN gave me the most out of
							anything else was confidence. I used to go into
							presentations fretting and worrying about my lines,
							but after just one year in MUN, they became the
							thing I looked forward to the most. The confidence
							and general research + people skills you’ll learn in
							MV MUN are very very important skills that are
							applicable in almost every part of your life — even
							if you don’t intend on pursuing geopolitics as a
							career in the future. Joining MV MUN is a decision
							I’ll never regret.
						</>
					}
				/>
				<Testimonial
					name={" Eugene Yoon"}
					university={"CMU"}
					content={
						<>
							MUN was a pretty big turning point in my high school
							career because it helped me grow a voice and a
							passion for sustainable solutions for real-world
							problems — something that a lot of high school
							classes don't really touch on. By having a newfound
							perspective on the world I could approach a lot of
							problems in many different dimensions, even if not
							related to MUN itself.
						</>
					}
				/>
				<Testimonial
					name={"Nelson Mu"}
					university={"UC Santa Barbara"}
					content={
						<>
							Through my four years in MUN, I learned not just the
							leadership and speaking skills that are advertised,
							but so much more. I learned how to network with
							likeminded individuals, make new friends, and above
							all else, I learned that it was okay to not know the
							future for sure. No matter what twist or turn
							committee would take, I was trained to always land
							on my feet, even if things looked rough. ... Even for
							the most diehard STEMers, I guarantee that you'll
							gain something unexpected from your time in Model
							UN.
						</>
					}
				/>
			</Flickity>
		</div>
	);
}
