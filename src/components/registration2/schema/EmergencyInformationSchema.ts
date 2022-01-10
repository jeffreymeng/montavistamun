import * as Yup from "yup";

const EmergencyInformationSchema = Yup.object().shape({
	contactOneName: Yup.string()
		.min(2, "Please enter a parent/guardian name")
		.required("Please enter a parent/guardian name"),
	contactOneRelationship: Yup.string()
		.min(
			2,
			"Please enter the parent/guardian's relationship to the participant"
		)
		.required(
			"Please enter the parent/guardian's relationship to the participant"
		),
	contactOnePhone: Yup.string()
		.test(
			"is a phone number",
			"This phone number doesn't look valid! Try using the format (xxx) xxx-xxxx.",
			(v) => !!v && /^1?\d{10}$/.test(v.replace(/[^\d\w]/g, ""))
		)
		.required("Please enter the parent/guardian's phone number."),
	contactOneEmail: Yup.string()
		.test(
			"is a valid email",
			"This email doesn't look valid!",
			(v) => !!v && /^[^@\s]+@[^@\s.]+\.[^@.\s]+$/.test(v)
		)
		.required("Please enter the parent/guardian's email."),
	contactTwoName: Yup.string().min(
		2,
		"Please enter an emergency contact name or leave this field blank"
	),
	// .required("Please enter an emergency contact name"),
	contactTwoRelationship: Yup.string().min(
		2,
		"Please enter the emergency contact's relationship to the participant or leave this field blank"
	),
	// .required(
	// 	"Please enter the emergency contact's relationship to the participant"
	// ),
	contactTwoPhone: Yup.string().test(
		"is a phone number",
		"This phone number doesn't look valid! Try using the format (xxx) xxx-xxxx or leave this field blank.",
		(v) => !v || /^1?\d{10}$/.test(v.replace(/[^\d\w]/g, ""))
	),
	householdMainLanguage: Yup.string()
		.min(2, "Please enter the main language spoken at your household.")
		.required("Please enter the main language spoken at your household."),
	healthInsuranceCarrier: Yup.string()
		.min(2, "Please enter your family health insurance carrier.")
		.required("Please enter your family health insurance carrier."),
	healthInsurancePolicyNumber: Yup.string()
		.min(
			2,
			"Please enter your family health insurance policy number or member ID."
		)
		.required(
			"Please enter your family health insurance policy number or member ID."
		),
	healthInsuranceAddressOne: Yup.string()
		.min(5, "That doesn't look like a valid address")
		.max(128, "The address is too long")
		.required("Please enter a valid address or PO box"),
	healthInsuranceCity: Yup.string()
		.min(3, "That doesn't look like a valid city")
		.max(128, "The city name is too long")
		.required("Please enter a city"),
	healthInsuranceState: Yup.string().required("Please enter a state"),
	healthInsuranceZip: Yup.string()
		.matches(
			/(^\d{5}$)|(^\d{9}$)|(^\d{5}-\d{4}$)/,
			"Please enter a valid 5 or 9 digit zip code"
		)
		.required("Please enter a valid 5 or 9 digit zip code"),
});
export default EmergencyInformationSchema;
