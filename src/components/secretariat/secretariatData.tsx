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
		name: "Charlotte Zhou",
		position: "President",
		bio: (
			<>
			Hi, I’m Charlotte and I am MVMUN’s co-president this year! I’m currently a 
			junior and joined MVMUN in freshman year. Through MUN, I got the opportunity 
			to really put myself out there and cultivate lifelong public speaking, 
			negotiation, and leadership skills, and it’s an experience I’d recommend to 
			anyone! Aside from MUN, I’m interested in art and the sciences. Feel free to 
			reach out to me whenever you want for any questions, concerns, or just to 
			talk. I’m looking forward to another exciting year!	
			</>
		),
		memeBioNickname: "",
		memeBio: "",
	},
	{
		name: "Anushka Kumaran",
		position: "President",
		bio: (
			<>
			Hi, I’m Anushka and I am co-president of MVMUN this year! I joined MVMUN 
			in my freshman year and I am currently a junior. I’ve always been passionate 
			about public speaking and political science and through Model UN I was able 
			to meet and work with so many amazing people and gain more valuable experience 
			in these fields. My favorite part of MUN is working and discussing global issues 
			with other delegates, learning about different perspectives and gaining a greater 
			understanding of the world around me. Outside of MUN I enjoy baking, volunteering, 
			playing the trumpet and biking! I’m very excited for the coming year and always 
			feel free to reach out to me if you have any questions! 
			</>
		),
		memeBioNickname: "",
		memeBio: "",
	},
	{
		name: "Jerry Wang",
		position: "Vice President",
		bio: (
			<>
			Hey, I’m Jerry and I’m super excited to be your VP this year! I joined MUN freshman 
			year and after a lot of all-nighters, Model U.N still retains its appeal and 
			enjoyable-ness to me currently as a Junior. I’ve been passionate about public speaking 
			and geography from the beginning––and through Model U.N, I have been able to meet 
			people from all around the world, discussing some of the most important modern day 
			topics that humanity is still working to resolve. MUN really strengthens your ability 
			to think critically, as well as gaining cultural perspectives and being more aware of 
			global issues. Outside of MUN, I really enjoy listening to my favorite music, cooking, 
			as well as socializing. I really hope that you gain some valuable experience from MUN 
			while also enjoying the process; and MUN really is just a community, so we are all 
			here for you! 
			</>
		),
		memeBioNickname: "",
		memeBio: "",
	},
	{
		name: "Kathryn Foo",
		position: "Vice President",
		bio: (
			<>
			Hey everyone! I’m Kathryn Foo and I’m one of your VPs this year. I joined 
			model un my freshman year and I’ve really found my community here. I’ve so 
			many friends along the way (many shows here) and I’m genuinely so grateful 
			for the people I’ve met along the way. More on me, I love taking photos and 
			reporting on different events, so you might see around with a camera. I also 
			really enjoy reading in my free time and love watching cheesy romance films 
			to pass the time. I’m a total people-person, so if you ever see me around say hi!
			</>
		),
		memeBioNickname: "",
		memeBio: "",
	},
	{
		name: "Riya Murthy",
		position: "Head of Training",
		bio: (
			<>
			Hi everyone! I’m Riya and I’m super excited to be your Head of Training this 
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
		name: "Lily Jiang",
		position: "Logistics",
		bio: (
			<>
			Hi, I’m Lily and I’m a logistics officer this year! I joined Model UN as a 
			freshman and this is my third year in MUN! My favorite part about MUN is forming 
			resolutions with other delegates and meeting people from different parts of the 
			country/world in the same committee. Outside of MUN, I enjoy binging shows, playing 
			the violin, and hanging out with my dog!
			</>
		),
		memeBioNickname: "",
		memeBio: "",
	},
	{
		name: "Shreya Rao",
		position: "Logistics",
		bio: (
			<>
			Hi, I’m Shreya, and I’m thrilled to be a logistics officer this year! I’ve been 
			involved in Model UN since 7th grade, which makes this my fourth year participating. 
			What I love most about Model UN is the amazing chance it gives me to connect with 
			people from all around the world. It’s been a fantastic experience that has greatly 
			boosted my confidence, improved my public speaking skills, and taught me how to 
			collaborate effectively. Additionally, Model UN has sharpened my research skills, 
			which has been beneficial both in and out of committee. Outside of Model UN, I enjoy
			spending time with friends, singing, volunteering, and going on walks. I’m really
			looking forward to having a great year with everyone! :)
			</>
		),
		memeBioNickname: "",
		memeBio: "",
	},
	{
		name: "Shreyas Chatterjee",
		position: "Training",
		bio: (
			<>
			Hello! I am Shreyas, one of MVMUN’s training officers. This is my third year as a 
			MUN delegate. For me, MUN has always been a way to debate important issues while 
			also having fun. I have had the opportunity to meet so many incredible people and 
			hear many imaginative ideas during my time as a delegate. Outside of MUN, I enjoy 
			editing videos, watching stand up comedy, etc. I look forward to meeting all of you!
			</>
		),
		memeBioNickname: "",
		memeBio: "",
	},
	{
		name: "Dhruv Yadati",
		position: "Training",
		bio: (
			<>
			Hi! I’m Dhruv and this year’s training officer! I’ve always loved public speaking 
			and just talking with people in general - which is why I joined MUN in the first 
			place! I’ve been doing MUN for two years now and have attended several conferences, 
			discussing with other fellow delegates and crafting creative resolutions that work 
			to solve all sorts of issues in our world today. MUN has allowed me to improve on 
			my critical thinking and public speaking skills and has given me the best opportunity 
			to meet new people and see issues/ideas from different perspectives. I’ve met so many 
			people during my time in MUN and have had the most fun traveling and getting to know 
			new people as a part of my journey. Outside of MUN, I enjoy playing soccer, playing 
			video games, and watching tons of movies/TV shows…I’m excited to meet everyone and 
			have a great year full of fun :)
			</>
		),
		memeBioNickname: "",
		memeBio: "",
	},
	{
		name: "Dylan Nguyen",
		position: "PR",
		bio: (
			<>
			Hi, I’m Dylan and I’m your PR officer this year! I joined Model UN in my sophomore 
			year but officially started doing conferences. year. Joining MUN has allowed me to 
			meet so many new people with different backgrounds and has motivated my journey to 
			becoming a better public speaker. My favorite part about MUN would have to be catching 
			up with people outside of conferences and talking to people who are from different 
			cities/countries! Outside of MUN, I enjoy thrifting new clothes, driving to places 
			with friends, and rating new food places! I’m so excited to give you the best year in MUN!
			</>
		),
		memeBioNickname: "",
		memeBio: "",
	},
	{
		name: "Ethan Kellogg",
		position: "Webmaster",
		bio: (
			<>
			Hi, my name is Ethan Kellogg and I will be your webmaster this year. I 
			joined model UN as a freshman and have been participating in it for 2 
			years. At first, I wasn't too sure about model UN as I was a bad speaker. 
			However, I really enjoyed the arguing and debate aspect of model UN so I 
			stuck with it. Other than model UN, I enjoy playing the trombone and 
			programming. I'm excited to help maintain the website so that members will 
			have a better experience with the club.
			</>
		),
		memeBioNickname: "Why is this exist",
		memeBio: "to get here just put #memes at the end of the url, or use the konami code",
	},
];
