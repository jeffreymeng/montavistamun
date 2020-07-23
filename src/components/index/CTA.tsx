import React from "react";
import BodyClassName from "react-body-classname";
import { Transition } from "react-transition-group";
import classNames from "classnames";

export default function CTA() {
	const [erorr, setError] = React.useState(false);
	const [submitting, setSubmitting] = React.useState(false);
	const [firstName, setFirstName] = React.useState("");
	const [lastName, setLastName] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [grade, setGrade] = React.useState("");

	return (
		<div className="bg-gray-800 py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24">
			<div className="relative max-w-xl mx-auto">
				<div className="text-center">
					<h2 className="text-3xl leading-9 font-extrabold tracking-tight text-indigo-600 sm:text-4xl sm:leading-10">
						Ready to start your MUN journey?
					</h2>
					<p className="mt-4 text-lg leading-6 text-gray-300">
						Join our mailing list to start receiving club updates
					</p>
				</div>
				<div className="mt-12">
					<form
						action="#"
						method="POST"
						className="grid grid-cols-1 row-gap-6 sm:grid-cols-2 sm:col-gap-8"
					>
						<div>
							<label
								htmlFor="first_name"
								className="block text-sm font-medium leading-5 text-gray-300"
							>
								First name
							</label>
							<div className="mt-1 relative rounded-md shadow-sm">
								<input
									id="first_name"
									className="form-input py-3 px-4 block w-full transition ease-in-out duration-150"
									onChange={(e) =>
										setFirstName(e.target.value)
									}
									value={firstName}
								/>
							</div>
						</div>
						<div>
							<label
								htmlFor="last_name"
								className="block text-sm font-medium leading-5 text-gray-300"
							>
								Last name
							</label>
							<div className="mt-1 relative rounded-md shadow-sm">
								<input
									id="last_name"
									className="form-input py-3 px-4 block w-full transition ease-in-out duration-150"
									onChange={(e) =>
										setLastName(e.target.value)
									}
									value={lastName}
								/>
							</div>
						</div>
						<div className="sm:col-span-2">
							<label
								htmlFor="email"
								className="block text-sm font-medium leading-5 text-gray-300"
							>
								Email
							</label>
							<div className="mt-1 relative rounded-md shadow-sm">
								<input
									id="email"
									type="email"
									className="form-input py-3 px-4 block w-full transition ease-in-out duration-150"
									onChange={(e) => setEmail(e.target.value)}
									value={email}
								/>
							</div>
						</div>
						<div className="sm:col-span-2">
							<div>
								<label
									htmlFor="location"
									className="block text-sm leading-5 font-medium text-gray-300"
								>
									Grade (in fall)
								</label>
								<select
									id="location"
									className="mt-1 form-select block w-full pl-3 pr-10 py-3 text-base leading-6 border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
									onChange={(e) => setGrade(e.target.value)}
									value={grade}
								>
									<option value={""} selected disabled>
										Select An Option...
									</option>
									<option value={"9th"}>9th</option>
									<option value={"10th"}>10th</option>
									<option value={"11th"}>11th</option>
									<option value={"12th"}>12th</option>
								</select>
							</div>
						</div>

						<div className="sm:col-span-2">
							<span className="w-full inline-flex rounded-md shadow-sm">
								<button
									type="button"
									className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
									onClick={() => {
										console.log(
											firstName,
											lastName,
											email,
											grade
										);
									}}
								>
									Let&apos;s talk
								</button>
							</span>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
