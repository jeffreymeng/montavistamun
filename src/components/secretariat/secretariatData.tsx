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
		name: "Shreya Rao",
		position: "President",
		bio: (
			<>
			Hi, I'm Shreya, and I'm so excited to be one of your MUN officers this year! 
			I've been involved in Model UN since 7th grade, which makes this my fifth year 
			participating. What I love most about Model UN is the amazing chance it gives 
			me to connect with people from all around the nation. It's been a fantastic 
			experience that has greatly boosted my confidence, improved my public speaking 
			skills, and taught me how to collaborate effectively. Additionally, Model UN 
			has sharpened my research skills, which has been beneficial both in and out 
			of committee. Outside of Model UN, I enjoy spending time with friends, singing, 
			volunteering, making coffee, and going on walks. I'm really looking forward 
			to having a great year with everyone! :)
			</>
		),
		memeBioNickname: "",
		memeBio: "",
	},
	{
		name: "Harly Liu",
		position: "VP of Logistics",
		bio: (
			<>
			Hi, I'm Harly, and I'm excited to be your VP this year. I've been in MUN 
			since I was a freshman, making this my third year. What I love most about 
			MUN is the relaxing nature of the event. MUN isn't constrained by strict 
			rules, allowing us to explore issues more freely and collaborate with others. 
			I also love giving speeches spontaneously, which has sharpened my overall 
			speaking skills. Outside of MUN, I enjoy biking, reading, debating, and 
			coding. I look forward to another exciting year.
			</>
		),
		memeBioNickname: "",
		memeBio: "",
	},
	{
		name: "Parth Samdadiya",
		position: "Vice President",
		bio: (
			<>
			Hi, I'm Parth S, a junior in Monta Vista High School. I've been doing 
			MUN since 8th grade and look forward to serving as your training officer 
			this year. Outside of school, some of my favorite things to do are play 
			soccer and video games!
			</>
		),
		memeBioNickname: "",
		memeBio: "",
	},
	{
		name: "Dhruv Yadati",
		position: "VP of Training",
		bio: (
			<>
			Hi i'm Dhruv! I'm in 11th grade and have been doing Model UN for four years
			now and have enjoyed going to different conferences and meeting new people.
			My favorite part of Model UN is hearing all the creative ideas people come
			up with and debate about, as well as meeting a bunch of new people with
			similar interests. Outside of Model UN, I love to watch different shows
			and play soccer. I'm so excited to meet everyone and look forward to a
			great year!
			</>
		),
		memeBioNickname: "",
		memeBio: "",
	},
	{
		name: "Sophia Chen",
		position: "Logistics",
		bio: (
			<>
			Hi, I'm Sophia, and I'm so excited to be one of your logistics officers
			this year! I have been doing Model UN since my sophomore year. My favorite
			parts of MUN are making new friends and travelling to different conferences.
			MUN has helped me to increase my confidence, as well as gain critical thinking,
			public speaking, and research skills, which I can apply later on. Outside of
			the club, I enjoy playing tennis, piano, and listening to music. I'm excited
			to meet everyone and have another great year!
			</>
		),
		memeBioNickname: "",
		memeBio: "",
	},
	{
		name: "Sumedha Kumar",
		position: "Logistics",
		bio: (
			<>
			Hi, I'm Sumedha, and I'm excited to serve as your Logistics officer this
			year. I've been involved in MUN throughout high school, and what I love most
			about it is the spontaneity—thinking on your feet, adapting in real time, and
			seeing debates take unexpected turns. I also really enjoy meeting people from
			different schools and backgrounds, which makes every conference a unique
			experience. MUN has helped me grow as a speaker and collaborator, especially
			through impromptu speeches and fast-paced discussion. Outside of MUN, I'm
			involved in research, FBLA, and run a nonprofit. In my free time, I love
			spending time with friends, eating good food, watching new TV shows, and the
			occasional gaming. I'm looking forward to a great year with all of you.
			</>
		),
		memeBioNickname: "",
		memeBio: "",
	},
	{
		name: "Sophie Xu",
		position: "PR Officer",
		bio: (
			<>
			Hi! My name is Sophie and I am currently a junior. This year will be my 
			second year doing MUN. My favorite part of MUN has to be the travelling 
			aspect because I have been able to do so many fun activities with my 
			friends as we've travelled to places like Berkeley and D.C. for conferences 
			(including trying new foods!) as well as getting to meet new people. 
			Outside of school, I enjoy shopping, playing the piano, going on walks 
			and volunteer work!
			</>
		),
		memeBioNickname: "",
		memeBio: "",
	},
	{
		name: "Kopal Kulshreshtha",
		position: "Webmaster",
		bio: (
			<>
			Hi, I'm Kopal, and I'm super excited to be your Webmaster this year! 
			I'm a sophomore this year, making this my second year part of MVMUN. 
			Through MUN, I cultivated public speaking and collaboration skills, 
			and I've gained so many experiences and friends along the way. Outside 
			of MUN, you can always catch me baking, playing the piano, or watching 
			movies. I look forward to meeting everyone!
			</>
		),
		memeBioNickname: "",
		memeBio: "",
	},
];