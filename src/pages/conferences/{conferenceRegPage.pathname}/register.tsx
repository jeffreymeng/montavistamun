import { graphql } from "gatsby";
import React from "react";
import Header from "../../../components/Header";
import { Layout } from "../../../components/layout";
import BMUNRegistrationSection from "../../../components/registration/BMUNRegistrationSection";
import RegistrationSection from "../../../components/registration-new/RegistrationSection";
export default function Component({ data }: { data: any }) {
	const { name, id } = data.conferenceRegPage;
	return (
		<Layout
			title={`${name} Registration`}
			description={`Register for ${name} right here!`}
		>
			<div className="min-h-ca">
				<Header
					title={`${name} Registration`}
					backgroundImageURL={
						"https://scpd.stanford.edu/sites/default/files/2020-08/stanford-oval.jpg"
					}
				>
					{"February 26-28, 2021"}
				</Header>

				{/*<RegistrationSection />*/}
			</div>
		</Layout>
	);
}
// This is the page query that connects the data to the actual component. Here you can query for any and all fields
// you need access to within your code. Again, since Gatsby always queries for `id` in the collection, you can use that
// to connect to this GraphQL query.
export const query = graphql`
	query($id: String) {
		conferenceRegPage(id: { eq: $id }) {
			name
			pathname
			id
		}
	}
`;
