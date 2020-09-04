require("dotenv").config();

const admin = require("firebase-admin");
const FB_SERVICE_ACCOUNT = JSON.parse(process.env.FB_SERVICE_ACCOUNT);
admin.initializeApp({
	credential: admin.credential.cert(FB_SERVICE_ACCOUNT),
	databaseURL: "https://montavistamodelun.firebaseio.com",
});
exports.sourceNodes = async ({
	actions,
	createNodeId,
	createContentDigest,
}) => {
	const { createNode } = actions;

	const awardsData = [];
	const snapshot = await admin.firestore().collection("awards").get();
	snapshot.forEach((doc) => {
		const key = doc.id;
		const { time, ...rest } = doc.data();
		awardsData.push({
			id: key,
			data: {
				...rest,
				time: time.toMillis(),
			},
		});
	});

	awardsData.forEach(({ id, data }) => {
		const nodeMeta = {
			id: createNodeId(`firestore-awards-${id}`),
			parent: null,
			children: [],
			internal: {
				type: `FirestoreData`,
				mediaType: `application/json`,
				contentDigest: createContentDigest(data),
			},
		};
		const node = Object.assign({}, data, nodeMeta);
		createNode(node);
	});
};
