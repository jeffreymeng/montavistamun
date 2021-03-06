import { graphql } from "gatsby";
import React from "react";
import FluidImage from "../../../components/FluidImage";
import Header from "../../../components/Header";
import { Layout } from "../../../components/layout";
import RegistrationSection from "../../../components/registration/RegistrationSection";

export default function AboutPage({
	data: { headerImage },
}: {
	data: {
		headerImage: FluidImage;
	};
}): React.ReactElement {
	// // TODO: delete this file -- for now, keep as a template
	// const [registered, setRegistered] = useState("loading");
	// React.useEffect(() => {
	// 	if (!firebase || !user) return;
	// 	firebase
	// 		.firestore()
	// 		.collection("registration")
	// 		.doc(user.uid)
	// 		.get()
	// 		.then((snapshot) => snapshot.data())
	// 		.then((data) => setRegistered(data?.confirm?.sfmunConfirmed));
	// }, [firebase, user]);
	// return (
	// 	<Layout title={"SFMUN"}>
	// 		<Header
	// 			backgroundImage={headerImage}
	// 			title={"SFMUN Registration is Now Closed"}
	// 		>
	// 			Your Registration Status:{" "}
	// 			{registered === "loading"
	// 				? "Loading..."
	// 				: registered
	// 				? "Successfully Registered"
	// 				: "Not Registered"}
	// 		</Header>
	// 		<Main>
	// 			If you have any questions, feel free to email us at{" "}
	// 			<a href="mailto:montavistamun@gmail.com" className="link">
	// 				montavistamun@gmail.com
	// 			</a>
	// 			.
	// 		</Main>
	// 	</Layout>
	// );

	return (
		<Layout
			title={"SCVMUN Registration"}
			description={
				"Register for SCVMUN, a great conference for MUN beginners and veterans alike!"
			}
		>
			<div className="min-h-ca">
				<Header
					title={"SCVMUN Registration"}
					backgroundImage={headerImage}
				>
					{"Friday, January 29 and Saturday, January 30, 2021"}
				</Header>

				<RegistrationSection />
			</div>
		</Layout>
	);
}
export const query = graphql`
	query {
		headerImage: file(relativePath: { eq: "conferences/scvmun.jpg" }) {
			childImageSharp {
				fluid(maxWidth: 1200, quality: 90) {
					...GatsbyImageSharpFluid_withWebp
				}
			}
		}
	}
`;
