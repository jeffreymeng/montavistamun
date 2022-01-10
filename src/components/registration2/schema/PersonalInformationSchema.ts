import * as Yup from "yup";

const PersonalInformationSchema = Yup.object().shape({
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
        .min(5, "That doesn't look like a valid address")
        .max(128, "Your address is too long")
        .required(
            "Please enter a valid address, including your house number and street"
        ),
    city: Yup.string()
        .min(3, "That doesn't look like a valid city")
        .max(128, "Your city name is too long")
        .required("Please enter a city"),
    state: Yup.string().required("Please enter a state"),
    zip: Yup.string()
        .matches(
            /(^\d{5}$)|(^\d{9}$)|(^\d{5}-\d{4}$)/,
            "Please enter a valid 5 or 9 digit zip code"
        )
        .required("Please enter a valid 5 or 9 digit zip code"),
});

export default PersonalInformationSchema;