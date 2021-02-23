import firebaseType from "firebase";
import * as Icons from "heroicons-react";
import moment from "moment";
import React, { useEffect } from "react";
import { ConferenceAwardsData } from "../../../pages/awards";
export type AdminLogItem =
	| {
			action: "create-award";
			newData: ConferenceAwardsData;
			timestamp: firebaseType.firestore.Timestamp;
			user: string;
	  }
	| {
			action: "update-award";
			newData: ConferenceAwardsData;
			previousData: ConferenceAwardsData;
			timestamp: firebaseType.firestore.Timestamp;
			user: string;
	  }
	| {
			action: "update-user-permissions";
			modifiedFields: {
				verified?: boolean;
				admin?: boolean;
			};
			newData: {
				verified?: boolean;
				admin?: boolean;
			};
			oldData: {
				verified?: boolean;
				admin?: boolean;
			};
			timestamp: firebaseType.firestore.Timestamp;
			user: string;
			target: string;
	  };
export function getLogItemText(
	data: AdminLogItem,
	usersData: {
		[uid: string]: {
			name: string;
			email: string;
		};
	}
) {
	switch (data.action) {
		case "update-user-permissions": {
			if (
				data.newData?.verified === data.oldData?.verified &&
				data.newData?.admin === data.oldData?.admin
			) {
				// No actual updates were made
				return "";
			}
			const updateUserActionText = `${
				data.newData?.verified == data.oldData?.verified
					? ""
					: data.newData.verified
					? "verified"
					: "unverified"
			}${
				data.newData?.verified !== data.oldData?.verified &&
				data.newData?.admin !== data.oldData?.admin
					? " and "
					: ""
			}${
				data.newData?.admin == data.oldData?.admin
					? ""
					: data.newData.admin
					? "promoted"
					: "demoted"
			}`;

			return `${
				usersData[data.user]?.name || "Loading..."
			} ${updateUserActionText} ${
				usersData[data.target]?.name || "Loading..."
			}`;
		}
		case "update-award": {
			return `${
				usersData[data.user]?.name || "Loading..."
			} updated an award: ${data.newData.name}`;
		}
		case "create-award": {
			return `${
				usersData[data.user]?.name || "Loading..."
			} created an award: ${data.newData.name}`;
		}
		default: {
			return (
				"Unknown Action " + (data as { action: string | null })?.action
			);
		}
	}
}
export default function LogItem({
	id,
	data,
	requestUserData,
	usersData,
}: {
	usersData: {
		[uid: string]: {
			name: string;
			email: string;
		};
	};
	requestUserData: (uid: string) => void;
	id: string;
	data: AdminLogItem;
}) {
	useEffect(() => {
		if (!data) return;
		requestUserData(data.user);
		if (data.action == "update-user-permissions") {
			requestUserData(data.target);
		}
	}, [requestUserData, data?.user]);
	const actionText = getLogItemText(data, usersData);
	if (actionText == "") {
		// no updates made
		return <></>;
	}
	return (
		<li>
			<a
				href={"#" + id}
				className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
			>
				<div className="px-4 py-4 flex items-center sm:px-6">
					<div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
						<div>
							<div className="text-sm leading-5 font-medium truncate">
								{actionText}
							</div>
						</div>
						<div className="mt-4 flex-shrink-0 sm:mt-0">
							<div className="mt-2 flex">
								<div className="flex items-center text-sm leading-5 text-gray-500">
									<Icons.Calendar
										className={
											"flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
										}
									/>
									<span>
										<time dateTime="2020-01-07">
											{moment(
												(data.timestamp as firebaseType.firestore.Timestamp).toDate()
											).format("M/D/YY h:mm:ss A")}
										</time>
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</a>
		</li>
	);
}
