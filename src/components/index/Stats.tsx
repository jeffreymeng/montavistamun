import React from "react";

export default function Stats(): React.ReactElement {
	return (
		<div className="bg-indigo-800">
			<div className="max-w-screen-xl px-4 py-12 mx-auto sm:py-16 sm:px-6 lg:px-8 lg:py-20">
				<div className="max-w-4xl mx-auto text-center">
					<h2 className="text-3xl font-extrabold leading-9 text-white sm:text-4xl sm:leading-10">
						By The Numbers
					</h2>
				</div>
				<dl className="mt-10 text-center sm:max-w-4xl sm:mx-auto sm:grid sm:grid-cols-4 sm:gap-8">
					<div className="flex flex-col">
						<dt className="order-2 mt-2 text-lg font-medium leading-6 text-indigo-200">
							International Delegation
							{/*(Best Delegate Rankings)*/}
						</dt>
						<dd className="order-1 text-5xl font-extrabold leading-none tracking-tight text-white">
							Top 50
						</dd>
					</div>
					<div className="flex flex-col mt-10 sm:mt-0">
						<dt className="order-2 mt-2 text-lg font-medium leading-6 text-indigo-200">
							Members
						</dt>
						<dd className="order-1 text-5xl font-extrabold leading-none text-white">
							100+
						</dd>
					</div>
					<div className="flex flex-col mt-10 sm:mt-0">
						<dt className="order-2 mt-2 text-lg font-medium leading-6 text-indigo-200">
							To Join
						</dt>
						<dd className="order-1 text-5xl font-extrabold leading-none text-white">
							$0
						</dd>
					</div>
					<div className="flex flex-col mt-10 sm:mt-0">
						<dt className="order-2 mt-2 text-lg font-medium leading-6 text-indigo-200">
							Award Winning Club and Community
						</dt>
						<dd className="order-1 text-5xl font-extrabold leading-none text-white">
							1
						</dd>
					</div>
				</dl>
			</div>
		</div>
	);
}
