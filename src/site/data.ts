/*
  Single source of truth for all copy + content.
  Lifted directly from the prior duffle.one (the static MPA that lived
  in src/index.html, src/cv.html, src/gaming.html, src/user-guide.html)
  and re-shaped for the TTY layout. Voice is part of the design, don't
  paraphrase.
*/

export type Social = { id: string; label: string; handle: string; href: string };
export type ProjectStat = { label: string; value: string; accent?: "green" | "amber" | "pink" | "cyan" | "violet" };
export type Project = {
	id: string;
	name: string;
	blurb: string;
	year: string;
	tag: string;
	href: string;
	description?: string;
	tech?: string[];
	stats?: ProjectStat[];
};
export type Photo = {
	id: string;
	title: string;
	src: string;
	camera: string;
	lens: string;
	focal: string;
	aperture: string;
	shutter: string;
	iso: string;
	taken: string;
	bytes: number;
	place?: string;
};
export type GameServer = {
	id: string;
	title: string;
	game: string;
	status: "online" | "idle" | "offline";
	players: string;
	uptime: string;
	imageUrl?: string | null;
};
export type Experience = {
	co: string;
	role: string;
	when: string;
	loc: string;
	href?: string;
	tech?: string[];
	bullets: string[];
};
export type Education = { school: string; degree: string; when: string; note: string };
export type GuideSection = { h: string; body: string[] };
export type GuideValue = { h: string; b: string };

export const SITE = {
	name: "Laura Miller",
	domain: "duffle.one",
	tagline: "Founding engineer, photographer, 3D designer.",

	socials: [
		{ id: "github", label: "GitHub", handle: "@DuffleOne", href: "https://github.com/DuffleOne" },
		{ id: "linkedin", label: "LinkedIn", handle: "/in/duffle", href: "https://www.linkedin.com/in/duffle/" },
		{ id: "ig", label: "Instagram", handle: "@duffle.one", href: "https://instagram.com/duffle.one" },
		{ id: "steam", label: "Steam", handle: "DuffleOne", href: "https://steamcommunity.com/id/DuffleOne" },
		{ id: "glass", label: "Glass", handle: "/duffle", href: "https://glass.photo/duffle" },
	] satisfies Social[],

	projects: [
		{
			id: "easycal", name: "easycal",
			blurb: "Share your availability without sharing your calendar.",
			description: "A privacy-first way to let people know when you're free. Connects to Google Calendar, iCloud, or any CalDAV server. One link, group scheduling, and visibility controls so you decide what gets exposed.",
			year: "2024", tag: "shipping", href: "https://easycal.uk",
			tech: ["calendar", "caldav", "privacy-first"],
		},
		{
			id: "tflgame", name: "TFLGame",
			blurb: "Guess the London Underground station.",
			description: "Unscramble letters to guess a TFL station name. Built as a small mobile-first web app for the daily-puzzle crowd; runs as an installable PWA.",
			year: "2024", tag: "weekend", href: "https://tflga.me",
			tech: ["pwa", "vite", "weekend hack"],
		},
		{
			id: "latex", name: "Latex stock",
			blurb: "Latex inventory export tool.",
			description: "Internal tool for tracking and exporting latex stock. Auth-walled in production; the public landing page is just the export endpoint.",
			year: "2023", tag: "internal", href: "https://latex.duffle.one",
			tech: ["go", "postgres", "solo"],
		},
		{
			id: "jellycats", name: "Jellycats",
			blurb: "A vanity gallery of every Jellycat I own.",
			description: "48 photographed plushies across nine categories: Bunnies, Dragons, Birds, Dogs, Farm, Sea Creatures, Forest, plus a few honorary members. Click any thumbnail for the full-size shot.",
			year: "2023", tag: "archive", href: "/jellycats.html",
			tech: ["photo", "vanilla css", "vanity"],
		},
	] satisfies Project[],

	// 37 quotes lifted verbatim from the old src/index.html rotation pool.
	// Order matters only for the initial pick — useQuoteRotation shuffles.
	quotePool: [
		"At museums, she's allowed to touch the art.",
		"Both sides of her pillow are cool.",
		"Even her enemies list her as their emergency contact.",
		"Her eye contact alone counts as a first date.",
		"Her only regret is not knowing what regret feels like.",
		"Her personality is so magnetic, she is unable to carry credit cards.",
		"Her two cents is worth £37.50.",
		"If life were to give her lemons, she'd make a spinach fettuccine with a shiitake mushroom glaze.",
		"If opportunity knocks and she is not home, opportunity waits.",
		"If there is an elephant in the room, it's because she brought one.",
		"In a past life, she was herself.",
		"In school, bullies gave her their lunch money.",
		"Mosquitoes refuse to bite her, purely out of respect.",
		"She can slam a revolving door.",
		"She can tie her arm behind her back, with one arm tied behind her back.",
		"She could disarm you with her charm, or her hands... either way.",
		"She has a bear rug in her house... it's not dead or anything, it's just too scared to move.",
		"She has inside jokes with complete strangers.",
		"She has never relied on mistletoe.",
		"She is a morning, evening, and night person.",
		"She is the life of parties she has never attended.",
		"She lives vicariously through herself.",
		"She once 3D printed a 3D printer.",
		"She once cheated death, and death was perfectly okay with it.",
		"She once gave a pep talk so compelling, both teams won.",
		"She once had a staring contest with the sun. The sun blinked first.",
		"She once had an awkward moment, just to see how it feels.",
		"She once visited the Virgin Islands. Now they just call them the Islands.",
		"She once went to Burger King and ordered a Big Mac, and got one.",
		"She once won a bet against Superman. Now Superman has to wear his underwear on the outside.",
		"She's a lover, not a fighter. But she is also a fighter, so don't get any ideas.",
		"The last time she flirted with danger, danger got clingy.",
		"The police often question her, just because they find her interesting.",
		"They once named a street after her, but they had to change the name because no one crosses her and lives.",
		"When in Rome, they do as she does.",
		"When she has a 50/50 shot, the odds are 80/20 in her favour.",
		"When she was born, she drove her mother home from the hospital.",
		"When the cops pull her over, she lets the cops off with a warning.",
	],

	// Used as the initial seed for the rotation; the composable picks
	// a random one on first paint and then cycles every few seconds.
	quote: "In school, bullies gave her their lunch money.",

	// Random attributions, paired fresh with each quote rotation so
	// the source changes alongside the line. Tongue-in-cheek; nobody
	// actually said any of these (well, mum did).
	quoteAttributions: [
		"mum, allegedly",
		"the dog, telepathically",
		"an ex, before things went south",
		"a Slack reaction emoji",
		"a stranger on the Northern line",
		"her therapist, off the record",
		"a barista who got her order wrong",
		"Wikipedia, citation needed",
		"an Uber driver, 2am",
		"a man at a hen do, slurring",
		"her HR file (redacted)",
		"a fortune cookie in Camden",
		"the unauthorised biography",
		"a whisper at her future funeral",
		"the vibes",
	],

	// Real frames from the camera roll. Resized + cropped to 4:5 webp by
	// scripts/process-photos.sh; EXIF extracted from each original.
	photography: [
		{ id: "p01", title: "Frame 01", src: "/img/photos/01.webp", camera: "Canon EOS R5m2", lens: "RF100mm F2.8 L Macro IS USM", focal: "100mm", aperture: "f/2.8", shutter: "1/125", iso: "5000", taken: "2026-02-07", bytes: 39828 },
		{ id: "p02", title: "Frame 02", src: "/img/photos/02.webp", camera: "Canon EOS R5m2", lens: "RF100-500mm F4.5-7.1 L IS USM", focal: "500mm", aperture: "f/7.1", shutter: "1/8000", iso: "12800", taken: "2026-04-18", bytes: 83734 },
		{ id: "p03", title: "Frame 03", src: "/img/photos/03.webp", camera: "Canon EOS R5m2", lens: "RF100-500mm F4.5-7.1 L IS USM", focal: "167mm", aperture: "f/5.0", shutter: "1/8000", iso: "12800", taken: "2026-04-18", bytes: 61586 },
		{ id: "p04", title: "Frame 04", src: "/img/photos/04.webp", camera: "Canon EOS R5m2", lens: "RF50mm F1.4 L VCM", focal: "50mm", aperture: "f/1.4", shutter: "1/8000", iso: "100", taken: "2026-04-25", bytes: 64866 },
		{ id: "p05", title: "Frame 05", src: "/img/photos/05.webp", camera: "Canon EOS R5m2", lens: "RF70-200mm F2.8 L IS USM", focal: "70mm", aperture: "f/2.8", shutter: "1/800", iso: "100", taken: "2026-04-25", bytes: 166146 },
		{ id: "p06", title: "Frame 06", src: "/img/photos/06.webp", camera: "Canon EOS R6m2", lens: "RF100-500mm F4.5-7.1 L IS USM", focal: "176mm", aperture: "f/5.0", shutter: "1/2",   iso: "200",   taken: "2025-12-13", bytes: 113650 },
		{ id: "p07", title: "Frame 07", src: "/img/photos/07.webp", camera: "Canon EOS R5m2", lens: "RF100-500mm F4.5-7.1 L IS USM", focal: "472mm", aperture: "f/7.1", shutter: "1/4000", iso: "6400", taken: "2025-12-20", bytes: 32984 },
	] satisfies Photo[],

	// Static fallback that mirrors the names returned by the AMP worker.
	// useServers() replaces this on mount when VITE_SERVERS_API resolves.
	gaming: [
		{ id: "g1", title: "Blue Collar Crimes", game: "Unturned", status: "offline", players: "0 / 10", uptime: "—" },
		{ id: "g2", title: "Josh and Laura", game: "Enshrouded", status: "offline", players: "—", uptime: "—" },
		{ id: "g3", title: "Fraudulent Paperwork", game: "V Rising", status: "offline", players: "—", uptime: "—" },
		{ id: "g4", title: "duffle.one", game: "Minecraft", status: "offline", players: "—", uptime: "—" },
		{ id: "g5", title: "ts3.duffle.one", game: "TeamSpeak 3", status: "offline", players: "—", uptime: "—" },
	] satisfies GameServer[],

	cv: {
		title: "Founding Engineer",
		email: "laura@duffle.one",
		summary:
			"Founding engineer building 0→1 products. Helped scale Cuvva from 4 people to 100+, and a system from 10 policies a week to hundreds per second. Photographer, ballet, 3D printing on the side.",
		proudOf:
			"Helping build Cuvva from a team of 4 to over 100 people, and scaling a system from 10 policies a week to hundreds per second. Nothing beats being there from the very beginning.",
		experience: [
			{
				co: "Clove", role: "Founding Engineer", when: "Aug 2025 – Mar 2026", loc: "London", href: "https://clove.com",
				tech: ["Go", "PostgreSQL", "React", "BigQuery", "GCP"],
				bullets: [
					"Joined before a single line of code existed. Created the repository and built the entire backend framework in Go from scratch (layout, services, libraries, all the infrastructure).",
					"Now building integrations with financial institutions and working with complex financial data.",
				],
			},
			{
				co: "Paddle", role: "Staff Engineer", when: "Mar 2025 – Jul 2025", loc: "London", href: "https://paddle.com",
				tech: ["PHP", "SQL", "AWS", "Go", "Snowflake", "Laravel"],
				bullets: [
					"Formed and led a new team responsible for the ledger, the core area of the codebase for a merchant of record.",
					"Sped up merchant payouts and made the operational process around payouts and reconciliation a lot less painful.",
					"Helped shape team structure and engineering culture through a period of org change.",
				],
			},
			{
				co: "incident.io", role: "Technical Lead, Product Engineer", when: "May 2024 – Nov 2024", loc: "London", href: "https://incident.io",
				tech: ["React", "GCP", "Go", "Postgres"],
				bullets: [
					"Promoted to technical lead within weeks of joining, owning the roadmap for a product squad.",
					"Delivered key features on extremely tight deadlines, directly closing enterprise deals.",
					"Designed and shipped integrations with Jira, Linear, Notion, and Google Docs.",
					"Reworked the post-incident process from scratch, turning timelines into something customers actually found useful.",
					"Improved internal tooling that sped up day-to-day development for the whole team.",
					"Mentored engineers across the organisation, keeping them unblocked, challenged, and growing.",
				],
			},
			{
				co: "Mojo", role: "Lead Backend Engineer", when: "Apr 2022 – May 2024", loc: "London", href: "https://mymojo.com",
				tech: ["Go", "MongoDB", "GCP", "BigQuery", "dbt", "React Native"],
				bullets: [
					"Joined as the sole backend engineer and built the entire backend function from scratch.",
					"Built the full authentication stack on OAuth 2.1, including pre-login sessions and social provider login.",
					"Built a pseudonymisation system so we could run analytics and data pipelines without touching real user data.",
					"Set up the data engineering stack: BigQuery, Fivetran, and dbt pipelines.",
					"Set up alerting and health checks for production.",
					"Took on projects across the company, well outside the usual backend remit.",
					"Hired and grew the engineering team, and mentored people across the company in SQL and JavaScript.",
				],
			},
			{
				co: "Cuvva", role: "Founding Engineer", when: "May 2016 – Apr 2022", loc: "London", href: "https://cuvva.com",
				tech: ["Go", "Node.js", "MongoDB", "AWS", "Kubernetes", "Postgres"],
				bullets: [
					"4th employee. Grew the engineering team from 2 engineers to a 30+ person multi-discipline organisation.",
					"Owned the backend discipline end-to-end: set standards, ran architecture reviews, and decided the technical direction for the platform.",
					"Planned and ran a big migration pulling core services out of a PHP monolith into Go.",
					"Shipped multiple regulated insurance products under tight deadlines.",
					"Integrated 40-year-old government services into a modern codebase.",
					"Worked with product, finance, and legal to expand payments and build a faster bank payout integration.",
					"Managed external stakeholders directly, including underwriters, the Motor Insurers' Bureau, and UK courts.",
					"Put strict defensive programming standards in place so the team could move fast without regulatory risk.",
					"Looked after the code and platform for 6 years, keeping it modern and well maintained as it grew.",
				],
			},
			{
				co: "Whitechapel Mission", role: "Volunteering", when: "Mar 2012 – now", loc: "London", href: "https://whitechapel.org.uk",
				tech: ["PHP", "JavaScript", "Vite", "MySQL", "Laravel"],
				bullets: [
					"Led a full migration to the cloud and modernised the platform onto the latest Laravel stack.",
					"Built a custom rule engine for volunteering, powering a fully interactive volunteer diary with an organiser panel for self-managed scheduling, statistics, and reporting.",
					"Built a custom online donation system with Barclays integration, generating over £100,000 in revenue for the charity in its first year.",
					"Built a fundraising events platform with automated Virgin Money Giving integration.",
					"Maintained the full stack: UI, template engine, web server, and all infrastructure and security patching.",
				],
			},
		] satisfies Experience[],
		education: [] satisfies Education[],
		skills: [
			"Go", "React", "Vue", "TypeScript", "PHP/Laravel", "Node.js",
			"Postgres", "MongoDB", "Redis",
			"GCP", "AWS", "Cloudflare", "Kubernetes",
			"BigQuery", "dbt",
			"3D printing", "Photography", "Stoic deadlines",
		],
	},

	// User-guide content. The TTY/manpage layout renders this as one
	// ManSection per top-level entry, with body paragraphs flowing inside.
	guide: {
		name: "laura, a person; founding engineer, photographer, 3d-print enthusiast.",
		intro: "A practical guide to working with me, with less guesswork.",
		about: [
			"I've been a software engineer for over fifteen years. I started programming when I was eleven, encouraged by my dad (deeply technical background) and my friend Tim Rogers, who sat with me and learnt by my side at school.",
			"That early curiosity took me into the Microsoft Student Partner programme, then contracting directly for Microsoft. It taught me how software engineering works in a professional setting, and that I don't love massive businesses or the operational processes you have to jump through inside them.",
			"From contracting to full-time, I met James Billingham and Freddy Macnamara. With a very small team we started Cuvva.com, and I took on my first true founding engineer role. That changed how I think about work: I realised I'm not a programmer, I'm an engineer. I like solving complex problems and I like building entire products.",
			"I live alone in the East End, and love photography and 3D printing.",
		],
		sections: [
			{
				h: "How I work",
				body: [
					"I like a high degree of autonomy. I enjoy the very high-level thinking that goes into a problem before any solution exists. I work very well in unstructured environments where there aren't distinct teams or hard separations of responsibility.",
					"I like a role that's quite different week to week. I need that flexibility. A weakness: hand me a single project for months and I'll struggle.",
					"I really must be close to the customer, either directly talking to them or being one. I dogfood the product; if I can't use the service I'm trying to build, I don't perform as well. I seek a lot of feedback (from you, the team, and the customers, all for different purposes). I'll reach out, listen, and ask direct questions to get to the root.",
				],
			},
			{
				h: "Team dynamics",
				body: [
					"I always start as an IC and try to be at the forefront of writing code and fixing problems. The senior nature of the role means it goes hand in hand with long-term strategic planning and a lot of feedback to those around me. As the company grows, I move into a more managerial role. Less programming, more team, hiring, and meetings.",
					"I find it hard to split focus between 'making' and 'managing'. If you find me too deep in detail, prompt me to 'go to manager mode'; if I'm too high-level, prompt me back into 'maker mode'.",
					"Team dynamics shift a lot in the first few years of a business. I try to keep my finger on the pulse, but feedback to speed or slow that transition is welcome. One thing I'm aware of and ask of others: maker vs manager scheduling (paulgraham.com/makersschedule.html).",
				],
			},
			{
				h: "Communication",
				body: [
					"Slack, WhatsApp, and other mobile messaging apps are async. I'll check them when I check them. If you need a fast response, tag me or drop-call me.",
					"If you call me out of the blue I'll assume worst-case scenario, so a heads-up first is wise. Same for meetings: tell me what it's for and what you want from it; that gives me time to prepare and manage context switching.",
					"Reflective vs. prescriptive matters to me. I'll only use reflective communication and I ask the same back. Prescriptive feedback gets me defensive and hurt.",
					"Less effective: 'You have not given this your full attention and it deserves it.'",
					"More effective: 'I feel as though you have not given this your full attention, and I think it deserves it.'",
				],
			},
			{
				h: "Meetings",
				body: [
					"I often see formal meetings as a time sink. Too many chefs and nothing gets done. They can be useful when kicking off a project. I always like meetings to have a specific outcome and I run them with a degree of cutthroat efficiency.",
					"Happy to end early once we've got what we need. I follow makers-vs-managers scheduling. Lots of time for social chatter before and after.",
					"Tell me what meetings I'll have the day before. 24 hours' notice for new ones, please. If it's a 1:1 or a one-off, always state the purpose ahead of time, including if it's bad news. A heads up helps me show up well.",
				],
			},
			{
				h: "Feedback",
				body: [
					"Don't formalise it. I despise 'every two weeks' or 'first Thursday of the month'. I need it the moment you notice it, the moment you have a thought, even if unsubstantiated. I want to hear what you like and what you don't, sooner not later.",
					"Hold me back after a meeting to tell me I led that well, or give me some advice quickly as we head into the next project. I'll always listen. I do not like reading three-paragraph reports about things from weeks ago.",
					"Examples beat generalities. I'll assume good intent from you while asking you to assume it from me too.",
					"Share how you feel even if it's not a 'professional' metric. There's truth in emotion. If you dislike a library and your only reason is 'I just don't like it', I want to know.",
				],
			},
			{
				h: "When I'm stressed",
				body: [
					"I'm anxious at times. I'm good at reflecting on it and communicating what I need to reduce it. Some stress comes with the role; that's fine.",
					"I'm less stressed on projects I had real input on. Picking up someone else's project, getting arbitrary deadlines, doing things I don't have a say in: that's what wears me down, if it happens repeatedly.",
					"What helps: clarity on priorities, some encouragement, then a walk to clear my head.",
				],
			},
			{
				h: "Personal life",
				body: [
					"I'm neurodivergent, so I sometimes miss cues. Tell me if I'm not picking up on something, or if I'm not doing something you expected.",
					"I'm not a fan of food and I don't drink alcohol. Not a great date. I'll order a hot chocolate.",
					"I work weird hours sometimes, so apologies for the odd-time messages. Don't reply until you're ready and within your hours.",
					"I have a dog named Edie, a very old Maltese Shih Tzu. I'd love to bring her into the office but she's noisy and disruptive, so she goes to my parents when I'm in.",
				],
			},
		] satisfies GuideSection[],
		values: [
			{ h: "Right way over easy way", b: "The 'right' way isn't the same as the slow way. The easy way always has an unforeseen cost." },
			{ h: "Build and act in small chunks", b: "Every problem gets broken down. Don't build it back up into a big solution to deploy in one go." },
			{ h: "Consistency over perfection", b: "I'd rather be consistently wrong than occasionally right. Consistency is easier to debug into being right." },
			{ h: "Morality and kindness", b: "I'll struggle following a business decision I don't think is morally right." },
			{ h: "Direct communication", b: "If you don't like the way I say or do something, tell me in no uncertain terms. If you want it done a specific way, say that." },
			{ h: "Feedback is just feedback", b: "For both giving and taking. I'll share my thoughts and feelings, I'll listen to yours, and I won't be offended if you don't take mine. It's one variable among many." },
			{ h: "Explain yourself", b: "One of my strengths is explaining a complex system and weighted decisions in a way that's easy to follow. I ask the same of others." },
		] satisfies GuideValue[],
	},
};
