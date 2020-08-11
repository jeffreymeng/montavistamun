import React from "react";
import useFirebase from "../auth/useFirebase";
import useRequireLogin from "../components/accounts/useRequireLogin";
import { Layout, Main } from "../components/layout";

export default function ResourcesPage(): React.ReactElement {
	const firebase = useFirebase();
	useRequireLogin();
	const [id, setId] = React.useState("");
	React.useEffect(() => {
		if (!firebase) return;
		(async () => {
			const snapshot = await firebase
				.firestore()
				.collection("keys")
				.doc("resources")
				.get();
			setId(snapshot.data()?.id);
		})();
	}, [firebase]);

	return (
		<Layout title={"404 Error"}>
			<Main className={"h-ca"}>
				<h1
					className={
						"text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10"
					}
				>
					Member Resources
				</h1>
				<p className={"mt-4 mb-4"}>
					Please do not share these resources outside of MVMUN.
				</p>

				{id ? (
					<>
						<a
							className={"link"}
							href={`https://drive.google.com/drive/folders/${id}`}
							target={"_blank"}
							rel={"noopener noreferrer"}
						>
							Open in google drive
						</a>
						<iframe
							src={`https://drive.google.com/embeddedfolderview?id=${id}`}
							className={"w-full p-0 m-0"}
						/>
					</>
				) : (
					"Loading..."
				)}
			</Main>
		</Layout>
	);
}
