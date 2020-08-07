import classNames from "classnames";
import { Link } from "gatsby";
import React from "react";
import useFirebase from "../../auth/useFirebase";
import useRequireLogin from "../../components/accounts/useRequireLogin";
import { AuthLayout } from "../../components/layout";
import AuthContext from "../../context/AuthContext";
export interface EmailVerificationProps {
	/**
	 * If provided, a continue button will be displayed allowing the user to continue to their original action.
	 */
	continueURL?: string;
	/**
	 * The name of the page to continue to. This will be used to customize the continue button text after a successful verification.
	 */
	continueName?: string;
}
export default function SendEmailVerificationPage({
	location: { state },
}: {
	location: { state: EmailVerificationProps };
}): React.ReactElement {
	useRequireLogin();
	const { user, loading } = React.useContext(AuthContext);
	const [submitting, setSubmitting] = React.useState(false);
	const [error, setError] = React.useState<React.ReactNode>("");
	const [success, setSuccess] = React.useState(false);
	const firebase = useFirebase();

	return (
		<AuthLayout title={"Verify Your Email"}>
			<div>
				<h2 className="mt-6 text-3xl leading-9 font-extrabold text-gray-900">
					Please verify your email
					{state?.continueURL ? " to continue" : ""}
				</h2>
			</div>
			{!success && (
				<div className="mt-8">
					<div className="mt-6">
						<h3 className={"text-xl font-semibold"}>
							Verifying your email is required for access to
							conference registration and certain member
							resources.
						</h3>
						<h4 className={"text-md mt-4"}>
							If <b>{user?.email || "loading..."}</b> is not your
							email, then you'll need to{" "}
							<Link to="/account/settings" className="link">
								change your email
							</Link>{" "}
							before you verify it.
						</h4>

						{error && (
							<p className="text-red-700">Error: {error}</p>
						)}
						<button
							type="button"
							disabled={submitting || !user}
							onClick={() => {
								setSubmitting(true);
								if (!user) return;
								user.sendEmailVerification()
									.then(() => {
										setSubmitting(false);
										setSuccess(true);
									})
									.catch((error) => {
										setSubmitting(false);
										setError(
											<>
												{error.message} If this was
												unexpected, please email{" "}
												<a
													href="mailto:support@montavistamun.com"
													className="link"
												>
													support@montavistamun.com
												</a>
												.
											</>
										);
									});
							}}
							className={classNames(
								"mt-5 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white transition duration-150 ease-in-out",
								submitting
									? "bg-indigo-400"
									: "bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
							)}
						>
							{submitting
								? "Sending Verification Email..."
								: "Send Verification Email"}
						</button>
					</div>
				</div>
			)}
			{success && (
				<div className="mt-8">
					<div className="mt-6">
						<h4 className={"text-2xl font-bold text-gray-900"}>
							We've sent an email to <b>jeffkmeng@gmail.com</b>.
							If your account email is incorrect, you can change
							it in{" "}
							<Link to={"/account/settings"} className={"link"}>
								settings
							</Link>
							.
						</h4>
						<p>
							On rare occasions, our emails can take up to 10
							minutes to arrive. If you still don't see it after
							10 minutes, you can try{" "}
							<button
								onClick={() => window.location.reload()}
								className="link"
							>
								resending the email
							</button>
							.
						</p>
					</div>
				</div>
			)}
		</AuthLayout>
	);
}
