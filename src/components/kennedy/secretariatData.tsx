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
				Hello! I’m Janelle, and I will be your KMUN president this year! 
				I am currently a senior and I’ve been doing MUN for 6 years. 
				Being in Model UN is an amazing experience, and I’ve made so many 
				amazing memories through the club. Through Model UN, I’ve also 
				gotten a better understanding of many topics and issues in our 
				world today, and it has also taught me so many life long skills, 
				such as communication, negotiation, leadership, and collaboration. 
				MUN has helped me build confidence in myself, and I’ve met an 
				amazing community of people through MUN. Aside from MUN, I am 
				also involved in math, coding, and robotics. I’m excited to meet 
				and work with all of you this year!

			</>
		),
		memeBioNickname: "",
		memeBio: "",
	},
	{
		name: "Aarna Burji",
		position: "Training",
		bio: (
			<>
				
				Hello everyone!! I’m Aarna and I’ll be one of your training officers 
				for KMUN this year. I’m currently a sophomore at Monta Vista and a 
				member of MVMUN. I’ve been doing MUN since 8th grade and it has been 
				my favorite club ever since. KMUN fostered my love for Model UN, 
				and taught me how to communicate effectively and confidently. 
				It created valuable and memorable experiences that I hope you guys 
				will find this year. Outside of MUN I enjoy robotics, hiking, and 
				participating in various non-profits and local volunteering 
				opportunities. I am excited to help you all grow as delegates, 
				and I can’t wait for the upcoming year!


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
				Hi everyone! I’m Riya and I’m super excited to be one of your training 
				officers for KMUN this year! I’m currently a sophomore at MVHS, and 
				have been doing MUN for five years — since my first year of middle 
				school! MUN is a super thrilling experience that alongside teaching 
				you political relationships and real-world issues, allows you to 
				learn about public speaking and coming up with speeches on the fly. 
				Outside of MUN, I enjoy reading, writing (both with El Estoque and 
				doing poetry), as well as editing (for a competition called Polyphony 
				Lit). Looking forward to meeting you all!


			</>
		),
		memeBioNickname: "",
		memeBio: "",
	},
	{
		name: "Kathryn Foo",
		position: "Logistics and Public Relations",
		bio: (
			<>
				Hey everyone! I’m Kathryn and I’m excited to be your Logistics and 
				PR Officer for KMUN this year. I’m currently a sophomore and I joined 
				MUN last year as a freshman. Before joining, I only really knew MUN 
				as being the quintessential movie nerd hobby. Now though, I’ve found 
				that, looking back on the experiences I’ve had, MUN has genuinely 
				become my haven for comfort and chaos. Here, I’ve grown my confidence, 
				public-speaking skills, and ability to think on my toes and I can’t 
				wait to see what else MUN has in store for me! Outside of MUN, 
				I’m passionate about anything with words: writing (on staff with 
				El Estoque), reading (especially cheesy rom-com), and public-speaking.


			</>
		),
		memeBioNickname: "",
		memeBio: "",
	},
];
