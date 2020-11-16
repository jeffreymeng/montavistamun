import React, { useState } from "react";
import useRequireLogin from "../components/accounts/useRequireLogin";
import { Layout, Main } from "../components/layout";
import AuthContext from "../context/AuthContext";
import useFirebase from "../firebase/useFirebase";

export default function ResourcesPage(): React.ReactElement {
	const firebase = useFirebase();
	useRequireLogin();
	const { user, verified, loading } = React.useContext(AuthContext);
	const [hasPermission, setHasPermission] = useState(true);
	const [id, setId] = useState("");
	React.useEffect(() => {
		if (!firebase || loading) return;

		(async () => {
			if (!verified && !loading) {
				// so the user doesnt have to log out and back in to see this page
				const upToDateClaims = await user?.getIdTokenResult(true);
				console.log(upToDateClaims);
				console.log(!upToDateClaims?.claims?.verified);
				if (!upToDateClaims?.claims?.verified) {
					console.log("returned");
					setHasPermission(false);
					return;
				}
			}
			console.log("called");
			const snapshot = await firebase
				.firestore()
				.collection("keys")
				.doc("resources")
				.get();
			setId(snapshot.data()?.id);
		})();
	}, [firebase, verified, loading]);
	const [displayMode, setDisplayMode] = React.useState<"list" | "grid">(
		"list"
	);

	return (
		<Layout title={"Member Resources"}>
			<Main className={"min-h-ca flex flex-col"} wide>
				<div className="flex-initial">
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
					{!hasPermission && (
						<p>
							Sorry, but you must be a verified member to view
							this page. You should become a verified member a few
							days after your first member meeting of the year. If
							you've already attended a meeting this year, please{" "}
							<a
								href="mailto:support@montavistamun.com"
								className="link"
							>
								send us an email
							</a>
							.
						</p>
					)}
					{id ? (
						<>
							<p className={"mt-5 flex justify-between"}>
								<a
									className={"link"}
									href={`https://drive.google.com/drive/folders/${id}`}
									target={"_blank"}
									rel={"noopener noreferrer"}
								>
									Open in google drive
								</a>
								<span>
									<a
										className={
											"link cursor-pointer " +
											(displayMode === "list"
												? "font-bold"
												: "")
										}
										onClick={() => setDisplayMode("list")}
									>
										List View
									</a>
									{" | "}
									<a
										className={
											"link cursor-pointer " +
											(displayMode === "grid"
												? "font-bold"
												: "")
										}
										onClick={() => setDisplayMode("grid")}
									>
										Grid View
									</a>
								</span>
							</p>
						</>
					) : !hasPermission ? (
						""
					) : (
						"Loading..."
					)}
				</div>
				{id && (
					<iframe
						src={`https://drive.google.com/embeddedfolderview?id=${id}${
							displayMode === "grid" ? "#grid" : "#list"
						}`}
						className={"w-full mt-1 border flex-auto"}
						style={{
							minHeight: "400px",
						}}
					/>
				)}
			</Main>
		</Layout>
	);
}
