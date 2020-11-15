import axios from "axios";
import * as Icons from "heroicons-react";
import React, { useContext, useState } from "react";
import useFirebase from "../../../auth/useFirebase";
import AuthContext from "../../../context/AuthContext";
import { ConferenceAwardsData } from "../../../pages/awards";
import Transition from "../../Transition";
export default function SaveModal({
	show,
	setShow,
	edits,
	selectedConference,
	conferenceData,
	setData,
	setSelectedConference,
}: {
	show: boolean;
	setShow: (show: boolean) => void;
	setData: (data: (data: any) => any) => void;
	edits: string[];
	selectedConference: string;
	setSelectedConference: (newConference: string) => void;
	conferenceData: ConferenceAwardsData | null;
}) {
	const { user, loading } = useContext(AuthContext);
	const firebase = useFirebase();
	const [submitting, setSubmitting] = useState(false);
	const [success, setSuccess] = useState(false);
	return (
		<Transition show={show}>
			<div className="fixed z-10 inset-0 overflow-y-auto">
				<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
					<Transition
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 transition-opacity">
							<div className="absolute inset-0 bg-gray-500 opacity-75"></div>
						</div>
					</Transition>
					{/* This element is to trick the browser into centering the modal contents. */}
					<span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
					&#8203;
					<Transition
						enter="ease-out duration-300"
						enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						enterTo="opacity-100 translate-y-0 sm:scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 translate-y-0 sm:scale-100"
						leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					>
						<div
							className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
							role="dialog"
							aria-modal="true"
							aria-labelledby="modal-headline"
						>
							<div className="sm:flex sm:items-start">
								<div
									className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full ${
										success ? "bg-green-100" : "bg-red-100"
									} sm:mx-0 sm:h-10 sm:w-10`}
								>
									{success ? (
										<Icons.Check className="h-6 w-6 text-green-600" />
									) : (
										<Icons.Save className="h-6 w-6 text-purple-600" />
									)}
								</div>
								<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
									<h3
										className="text-lg leading-6 font-medium text-gray-900"
										id="modal-headline"
									>
										{success ? "Success!" : "Save Changes?"}
									</h3>
									<div className="mt-2">
										{success ? (
											<p className="text-sm leading-5 text-gray-500">
												<b>
													Your changes have been
													saved, and you may now close
													this window.
												</b>{" "}
												The website is currently being
												re-built, and typically
												automatically updates within 5
												minutes (you may have to force
												refresh). You can check the
												build status{" "}
												<a
													href="https://app.netlify.com/sites/montavistamun/deploys"
													target={"_blank"}
													rel={"noopener noreferrer"}
													className="link"
												>
													here
												</a>
												.
											</p>
										) : (
											<>
												<p className="text-sm leading-5 text-gray-500">
													{selectedConference !==
													"(NEW)"
														? "You will be publishing your modifications to the following fields:"
														: "You will be creating a new conference on the awards page with the following fields:"}
												</p>
												<ul
													className={
														"list-disc text-sm leading-5 text-gray-500 ml-6 mt-3"
													}
												>
													{/* For new conferences, the end date is always automatically included. */}
													{(selectedConference ===
													"(NEW)"
														? edits.filter(
																(e) =>
																	e !==
																	"Conference End Date"
														  )
														: edits
													).map((c) =>
														c ===
															"Conference Name" &&
														selectedConference ===
															"(NEW)" ? (
															<React.Fragment
																key={c}
															>
																<li>{c}</li>
																<li>
																	Conference
																	End Date
																</li>
															</React.Fragment>
														) : (
															<li key={c}>{c}</li>
														)
													)}
												</ul>
											</>
										)}
									</div>
								</div>
							</div>
							<div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
								{!success && (
									<span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
										<button
											onClick={async () => {
												if (!conferenceData?.name) {
													alert(
														"You must include the conference name."
													);
													return;
												}
												if (!firebase || loading) {
													alert(
														"This page has not yet been initialized. Please try again in a few seconds."
													);
													return;
												}
												setSubmitting(true);
												let backupData = null;
												let newConferenceID = "";
												if (
													selectedConference ===
													"(NEW)"
												) {
													const ref = await firebase
														.firestore()
														.collection("awards")
														.add(conferenceData);
													newConferenceID = ref.id;
												} else {
													backupData = (
														await firebase
															.firestore()
															.collection(
																"awards"
															)
															.doc(
																selectedConference
															)
															.get()
													).data();
													await firebase
														.firestore()
														.collection("awards")
														.doc(selectedConference)
														.set(conferenceData);
												}
												await axios.post(
													"https://api.netlify.com/build_hooks/5f52b7d45b528d5715e85eb7"
												);
												await firebase
													.firestore()
													.collection("admin-log")
													.add({
														timestamp: firebase.firestore.FieldValue.serverTimestamp(),
														user: user?.uid,
														action:
															selectedConference ===
															"(NEW)"
																? "create-award"
																: "update-award",
														...(selectedConference ===
														"(NEW)"
															? {
																	conferenceId: newConferenceID,
															  }
															: {
																	conferenceId: selectedConference,
																	previousData: backupData,
																	modifiedFields: edits,
															  }),
														newData: conferenceData,
													});
												if (
													selectedConference ===
													"(NEW)"
												) {
													setData((data) => {
														const [
															first,
															...rest
														] = data;
														return [
															first,
															{
																id: newConferenceID,
																award: conferenceData,
															},
															...rest,
														];
													});
												} else {
													setData((data) =>
														data.map((c) =>
															c.id !==
															selectedConference
																? c
																: {
																		id:
																			c.id,
																		award: conferenceData,
																  }
														)
													);
												}
												setSubmitting(false);
												setSuccess(true);
												if (
													selectedConference ===
													"(NEW)"
												) {
													setSelectedConference(
														newConferenceID
													);
												}
											}}
											type="button"
											disabled={submitting}
											className={
												(submitting
													? "bg-purple-300"
													: "bg-purple-600 hover:bg-purple-500 focus:outline-none focus:border-purple-700 focus:shadow-outline-purple") +
												" inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 text-base leading-6 font-medium text-white shadow-sm transition ease-in-out duration-150 sm:text-sm sm:leading-5"
											}
										>
											{submitting
												? "Saving Changes..."
												: "Save Changes"}
										</button>
									</span>
								)}
								<span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
									<button
										onClick={() => {
											setShow(false);
											setTimeout(
												() => setSuccess(false),
												500
											);
										}}
										type="button"
										disabled={submitting}
										className={
											(submitting
												? "bg-gray-200"
												: "bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue") +
											" inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm transition ease-in-out duration-150 sm:text-sm sm:leading-5"
										}
									>
										{success ? "Close" : "Cancel"}
									</button>
								</span>
							</div>
						</div>
					</Transition>
				</div>
			</div>
		</Transition>
	);
}
