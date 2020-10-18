import React, { useState } from "react";
import useFirebase from "../../auth/useFirebase";
import UserData from "../../components/admin/UserData";
import AdminLayout from "../../components/layout/AdminLayout";
import AuthContext from "../../context/AuthContext";
export default function AdminLogPage(): React.ReactElement {
	const [target, setTarget] = useState("");
	const [admin, setAdmin] = useState("same");
	const [verified, setVerified] = useState("same");
	const firebase = useFirebase();
	const {
		user,
		loading,
		verified: userVerified,
		admin: userAdmin,
	} = React.useContext(AuthContext);
	const [data, setData] = React.useState<{ id: string; data: any }[]>([]);
	const [usersData, setUsersData] = React.useState<UserData[]>([]);
	React.useEffect(() => {
		if (!firebase) return;
		let unsubscribe = () => {
			/*noop*/
		};
		firebase
			.firestore()
			.collection("users")
			.get()
			.then((querySnapshot) => {
				const tempUserData: UserData[] = [];
				querySnapshot.forEach(function (doc) {
					tempUserData.push({ id: doc.id, data: doc.data() });
				});
				setUsersData(tempUserData);

				unsubscribe = firebase
					.firestore()
					.collection("registration")
					.onSnapshot(function (querySnapshot) {
						setData((legacyData) => {
							let users: {
								id: string;
								data: any;
								userData?: UserData;
							}[] = legacyData.slice();
							querySnapshot.forEach(function (doc) {
								users = users.filter((u) => u.id !== doc.id);
								users.push({
									id: doc.id,
									data: doc.data(),
									userData: tempUserData.find(
										(u) => u.id === doc.id
									),
								});
							});
							return users;
						});
					});
			});

		return () => unsubscribe();
	}, [firebase]);
	const statistics = React.useMemo(() => {
		const count = {
			personalInformation: 0,
			emergencyInformation: 0,
			liabilityForms: 0,
			preferences: 0,
			registered: 0,
		};
		data.forEach((user) => {
			console.log(user);

			if (user.data.confirmation?.smuncConfirmed) {
				count.registered++;
			} else if (user.data.preferences) {
				count.preferences++;
			} else if (user.data.forms) {
				count.liabilityForms++;
			} else if (user.data.emergencyInformation) {
				count.emergencyInformation++;
			} else if (user.data.personalInformation) {
				count.personalInformation++;
			} else {
				// this should never happen
				console.log("User with no registration data", user);
			}
		});
		return count;
	}, [data]);
	return (
		<AdminLayout title={"Conference Registration Statistics"}>
			<h1
				className={
					"text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 mb-6"
				}
			>
				Conference Registration Statistics
			</h1>
			<p>
				Displaying live statistics for <b>SFMUN Registration</b>.
			</p>
			<h3 className={"text-xl leading-7 font-bold tracking-tight mt-4"}>
				Registration Progress
			</h3>
			<p className={"text-gray-700 mt-1"}>
				Each step is mutually exclusive. A user will not be counted
				twice.
			</p>
			<ul className={"list-disc ml-5 mt-2"}>
				<li>
					{statistics.personalInformation} user
					{statistics.personalInformation !== 1 ? "s have " : " has "}
					just finished entering their personal information.
				</li>
				<li>
					{statistics.emergencyInformation} user
					{statistics.emergencyInformation !== 1 ? "s have" : " has "}
					just finished entering their emergency contact information.
				</li>
				<li>
					{statistics.liabilityForms} user
					{statistics.liabilityForms !== 1 ? "s have" : " has "} just
					finished submitting their liability forms.
				</li>
				<li>
					{statistics.preferences} user
					{statistics.preferences !== 1 ? "s have" : " has "} just
					finished entering their preferences.
				</li>
				<li>
					{statistics.registered} user
					{statistics.registered !== 1 ? "s have" : " has "} finished
					registering for SFMUN.
				</li>
			</ul>
		</AdminLayout>
	);
}
