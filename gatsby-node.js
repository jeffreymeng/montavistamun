require("dotenv").config();

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
  `;
	createTypes(typeDefs);
};

exports.sourceNodes = async ({
	actions,
	createNodeId,
	createContentDigest,
}) => {
	const { createNode } = actions;

	let awardsData = [];
	try {
		const admin = require("firebase-admin");
		if (!process.env.FB_SERVICE_ACCOUNT) {
			throw {
				code: "NO_FIREBASE_KEY",
				message:
					"Please set the firebase service account key as an environment variable.",
			};
		}
		const FB_SERVICE_ACCOUNT = JSON.parse(process.env.FB_SERVICE_ACCOUNT);
		admin.initializeApp({
			credential: admin.credential.cert(FB_SERVICE_ACCOUNT),
			databaseURL: "https://montavistamodelun.firebaseio.com",
		});
		const snapshot = await admin.firestore().collection("awards").get();
		snapshot.forEach((doc) => {
			const key = doc.id;
			const { time, ...rest } = doc.data();
			awardsData.push({
				serverId: key,
				...rest,
				time: time.toDate(),
			});
		});
	} catch (e) {
		console.log(e);
		console.warn(
			"Unable to fetch firebase data for awards due to error code " +
				e.code +
				". Using dummy data instead."
		);
		const data = [
			{
				name: "BMUN 2020",
				time: "March 2020",
				delegationAward: null,
				delegateAwards: [
					{
						type: "Honorable",
						awards: [
							"Arthur Ji (Financial Security Board)",
							"Howard Peng (Joint Crisis Committee -- New)",
						],
					},
				],
			},
			{
				name: "SCVMUN 2020",
				time: "January 2020",
				delegationAward: null,
				delegateAwards: [
					{
						type: "Best Delegate",
						awards: [
							"Eric Lee & Madeline Choi (UNESCO)",
							"Arthur Ji & Pranav Kumar (World Bank)",
							"Medhansh Kashyap & Howard Peng (UNSC)",
						],
					},
					{
						type: "Honorable",
						awards: [
							"Dylan Yang & Sylvia Li (SOCHUM)",
							"Juhi Shyamsukha & Sophia Chen (WHO)",
							"Christopher Lee & Anshul Dash (DISEC)",
							"Larry Wu & Thomas Yu (IAEA)",
							"Michael Ding & Adi Budaraju (World Bank)",
						],
					},
					{
						type: "Outstanding",
						awards: [
							"Soumil Gupta & Sriya Vennam (UNEP)",
							"Jiani Tian & Alekhya Natarajan (WHO)",
							"Nathan Wang & Elizabeth Lee (DISEC)",
						],
					},
				],
			},
			{
				name: "SMUNC 2019",
				time: "November 2019",
				delegationAward: null,
				delegateAwards: [
					{
						type: "Best Delegate",
						awards: ["Parth Asawa (JCC India)"],
					},
					{
						type: "Outstanding",
						awards: [
							"Nathan Wang & Elizabeth Lee (Senate)",
							"Eugene Yoon and Conner Yin (SOCHUM)",
						],
					},
					{
						type: "Honorable",
						awards: [
							"Matthew Philip & Medhansh Kashyap (ECOSOC)",
							"Advait Buduraju & Michael Ding (SOCHUM)",
							"Aman Desai (Cyber)",
						],
					},
					{
						type: "Verbal",
						awards: [
							"Chris Lee and Larry Wu (ECOSOC)",
							"Howard Peng (UNEP)",
						],
					},
				],
			},
			{
				name: "GMUNC VI",
				time: "October 2019",
				delegationAward: null,
				delegateAwards: [
					{
						type: "Best Delegate",
						awards: [
							"Parth Asawa (CIA)",
							"Iman Malik & Aman Desai (WHO)",
							"Matthew Philip & Medhansh Kashyap (Arctic)",
							"Eric Lee (SOCHUM)",
						],
					},
					{ type: "Outstanding", awards: ["Nelson Mu (BHOC)"] },
					{
						type: "Honorable",
						awards: [
							"Sean Chen & David Dang (UNSC)",
							"Sivani Gangaram (SOCHUM)",
							"Sophia Chen (SOCHUM)",
						],
					},
					{
						type: "Verbal",
						awards: [
							"Zubayir Kazi (UNHCR)",
							"Maggie Yang (SOCHUM)",
						],
					},
					{ type: "Research", awards: ["Dylan Yang (BHOC)"] },
				],
			},
		];
		data.forEach((doc, i) => {
			const key = "dummy-data-" + i;
			const { time, ...rest } = doc;
			awardsData.push({
				serverId: key,
				...rest,
				month: time.split(" ")[0],
				year: parseInt(time.split(" ")[1]),
				time: new Date(time),
			});
		});
	}

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
};
