require("dotenv").config();
const fetchAwardsData = require("./gatsby-utils/fetchAwardsData");

exports.createSchemaCustomization = ({ actions }) => {
	const { createTypes } = actions;
	const typeDefs = `
	type ConferenceAwardsData__DelegateAwards {
			type: String!
			awards: [String!]
	}
    type ConferenceAwardsData implements Node {
      	name: String!
		month: String!
		year: Int!
		time: Date! @dateformat
		delegationAward: String
		delegateAwards: [ConferenceAwardsData__DelegateAwards]
		imageURL: String
    }
    type ConferenceRegPage implements Node {
    	name: String!
    	pathname: String!
    	id: String!
    }
  `;
	createTypes(typeDefs);
};

exports.sourceNodes = async ({
	actions,
	createNodeId,
	createContentDigest,
}) => {
	const { createNode } = actions;

	let awardsData = await fetchAwardsData();

	awardsData.forEach((data) => {
		const nodeMeta = {
			id: createNodeId(`firestore-awards-${data.serverId}`),
			parent: null,
			children: [],
			internal: {
				type: `ConferenceAwardsData`,
				mediaType: `application/json`,
				contentDigest: createContentDigest(awardsData),
			},
		};
		const node = Object.assign({}, data, nodeMeta);
		createNode(node);
	});

	let conferenceRegPageData = [
		{
			name: "OneMUN",
			pathname: "onemun21",
			id: "IOSDJSDOIFISDFJ",
		},
		{
			name: "TwoMUN",
			pathname: "twomun21",
			id: "ISDOFJOIFJS",
		},
	];
	conferenceRegPageData.forEach((data) => {
		const nodeMeta = {
			id: createNodeId(`firestore-conference-reg-page-${data.id}`),
			parent: null,
			children: [],
			internal: {
				type: `ConferenceRegPage`,
				mediaType: `application/json`,
				contentDigest: createContentDigest(conferenceRegPageData),
			},
		};
		const node = Object.assign({}, data, nodeMeta);
		createNode(node);
	});
};
