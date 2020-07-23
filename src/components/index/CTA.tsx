import React from "react";
import BodyClassName from "react-body-classname";
import { Transition } from "react-transition-group";
import classNames from "classnames";

export default function CTA() {
	const [joinModalOpen, setJoinModalOpen] = React.useState(false);

	return (
		<>
			{joinModalOpen && <BodyClassName className="overflow-hidden" />}
			<div className="bg-gray-800">
				<div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
					<h2 className="text-3xl leading-9 font-extrabold tracking-tight text-white sm:text-4xl sm:leading-10">
						Ready to start your MUN journey?
						<br />
						<span className="text-indigo-600">
							Join our mailing list to start recieving club
							updates
						</span>
					</h2>
					<div className="mt-8 flex lg:flex-shrink-0 lg:mt-0">
						<div className="inline-flex rounded-md shadow">
							<a
								className="inline-flex items-center justify-center px-10 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
								href={
									"https://mailchi.mp/5f90451e7053/2020-21-signups"
								}
								target={"_blank"}
								rel={"noopener noreferrer"}
							>
								Join
							</a>
						</div>
						<div className="ml-3 inline-flex rounded-md shadow">
							<a
								href="#"
								className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-600 bg-white hover:text-indigo-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
							>
								Learn more
							</a>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
