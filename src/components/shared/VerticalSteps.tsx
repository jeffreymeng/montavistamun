import * as Icons from "heroicons-react";
import React from "react";

export default function VerticalSteps({
	steps,
	currentStep,
	maxSwitchableStep,
	onStepSwitch,
}: {
	/**
	 * The title and description for each step.
	 */
	steps: {
		title: string;
		description: string;
	}[];
	/**
	 * The current active step. This is 0-indexed and corresponds to the step array.
	 */
	currentStep: number;
	/**
	 * The index of the maximum step that the user can switch to. By default, this is equal to the current step.
	 * If this is set to a number less than the current step, it will be set to the current step.
	 */
	maxSwitchableStep?: number;

	/**
	 * A callback that will be called when the user clicks on a step that is not the current step and less than the max switchable step.
	 * @param step - the 0-indexed index of the step that was clicked.
	 */
	onStepSwitch?: (step: number) => void;
}) {
	if (!maxSwitchableStep || maxSwitchableStep < currentStep) {
		maxSwitchableStep = currentStep;
	}
	if (maxSwitchableStep === undefined) {
		throw new Error("maxswitchablestep should not be undefined");
	}
	return (
		<nav className={"pt-8"}>
			<ul className="overflow-hidden">
				{steps.map(({ title, description }, i) => (
					<li
						className={
							"relative " +
							(i === steps.length - 1 ? "" : "pb-10")
						}
						key={title + " " + description}
					>
						{i !== steps.length - 1 && (
							<div
								className={
									"-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full " +
									(i < currentStep
										? "bg-indigo-600"
										: i <
										  maxSwitchableStep /* because the line is attached to the element before*/
										? "bg-gray-400"
										: "bg-gray-300")
								}
							/>
						)}

						<button
							onClick={
								i === currentStep || i > maxSwitchableStep
									? undefined
									: () => {
											if (onStepSwitch) onStepSwitch(i);
									  }
							}
							className={
								"relative flex items-start space-x-4 group focus:outline-none text-left " +
								(i > maxSwitchableStep || i === currentStep
									? "cursor-default"
									: "")
							}
						>
							<div className="h-9 flex items-center">
								<span
									className={
										"relative z-10 w-8 h-8 flex items-center justify-center rounded-full " +
										(i !== currentStep
											? "transition ease-in-out duration-150 "
											: "") +
										(i >= currentStep
											? "bg-white border-2 "
											: "") +
										(i <= currentStep
											? "border-indigo-600 "
											: "") +
										(i < currentStep ||
										(i < maxSwitchableStep &&
											i !== currentStep)
											? "bg-indigo-600 group-hover:bg-indigo-800 group-focus:bg-indigo-800 "
											: "") +
										(i > currentStep
											? "border-gray-300 " +
											  (i <= maxSwitchableStep
													? "border-gray-400"
													: "")
											: "")
									}
								>
									{i !== currentStep &&
									i < maxSwitchableStep ? (
										<Icons.Check className="w-5 h-5 text-white" />
									) : i === currentStep ? (
										<span className="h-2.5 w-2.5 bg-indigo-600 rounded-full"></span>
									) : i > currentStep &&
									  i <= maxSwitchableStep ? (
										<span className="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300 group-focus:bg-gray-300 transition ease-in-out duration-150"></span>
									) : (
										<span className="h-2.5 w-2.5 bg-transparent rounded-full"></span>
									)}
								</span>
							</div>
							<div className="min-w-0">
								<h3 className="text-xs leading-4 font-semibold uppercase tracking-wide">
									{title}
								</h3>
								<p className="text-sm leading-5 text-gray-500">
									{description}
								</p>
							</div>
						</button>

						{i !== currentStep && (
							<a
								href="/"
								className="relative flex items-start space-x-4 group focus:outline-none"
							></a>
						)}
					</li>
				))}
			</ul>
		</nav>
	);
}
