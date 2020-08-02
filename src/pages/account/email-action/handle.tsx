import { navigate, PageProps } from "gatsby";
import React from "react";
import { Layout, Main } from "../../../components/layout";

export default function HandleEmailActionPage({ location }: PageProps) {
	const [error, setError] = React.useState(false);

	React.useEffect(() => {
		const params = new URLSearchParams(location.search);
		const mode = params.get("mode");
		if (
			mode &&
			["resetPassword", "recoverEmail", "verifyEmail"].includes(mode)
		) {
			const pageMap = {
				resetPassword: "reset-password",
				recoverEmail: "recover-email",
				verifyEmail: "verify-email",
			};
			navigate(
				"/account/email-action/" +
					pageMap[mode as keyof typeof pageMap],
				{
					state: {
						code: params.get("oobCode"),
						continueURL: params.get("continueUrl"),
					},
				}
			);
		} else {
			setError(true);
		}
	}, []);

	return (
		<Layout title="Loading...">
			<Main className="h-ca">
				{!error && <h1 className="text-3xl font-bold">Loading...</h1>}
				{error && (
					<>
						<h1 className="text-3xl font-bold">
							You found a broken link!
						</h1>
						<p>
							This page can only be accessed via special links
							that we send you. If you followed a link to get to
							this page, please email{" "}
							<a
								href="mailto:websitehelp@montavistamun.com"
								className="link"
							>
								websitehelp@montavistamun.com
							</a>{" "}
							and let us know how you got to this page.
						</p>
					</>
				)}
			</Main>
		</Layout>
	);
}
