type ConferenceAwardData = {
	name: string;
	time: string;
	delegationAward: string | null;
	delegateAwards: {
		type:
			| "Best Delegate"
			| "Outstanding"
			| "Honorable"
			| "Verbal"
			| "Research";
		awards: string[];
	}[];
	imageURL?: string;
};
const data: ConferenceAwardData[] = [
	{
		name: "SMUNC 2019",
		time: "November 2019",
		delegationAward: null,
		delegateAwards: [
			{ type: "Best Delegate", awards: ["Parth Asawa (JCC India)"] },
			{
				type: "Outstanding",
				awards: [
					"Nathan Wang & Elizabeth Lee (Senate)",
					"Eugene Yoon and Conner Yin (SOCHUM)",
				],
			},
			{
				type: "Honorable",
				awards: [
					"Matthew Philip & Medhansh Kashyap (ECOSOC)",
					"Advait Buduraju & Michael Ding (SOCHUM)",
					"Aman Desai (Cyber)",
				],
			},
			{
				type: "Verbal",
				awards: [
					"Chris Lee and Larry Wu (ECOSOC)",
					"Howard Peng (UNEP)",
				],
			},
		],
	},
	{
		name: "GMUNC VI",
		time: "October 2019",
		delegationAward: null,
		delegateAwards: [
			{
				type: "Best Delegate",
				awards: [
					"Parth Asawa (CIA)",
					"Iman Malik & Aman Desai (WHO)",
					"Matthew Philip & Medhansh Kashyap (Arctic)",
					"Eric Lee (SOCHUM)",
				],
			},
			{ type: "Outstanding", awards: ["Nelson Mu (BHOC)"] },
			{
				type: "Honorable",
				awards: [
					"Sean Chen & David Dang (UNSC)",
					"Sivani Gangaram (SOCHUM)",
					"Sophia Chen (SOCHUM)",
				],
			},
			{
				type: "Verbal",
				awards: ["Zubayir Kazi (UNHCR)", "Maggie Yang (SOCHUM)"],
			},
			{ type: "Research", awards: ["Dylan Yang (BHOC)"] },
		],
	},
	{
		name: "SBMUN V",
		time: "April 2019",
		delegationAward: null,
		delegateAwards: [
			{
				type: "Outstanding",
				awards: [
					"Sylvia Li (NMOC)",
					"Sarah Tan (WHO)",
					"Elizabeth Lee (WHO)",
				],
			},
			{ type: "Honorable", awards: ["Nathan Wang (Syria)"] },
			{ type: "Research", awards: ["Elizabeth Lee (WHO)"] },
		],
	},
	{
		name: "BMUN LXVII",
		time: "February 2019",
		delegationAward: null,
		delegateAwards: [
			{ type: "Best Delegate", awards: ["Amit Chandramouly (Ad-Hoc)"] },
			{
				type: "Outstanding",
				awards: [
					"Alex Zhang (CSC)",
					"Iman Malik (Press Corps)",
					"Arthur Ji (UNIDO)",
					"Eric Wang (Historical Crisis)",
					"Advait Budaraju and Pranav Kumar (DISEC)",
				],
			},
			{
				type: "Honorable",
				awards: [
					"David Dang and Aman Desai (ILO)",
					"Michael Ding and Sriya Vennam (ECOFIN)",
					"Anushka Vijay and Soumil Gupta (ILO)",
					"Sean Chen and Pranav Reddy (UNEP)",
					"Sriman Kalam and Joshua Onozawa (SOCHUM)",
				],
			},
			{ type: "Research", awards: ["Alex Zhang (CSC)"] },
		],
	},
	{
		name: "NAIMUN LVI",
		time: "February 2019",
		delegationAward: null,
		delegateAwards: [
			{ type: "Honorable", awards: ["Iman Malik and Aman Desai (UNSC)"] },
			{
				type: "Verbal",
				awards: [
					"Advait Budaraju (LEGAL)",
					"Soumil Gupta and Juhi Shyamsukha (UNDP)",
				],
			},
		],
	},
	{
		name: "SCVMUN 2019",
		time: "January 2019",
		delegationAward: null,
		delegateAwards: [
			{
				type: "Best Delegate",
				awards: [
					"Jiani Tian and Alekhya Natarajan (WHO)",
					"Eric Lee and Anushka Vijay (DISEC)",
				],
			},
			{
				type: "Outstanding",
				awards: ["Juhi Shyamsukha and Lakshmi Talapaneni (UNHCR)"],
			},
			{
				type: "Honorable",
				awards: [
					"Aman Desai and Iman Malik (UNSC)",
					"Nelson Mu and Amit Chandramouly (NATO)",
					"Brandon Guo and Jeffrey Liu (IAEA)",
					"Arthur Ji and Nathan Wang (World Bank)",
					"Advait Budaraju and Michael Ding (ECOSOC)",
				],
			},
			{
				type: "Verbal",
				awards: ["Anshul Dash and Ritvik Dutta (UNHCR)"],
			},
			{
				type: "Research",
				awards: [
					"Jiani Tian and Alekhya Natarajan (WHO)",
					"Sylvia Li and Elizabeth Lee (ECOSOC)",
				],
			},
		],
	},
	{
		name: "MVMUN Mock January 2019",
		time: "January 2019",
		delegationAward: null,
		delegateAwards: [
			{
				type: "Best Delegate",
				awards: ["Dylan Yang and Nathan Wang (DPRK)"],
			},
			{
				type: "Outstanding",
				awards: ["Sylvia Li and Elizabeth Lee (USA)"],
			},
			{
				type: "Honorable",
				awards: ["Soumil Gupta and Sriya Vennam (Spain)"],
			},
			{
				type: "Verbal",
				awards: [
					"Upasana Dilip and Anita Chamraj (Japan)",
					"Advait Budaraju and Michael Ding (RoK)",
				],
			},
			{
				type: "Research",
				awards: ["Advait Budaraju and Michael Ding (RoK)"],
			},
		],
	},
	{
		name: "SMUNC 2018",
		time: "November 2019",
		delegationAward: null,
		delegateAwards: [
			{
				type: "Best Delegate",
				awards: ["Amit Chandramouly (JCC Venice)"],
			},
			{
				type: "Outstanding",
				awards: ["Aman Desai and Iman Malik (COPUOS)"],
			},
			{
				type: "Honorable",
				awards: [
					"Parth Asawa (Prague Spring)",
					"Nelson Mu (Legal)",
					"Pranav Reddy (JCC Florence)",
					"Soumil Gupta and Juhi Shyamsukha (OAS)",
				],
			},
			{
				type: "Verbal",
				awards: ["Advait Budaraju (Legal)", "Arthur Ji (JCC Milan)"],
			},
			{
				type: "Research",
				awards: ["Jiani Tian and Alekhya Natarajan (WHO)"],
			},
		],
	},
	{
		name: "MVMUN Mock November 2018",
		time: "November 2018",
		delegationAward: null,
		delegateAwards: [
			{
				type: "Best Delegate",
				awards: ["Nathan Wang and Sriya Vennam (USA)"],
			},
			{
				type: "Outstanding",
				awards: ["Sean Chen and Pranav Reddy (Nigeria)"],
			},
			{
				type: "Honorable",
				awards: ["Dylan Yang (ESA)", "Eric Lee and Larry Wu (DPRK)"],
			},
			{
				type: "Verbal",
				awards: [
					"Sylvia Li & Lakshmi Talapaneni (Canada)",
					"Aman Desai & Adi Bhudaraju (UK)",
				],
			},
			{
				type: "Research",
				awards: ["Nathan Wang and Sriya Vennam (USA)"],
			},
		],
	},
	{
		name: "GMUNC V",
		time: "October 2018",
		delegationAward: "Best Delegation",
		delegateAwards: [
			{
				type: "Best Delegate",
				awards: [
					"Parth Asawa (USNSC)",
					"Nelson Mu (WHO)",
					"Aman Desai (INSC)",
					"Alex Zhang (SOCHUM)",
					"Brandon Guo & Jeffrey Liu (DISEC)",
				],
			},
			{
				type: "Outstanding",
				awards: ["Advait Budaraju (SOCHUM)", "Jiani Tian (WHO)"],
			},
			{
				type: "Honorable",
				awards: [
					"Eric Wang (UNHRC)",
					"Iman Malik (INSC)",
					"Arthur Ji (USNSC)",
					"Juhi Shyamsuhka (WHO)",
					"Nathan Wang and Larry Wu (DISEC)",
				],
			},
			{
				type: "Verbal",
				awards: ["Alekhya Natarajan (WHO)", "Thomas Yu (UNHRC)"],
			},
			{ type: "Research", awards: ["Alex Zhang (SOCHUM)"] },
		],
	},
	{
		name: "MVMUN Mock September 2018",
		time: "September 2018",
		delegationAward: null,
		delegateAwards: [
			{ type: "Best Delegate", awards: ["Dylan Yang (United Kingdom)"] },
			{
				type: "Outstanding",
				awards: ["Advait Budaraju (Romania)", "Nathan Wang (USA)"],
			},
			{
				type: "Honorable",
				awards: [
					"Abhinav Kommula (Nigeria)",
					"Richard Liu (Ghana)",
					"Lakshmi Talapaneni (Denmark)",
				],
			},
			{
				type: "Research",
				awards: [
					"Wilson Xu (China)",
					"Elizabeth Lee (Switzerland)",
					"Andrew Yang (Canada)",
				],
			},
		],
	},
	{
		name: "SBMUN IV",
		time: "April 2018",
		delegationAward: null,
		delegateAwards: [
			{
				type: "Best Delegate",
				awards: [
					"Juhi Shyamsukha (ILO)",
					"Jeffrey Liu (JCC China)",
					"Iman Malik (JCC Japan)",
					"Adamya Srivastava (Martian War Crisis)",
				],
			},
			{
				type: "Outstanding",
				awards: [
					"Sarah Tan (ILO)",
					"Parth Asawa (Martian War Crisis)",
					"Michael Lavery (JCC Japan)",
				],
			},
			{
				type: "Honorable",
				awards: [
					"Nelson Mu (Martian War Crisis)",
					"Eric Lee (ILO)",
					"Anushka Vijay (ILO)",
					"Pranav Reddy (JCC China)",
					"Amit Palekar (JCC Japan)",
				],
			},
			{
				type: "Verbal",
				awards: ["Soumil Gupta (ILO)", "Niranjan Bhatia (ILO)"],
			},
			{ type: "Research", awards: ["Juhi Shyamsukha (ILO)"] },
		],
	},
	{
		name: "SCMUN 2018",
		time: "March 2018",
		delegationAward: "Best Small Delegation",
		delegateAwards: [
			{
				type: "Best Delegate",
				awards: ["Amita Mahajan (UNSC)", "Nicholas Chen (Catalan JCC)"],
			},
			{
				type: "Outstanding",
				awards: [
					"Hannah Noordeen (UNESCAP)",
					"Soumil Gupta & Nelson Mu (G20)",
					"Anirudh Chaudhary (Catalan JCC)",
				],
			},
			{
				type: "Honorable",
				awards: [
					"Sivam Agarwalla (UNESCAP)",
					"Parth Asawa (Spanish JCC)",
					"Amit Chandramouly (DISEC)",
				],
			},
			{
				type: "Research",
				awards: [
					"Hannah Noordeen (UNESCAP)",
					"Sivam Agarwalla (UNESCAP)",
				],
			},
		],
	},
	{
		name: "BMUN LXVI",
		time: "February 2018",
		delegationAward: "Best Club",
		delegateAwards: [
			{ type: "Best Delegate", awards: ["Amit Chandramouly (Crisis)"] },
			{
				type: "Outstanding",
				awards: [
					"Anirudh Chaudhary (Historical Crisis)",
					"Arthur Ji (UN-Habitat)",
					"Jiani Tian & Alekhya Natarajan (WHO)",
				],
			},
			{
				type: "Verbal",
				awards: [
					"Iman Malik & Aman Desai (ASEAN)",
					"David Dang & Eric Wang (CSTD)",
					"Nelson Mu & Pranav Reddy (UNSC)",
				],
			},
			{
				type: "Research",
				awards: ["Amit Palekar & Joshua Onozawa (UNEP)"],
			},
		],
	},
	{
		name: "SCVMUN 2018",
		time: "January 2018",
		delegationAward: null,
		delegateAwards: [
			{
				type: "Best Delegate",
				awards: [
					"Jiani Tian & Alekhya Natarajan (UNHCR)",
					"Amit Chandramouly & Anirudh Chaudhary (NATO)",
				],
			},
			{
				type: "Outstanding",
				awards: [
					"Iman Malik & Aman Desai (UNESCO)",
					"Sivam Agarwalla & Hannah Noordeen (LEGAL)",
					"Brandon Guo & Parth Asawa (IAEA)",
					"Adamya Srivastava & Brandon Ma (Historical Security Council)",
				],
			},
			{
				type: "Honorable",
				awards: [
					"Sarah Feng & Amita Mahajan (UNDP)",
					"Juhi Shyamsukha & Philip Chau (UNEP)",
					"Arthur Ji & David Dang (WHO)",
					"Karl Goeltner & Eric Wang (DISEC)",
					"Pranav Reddy & Nelson Mu (ECOSOC)",
					"Nicholas Chen & Apoorva Sirigineedi (Security Council)",
				],
			},
			{
				type: "Verbal",
				awards: ["Daniel Shamsoddini & Aditya Bhardwaj"],
			},
			{
				type: "Research",
				awards: [
					"Parth Asawa & Brandon Guo (IAEA)",
					"Jiani Tian & Alekhya Natarajan (UNHCR)",
					"Adamya Srivastava & Brandon Ma (Historical Security Council)",
					"Eric Lee & Cheryl Bai (SOCHUM)",
				],
			},
		],
	},
	{
		name: "SCVMUN 2018 (Kennedy MUN Delegation)",
		time: "January 2018",
		delegationAward: null,
		delegateAwards: [
			{
				type: "Honorable",
				awards: ["Christopher Lee & Larry Wu (IAEA)"],
			},
			{
				type: "Verbal",
				awards: ["Grace Wang & Ridhima Katare (UNESCO)"],
			},
			{
				type: "Research",
				awards: [
					"Nathan Wang & Dylan Yang (DISEC)",
					"Christopher Lee & Larry Wu (IAEA)",
					"Medhansh Kashyap & Yash Saxena (UNHCR)",
					"Sylvia Li and Janelle Cai (UNHCR)",
				],
			},
		],
	},
	{
		name: "SMUNC 2017",
		time: "November 2017",
		delegationAward: "Best Large Delegation",
		delegateAwards: [
			{ type: "Best Delegate", awards: ["Daniel Hong (UNEP)"] },
			{
				type: "Outstanding",
				awards: [
					"Jiani Tian (WHO)",
					"Nelson Mu (UNFCCC)",
					"Sivam Agarwalla (Black Lives Matter)",
					"Nicholas Chen (JCC CPC)",
					"Parth Asawa (JCC KMT)",
				],
			},
			{
				type: "Honorable",
				awards: [
					"Karl Goeltner (UNSC)",
					"Eric Wang (JCC Trojan)",
					"Apoorva Sirigineedi (SADC)",
					"Iman Malik (UNFCC)",
					"Amita Mahajan (JCC US)",
				],
			},
			{ type: "Verbal", awards: ["David Dang (SADC)"] },
			{ type: "Research", awards: ["Amit Palekar (UNDP)"] },
		],
	},
	{
		name: "GMUNC IV",
		time: "October 2017",
		delegationAward: "Best Delegation",
		delegateAwards: [
			{
				type: "Best Delegate",
				awards: [
					"Karl Goeltner (DISEC)",
					"Sarah Feng (SADC)",
					"Nicholas Chen (King Frederick's Court)",
					"and Brandon Guo & Jeffrey Liu (UNHSC)",
				],
			},
			{
				type: "Outstanding",
				awards: [
					"Eric Wang (DISEC)",
					"Nelson Mu (DISEC)",
					"Parth Asawa (King Frederick's Court)",
					"Sivam Agarwalla & Hannah Noordeen (UNHCR)",
					"Amit Chandramouly & Anirudh Chaudhary (UK Cabinet)",
				],
			},
			{
				type: "Honorable",
				awards: [
					"Pranav Reddy (DISEC)",
					"Jiani Tian & Alekhya Natarajan (UNHCR)",
					"Vikramaditya Rajpal & David Dang (UK Cabinet)",
				],
			},
			{
				type: "Verbal",
				awards: ["Amita Mahajan & Apoorva Sirigineedi (UNSC)"],
			},
			{
				type: "Research",
				awards: [
					"Daniel Shamsoddini (DISEC)",
					"Aditya Bhardwaj & Pranav Kumar (UK Cabinet)",
				],
			},
		],
	},
	{
		name: "DMUNC XV",
		time: "May 2017",
		delegationAward: null,
		delegateAwards: [
			{ type: "Best Delegate", awards: ["Adamya Srivastava (UNOOSA)"] },
			{ type: "Outstanding", awards: ["Nicholas Chen (UNSC)"] },
			{
				type: "Honorable",
				awards: [
					"Apoorva Sirigineedi (SPECPOL)",
					"Amit Palekar (DISEC)",
					"and Sivam Argawalla (WHO)",
				],
			},
			{
				type: "Verbal",
				awards: [
					"Jen Huang (Soviet Afghan)",
					"Hannah Noordeen (UNEP)",
					"and Anirudh Chaudhary (Carthage)",
				],
			},
		],
	},
	{
		name: "BMUN LXVI",
		time: "February 2017",
		delegationAward: "Best Club",
		delegateAwards: [
			{
				type: "Outstanding",
				awards: [
					"Amit Chandramouly & Joshua Onozawa (SPECPOL)",
					"Amita Mahajan & Sarah Feng (ECOSOC)",
				],
			},
			{
				type: "Verbal",
				awards: [
					"Marcus Plutowski & Audrey Tzeng (SC)",
					"Justin Chen & Aidan Gottlieb (INTERPOL)",
					"Sivam Argawalla & Brandon Guo (Legal)",
				],
			},
		],
	},
	{
		name: "NAIMUN LIV",
		time: "February 2017",
		delegationAward: null,
		delegateAwards: [
			{
				type: "Outstanding",
				awards: ["Jen Huang (Anonymous Hacker's Summit)"],
			},
			{
				type: "Honorable",
				awards: [
					"Amita Mahajan (DC City Council)",
					"and Sivam Agarwalla & Justin Chen (WHO)",
				],
			},
			{ type: "Verbal", awards: ["Nicholas Chen (US Senate)"] },
		],
	},
	{
		name: "SCVMUN 2017",
		time: "February 2017",
		delegationAward: null,
		delegateAwards: [
			{
				type: "Best Delegate",
				awards: [
					"Marcus Plutowski & Audrey Tzeng (DISEC)",
					"and Amita Mahajan & Apoorva Sirigineedi (UNHCR)",
				],
			},
			{
				type: "Outstanding",
				awards: [
					"Jen Huang & Sarah Feng (UNHSC)",
					"and Nicholas Chen & Brandon Guo (UNSC)",
				],
			},
			{
				type: "Honorable",
				awards: [
					"Karl Goeltner & Anika Ramachandran (World Bank)",
					"Eric Wang & Brandon Ma (ECOSOC)",
					"Amit Palekar & Amit Chandramouly (IAEA)",
					"and Ashley Lin & Shreya Guha (UNESCO)",
				],
			},
			{
				type: "Verbal",
				awards: [
					"Albert Qiu & Sadhana Indukuri (Legal)",
					"Sivam Agarwalla & Justin Chen (WHO)",
					"and Anirudh Chaudhary & Kireeti Devarakonda (WHO)",
				],
			},
		],
	},
	{
		name: "SMUNC 2016",
		time: "November 2016",
		delegationAward: "Outstanding Large Delegation",
		delegateAwards: [
			{
				type: "Best Delegate",
				awards: [
					"Nicholas Chen (USNSC)",
					"Amita Mahajan (Ukraine in Crisis)",
					"Marcus Plutowski (Alexander's War Council)",
					"and Brandon Ma (JCC Katipunan)",
				],
			},
			{
				type: "Outstanding",
				awards: ["Sivam Agarwalla (South African Youth Empowerment)"],
			},
			{ type: "Honorable", awards: ["Karl Goeltner (WEF)"] },
			{
				type: "Verbal",
				awards: [
					"Amit Palekar (Arab League)",
					"Daniel Hong (DISEC)",
					"Apoorva Sirigineedi (UN Women)",
					"Amit Chandramouly (SAARC)",
					"Anika Ramachandran (111th US Senate)",
					"Brandon Guo (Italic League)",
				],
			},
		],
	},
	{
		name: "GMUNC III",
		time: "October 2016",
		delegationAward: "Best Delegation",
		delegateAwards: [
			{
				type: "Best Delegate",
				awards: [
					"Amit Chandramouly (SPECPOL)",
					"Nicholas Chen (Chinese Politburo)",
				],
			},
			{ type: "Outstanding", awards: ["Sivam Agarwalla (SPECPOL)"] },
			{
				type: "Honorable",
				awards: [
					"Jen Huang (UK Exec)",
					"Sarah Feng (UK Exec)",
					"Anika Ramachandran (SPECPOL)",
				],
			},
			{
				type: "Verbal",
				awards: [
					"Amita Mahajan (DISEC)",
					"Justin Chen (Chinese Politburo)",
					"Alekhya Natarajan (SPECPOL)",
					"Apoorva Sirigineedi (SPECPOL)",
				],
			},
			{
				type: "Research",
				awards: [
					"Amit Palekar (SPECPOL)",
					"Eric Wang (DISEC)",
					"Audrey Tzeng (UNSC)",
				],
			},
		],
	},
];
export default data;
export { ConferenceAwardData };
