import React from "react";
function ExpandableBio({
	pre,
	post,
}: {
	pre: React.ReactNode;
	post: React.ReactNode;
}) {
	const [expanded, setExpanded] = React.useState(false);
	return (
		<>
			{pre}
			<button
				className={
					"py-3 my-2 md:my-1 md:py-1 px-4 md:px-1 rounded-md bg-indigo-500 active:bg-indigo-600 md:active:bg-white md:bg-white md:underline text-indigo-50 md:text-indigo-500 active:text-indigo-800"
				}
				onFocus={(e) => e.target.blur()}
				onClick={() => setExpanded((old) => !old)}
			>
				{expanded ? "Read Less..." : "Read More..."}
			</button>
			{expanded && <>{post}</>}
		</>
	);
}
export default [
	{
		name: "Parth Asawa",
		position: "President",
		bio:
			"Hi everyone! My name is Parth Asawa, and I'm excited to serve as your President this year! I joined MVMUN " +
			"as a freshman, and doing so has been one of the best decisions I've made in high school so far. Perhaps " +
			"two of the most alluring aspects of MVMUN, are the intense (but fun!) nature of competitions, in addition " +
			"to the close friendships you build within the team. I look forward to getting to know everybody this year, " +
			"and hope to help make your MUN journeys incredible! Outside of MUN, I'm involved in Math and Physics " +
			"competitions and clubs, and love playing basketball and frisbee recreationally with my friends.",
		memeBioNickname: "pogasawa",
		memeBio:
			"Parth is well-known in our school as a math god, but did you know that he is actually the most popular " +
			"boy in our grade too? Yup, this man was the ONLY boy elected in the homecoming second round for 2019 " +
			"in our grade (though he turned the offer for some unknown reason). Apart from excelling in social life, " +
			"he enjoys singing 2000's hits in class, explaining random AIME problems on the whiteboard, and getting " +
			"body gains. You can see Parth usually at the library, where he usually discusses simping, math, physics, " +
			"simping, GAMES, and a lot of other random topics (did I mention simping twice?).",
	},
	{
		name: "Nelson Mu",
		position: "Vice President / President of Kennedy",
		bio:
			"Hey guys! I'm Nelson Mu, and I'm happy to serve as your Vice President for this year! Prior to my 3 years " +
			"of MUN, I had no experience with leadership or communication, and this club really helped me develop those " +
			"vital skills. Outside of MUN, I like to do volunteering and political advocacy and debate, and when I'm " +
			"not being a complete nerd I like to chat with people and play video games. I am extremely excited to see " +
			"how our club's delegates grow, not just as competitors, but as people. I will also be working to ensure " +
			"that the year offers as many experiences for fun and growth as it did for me the last three years!",
		memeBioNickname: "the Nelston",
		memeBio: (
			<ExpandableBio
				pre={
					<p>
						Nelson is one of those boys that you&apos;ll spot
						sitting at a desolate part of the hallway looking
						directly downward at his phone likely playing some new
						battle royale phone game. Surrounding him are his
						comrades, compadres, cohorts all strangely chuckling to
						themselves. Hopefully you see this Nelson before you
						come to a meeting. Then you don&apos;t have to go the
						other way around in getting to know Nelson. The Nelson
						most people see is at meetings leading those iconic one
						way conversations, but there is more to this man than
						meets the eyes and ears.
					</p>
				}
				post={
					<p>
						For instance, combine those two words at the beginning
						of the last sentence and then a &apos;t&apos; after the
						&apos;s&apos; and paste that after
						&apos;youtube.com/&apos; and just a few months ago you
						could have uncovered a motherload of the hottest content
						on that website. Those one way conversations are just
						the beginning of the journey to the center of
						nelson&apos;s mind and back out. Here are some other
						insights that can kickstart anyone&apos;s relationship
						with Nelson: at conferences he will &apos;sleep&apos; in
						bed with all of the lamp lights in the hotel room on and
						perhaps diffuse into another dimension before five
						minutes later suddenly sitting up erect and saying some
						variation of: &quot;Alright, got to get some work
						done,&quot; he says that food is just fuel and will
						inhale his fuel to power that large machine of his but
						when he is introduced to a sublime dish he will then
						admit &quot;yeah, this is pretty good,&quot; and most
						crucially he is always down to roast some liberals.
					</p>
				}
			/>
		),
	},
	{
		name: "Nathan Wang",
		position: "VP of Conferences",
		bio:
			"Hey guys! I'm Nathan, and I couldn't be happier to be your VP of Conferences next year! I started my MUN " +
			"adventure in 8th grade and I have had a blast screaming at other delegates as we hammered out a resolution " +
			"just a few minutes before the deadline (this is not recommended :P). I hope you will have a wonderful time " +
			"in MUN as you write resolutions, win awards, and most importantly: enjoy yourselves! Outside of MUN, " +
			"I can be found doing competitive programming and playing tabletop simulator & card games. Please feel " +
			"free to reach out to me for any reason at any time :)",
		memeBioNickname: "secret hitler",
		memeBio: (
			<ExpandableBio
				pre={
					<p>
						Probably most known for playing the board game Secret
						Hitler, Nathan has a tendency to print his own set of
						popular board games, including construction paper
						squares as currency for coup (multiple people&apos;s
						least favorite game). Although he makes a valid attempt
						to teach said board games, his explanation of rules is
						questionable. At least he tries though. He has been
						called &quot;golf ball&quot; on multiple occasions for
						not doing his lit homework. A notable occurrence is when
						he went to the BMUN delegate dance and actually tried to
						dance. Also he made maatcha, a dating platform
						exclusively for himself. nathan has the best meme
						templates and he is currently actively searching for gf
						applications:
					</p>
				}
				post={
					<>
						<img
							src={
								"/images/secretariat-resources/nathan-meme.jpg"
							}
						/>
						<a
							className={
								"block md:hidden text-center underline text-indigo-500 active:text-indigo-800 py-3"
							}
							href={
								"/images/secretariat-resources/nathan-meme.jpg"
							}
							target={"_blank"}
							rel={"noopener noreferrer"}
						>
							Click to open in new tab
						</a>
						<p className={"text-center italic"}>
							You might know where this picture was taken. It’s a
							MVMUN tradition to meet up at Yogurtland after
							conferences (if we can meet) — and don’t worry,
							unlike Nathan, we promise you won’t be the only one
							there!
						</p>
					</>
				}
			/>
		),
	},
	{
		name: "Sylvia Li",
		position: "VP of Internal Affairs",
		bio:
			"Hello! I'm Sylvia Li and I'm your VP of internal affairs this year. I'm a junior and I have been in MUN " +
			"since 8th grade, and although at the time I had no idea what I was getting myself into, I've grown fond " +
			"of this club and all the people I've become friends with. I joined (and stayed) in MUN because of my " +
			"curiosity towards discussions of the world and global issues, despite the fact that my public speaking " +
			"skills may not have been the best. MUN has pushed me to improve myself, whether self-confidence related, " +
			"or creating strong rebuttal arguments in under 30 seconds, and I truly believe the time and effort put " +
			"into this club is worth it. Outside of MUN, I'm a part of Color Guard, Track and Field, and I love working " +
			"on projects with my friends.",
		memeBioNickname: "Coup God",
		memeBio: (
			<ExpandableBio
				pre={
					<>
						<p>
							If you get to know Sylvia, you&apos;ll find that
							she&apos;s one of the most friendly, caring, and
							supportive individuals. She always has your back,
							and she&apos;s like the glue that holds
							everyone&apos;s sanity together.
						</p>
						<p>
							When she&apos;s not busy fixing other people&apos;s
							mistakes, Sylvia can be found playing her favorite
							card game, Coup. Her favorite strategy for her
							favorite card game is to never lie, ever! Here are
							some more fun facts about Sylvia:
						</p>
					</>
				}
				post={
					<>
						<ul className={"list-disc pl-5"}>
							<li>
								Self-proclaimed &quot;Greatest
								accomplishment:&quot; sending a brown organism
								with green and red stripes to a Secret Santa
								party (picture available{" "}
								<a
									className={
										"underline text-indigo-500 active:text-indigo-800"
									}
									href={
										"/images/secretariat-resources/sylvia-organism.jpg"
									}
									rel={"noopener noreferrer"}
									target={"_blank"}
								>
									here
								</a>{" "}
								for scientific purposes)
							</li>
							<li>
								Went to Yosemite expecting enough internet
								bandwidth to successfully teach a Zoom class
								while hiking up mountains
							</li>
							<li>
								Second-tallest exec (Nelson&apos;s first)
								[Editor&apos;s note: We suspect this may have to
								do with elevated heels. Additionally, our
								editorial board cannot independently confirm the
								validity of this claim; we suspect this may be
								fake news, Parth is probably taller.]
							</li>
							<li>
								Left the hotel, where she was previously playing
								Blackjack, so she could walk two miles to attend
								BMUN&apos;s delegate dance and spend two hours
								in the corner of the room playing Blackjack.
								When not asked to comment, Sylvia noted that she
								also &quot;bought everyone pizza.&quot;
							</li>
						</ul>
						<p>
							We&apos;ve sent an undercover agent to learn more
							about Sylvia. Here&apos;s what our agent reports:
							&quot;Sylvia is perhaps best known for the dreaded
							&apos;reee&apos; she uses to stain internal club
							communications, but she has also established herself
							as a prolific uploader of emoji, drawing inspiration
							from pikachu memes to biology teachers. She also
							harbors a hidden talent for making remarkably
							good-looking cards (and, to a lesser extent,
							posters).&quot;
						</p>
					</>
				}
			/>
		),
	},
	{
		name: "Dylan Yang",
		position: "VP of Finance",
		bio:
			"Hi everyone! My name is Dylan Yang and I'm excited to be serving as your VP of finances this year. I've " +
			"been doing Model UN since 8th grade and I've never looked back. When I first joined, I thought I knew " +
			"exactly what the club was about — speaking, debating, and most of all shouting. But over time I've " +
			"learned that it's about a lot more than that. It helped me work on skills like negotiation or leadership " +
			"(it also helped me realize how much I need to work on them), and built up my interest in global affairs " +
			"as well. But most of all, I never expected how much I would grow to value the MVMUN community. I'd love " +
			"to get to know you this year, whether as a MUN delegate or just to talk!",
		memeBioNickname: "two identical roller backpacks",
		memeBio: (
			<ExpandableBio
				pre={
					<p>
						Though it may seem as if Dylan is the type of person to
						send fully punctuated messages on instant messaging
						platforms, our editors are proud to report that as of
						eighteen months ago, this is no longer the case. It
						appears as if he has decided that his time is better
						used on other productive activities, including losing to
						Nathan in every board game, losing with Nathan in every
						board game, grinding Tetris, and writing position papers
						of extreme length (and only slightly questionable
						quality). If you ever manage to catch the elusive Dylan,
					</p>
				}
				post={
					<p>
						make sure not to tell him that he isn&apos;t
						knowledgeable enough to insult someone, lest he read
						another book on Mao Zedong. Dylan Yang takes
						&quot;responsibility&quot; to a whole other level --
						which is great, considering his involvement in club
						finances. When it comes time to file officer
						reimbursements for various expenses, you will be shocked
						to know that Dylan is more proactive about reimbursing
						other people than other people are about reimbursing
						themselves -- indeed, with certain officers, Dylan has
						had to chase them down to give them money!!
						(Editor&apos;s note: the officer in question declined to
						be named. When Dylan was asked to comment, he was found
						sleeping.)
					</p>
				}
			/>
		),
	},
	{
		name: "Eugene Yoon",
		position: "Logistics",
		bio:
			"Hi all! My name is Eugene Yoon, and I'm the logistics officer for Model UN this year. I'm a senior, " +
			"and I've gotten interested in MUN quite late in my high school career (there's always time to try new " +
			"activities and clubs!). The learning I get from the MUN conferences is probably my most favorite part " +
			"of this club; talking to other delegates and tackling current world issues improved my communication " +
			"skills, including leadership, negotiation, speaking, and listening. These abilities have carried me " +
			"through group projects, arguments with friends, and school presentations. Outside of MUN, I like to " +
			"run, swim, read, and program (though not very well). I hope to know each and every one of you guys this " +
			"year! Feel free to reach out to me any time if you have questions about anything, regardless of whether " +
			"it's related to MUN or not!",
		memeBioNickname: "Evergreen",
		memeBio:
			"“Eugene Yoon is an absolute simp that supports EVMUN over MVMUN” - EVMUN Co-President 2020-21. " +
			"Let's stop and take a moment to process that. The President. Of EVMUN. Thinks that Eugene supports " +
			"EVMUN over MVMUN. You're on the MVMUN website, so I'm going to let you in on a little secret ;). " +
			"Eugene is actually a double agent. EVMUN thinks he's spying for them, but he's actually feeding " +
			"them fake information directly at our behest while simultaneously collecting information on EVMUN. " +
			"He is, in fact, the 007 of MVMUN. ",
	},
	{
		name: "Conner Yin",
		position: "Training",
		bio:
			"Hi everyone, I'm Conner Yin and I'm super excited to be one of your training officers this year! I'm a " +
			"senior that joined MUN in my junior year (it's never too late to try something new!) and I absolutely " +
			"love the adrenaline that pumps through you when you're everybody is watching you give a speech or duking " +
			"it out with Russia and China as the U.S. The MVMUN community is super welcoming, and I hope you'll all " +
			"find the friendships and joy that I've found with this amazing club :]. Outside of MUN, I love to play " +
			"games like Settlers of Catan and Secret Hitler with my friends, as well as post music covers and original " +
			"songs to my youtube channel (it's just my name, sub if you want hehe). You're always free to message me " +
			"if you want to talk about anything mun-related or non-mun related!",
		memeBioNickname: "Frat Boy",
		memeBio:
			"What does Mr. Yin do with his free time? It is entirely unclear, but we hypothesize that Conner secretly " +
			"runs a fraternity on Monta Vista campus. His face tells you that he studies 25 hours a day, but his hair and " +
			"outfit scream that he plays beer pong and chills with the bros 26 hours a day. The man plays flute, and it's " +
			"certainly handy that this skill has ensured he has great... facial strength, for the impassioned speeches he " +
			"frequently makes, of course. When he isn't busy flexing his social skills, Conner enjoys laughing at literally " +
			"anything. His laugh is so infectious that the WHO accidentally mistook it for COVID-20 because of its high spread " +
			"rate. What is the key to this chad's charm? Nobody really knows for sure, but one thing is certain: this man will " +
			"make you like him, whether or not you like it.",
	},
	{
		name: "Howard Peng",
		position: "Training",
		bio:
			"Hey guys, I'm Howard Peng and I'll be one of your training officers this year. I'm a junior and I started " +
			"MUN in my sophomore year. Immediately, I was really excited to be part of crisis committees, where I felt " +
			"like I had the freedom to invent my own world. MUN has also helped me develop my leadership and speaking " +
			"skills, and taught me how to develop relationships and maintain them. Aside from MUN, I like to program, " +
			"particularly low-level programs, as well as read.",
		memeBioNickname: "fail.army.101.0@gmail.com",
		memeBio:
			'Howard is known for having a ridiculously big vocabulary, using words such as "heuristic," "asynchronous,"' +
			' and "fail army." As you can probably tell, he has a knack for sounding smart, which is usually accurate,' +
			" but a lot of the time it's because he just leaves everyone else dumbfounded. Howard has been the architect" +
			" of a number of ingenious ideas, ranging from fake social media accounts to spread MVMUN propaganda, to" +
			" actually setting fail.army.101.0@gmail.com as his email address. You might not have a chance to see him" +
			" around campus, but if you ever find him in a Zoom meeting, make sure you check out his Twitch streamer" +
			" cosplay, and especially his pro gaming chair!",
	},
	{
		name: "Jeffrey Meng",
		position: "Webmaster",
		bio:
			"Hello! I'm Jeffrey Meng and I'll be your webmaster this year. I'm a junior and I joined MVMUN as a " +
			"sophomore with the goal of improving my public speaking skills and having fun. I'm glad that I joined " +
			"Model UN because in addition to improving my speaking skills, it's also let me practice leadership, " +
			"improve negotiation skills, learn about global affairs, and meet new people. When I'm not doing MUN, " +
			"you can find me programming, reading, and skiing.",
		memeBioNickname: "Righteous",
		memeBio:
			"Jeffrey Meng is someone who is righteous to a fault. When he makes promises, he needs to uphold them;" +
			" but this has left him at the mercy of multiple fraudsters like Nathan Wang and Howard Peng, who have caused" +
			" him great emotional damage in an attempt to keep his promises. He has gone as far as to drop his phone from" +
			" the second story of the school, rip up a library book, and be publicly humiliated for his inability to do" +
			" push-ups. Because he is someone who so deeply cares about his values, he will go through any length to" +
			" prove them—even if it means arguing for two hours about why biking while standing up is more inefficient" +
			" than biking while sitting on a bike with a basket. Yes, his values may be strange, but his resolute" +
			" character sets an example for all of us. Even if it's difficult for him to understand the plot of movies," +
			" or what “last game before I sleep” means, the fact that Jeffrey is still standing proudly shows us that" +
			" his morals triumph over any obstacle (except for certain corners near his house).",
	},
];
