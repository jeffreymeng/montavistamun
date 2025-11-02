import React from "react";

export interface GuideSection {
	title: string;
	id: string;
	content: React.ReactNode;
	subsections?: GuideSection[];
}

const guideData: GuideSection[] = [
	{
		title: "Parliamentary Procedure",
		id: "parliamentary-procedure",
		content: (
			<div className="text-sm text-gray-600 space-y-6">
				<div>
					<p className="font-semibold text-lg mb-3">Terms</p>
					<p className="font-semibold text-base mb-2">General</p>
					<div className="space-y-2">
						<div>
							<p className="font-semibold">1. Chairs:</p>
							<p>The chairpersons are seated in the front with their gavel and facilitate the debate. They call on speakers, time speeches, and maintain the rules of procedure. If the conference gives awards, they will also evaluate your performance.</p>
						</div>
						<div>
							<p className="font-semibold">2. Decorum:</p>
							<p>order in committee. The chair may call decorum if delegates are loud or disrespectful, in order to ask for their attention during committee. If the Chair shouts "Decorum!" in committee, that means that you should shut up and return to your seat.</p>
						</div>
						<div>
							<p className="font-semibold">3. Motion:</p>
							<p>a specific action made by delegates to direct debate in a certain direction.</p>
						</div>
						<div>
							<p className="font-semibold">4. Speaker's List:</p>
							<p>a list that contains the order of speakers in the committee. The specific way that the order is determined varies by conference. The Speaker's List is the default format of debate and committee will proceed with speeches until a delegate makes a motion to change up the debate format.</p>
						</div>
						<div>
							<p className="font-semibold">5. Yield:</p>
							<p>this is when a speaker decides to give up the remaining time in his or her speech. Typically, the three types of yields are:</p>
							<p>1) Yield to the Chair meaning you give up the rest of your time</p>
							<p>2) Yield to another delegate meaning you give up the rest of your time to another delegate</p>
							<p>3) Yield to questions from other delegates or Yield to comments to your speech by other delegates. Questions are also sometimes called Points of Information.</p>
						</div>
						<div>
							<p className="font-semibold">6. Roast:</p>
							<p>a term specific to Monta Vista MUN. Roasting is when officers listen to your policy/solutions, and poke any holes they can find in the logic. The purpose is to figure out which parts of your plan are weak, and hopefully you'll feel "roasted", or burned by all the wrong points in your argument, coming out. After roasts be sure to patch up all the logical fallacies and strengthen your solutions!</p>
						</div>
						<div>
							<p className="font-semibold">7. Roll Call:</p>
							<p>roll call is done at the beginning of every committee, usually after committee session opens and before setting the agenda. During role call, the Chair will read off the names of every country that should be present. When your country is called, raise your placard and either say "present" or "present and voting". Present and voting means that you have to vote on every resolution and motion, while present means you have to vote for every motion, but can abstain while voting for resolutions. Typically, if you know what you're doing in committee (which should be always!), call out "present and voting".</p>
						</div>
						<div>
							<p className="font-semibold">8. Dais:</p>
							<p>where the Chairs sit. Typically at the front of the room, at desk, and many times on a raised platform. If you're late to committee session (which you never should be!), send a note to the dais.</p>
						</div>
						<div>
							<p className="font-semibold">9. Right of Reply:</p>
							<p>when another country insults you on a personal level during moderated caucus, you can use a right of reply. This allows you to directly address the other delegate's concerns.</p>
						</div>
						<div>
							<p className="font-semibold">10. Formal debate:</p>
							<p>The "standard" type of debate at a Model UN conference, in which delegates speak for a certain time in an order based on a speakers' list. It usually doesn't last very long, and is broken up by moderated and unmoderated caucuses.</p>
						</div>
						<div>
							<p className="font-semibold">11. Head delegate:</p>
							<p>The student leader of a school's MUN team.</p>
						</div>
						<div>
							<p className="font-semibold">12. Background/topic guide:</p>
							<p>A guide to a topic being discussed in a Model UN committee usually written by conference organizers and distributed to delegates before the conference. The starting point for any research before a Model UN conference.</p>
						</div>
						<div>
							<p className="font-semibold">13. Remember to always approach the Chair for feedback in between committee sessions, and especially at the very end of committee!</p>
						</div>
					</div>
				</div>
				
				<div>
					<p className="font-semibold text-base mb-2">Points</p>
					<div className="space-y-2">
						<div>
							<p className="font-semibold">6. Point of Inquiry:</p>
							<p>used when a delegate has a question about something that is not clearly understood in committee. Use this to ask a question if you don't understand a term or get what's going on in committee!</p>
						</div>
						<div>
							<p className="font-semibold">7. Point of Personal Privilege:</p>
							<p>used when a delegate experiences personal discomfort that hinders their ability to participate in committee. Examples: temperature of room, distractions during committee, can't hear another delegate, etc.</p>
						</div>
						<div>
							<p className="font-semibold">8. Point of Order (also called Point of Parliamentary Procedure):</p>
							<p>used when a delegate believes that the chair made a mistake with regards to Parliamentary Procedure. It is EXTREMELY rare to see this motion ever be used.</p>
						</div>
					</div>
				</div>
				
				<div>
					<p className="font-semibold text-base mb-2">Caucus</p>
					<div className="space-y-2">
						<div>
							<p className="font-semibold">9. Moderated Caucus:</p>
							<p>A debate format that allows delegates to make short comments on a specific sub-issue. Typically, delegates who are interested in speaking will raise up their placards and the Chairs will call on delegates to speak one at a time. In order to move into a moderated caucus, the motion must include the overall speaking time, the time per speaker, and the sub-issue to be discussed. Example: Italy moves for a 5 minute moderated caucus with 30 second speaking time per delegate to discuss possible sources of funding for the resolutions on the floor.</p>
						</div>
						<div>
							<p className="font-semibold">10. Unmoderated Caucus (also called Informal Caucus or Lobbying Sessions):</p>
							<p>a debate format in which delegates can leave their seats to go and talk to others freely and informally. This is usually when delegates find allies and work on draft resolutions. In order to move into an unmoderated caucus, the motion must include the overall caucus time and preferably (don't have to) the purpose of the unmoderated caucus. Example: Senegal moves for an unmoderated caucus for 10 minutes to complete draft resolutions.</p>
						</div>
						<div>
							<p className="font-semibold">11. Blocs:</p>
							<p>different groups that have similar ideas and opinions about the topics. In the real United Nations, there are regional blocs, but delegates can choose to build their own blocs in Model UN. These blocs will typically work together to create a draft resolution.</p>
						</div>
					</div>
				</div>
				
				<div>
					<p className="font-semibold text-base mb-2">Resolutions: the goal of committee is to pass a resolution. Although you may not know how to write a resolution yet, it's important to know the basic terms so you can keep up as they are presented.</p>
					<div className="space-y-2">
						<div>
							<p className="font-semibold">12. Working paper:</p>
							<p>Working papers are just a list of ideas formed by the blocs. They may or may not be written in resolution format.</p>
						</div>
						<div>
							<p className="font-semibold">13. Draft Resolution:</p>
							<p>A document written in resolution format and introduced to committee but not yet voted upon is called a draft resolution. Delegates will be spending most of their time writing and amending the draft resolutions. Once a draft resolution is passed by a committee, it becomes a Resolution.</p>
						</div>
						<div>
							<p className="font-semibold">14. Sponsors:</p>
							<p>delegates who authored the draft resolution or actively contributed ideas. They support the draft resolution and want to see it get passed, so they should vote for it. All resolutions will require a minimum number of sponsors.</p>
						</div>
						<div>
							<p className="font-semibold">15. Signatories:</p>
							<p>delegates who wish the see a draft resolution debated but may or may not agree with all of the ideas. However, they think there is some merit to it and want to see it presented. Some resolutions will require a minimum number of signatories.</p>
						</div>
						<div>
							<p className="font-semibold">16. Pre-ambulatory clauses:</p>
							<p>statements in the first section of the draft resolution that describes the problems that the committee wants to solve as well as previous measures taken to combat the problem. Pre-ambulatory clauses are usually italicized or underlined but not numbered.</p>
						</div>
						<div>
							<p className="font-semibold">17. Operative clauses:</p>
							<p>statements in the second section of the draft resolution that outlines the specific solutions the sponsors wish to implement. Operative clauses are usually numbered and underlined.</p>
						</div>
						<div>
							<p className="font-semibold">18. Amendment:</p>
							<p>a change made to an operative clause of a draft resolution. Amendments can add, delete, or change an operative clause in a draft resolution.</p>
							<p>Friendly Amendment is an amendment written and approved by all the sponsors to a draft resolution and is automatically included into the text.</p>
							<p>Unfriendly Amendment is an amendment not approved by all the sponsors to their draft resolution and must be voted upon before it can be included into the text.</p>
						</div>
						<div>
							<p className="font-semibold">19. Merging:</p>
							<p>combining two or more draft resolutions to make a bigger or new draft resolution. If you are new to Model UN, BE VERY WARY OF AGREEING TO MERGE YOUR RESOLUTION!! A lot of times, experienced delegates will propose a "merge" in which they may steal all your ideas and kick you out of the sponsors' list</p>
						</div>
						<div>
							<p className="font-semibold">20. Voting bloc:</p>
							<p>when delegates vote on the draft resolutions and amendments</p>
						</div>
					</div>
				</div>
				
				<div>
					<p className="font-semibold text-lg mb-3">In Committee</p>
					<p>At the beginning of each conference there is an opening ceremony with a keynote speaker, the introduction of chairs, and some speeches by other important people. Afterwards, you'll want to get to your committee room as fast as possible (you should try to figure out where you're headed before the opening ceremony). Getting there early is of utmost importance in order to get a good seat. Good seats are at the front of the room, in front of the chair, but not a foot away or you'll end up creeping them out. Additionally, when you arrive at your committee early, try your best to talk to other students as a person more than a UN delegate. If people like your personality, they're more likely to work with you in committee.</p>
					
					<p className="mt-3">After everyone gets settled and if there's still time before the conference is supposed to officially begin, at some smaller conference the Chair will have some icebreaker activities. If not, when you get started, you'll begin with some basic parli pro.</p>
				</div>
				
				<div>
					<p className="font-semibold text-lg mb-3">Motions</p>
					<div className="space-y-3">
						<div>
							<p className="font-semibold">Motion to Open Debate:</p>
							<p>This is the first motion of the conference and is made to move into formal debate.</p>
						</div>
						
						<div>
							<p className="font-semibold">Motion to Set the Agenda:</p>
							<p>This motion is made with a specific topic mentioned to be debated first and the other second. Two speakers for, two against, and requires a simple majority to pass.</p>
						</div>
						
						<div>
							<p className="font-semibold">Motion to Open the Speaker's List:</p>
							<p>All delegates wishing to be added to the speakers list should raise their placards. Try to get your placard in the air as fast as you possibly can - aim to try to get on the top 3 or top 5 of the speaker's list. Especially since you can prepare this speech ahead of time, you should feel totally confident trying to get on there early. At later times during the conference, you can send a note to the dais asking to be adding to the speaker's list. If for some reason you couldn't get onto the list early enough, send all the previous speakers with the same policy as you messages, and start a moderated caucus ASAP!</p>
						</div>
						
						<div>
							<p className="font-semibold">Motion to Enter Moderated Caucus:</p>
							<p>This motion brings the body into a moderated debate on the issue on the floor for a specified amount of time. The moderating officer will then recognize speakers for a specified amount of time, who cannot yield to anyone but the Chair at the end of their speech. This motion needs a simple majority to pass. This motion may not be made once debate has been closed. Often times the Chair will prefer to move down the Speaker's List a bit before going into a moderated caucus. If you make this motion and it passes, you have the opportunity to speak first - be sure to take it!</p>
						</div>
						
						<div>
							<p className="font-semibold">Motion to Enter Unmoderated Caucus:</p>
							<p>This motion temporarily suspends the meeting for a specified amount of time. Use it to create resolutions, talk to other delegates, or anything else you may need to do. It requires a simple majority to pass.</p>
						</div>
						
						<div>
							<p className="font-semibold">Motion to Introduce an Unfriendly Amendment:</p>
							<p>This motion brings an amendment that has already been submitted to the Chair with the appropriate number of signatories to the floor for general debate and a vote when debate is closed on the resolution. It is only for unfriendly amendments, for friendly amendments are just considered automatically part of the resolution.</p>
						</div>
						
						<div>
							<p className="font-semibold">Motion to Introduce a Working Paper:</p>
							<p>This motion brings a working paper that has already been approved by the Chair with the appropriate number of signatories to the floor for general debate. It requires a simple majority to pass.</p>
						</div>
						
						<div>
							<p className="font-semibold">Motion to Adjourn the Session:</p>
							<p>This motion adjourns the committee sessions for good. It will only be entertained by the chair at the end of the last committee session. This motion requires a second, is not debatable, and needs a simple majority to pass.</p>
						</div>
						
						<div>
							<p className="font-semibold">Motion to Suspend the Meeting:</p>
							<p>This motion suspends the body between sessions. This motion requires a simple majority to pass.</p>
						</div>
						
						<div>
							<p className="font-semibold">Motion to Divide the Question:</p>
							<p>This motion allows you to take a resolution and vote on each of the operatives separately.</p>
						</div>
						
						<div>
							<p className="font-semibold">Motion to Yield the Question to your Partner:</p>
							<p>This motion is only allowed in some conferences, and allows your partner to answer the question instead of you. This is good if you have no idea what the answer is, but should be avoided whenever possible.</p>
						</div>
					</div>
				</div>
			</div>
		),
	},
	{
		title: "General Assembly",
		id: "general-assembly",
		content: (
			<div className="text-sm text-gray-600 space-y-4">
				<p>A General Assembly (GA) in Model UN is a large committee that simulates the real UN General Assembly. It's known for having a broad range of topics, many delegates, and a focus on formal debate procedures.</p>
				
				<div>
					<p className="font-semibold">Size and Scope:</p>
					<p>GAs are the largest committees at most conferences, often with over 100 delegates, representing the full membership of the United Nations. Because of their size, they are ideal for delegates who want to practice public speaking and work on a large scale.</p>
				</div>
				
				<div>
					<p className="font-semibold">Topic Focus:</p>
					<p>Topics debated in a GA are broad in scope, covering a wide range of global issues from international security and economic development to human rights and climate change.</p>
				</div>
				
				<div>
					<p className="font-semibold">Formal Procedure:</p>
					<p>GAs follow a strict set of parliamentary procedures. The debate is highly structured and typically includes:</p>
					<ul className="list-disc list-inside mt-2">
						<li><span className="font-semibold">Speaker's List:</span> A list of delegates who wish to speak on the topic.</li>
						<li><span className="font-semibold">Moderated Caucuses:</span> Shorter, timed speeches on a specific sub-topic.</li>
						<li><span className="font-semibold">Unmoderated Caucuses:</span> An informal period where delegates can move around and negotiate with others to form blocs and draft resolutions.</li>
					</ul>
				</div>
				
				<div>
					<p className="font-semibold">Resolution-Based:</p>
					<p>The primary goal of a GA committee is to pass a resolution, which is a document that outlines solutions to a specific issue. Delegates work together to draft, debate, and amend these resolutions before they are put to a final vote.</p>
				</div>
				
				<div>
					<p className="font-semibold text-base mb-2">Note passing</p>
					<p>Everyone hates speeches, whether you're giving or receiving one. It is important to understand that in MUN there is no teacher punishing students for not paying attention to every one of the speeches being giving on stage. The moderated caucus is a battleground where everyone vies for a time slot to give a speech and if you do not become one of those lucky few, note passing is an alternative activity for you to participate in while the blowhards on stage are fumbling with their words you can be the puppetmaster. Using notes as a way of extending the unmoderated caucus is useful to continue communicating with key allies about strategies for the next unmoderated caucus or congratulate your enemies in order to lull them into a false sense of security so you can pounce upon them in their time of weakness. The message is simple passing notes extends unmoderated caucus and is a useful tool for coordinating efforts even during speeches.</p>
				</div>
				
				<div>
					<p className="font-semibold text-base mb-2">Formulating Speeches</p>
					<p>You should by now have made a research binder which contains information that is relevant to your committee. Understand that you will not have time to read through each and every one of the sources in your binder compounded with the fact that discussion in committee is fluid to the point where you will oftentimes not have time to prepare a fully scripted speech before the topic shifts. Binder organization is key to making good moderated caucus speeches as being able to pull out relevant information quickly is critical to even formulating your statements.</p>
					
					<p className="mt-3">In the binder make sure that you have a sheet of paper containing key points about the contents of the section so you can quickly pick out information and research to use in your speeches without having to reference the source. The sources in your binder are only there in order to provide proof to the committee that what you have said has substance and can be attributed to a credible source.</p>
					
					<p className="mt-3">The only fully scripted speech you should have is your speakers list speech which is pre prepared and practiced, every other speech given during moderated caucus is an amalgamation of bullet points that you pull from your research binder/notes. The most important part of the moderated caucus speech is the way that the information you present is strung together, be clear and concise avoiding flowery language. The delegates which fall back on using SAT vocabulary or words which sound like they are straight out of a historical text are most often those who are out of their depth, unable to present anything of substance forcing them to rely upon their delivery to distract from their shortcomings.</p>
					
					<p className="mt-3">However, do not confuse those delegates with the delegates who have mastered their content and are using language which enhances the message they are trying to deliver; more often than not the most dangerous delegates are those who understand the topic and how to present it.</p>
					
					<p className="mt-3">This brings me to my next point about your delivery of your speech, in order to truly succeed in captivating your audience you must speak with confidence and authority, both of which you may be lacking. Yet how you present yourself in committee should not be reflective of your true feeling. Becoming emotionally compromised changes you into a bumbling mess incapable of reciting anything but gibberish. Instead the old adage "fake it till you make it" is an apt descriptor of how the majority of good speakers present their information in committee. If you are unable to muster the confidence to deliver a speech with confidence and gusto even when forcing yourself to ignore your shortcomings then it is better to not speak at all instead presenting your authority during unmoderated caucus. Just remember, you'll never see these people again you have nothing to lose. Do not worry about that for now as it takes time for all of us to master the public speaking aspect of MUN, and if it is not one of your strengths replace your weakness with a strong push in unmoderated caucus so long as the chair can notice.</p>
				</div>
			</div>
		),
	},
	{
		title: "Crisis",
		id: "crisis",
		content: (
			<div className="text-sm text-gray-600 space-y-4">
				<p>In a Model UN conference, crisis committees are a fast-paced, dynamic, and immersive experience that differs significantly from traditional General Assembly (GA) committees. Instead of a broad, long-term focus, crisis committees deal with an unfolding situation and require delegates to make rapid decisions.</p>
				
				<div>
					<p className="font-semibold text-base mb-2">How Crisis Committees Work</p>
					<p>A crisis committee operates with two primary components: the front room and the back room.</p>
					
					<div className="mt-3">
						<p><span className="font-semibold">Front Room:</span> This is the committee room itself, where formal debate occurs. It's a faster-paced version of a GA, with delegates passing directives instead of resolutions. Directives are shorter, more specific action-oriented documents that address a specific problem or crisis update.</p>
					</div>
					
					<div className="mt-3">
						<p><span className="font-semibold">Back Room:</span> This is the private world of the committee, run by the crisis staff. It's where the real action happens. Delegates send crisis notes to the back room, which are private messages that drive their individual storyline, or crisis arc. These notes can contain secret plans, requests for resources, or anything that advances a delegate's personal agenda.</p>
					</div>
					
					<p className="mt-3">The committee progresses through crisis updates, which are sudden, often dramatic events delivered by the crisis staff. These updates can be a news bulletin, a message from a fictional character, or even a skit, and they require the committee to immediately respond with directives and crisis notes.</p>
				</div>
				
				<div>
					<p className="font-semibold text-base mb-2">Tips for Success</p>
					<p>To succeed in a crisis committee, you must master the art of multitasking and strategic thinking.</p>
					
					<div className="mt-3">
						<p><span className="font-semibold">Have a Crisis Arc:</span> Before the conference, develop a clear, detailed storyline for your character. Know what your ultimate goals are and plan out the steps to achieve them. This is your personal plot line.</p>
					</div>
					
					<div className="mt-3">
						<p><span className="font-semibold">Master the Crisis Note:</span> Your crisis notes are the key to winning. Be specific, clear, and detailed in your notes to the crisis staff. Don't just say "I want more money"; specify exactly how much, what it will be used for, and why you need it.</p>
					</div>
					
					<div className="mt-3">
						<p><span className="font-semibold">Multitask:</span> You'll need to write notes, participate in front-room debate, and network with other delegates—all at the same time. Have a pen in one hand and your placard in the other.</p>
					</div>
					
					<div className="mt-3">
						<p><span className="font-semibold">Influence the Updates:</span> The most successful delegates don't just react to crisis updates—they create them. By sending well-planned crisis notes, you can introduce new elements into the committee's storyline and steer the debate in your favor.</p>
					</div>
					
					<div className="mt-3">
						<p><span className="font-semibold">Think Creatively:</span> Crisis committees reward creativity and bold action. Don't be afraid to take risks and go against the committee's consensus in your private notes, as long as it aligns with your character's goals.</p>
					</div>
				</div>
			</div>
		),
	},
	{
		title: "Resolutions",
		id: "resolutions",
		content: (
			<div className="text-sm text-gray-600 space-y-4">
				<p>A resolution is a formal document that outlines the proposed solutions to a problem or issue being debated in a Model UN committee. It is the end product of all the research, debate, and negotiation. Resolutions are written collaboratively by delegates with similar goals and are then voted on by the entire committee. DO NOT WRITE RESOLUTIONS BEFOREHAND</p>
				
				<div>
					<p className="font-semibold text-base mb-2">Structure of a Resolution</p>
					<p>A standard Model UN resolution has three main parts:</p>
					
					<div className="mt-3">
						<p><span className="font-semibold">The Heading:</span> This section provides key identifying information. It includes the committee name, the topic, the sponsors (the delegates who authored the resolution), and the signatories (delegates who want to see the resolution debated but don't necessarily support every part of it).</p>
					</div>
					
					<div className="mt-3">
						<p><span className="font-semibold">Preambulatory Clauses:</span> This section acts as the preamble, setting the context for the resolution. These clauses cite past actions, relevant treaties, and the general purpose or justification for addressing the topic. Each preambulatory clause begins with a specific phrase (like "Deeply concerned," "Recalling," or "Acknowledging") and ends with a comma.</p>
					</div>
					
					<div className="mt-3">
						<p><span className="font-semibold">Operative Clauses:</span> This is the core of the resolution and contains the proposed solutions and actions. Each clause begins with an operative phrase (such as "Decides," "Calls upon," or "Recommends") followed by a semicolon. The final clause, however, ends with a period. These clauses should be specific, realistic, and organized logically to explain what the committee will do to solve the problem.</p>
					</div>
				</div>
				
				<div>
					<p className="font-semibold text-base mb-2">The Resolution Process</p>
					
					<div className="mt-3">
						<p><span className="font-semibold">Working Papers:</span> Delegates with similar viewpoints work together to draft an initial document, often called a working paper. This is a rough draft that is not yet formally debated.</p>
					</div>
					
					<div className="mt-3">
						<p><span className="font-semibold">Draft Resolution:</span> Once a working paper has enough support (signatories), it becomes a draft resolution and is submitted to the committee's chair.</p>
					</div>
					
					<div className="mt-3">
						<p><span className="font-semibold">Debate and Amendments:</span> The draft resolution is then formally debated in the committee. Delegates can propose amendments to change, add, or remove specific operative clauses.</p>
					</div>
					
					<div className="mt-3">
						<p><span className="font-semibold">Voting:</span> After all debate and amendments, the draft resolution is put to a vote. If it receives a simple majority (in most committees), it is considered passed and becomes an official resolution of that committee.</p>
					</div>
				</div>
				
				<div>
					<p className="font-semibold text-base mb-2">Examples</p>
					
					<div className="bg-gray-50 p-4 rounded space-y-2 mt-3">
						<p className="font-semibold">United Nations Educational, Scientific and Cultural Organization (UNESCO)</p>
						<p className="font-semibold">The Initiative to Foster Respect, Understanding, Involvement, and Tolerance (F.R.U.I.T)</p>
						
						<p className="mt-3"><span className="font-semibold">Sponsors:</span> Malaysia, Greece, Chad, Iran, Cameroon, Bangladesh, India, Egypt</p>
						<p><span className="font-semibold">Signatories:</span> Bulgaria #2, Colombia, Chile, Mexico, Panama, Denmark, Columbia, Bulgaria, Philippines, Peru, Armenia, China, Germany, Bulgaria #1</p>
						
						<p className="font-semibold mt-4">PREAMBULATORY CLAUSES:</p>
						<p>Acknowledging the nations who have historically been left behind in the quest for finding a balance between free expression and regulation.</p>
						<p>Advocating to stop the spread of disinformation.</p>
						<p>Increasing the accessibility of perspectives.</p>
						<p>Aiding nations in the quest to preserve access to governmental information</p>
						<p>Creating transparent guidelines for regulation.</p>
						
						<p className="font-semibold mt-4">OPERATIVE CLAUSES:</p>
						<ol className="list-decimal list-inside space-y-3">
							<li>
								<span className="font-semibold">Defines regulations through a variety of methods:</span>
								<ul className="list-disc list-inside ml-4 mt-2">
									<li>Ensuring the sovereignty of all member nations</li>
									<li>Every country will determine its restrictions on freedom of expression, so as not to impose on the cultural beliefs of specific nations
										<ul className="list-disc list-inside ml-4 mt-1">
											<li>This is also inclusive of religious and cultural-based governments</li>
											<li>Helps governments target specific issues on a need-basis</li>
										</ul>
									</li>
									<li>Countries will have control over their policies as it is difficult for the UN to keep track of specific policies.</li>
									<li>The individual governments will regulate the companies that operate in their countries, and the companies will individually regulate the content.</li>
									<li>The UN panel will be created under UNESCO to oversee, ensuring that countries will not enforce too many or too few regulations.</li>
									<li>The panel will perform yearly investigations for each country to ensure that all countries follow the regulations, as guidelines must be followed by nations per past UN resolutions.</li>
								</ul>
							</li>
							
							<li>
								<span className="font-semibold">Regulating Panels:</span>
								<ul className="list-disc list-inside ml-4 mt-2">
									<li>Each country has the right to change its policy without the express permission of the UN so long that it is within the UN regulations.</li>
									<li>Each country's request for change in their regulations must be reasonable.</li>
									<li>Countries' regulations shall not violate an individual's right to freedom of expression.</li>
									<li>Countries' regulations should not harm an individual or the government in any way.</li>
									<li>The UN panel should not make any changes whatsoever without UN approval.</li>
								</ul>
							</li>
							
							<li>
								<span className="font-semibold">Creates increased access to news:</span>
								<ul className="list-disc list-inside ml-4 mt-2">
									<li>Access to some form of state-sponsored news:
										<ul className="list-disc list-inside ml-4 mt-1">
											<li>The government has the right to change or add statements to the news if it sponsors it. A useful tool to keep citizens informed for decision-making.</li>
											<li>Express the importance of there being some form of state-sponsored media for citizens to be informed</li>
											<li>An informed citizen body has numerous benefits regardless of whether the data citizens have access to is state-sponsored or independent.</li>
										</ul>
									</li>
									<li>News deemed inappropriate, violent, hurtful, or offensive shall and must not be posted, and if posted, it will be taken down. There should be enough regulation so that the content that is being shared doesn't cause harm or conflict between people</li>
								</ul>
							</li>
							
							<li>
								<span className="font-semibold">Raises funding:</span>
								<ul className="list-disc list-inside ml-4 mt-2">
									<li>The first step of the plan is to recommend a raise in taxes with a maximum increase of 2%,</li>
									<li>The tax rate can be adjusted according to countries and their tax systems.</li>
									<li>As a second step, the bloc proposes the creation of an international fund, with countries adding money following the size of their economy.</li>
									<li>This fund can be used only if a country has absolutely no extra money to spare and needs it.</li>
									<li>When the funds are taken, the panel will also ensure that the money is spent where it needs to be, not into corrupt officials' pockets.</li>
								</ul>
							</li>
							
							<li>
								<span className="font-semibold">Increases access to information and diverse perspectives:</span>
								<ul className="list-disc list-inside ml-4 mt-2">
									<li>Increases access to information before regulation + must give schools more supplies =</li>
									<li>Budget of (ex:) the aforestated UN panel will give money from the monetary fund to countries according to their population size and needs. The money must go to schools to establish classes for students to be able to express themselves</li>
									<li>Children and teens need to express themselves so that they are civil and so that one day the bottled emotions won't just explode and they shall be suddenly depressed</li>
									<li>Examples to do with art and tech: paint, write a story, play music, create music, etc.</li>
								</ul>
							</li>
							
							<li>
								<span className="font-semibold">Protects journalism:</span>
								<ul className="list-disc list-inside ml-4 mt-2">
									<li>We define journalism as an institution of representing facts and only facts</li>
									<li>if incorrect information is posted - will be taken down</li>
									<li>The same laws that apply to Access to News will also apply to journalism</li>
									<li>The UN will use the depths of its power to ensure that the resolutions that they suggest benefit all member nations</li>
								</ul>
							</li>
						</ol>
					</div>
				</div>
			</div>
		),
	},
	{
		title: "Directives",
		id: "directives",
		content: (
			<div className="text-sm text-gray-600 space-y-4">
				<p>A directive in Model UN is a short, action-oriented document used primarily in crisis committees. Unlike a full resolution, which is comprehensive and long-term, a directive is a concise order or command designed to address a single, immediate problem in a fast-paced crisis scenario.</p>
				
				<div>
					<p className="font-semibold text-base mb-2">Key Features of a Directive</p>
					
					<div className="mt-3">
						<p><span className="font-semibold">Action-Oriented:</span> A directive is focused on a specific action. For example, instead of a resolution about improving global food security, a directive might be a command to a fictional character to send a specific amount of aid to a city by a certain deadline.</p>
					</div>
					
					<div className="mt-3">
						<p><span className="font-semibold">Concise and Brief:</span> Directives are typically very short, often just a few clauses long, and are meant to be written and passed quickly in response to a crisis update.</p>
					</div>
					
					<div className="mt-3">
						<p><span className="font-semibold">Targeted and Specific:</span> They are directed at specific individuals, groups, or entities (e.g., "The Minister of Finance will transfer funds..." or "The military will deploy...").</p>
					</div>
					
					<div className="mt-3">
						<p><span className="font-semibold">Unilateral or Committee-Wide:</span> A directive can be proposed by a single delegate for a secret action (a "crisis note") or it can be debated and voted on by the entire committee to take a public, committee-wide action.</p>
					</div>
				</div>
			</div>
		),
	},
	{
		title: "Unmods",
		id: "unmods",
		content: (
			<div className="text-sm text-gray-600 space-y-4">
				<p>During an Unmoderated Caucus, delegates are free to walk around and converse with other delegates. It is basically a "free-for-all" where everyone gets up and starts talking to each other. You will see groups of people form as they discuss the topic. Now, many people think that "unmods" are when you get to fool around with other delegates and use the bathroom, but that is completely wrong. As you will see, unmods are possibly the most important part of any committee session.</p>
				
				<div>
					<p className="font-semibold text-base mb-2">Purpose of Unmoderated Caucuses</p>
					<p>There are several important things you should be doing during an unmod such as</p>
					<ul className="list-disc list-inside mt-2">
						<li>talking to other delegates so you know what their country's policy is</li>
						<li>expressing your own ideas as a delegate so more people know about your goals/policies (it is very important to do this)</li>
						<li>finding countries who have similar policies as your country so that you can form a resolution group with them</li>
						<li>writing a resolution with your resolution group</li>
						<li>establishing yourself as leader of your resolution group</li>
						<li>Using the bathroom/getting water (but only if it is an emergency)</li>
					</ul>
				</div>
				
				<div>
					<p className="font-semibold text-base mb-2">Motioning for an Unmod</p>
					<p>A motion for an unmod generally goes like this:</p>
					<p className="italic mt-2">[Country] motions for a [number of minutes] minute unmoderated caucus</p>
					<p className="mt-2">Note that you do NOT need to state a purpose for an unmoderated caucus as you would for a moderated caucus. Generally, an unmod lasts for about 5-15 minutes. During the beginning of debate on a topic, you are more likely to have unmods that are 5 minutes. However, as time passes and as delegates begin writing resolutions, unmods tend to be a little longer. You will rarely ever be in an unmod that lasts longer than 15 minutes.</p>
					
					<p className="mt-3">In the beginning of debate on a topic, you should motion for an unmoderated caucus after about 5-10 speeches from the Speaker's List have been given. After this unmod ends, you will have some more speeches, followed by another unmod. This pattern continues until you eventually reach voting bloc.</p>
				</div>
				
				<div>
					<p className="font-semibold text-base mb-2">What should you expect in an Unmod?</p>
					<p>As soon as the committee enters an unmoderated caucus, all delegates will get up. You will see groups of delegates forming with a bunch of delegates talking. On the other hand, you will also see a bunch of newbies who are just screwing around because they don't know what to do. But you are better than those noobs. Go to one of the aforementioned groups of delegates and politely begin talking and expressing your ideas. Later, try to get some of the newer delegates who don't really know what they are doing on your side. Unlike some of the more experienced "power" delegates, these new delegates won't backstab you.</p>
					
					<p className="mt-3">As committee progresses, find the group of delegates who you share policies with. This group will now become your resolution group and you can start drafting a resolution with them. Slowly, begin asserting your dominance so you can be the leader of your group. Make sure that you contribute significantly to drafting the resolution as this will be important later when you present your resolution to the committee.</p>
				</div>
				
				<div>
					<p className="font-semibold text-base mb-2">What should you do in an Unmod?</p>
					<p>The most important thing you should be doing during an unmod is expressing your ideas. How do YOU want to solve the problem? What strategies has YOUR country implemented in the past to deal with the issue? Whenever you talk to people, always express your country's ideas. Try to talk as much as possible.</p>
					
					<p className="mt-3">Now, many other delegates also want to express their ideas. They will try to interrupt you before you even finish saying what you want to say. If this happens, don't try to talk over them. Stay calm, and with a firm voice, say "can I please finish my sentence?". This way, everyone will see that you are sophisticated and the person who interrupted you is being childish.</p>
				</div>
				
				<div>
					<p className="font-semibold text-base mb-2">When the Chair Comes…</p>
					<p>In most committees, the chair and other members of the dias will walk through committee to see what delegates are up to. Remember, the Chair is the one who determines who, and who does not, win awards, so always be on your best behaviour and always try to show your sophistication when the Chair is near you. However, everyone else around you is also going to have this same mindset so as soon as the Chair comes, a bunch of people will start talking. Just make sure to look diplomatic and make sure to speak often.</p>
				</div>
				
				<div>
					<p className="font-semibold text-base mb-2">It's Not About What You Say, but How You Say It</p>
					<p>During both unmods and mods, people are attracted to people who sound sophisticated and classy. You can know everything there is to know about the topic, but if don't act maturely or if you come off as a Gavel Hunter, people won't be inclined to speak to you. Here are some things you can do to present yourself in the best possible way:</p>
					<ul className="list-disc list-inside mt-2">
						<li>have a firm handshake</li>
						<li>maintain eye contact</li>
						<li>don't constantly look at your notes/research when you are speaking</li>
						<li>have a proper posture (don't slouch, it makes you seem underconfident)</li>
						<li>bring a research binder with you. If you pull out a sheet of paper with a diagram of your solution, or some graphs, people will be amazed by your knowledge</li>
					</ul>
				</div>
			</div>
		),
	},
	{
		title: "Sample Student Position Papers",
		id: "sample-student-position-papers",
		content: (
			<div className="text-sm text-gray-600 space-y-4">
				<div className="bg-gray-50 p-4 rounded space-y-2">
					<p><span className="font-semibold">Committee:</span> UNHRC</p>
					<p><span className="font-semibold">Country:</span> Switzerland</p>
					<p><span className="font-semibold">Topic A:</span> Ukrainian Refugee Crisis</p>
					<p><span className="font-semibold">Delegate:</span> Charlotte Zhou</p>
					
					<div className="mt-4">
						<p className="font-semibold text-base mb-2">Topic Background</p>
						<p>The recent invasion of Russia into Ukraine's sovereign territory has paved way for the most severe refugee crisis in the last century. Since Russia's invasion of Ukraine on February 24th, 2022, approximately 7.75 million Ukrainian citizens have been forced to take refuge in neighboring countries.</p>
					</div>
					
					<div className="mt-4">
						<p className="font-semibold text-base mb-2">Country Policy and International Involvement</p>
						<p>Switzerland has historically remained a neutral country in the face of conflict. However, sandwiched between France, Germany, and Italy, Switzerland naturally felt western influence creep into its culture and values. The Russia-Ukraine conflict forces this contradiction into the spotlight and places the Swiss government in a dilemma. To remain neutral would surely cause dissent among the people, who overwhelmingly support the Ukrainians in the war. However, breaking its long-standing neutrality comes with considerable risk. Switzerland is walking a fine line between the two, imposing sanctions against Russia and accepting Ukrainian refugees, yet refusing to join any European alliance or send weaponry.</p>
						
						<p className="mt-3">The Swiss government grants a 90-day temporary asylum period to Ukrainian refugees, where they can apply for a special status S that grants them the right of residence for one year.</p>
						
						<p className="mt-3">The majority of Ukrainian refugees have taken asylum in countries participating in the Ukraine Regional Refugee Response Plan, namely, Ukraine's neighboring countries of Poland, Romania, Hungary, Slovakia, and Moldova. In addition, the European Union member states activated the Temporary Protection Direction on March 4th, 2022, requiring that all EU member states provide some form of temporary asylum to Ukrainian refugees. While many European countries have systems in place to grant Ukrainian refugees asylum, support beyond basic housing is limited.</p>
					</div>
					
					<div className="mt-4">
						<p className="font-semibold text-base mb-2">Possible Solutions</p>
						<p>It is imperative that countries work to execute plans that benefit Ukrainian refugees both in the long term and the short term, as in the current state of affairs, it is impossible to know how long the Russia-Ukraine conflict will drag on or if it will escalate to a larger conflict.</p>
						
						<p className="mt-3">UNHCR's funds are best spent on accommodating Ukrainian refugees in need with services beyond the bare necessities. Thus, Switzerland proposes the establishment of temporary refugee support stations located at the Western Ukrainian border to provide basic necessities, psychological counseling, medical aid, and guidance for receiving asylum in other countries.</p>
						
						<p className="mt-3">Of the 60,000 refugees in Switzerland with status S as mentioned in the country policy, 11% have been employed in the last six months, twice as many as other temporarily admitted persons. The Swiss government is working to integrate Ukrainian refugees into the labor market as a solution to the influx of refugees, which can alleviate the economic burden of refugees on their host countries. By assisting countries in introducing programs that allow Ukrainian refugees to adapt to an individual country's language and culture, the Ukrainian refugees can contribute to the economy and earn their own living wages, alleviating financial stress in the long term and providing a stable future for refugees in the countries they take asylum in. On that same note, integrating specialized training programs for educators of Ukrainian refugees in school would greatly increase the quality of education for Ukrainian students, who would otherwise struggle to adapt to the language and curriculum of a different country.</p>
					</div>
					
					<div className="mt-4">
						<p className="font-semibold text-base mb-2">Bibliography</p>
						<ul className="list-none space-y-2">
							<li>Foulkes, Imogen. "Ukraine war sees Swiss challenge their age-old neutrality." BBC, 7 May 2022, www.bbc.com/news/world-europe-61320132. Accessed 31 Oct. 2022.</li>
							
							<li>"Switzerland: 11% of Ukrainians With Protection Status S Have Been Employed So Far." Schengen Visa, 24 Aug. 2022, www.schengenvisainfo.com/news/switzerland-11-of-ukrainians-with-protection-status-s-have-been-employed-so-far/. Accessed 31 Oct. 2022.</li>
							
							<li>"Ukraine Crisis." International Rescue Committee, www.rescue.org/topic/ukraine-crisis. Accessed 31 Oct. 2022.</li>
							
							<li>"Ukraine Refugee Situation." Operational Data Portal, UNHCR, data.unhcr.org/en/situations/ukraine. Accessed 31 Oct. 2022.</li>
						</ul>
					</div>
				</div>
			</div>
		),
	},
];

export default guideData;