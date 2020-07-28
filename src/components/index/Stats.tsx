import React from "react";

export default function Stats(): React.ReactElement {
	return (
		<div className="bg-indigo-800">
			<div className="max-w-screen-xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
				<div className="max-w-4xl mx-auto text-center">
					<h2 className="text-3xl leading-9 font-extrabold text-white sm:text-4xl sm:leading-10">
						By The Numbers
					</h2>
					<p className="mt-3 text-xl leading-7 text-indigo-200 sm:mt-4">
						Lorum Ipsum
					</p>
				</div>
				<dl className="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-8">
					<div className="flex flex-col">
						<dt className="order-2 mt-2 text-lg leading-6 font-medium text-indigo-200">
							Members
						</dt>
						<dd className="order-1 text-5xl leading-none font-extrabold text-white">
							1000
						</dd>
					</div>
					<div className="flex flex-col mt-10 sm:mt-0">
						<dt className="order-2 mt-2 text-lg leading-6 font-medium text-indigo-200">
							Average Award Rate
						</dt>
						<dd className="order-1 text-5xl leading-none font-extrabold text-white">
							110%
						</dd>
					</div>
					<div className="flex flex-col mt-10 sm:mt-0">
						<dt className="order-2 mt-2 text-lg leading-6 font-medium text-indigo-200">
							Award Winning Club and Community
						</dt>
						<dd className="order-1 text-5xl leading-none font-extrabold text-white">
							1
						</dd>
					</div>
				</dl>
			</div>
		</div>
	);
}
