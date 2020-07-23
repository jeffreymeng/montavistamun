import React from "react";
import Layout from "../components/layout";

export default function AboutPage(): React.ReactElement {
	return (
		<Layout title={"About"}>
			<h1>Hello</h1>
			<label className="block">
				<span className="text-gray-700">Name</span>
				<input
					className="form-input mt-1 block w-full"
					placeholder="Jane Doe"
				/>
			</label>

			<div className="mt-4">
				<span className="text-gray-700">Account Type</span>
				<div className="mt-2">
					<label className="inline-flex items-center">
						<input
							type="radio"
							className="form-radio"
							name="accountType"
							value="personal"
						/>
						<span className="ml-2">Personal</span>
					</label>
					<label className="inline-flex items-center ml-6">
						<input
							type="radio"
							className="form-radio"
							name="accountType"
							value="busines"
						/>
						<span className="ml-2">Business</span>
					</label>
				</div>
			</div>

			<label className="block mt-4">
				<span className="text-gray-700">Requested Limit</span>
				<select className="form-select mt-1 block w-full">
					<option>$1,000</option>
					<option>$5,000</option>
					<option>$10,000</option>
					<option>$25,000</option>
				</select>
			</label>

			<div className="flex mt-6">
				<label className="flex items-center">
					<input type="checkbox" className="form-checkbox" />
					<span className="ml-2">
						I agree to the{" "}
						<span className="underline">privacy policy</span>
					</span>
				</label>
			</div>
		</Layout>
	);
}
