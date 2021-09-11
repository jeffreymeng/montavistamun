import React, { useState } from "react";
function ExpandableBio({
	pre,
	post,
}: {
	pre: React.ReactNode;
	post: React.ReactNode;
}) {
	const [expanded, setExpanded] = useState(false);
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
		name: "Sylvia Li",
		position: "Co-President",
		bio: (
			<>
				Hello! I’m Sylvia Li and I’m one of your co-presidents this
				year! I’m a senior and I’ve been in MUN since 8th grade, and
				although at the time I had no idea what I was getting myself
				into, I’ve grown fond of this club and all the people I’ve
				become friends with. I joined (and stayed) in MUN because of my
				curiosity towards discussions of the world and global issues,
				despite the fact that my public speaking skills may not have
				been the best. MUN has pushed me to improve myself, whether
				self-confidence related, or creating strong rebuttal arguments
				in under 30 seconds, and I truly believe the time and effort put
				into this club is worth it. Outside of MUN, I’m a part of
				yearbook, the color guard and I love sewing and doing all sorts
				of crafts.
			</>
		),
		memeBioNickname: "",
		memeBio: "",
	},
	{
		name: "Dylan Yang",
		position: "Co-President",
		bio: (
			<>
				Hi! My name is Dylan Yang, and I’m looking forward to serving as
				your co-President this year! After starting MUN in eighth grade,
				I joined MVMUN as a freshman, and I’ve never had any regrets
				since. I’ve learned about all the things I originally signed up
				for — speaking, debating, and even shouting — but I’ve also
				learned and grown with many other skills. MUN has pushed me to
				be a better negotiator and a better leader, but most of all it’s
				pushed me to be a better community member. This year, I’d love
				to welcome you to the MVMUN community, just as previous
				generations of delegates welcomed me. So if you ever see me
				around campus, or just want to chat, don’t be afraid to say hi!
			</>
		),
		memeBioNickname: "",
		memeBio: "",
	},
	{
		name: "Janelle Cai",
		position: "Vice President",
		bio: (
			<>
				Hello! I’m Janelle Cai, and I will be your vice president this
				year! I’m currently a junior, and I’ve been doing MUN since I
				was in 7th grade. Being in Model UN is an amazing experience.
				Through Model UN, I’ve gotten a better understanding of many
				topics and issues in our world today, and it has also taught me
				so many life long skills, such as communication, negotiation,
				leadership, and collaboration. MUN has helped me build
				confidence in myself, and I’ve also made many new friends. Aside
				from MUN, I am also involved in math, coding, and robotics. I’m
				excited to meet and work with all of you this year!
			</>
		),
		memeBioNickname: "",
		memeBio: "",
	},
	{
		name: "Maggie Yang",
		position: "Director of Finance",
		bio: (
			<>
				Hi! My name is Maggie Yang and I’m your Finance officer for this
				year! I’m a junior and I joined MUN as a freshman not really
				knowing too much about it other than that it involved dealing
				with world issues. Over time, MUN has not only taught me how to
				speak and negotiate, but also how to research and write quality
				papers in a limited amount of time. It’s also allowed me to make
				a variety of friends from varying grade and experience levels,
				and as a result become more involved in the community as a
				whole. Although MUN requires a great level of effort and
				dedication, I strongly believe that every extra minute put into
				meetings, preparation, and research pays off in the form of
				skills that will be applicable for many years beyond the club.
				That being said, I can’t wait to meet and get to know all of you
				in this next year - if you ever have questions about anything,
				MUN or even just high school related, feel free to reach out!
			</>
		),
		memeBioNickname: "",
		memeBio: "",
	},
	{
		name: "Jeffrey Meng",
		position: "Director of Logistics, Webmaster",
		bio: (
			<>
				Hello! I'm Jeffrey Meng and I'll be a logistics officer &
				webmaster this year. I'm a senior and I joined MVMUN as a
				sophomore with the goal of improving my public speaking skills
				and having fun. I'm glad that I joined Model UN because in
				addition to improving my speaking skills, it's also let me
				practice leadership, improve negotiation skills, learn about
				global affairs, and meet new people. When I'm not doing MUN, you
				can find me programming, reading, and skiing.
			</>
		),
		memeBioNickname: "",
		memeBio: "",
	},
	{
		name: "Kenneth Shui",
		position: "Director of Logistics",
		bio: (
			<>
				Hello everyone! My name is Kenneth Shui, and I’m thrilled to
				serve as one of the logistics officers this year! I’m currently
				a junior, and I joined MVMUN as a sophomore with the goal of
				improving my confidence in public speaking and meeting new
				people. Even though last year was virtual, I learned so much
				about MUN and improved my verbal skills a lot. I’m really
				looking forward to this year’s in-person committees as it is
				basically vacation without parents. Outside of MUN, I’m also
				involved in other clubs and competitions, but my biggest hobbies
				are playing volleyball and singing.
			</>
		),
		memeBioNickname: "",
		memeBio: "",
	},
	{
		name: "Amy Hu",
		position: "Director of Public Relations",
		bio: (
			<>
				Hi I am Amy Hu and I am going to be your PR officer this year. I
				am a junior and joined Model UN in sophomore year seeking to
				join an inclusive community of open-minded and creative people.
				When I joined MVMUN, I was blown away at how talented MVMUN
				members are and I was so excited to be able to contribute to the
				MVMUN team. After a long year of being hypnotized by zoom, I
				can’t wait to experience MUN person next year. I hope this year
				is going to be a blast and I hope you will enjoy MVMUN as much
				as I have enjoyed it so far. As an officer, I wish to be as
				approachable as possible so feel free to message me about
				anything at any time. My Instagram is @amy_whooo and I am always
				open on discord and messenger!
			</>
		),
		memeBioNickname: "",
		memeBio: "",
	},
	{
		name: "Elizabeth Lee",
		position: "President of Kennedy, Kennedy/MVMUN Liaison",
		bio: (
			<>
				Hello! My name is Elizabeth Lee and I’m the Kennedy president
				and Kennedy/MVMUN liaison this year. I'm currently a senior
				attending Monta Vista high school, I've been in MVMUN for three
				years now. Although I've never previously thought of myself as
				someone good at debate, public speaking, or even politics, MUN
				has taught me so much about not only international affairs and
				leadership, but also how to find confidence and determination.
				From yelling for hours in committee to quiet late night chats,
				my experiences in MUN have always been some of the most
				memorable. Outside of MUN, I love music and reading. I look
				forward to working with all of you this year!
			</>
		),
		memeBioNickname: "",
		memeBio: "",
	},
	{
		name: "Grace Tan",
		position: "Director of Training",
		bio: (
			<>
				Hello! I’m Grace Tan and I'll be one of your training officers
				this year! I’m currently a junior and I joined MUN in seventh
				grade. Prior to joining MUN, I never pegged myself as much of a
				public speaker and had very minimal interest in current events
				and politics, but I grew to enjoy discussing various political
				issues, both during club meetings and during conferences.
				Through MUN, I was able to build on my communication and
				leadership abilities, as well as gain self-confidence. Outside
				of MUN, I enjoy playing tennis and watching anime. I’m looking
				forward to meeting everyone this year and feel free to reach out
				anytime!
			</>
		),
		memeBioNickname: "",
		memeBio: "",
	},
];
