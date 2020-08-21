import axios from "axios";
import React from "react";
import useFirebase from "../../auth/useFirebase";
import useRequireLogin from "../../components/accounts/useRequireLogin";
import { Layout, Main } from "../../components/layout";
import AuthContext from "../../context/AuthContext";

export default function AboutPage(): React.ReactElement {
	const [eligible, setEligible] = React.useState(false);
	const [loading, setLoading] = React.useState(false);
	const [token, setToken] = React.useState("");
	const [success, setSuccess] = React.useState(false);
	const [submitting, setSubmitting] = React.useState(false);
	useRequireLogin();
	const { user, loading: userLoading } = React.useContext(AuthContext);
	const firebase = useFirebase();
	React.useEffect(() => {
		if (!firebase || !user) return;
		Promise.all([
			firebase
				.firestore()
				.collection("users")
				.doc(user.uid)
				.get()
				.then((snapshot) => snapshot.data())
				.then((data) => {
					setEligible(data?.admin);
					setLoading(false);
				}),
			user.getIdToken().then((token) => setToken(token)),
		]);
	}, [firebase, user]);

	return (
		<Layout title={"Synchronize Admin Claims"}>
			<Main>
				<h1
					className={
						"text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10"
					}
				>
					Synchronize Admin Claims
				</h1>
				<p className={"mt-4 mb-20"}>
					Click the button below to update your firebase custom
					administrator claim based on the firestore database. If you
					are an admin in the firestore database, this utility will
					make you an admin according to the custom claims. This is
					useful for giving the first administrator the admin claim.
				</p>
				{success ? (
					<p>Your custom claim has been updated.</p>
				) : loading || !token || !user ? (
					<p>Checking eligibility...</p>
				) : !eligible ? (
					<p>
						You are not eligible because you do not have
						administrator set to true in firebase.
					</p>
				) : (
					<div className="mt-8 md:mt-20 lg:mt-40">
						<button
							disabled={submitting}
							className={
								(submitting
									? "bg-indigo-200"
									: "bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700") +
								" " +
								"mt-4 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white transition duration-150 ease-in-out"
							}
							onClick={() => {
								setSubmitting(true);
								axios
									.post(
										"/.netlify/functions/set-user-permissions",
										{
											newPermissions: { admin: true },
											target: user.uid,
										},
										{
											headers: {
												authorization: `Bearer ${token}`,
											},
										}
									)
									.then(() => user.getIdTokenResult(true)) // refresh the custom claims
									.then(() => setSuccess(true))
									.catch((error) => {
										alert(
											"An error occurred while synchronizing. Check the console for more information."
										);
										console.log(
											"An error occurred while synchronizing."
										);
										console.log(error);
										console.log({ ...error });
									});
							}}
						>
							{submitting ? "Synchronizing..." : "Synchronize"}
						</button>
					</div>
				)}
			</Main>
		</Layout>
	);
}
