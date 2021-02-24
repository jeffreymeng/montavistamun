import { User } from "firebase";
import { Field } from "formik";
import { Link } from "gatsby";
import React from "react";
import Select from "react-select";
import * as Yup from "yup";
import InputGroup from "../../shared/InputGroup";
import RegisterFormSection from "../RegisterFormSection";
import stateOptions from "../stateOptions";

interface PersonalInformation {
	phone: string;
	addressOne: string;
	addressTwo: string;
	city: string;
	state: string;
	zip: string;
}
const formatPhoneNumber = (phoneNumber: string) => {
	let stripped = phoneNumber.replace(/\D/g, "");
	if (stripped.length === 11) {
		stripped = stripped.substring(1);
	}
	return `(${stripped.substring(0, 3)}) ${stripped.substring(
		3,
		6
	)}-${stripped.substring(6, 10)}`;
};
export default function PersonalInformationSection({
	data,
	setStepHasChanges,
	handleUpdateData,
	setStep,
	setMaxStep,
	user,
}: {
	user?: User;
	data?: PersonalInformation;
	handleUpdateData: (
		name: string,
		data: PersonalInformation
	) => Promise<void>;
	setStepHasChanges: (hasChanges: boolean) => void;
	setStep: (step: number) => void;
	setMaxStep: (fn: (oldMaxStep: number) => number) => void;
}) {
	const userLoading = !user;
	return (
		<RegisterFormSection<PersonalInformation>
			user={user}
			title={"Personal Information"}
			data={data}
			onSubmit={(data: PersonalInformation) =>
				handleUpdateData("personalInformation", {
					...data,
					phone: formatPhoneNumber(data.phone),
					zip:
						data.zip.length === 9
							? `${data.zip.substring(0, 5)}-${data.zip.substring(
									5,
									9
							  )}`
							: data.zip,
				})
			}
			onHasChangesChange={(hasChanges: boolean) =>
				setStepHasChanges(hasChanges)
			}
			onContinue={() => {
				setStep(1);
				setMaxStep((old: number) => Math.max(old, 1));
			}}
			schema={Yup.object().shape({
				phone: Yup.string()
					.test(
						"is a phone number",
						"This phone number doesn't look valid! Try using the format (xxx) xxx-xxxx.",
						(v) =>
							!!v && /^1?\d{10}$/.test(v.replace(/[^\d\w]/g, ""))
					)
					.required(
						"Please enter the emergency contact's phone number."
					),
				addressOne: Yup.string()
					.min(5, "That doesn't look like a real address")
					.max(128, "Your address is too long")
					.required(
						"Please enter a valid address, including your house number and street"
					),
				city: Yup.string()
					.min(3, "That doesn't look like a real city")
					.max(128, "Your city is too long")
					.required("Please enter a city"),
				state: Yup.string().required("Please enter a state"),
				zip: Yup.string()
					.matches(
						/(^\d{5}$)|(^\d{9}$)|(^\d{5}-\d{4}$)/,
						"Please enter a valid 5 or 9 digit zip code"
					)
					.required("Please enter a valid 5 or 9 digit zip code"),
			})}
			loadingValues={{
				phone: "Loading...",
				addressOne: "Loading...",
				addressTwo: "Loading...",
				city: "Loading...",
				state: "Loading...",
				zip: "Loading...",
			}}
		>
			{({
				errors,
				canEdit,
				touched,
				values,
				setFieldValue,
				setFieldTouched,
			}) => (
				<>
					<Field
						as={InputGroup}
						className="col-span-6 sm:col-span-3"
						label={"First Name"}
						hideHelpTextIfError
						value={
							userLoading
								? "Loading..."
								: user?.displayName?.split(" ")[0] || "Not Set"
						}
						disabled
					/>
					<Field
						as={InputGroup}
						className="col-span-6 sm:col-span-3"
						label={"Last Name"}
						disabled
						value={
							userLoading
								? "Loading..."
								: user?.displayName
										?.split(" ")
										.slice(1)
										.join(" ") || "Not Set"
						}
					/>
					<Field
						as={InputGroup}
						className="col-span-6 sm:col-span-4"
						label={"Email"}
						name={"email"}
						disabled
						value={
							userLoading
								? "Loading..."
								: user?.email || "Not Set"
						}
						helpText={
							<>
								To edit your name or email, go to{" "}
								<Link to={"/account/settings"} className="link">
									Account Settings
								</Link>
								.
							</>
						}
					/>
					<Field
						as={InputGroup}
						className="col-span-6"
						label={"Your Phone Number"}
						hint={"Any 10 or 11 digit format"}
						name={"phone"}
						disabled={!canEdit}
						invalid={errors.phone && !!touched.phone}
						error={errors.phone}
					/>
					<div className="col-span-6">
						<Field
							as={InputGroup}
							label={"Street Address"}
							name={"addressOne"}
							placeholder={"Street and Number"}
							disabled={!canEdit}
							invalid={errors.addressOne && !!touched.addressOne}
							error={errors.addressOne}
						/>
						<Field
							className={"mt-2"}
							as={InputGroup}
							id={"address-two"}
							name={"addressTwo"}
							placeholder={
								"Apartment, suite, unit, building, etc. (Optional)"
							}
							disabled={!canEdit}
							invalid={errors.addressTwo && !!touched.addressTwo}
							error={errors.addressTwo}
						/>
					</div>
					<Field
						as={InputGroup}
						className="col-span-6 sm:col-span-3 lg:col-span-2"
						label={"City"}
						name={"city"}
						disabled={!canEdit}
						invalid={errors.city && !!touched.city}
						error={errors.city}
					/>
					<div className={"col-span-6 sm:col-span-3 lg:col-span-2"}>
						<label
							className={
								"block text-sm font-medium leading-5 text-gray-700 "
							}
						>
							State
						</label>
						<Select
							isDisabled={!canEdit}
							options={stateOptions}
							className="mt-1"
							{...(typeof window === "undefined"
								? {}
								: { menuPortalTarget: document.body })}
							styles={{
								menuPortal: (base) => ({
									...base,
									zIndex: 9999,
								}),
								input: (provided) => ({
									...provided,
									borderStyle: "none !important",
									outline: "2px solid transparent !important",
									outlineOffset: "2px !important",
									boxShadow: "none !important",
									"--tw-ring-color": "transparent !important",
								}),
							}}
							value={stateOptions.find(
								(o) =>
									o.value === values.state ||
									// before adding this select, we encouraged full state names.
									o.label.toLowerCase() ===
										values.state.toLowerCase()
							)}
							onChange={(v) =>
								setFieldValue(
									"state",
									Array.isArray(v) ? v[0].value : v.value
								)
							}
							onBlur={() => setFieldTouched("state")}
							invalid={errors.state && !!touched.state}
							error={errors.state}
						/>
						{errors.state && !!touched.state && (
							<p className={"mt-2 text-sm text-red-600"}>
								{errors.state}
							</p>
						)}
					</div>
					<Field
						as={InputGroup}
						className="col-span-6 sm:col-span-3 lg:col-span-2"
						label={"Zip Code"}
						name={"zip"}
						disabled={!canEdit}
						invalid={errors.zip && !!touched.zip}
						error={errors.zip}
					/>
				</>
			)}
		</RegisterFormSection>
	);
}
