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
		name: "Riya Murthy",
		position: "President",
		bio: (
			<>
				Hi everyone! I’m Riya and I’m super excited to be your president this
				year! I’m currently a junior at MVHS, and have been doing MUN for six years
				— since my first year of middle school. MUN is a super thrilling experience
				that alongside teaching you political relationships and real-world issues,
				allows you to learn about public speaking and coming up with speeches on the
				fly. Outside of MUN, I enjoy reading, writing (both with El Estoque and doing
				poetry), as well as editing (for a competition called Polyphony Lit). Looking
				forward to meeting you all!
			</>
		),
		memeBioNickname: "",
		memeBio: "",
	},
	{
		name: "Sophia Yan",
		position: "Officer",
		bio: (
			<>
				Hi I’m Sophia and I’m a KMUN officer this year! I joined MUN in sophomore
				year and this is my second year attending! I love the spirit of MUN delegates 
				and my hobbies are art and dance!
			</>
		),
		memeBioNickname: "",
		memeBio: "",
	},
	{
		name: "Jessica Zhou",
		position: "Officer",
		bio: (
			<>
				I’m Jessica and also a KMUN officer C: I joined MUN my sophomore year and my 
				favorite part of it would probably be coming up with silly resolutions! Outside 
				of MUN, I like to play video games and draw.
			</>
		),
		memeBioNickname: "",
		memeBio: "",
	},
	{
		name: "Aarna Burji",
		position: "Officer",
		bio: (
			<>
				Aarna is a KMUN officer.
			</>
		),
		memeBioNickname: "",
		memeBio: "",
	},
];
