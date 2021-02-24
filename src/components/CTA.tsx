import { Link } from "gatsby";
import React, { useState } from "react";
export default function CTA(): React.ReactElement {
	const [error, setError] = useState("");
	const [submitting, setSubmitting] = useState(false);
	const [success, setSuccess] = useState(false);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [grade, setGrade] = useState("");

	return (
		<div className="bg-gray-50">
			<div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
				<h2 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
					Ready to start your MUN journey?
					<br />
					<span className="text-indigo-600">
						Join MV Model UN Today
					</span>
				</h2>
				<div className="mt-8 flex lg:flex-shrink-0 lg:mt-0">
					<div className="inline-flex rounded-md shadow">
						<Link
							to="/account/create"
							className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring transition duration-150 ease-in-out"
						>
							Join Today
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
