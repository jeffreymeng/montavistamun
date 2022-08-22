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
		name: "Janelle Cai",
		position: "President",
		bio: (
			<>
				Hello! I’m Janelle, and I will be your president this year! 
				I am currently a senior and I’ve been doing MUN for 6 years. 
				Being in Model UN is an amazing experience, and I’ve made so 
				many amazing memories through the club. Through Model UN, 
				I’ve also gotten a better understanding of many topics and 
				issues in our world today, and it has also taught me so many 
				life long skills, such as communication, negotiation, leadership, 
				and collaboration. MUN has helped me build confidence in myself, 
				and I’ve met an amazing community of people through MUN. 
				Aside from MUN, I am also involved in math, coding, and robotics. 
				I’m excited to meet and work with all of you this year!

			</>
		),
		memeBioNickname: "",
		memeBio: "",
	},
	{
		name: "Grace Tan",
		position: "Vice President",
		bio: (
			<>
				Hi! I’m Grace, and I'm one of your vice presidents this year! 
				I am currently a senior and I’ve been a part of MUN since 
				seventh grade. During my time in MUN, I’ve become better 
				acquainted with the world by expanding my perspective on 
				global issues and meeting people with diverse opinions. 
				Participating in conferences and weekly club meetings has 
				encouraged me to be a better leader and communicator, 
				and to grow as a person above all else. I’m truly grateful 
				for all the memories and skills that I’ve picked up in MUN, 
				and I’m looking forward to another exciting year with everyone! 

			</>
		),
		memeBioNickname: "",
		memeBio: "",
	},
	{
		name: "Maggie Yang",
		position: "Vice President",
		bio: (
			<>
				Hi! I’m Maggie, and I will be one of your vice presidents this 
				year. I am currently a senior, and I started MUN in my freshman 
				year. Over the last few years, I’ve gained an invaluable 
				understanding of diplomacy, international affairs, and public 
				speaking through my various experiences. Attending and planning 
				conferences has truly been so rewarding, and I’ve found myself 
				within a community that is both accepting and diverse. I can’t 
				wait to work with all of you this year, and feel free to reach 
				out to me anytime if you have questions about MUN or high school 
				in general!

			</>
		),
		memeBioNickname: "",
		memeBio: "",
	},
	{
		name: "Riya Murthy",
		position: "Training",
		bio: (
			<>
				Hi everyone! I’m Riya and I’m super excited to be one of your 
				training officers this year! I’m currently a sophomore at MVHS, 
				and have been doing MUN for five years — since my first year of 
				middle school! MUN is a super thrilling experience that alongside 
				teaching you political relationships and real-world issues, allows 
				you to learn about public speaking and coming up with speeches on 
				the fly. Outside of MUN, I enjoy reading, writing (both with 
				El Estoque and doing poetry), as well as editing (for a competition 
				called Polyphony Lit). Looking forward to meeting you all!

			</>
		),
		memeBioNickname: "",
		memeBio: "",
	},
	{
		name: "Clay Carson",
		position: "Training",
		bio: (
			<>
				Hello! My name is Clay and I am excited to be a training officer 
				this year! I am a senior and I joined Model UN last year because 
				I am passionate about global issues and I have past experience 
				with writing and public speaking. Initially, I had no idea what 
				Model UN was, but I decided to try it and it ended up becoming 
				one of my favorite extracurricular activities. Model UN has 
				allowed me to meet new people both at Monta Vista and from other 
				schools at conferences, and helped me build leadership and 
				teamwork skills. In addition to Model UN, I am in Monta Vista’s 
				mock trial and speech clubs, and I do youth orchestra outside of school. 
				I am looking forward to working with everyone this year!

			</>
		),
		memeBioNickname: "",
		memeBio: "",
	},
	{
		name: "Charlotte Zhou",
		position: "Logistics",
		bio: (
			<>
				Hey everyone! I’m Charlotte, one of your logistics officers this 
				year. I’m currently a sophomore and joined MVMUN in freshman year. 
				MUN was something greatly out of my comfort zone at the time, but 
				looking back I don’t regret my decision to take on the challenge 
				at all. MUN is a great opportunity to put yourself out there and 
				practice your public speaking and leadership skills, not to mention 
				learning about current world affairs. Aside from MUN, I’m interested 
				in art and the sciences. Feel free to reach out to me whenever you 
				want for any questions, concerns, or just to talk. I’m excited to 
				get to know you all better!

			</>
		),
		memeBioNickname: "",
		memeBio: "",
	},
	{
		name: "Anushka Kumaran",
		position: "Logistics",
		bio: (
			<>
				Hello everyone! I’m Anushka and I’m very excited to be one of 
				your logistics officers this year! I’m currently a sophomore, 
				and I joined MUN as a freshman last year. I'm so happy I decided 
				to join Model U.N because being a part of it has been a fantastic 
				and incredibly fulfilling experience. I’ve gained a better 
				understanding of several global issues and topics and have also 
				learned to improve my confidence and public speaking skills 
				through Model U.N. MUN has taught me so much this year and 
				I’m so happy to be part of such a wonderful community! 
				Aside from MUN, I’m in marching band, am passionate about 
				environmental science, and love to bake! I’m looking forward 
				to meeting and working with all of you this year!

			</>
		),
		memeBioNickname: "",
		memeBio: "",
	},
	{
		name: "Kathryn Foo",
		position: "Public Relations",
		bio: (
			<>
				Hey everyone! I’m Kathryn and I’m excited to be the PR Officer 
				for this year. I’m currently a sophomore and I joined MUN last 
				year as a freshman. Before joining, I only really knew MUN as 
				being the quintessential movie nerd hobby. Now though, I’ve 
				found that, looking back on the experiences I’ve had, MUN has 
				genuinely become my haven for comfort and chaos. Here, I’ve 
				grown my confidence, public-speaking skills, and ability to 
				think on my toes and I can’t wait to see what else MUN has 
				in store for me! Outside of MUN, I’m passionate anything 
				with words: writing (on staff with El Estoque), reading 
				(especially cheesy rom-com), and public-speaking.

			</>
		),
		memeBioNickname: "",
		memeBio: "",
	},
	{
		name: "Jerry Wang",
		position: "Secretary",
		bio: (
			<>
				Hello everyone! I’m Jerry and I’m so excited to serve as 
				MVMUN secretary this year! I’m currently a sophomore, 
				and I joined MUN in my freshman year. Joining MVMUN was 
				singlehandedly a decision that I don’t regret even a 
				single bit, due to how phenomenal my experience with 
				it has been so far. Due to my low confidence in speaking, 
				I was skeptical at first about going to conferences and 
				fully immersing myself in MUN. However, I quickly learned 
				that MUN was totally different from what I had envisioned. 
				Besides getting to speak about issues that I genuinely 
				cared about in front of an audience that shared my passion, 
				I also got to make some of the best memories with the most 
				welcoming MVMUN community. Outside of MUN, I enjoy learning 
				about different cultures, socializing with others, and 
				cooking new recipes. Going to conferences by yourself and 
				speaking in front of an audience may seem daunting at 
				first –– but I assure you that with some help from our 
				meetings and some confidence to try it out, you’ll 
				definitely be the type of delegate that you strive to be in no time! 

			</>
		),
		memeBioNickname: "",
		memeBio: "",
	},
	{
		name: "Kenneth Shui",
		position: "Webmaster",
		bio: (
			<>
				Hey! I’m Kenneth, and I’m thrilled to serve as your webmaster 
				this year. I’m currently a senior, and joining MVMUN was one 
				of the best decisions I made in high school. Through Model UN, 
				I’ve improved my confidence in public speaking, met so many 
				wonderful people, and broadened my understanding of the world. 
				I’m looking forward to creating some incredible resolutions and 
				memories with you all. Outside of MUN, I love playing volleyball 
				and singing.
			</>
		),
		memeBioNickname: "",
		memeBio: "",
	},
];
