import { User } from "firebase";
import { Field } from "formik";
import React from "react";
import Select from "react-select";
import InputGroup from "../../shared/InputGroup";
import RegisterFormSection from "../RegisterFormSection";
import EmergencyInformationSchema from "../schema/EmergencyInformationSchema";
import stateOptions from "../stateOptions";

interface EmergencyInformation {
	contactOneName: string;
	contactOnePhone: string;
	contactOneEmail: string;
	contactOneRelationship: string;
	contactTwoName: string;
	contactTwoPhone: string;
	contactTwoRelationship: string;

	householdMainLanguage: string;

	healthInsuranceCarrier: string;
	healthInsurancePolicyNumber: string;
	healthInsuranceAddressOne: string;
	healthInsuranceAddressTwo: string;
	healthInsuranceCity: string;
	healthInsuranceState: string;
	healthInsuranceZip: string;
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
export default function EmergencyInformationSection({
	data,
	setStepHasChanges,
	handleUpdateData,
	setStep,
	setMaxStep,
	user,
	name,
	key,
}: {
	name: string;
	key: string;
	user: User;
	data?: EmergencyInformation;
	handleUpdateData: (
		name: string,
		data: EmergencyInformation
	) => Promise<void>;
	setStepHasChanges: (hasChanges: boolean) => void;
	setStep: (step: number) => void;
	setMaxStep: (fn: (oldMaxStep: number) => number) => void;
}) {
	return (
		<RegisterFormSection<EmergencyInformation>
			user={user}
			data={data}
			showBack
			onBack={() => setStep(0)}
			onSubmit={(data: EmergencyInformation) =>
				handleUpdateData("emergencyInformation", {
					...data,
					contactOnePhone: formatPhoneNumber(data.contactOnePhone),
					contactTwoPhone:
						data.contactTwoPhone &&
						formatPhoneNumber(data.contactTwoPhone),
					healthInsuranceZip:
						data.healthInsuranceZip.length === 9
							? `${data.healthInsuranceZip.substring(
									0,
									5
							  )}-${data.healthInsuranceZip.substring(5, 9)}`
							: data.healthInsuranceZip,
				})
			}
			onHasChangesChange={(hasChanges: boolean) =>
				setStepHasChanges(hasChanges)
			}
			onContinue={() => {
				setStep(2);
				setMaxStep((old: number) => Math.max(old, 2));
			}}
			schema={EmergencyInformationSchema}
			loadingValues={{
				contactOneName: "Loading...",
				contactOnePhone: "Loading...",
				contactOneEmail: "Loading...",
				contactOneRelationship: "Loading...",
				contactTwoName: "Loading...",
				contactTwoPhone: "Loading...",
				contactTwoRelationship: "Loading...",

				householdMainLanguage: "Loading...",

				healthInsuranceCarrier: "Loading...",
				healthInsurancePolicyNumber: "Loading...",
				healthInsuranceAddressOne: "Loading...",
				healthInsuranceAddressTwo: "Loading...",
				healthInsuranceCity: "Loading...",
				healthInsuranceState: "Loading...",
				healthInsuranceZip: "Loading...",
			}}
			title={"Emergency Information"}
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
					<div className="col-span-6 mt-4">
						<h3 className="text-lg leading-6 font-medium text-gray-900">
							Parent / Guardian Information (First Emergency
							Contact)
						</h3>
					</div>
					<Field
						as={InputGroup}
						className="col-span-6 sm:col-span-4"
						label={"Full Name"}
						name={"contactOneName"}
						disabled={!canEdit}
						invalid={
							errors.contactOneName && !!touched.contactOneName
						}
						error={errors.contactOneName}
					/>
					<Field
						as={InputGroup}
						className="col-span-6 sm:col-span-2"
						label={"Relationship to Participant"}
						name={"contactOneRelationship"}
						placeholder={"e.g. Mother, Father, Guardian"}
						disabled={!canEdit}
						invalid={
							errors.contactOneRelationship &&
							!!touched.contactOneRelationship
						}
						error={errors.contactOneRelationship}
					/>
					<Field
						as={InputGroup}
						className="col-span-3"
						label={"Email"}
						name={"contactOneEmail"}
						disabled={!canEdit}
						invalid={
							errors.contactOneEmail && !!touched.contactOneEmail
						}
						error={errors.contactOneEmail}
					/>
					<Field
						as={InputGroup}
						className="col-span-3"
						label={"Telephone Number"}
						hint={"Any 10 or 11 digit format"}
						name={"contactOnePhone"}
						disabled={!canEdit}
						invalid={
							errors.contactOnePhone && !!touched.contactOnePhone
						}
						error={errors.contactOnePhone}
					/>
					<Field
						as={InputGroup}
						className="col-span-6"
						label={"Main Language Spoken In Household"}
						name={"householdMainLanguage"}
						disabled={!canEdit}
						invalid={
							errors.householdMainLanguage &&
							!!touched.householdMainLanguage
						}
						error={errors.householdMainLanguage}
					/>
					<div className="col-span-6 mt-4">
						<h3 className="text-lg leading-6 font-medium text-gray-900">
							Second Emergency Contact (Optional)
						</h3>
					</div>
					<Field
						as={InputGroup}
						className="col-span-6 sm:col-span-4"
						label={"Full Name"}
						name={"contactTwoName"}
						disabled={!canEdit}
						invalid={
							errors.contactTwoName && !!touched.contactTwoName
						}
						error={errors.contactTwoName}
					/>
					<Field
						as={InputGroup}
						className="col-span-6 sm:col-span-2"
						label={"Relationship to Participant"}
						name={"contactTwoRelationship"}
						placeholder={"e.g. Mother, Father, Neighbor"}
						disabled={!canEdit}
						invalid={
							errors.contactTwoRelationship &&
							!!touched.contactTwoRelationship
						}
						error={errors.contactTwoRelationship}
					/>
					<Field
						as={InputGroup}
						className="col-span-6"
						label={"Telephone Number"}
						hint={"Any 10 or 11 digit format"}
						name={"contactTwoPhone"}
						disabled={!canEdit}
						invalid={
							errors.contactTwoPhone && !!touched.contactTwoPhone
						}
						error={errors.contactTwoPhone}
					/>
					<div className="col-span-6 mt-4">
						<h3 className="text-lg leading-6 font-medium text-gray-900">
							Family Health Insurance Information
						</h3>
					</div>
					<Field
						as={InputGroup}
						className="col-span-6"
						label={"Carrier Name"}
						name={"healthInsuranceCarrier"}
						disabled={!canEdit}
						invalid={
							errors.healthInsuranceCarrier &&
							!!touched.healthInsuranceCarrier
						}
						error={errors.healthInsuranceCarrier}
					/>
					<Field
						as={InputGroup}
						className="col-span-6"
						label={"Policy Number / Member ID"}
						name={"healthInsurancePolicyNumber"}
						disabled={!canEdit}
						invalid={
							errors.healthInsurancePolicyNumber &&
							!!touched.healthInsurancePolicyNumber
						}
						error={errors.healthInsurancePolicyNumber}
					/>
					<div className="col-span-6">
						<Field
							as={InputGroup}
							label={"Health Insurance Carrier Address"}
							name={"healthInsuranceAddressOne"}
							placeholder={"Street and Number"}
							disabled={!canEdit}
							invalid={
								errors.healthInsuranceAddressOne &&
								!!touched.healthInsuranceAddressOne
							}
							error={errors.healthInsuranceAddressOne}
						/>
						<Field
							className={"mt-2"}
							as={InputGroup}
							id={"health-insurance-address-two"}
							name={"healthInsuranceAddressTwo"}
							placeholder={
								"Apartment, suite, unit, building, etc. (Optional)"
							}
							disabled={!canEdit}
							invalid={
								errors.healthInsuranceAddressTwo &&
								!!touched.healthInsuranceAddressTwo
							}
							error={errors.healthInsuranceAddressTwo}
						/>
					</div>
					<Field
						as={InputGroup}
						className="col-span-6 sm:col-span-3 lg:col-span-2"
						label={"City"}
						name={"healthInsuranceCity"}
						disabled={!canEdit}
						invalid={
							errors.healthInsuranceCity &&
							!!touched.healthInsuranceCity
						}
						error={errors.healthInsuranceCity}
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
							className="mt-1 tw-forms-disable"
							{...(typeof window === "undefined"
								? {}
								: { menuPortalTarget: document.body })}
							styles={{
								menuPortal: (base) => ({
									...base,
									zIndex: 9999,
								}),
							}}
							value={stateOptions.find(
								(o) =>
									o.value === values.healthInsuranceState ||
									// before adding this select, we encouraged full state names.
									o.label.toLowerCase() ===
										values.healthInsuranceState.toLowerCase()
							)}
							onChange={(v) =>
								setFieldValue(
									"healthInsuranceState",
									Array.isArray(v) ? v[0].value : v.value
								)
							}
							onBlur={() =>
								setFieldTouched("healthInsuranceState")
							}
							invalid={
								errors.healthInsuranceState &&
								!!touched.healthInsuranceState
							}
							error={errors.healthInsuranceState}
						/>
						{errors.healthInsuranceState &&
							!!touched.healthInsuranceState && (
								<p className={"mt-2 text-sm text-red-600"}>
									{errors.healthInsuranceState}
								</p>
							)}
					</div>
					<Field
						as={InputGroup}
						className="col-span-6 sm:col-span-3 lg:col-span-2"
						label={"Zip Code"}
						name={"healthInsuranceZip"}
						disabled={!canEdit}
						invalid={
							errors.healthInsuranceZip &&
							!!touched.healthInsuranceZip
						}
						error={errors.healthInsuranceZip}
					/>
				</>
			)}
		</RegisterFormSection>
	);
}
