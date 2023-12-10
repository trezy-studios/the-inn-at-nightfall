// Local imports
import { PEOPLE } from './PEOPLE.js'





export const CREDITS = [
	{
		title: 'Executive Team',
		credits: [
			{
				title: 'Executive Producer',
				people: [PEOPLE.TREZY],
			},
			{
				title: 'Producer',
				people: [PEOPLE.DANIELLE_ALBERTYN],
			},
		],
	},

	{
		title: 'Story',
		credits: [
			{
				title: 'Lead Writer',
				people: [PEOPLE.LIZ_PHILLIPS],
			},
			{
				title: 'Writer',
				people: [PEOPLE.DANIELLE_ALBERTYN],
			},
			{
				title: 'Editor',
				people: [PEOPLE.TREZY],
			},
			{
				title: 'Character Development',
				people: [
					PEOPLE.LIZ_PHILLIPS,
					PEOPLE.ZOE_BELOVARAC,
				],
			},
		],
	},

	{
		title: 'Art & Design',
		credits: [
			{
				type: 'multirole',
				titles: [
					'Concept Art',
					'Character Art',
					'Set Design',
				],
				people: [PEOPLE.DANIELLE_ALBERTYN],
			},
			{
				type: 'multirole',
				titles: ['UI Designer'],
				people: [PEOPLE.TREZY],
			},
		],
	},

	{
		title: 'Audio',
		credits: [
			{
				title: 'Composer',
				people: [PEOPLE.JAMES_BELANGIA],
			},
			{
				title: 'Sound Design',
				people: [PEOPLE.TOMAS_CASTILLO],
			},
		],
	},

	{
		title: 'Programming',
		credits: [
			{
				title: 'Programmer',
				people: [PEOPLE.TREZY],
			},
			{
				title: 'Dialog Development',
				people: [PEOPLE.LIZ_PHILLIPS],
			},
		],
	},

	{
		title: 'Playtesting',
		credits: [
			{
				title: 'Playtester',
				people: [
					PEOPLE.MATT_HORNBACK,
					PEOPLE.RAFI_RIZWAN,
				],
			},
		],
	},

	{
		title: 'Special Thanks',
		people: [
			PEOPLE.MEG_WALTZ_PEEBLES,
			PEOPLE.MATT_HORNBACK,
			PEOPLE.ELIAS_JAMES,
			PEOPLE.AGNES_MAE,
			PEOPLE.RAFI_RIZWAN,
		],
	},

	{
		title: 'Acknowledgments',
		quotes: [
			{
				author: PEOPLE.DANIELLE_ALBERTYN,
				content: 'Special thanks to my partner for his patience with me and my weird habits. Massive hugs to my friends near, far and far too many to list here; for the memes, mentorship and love.',
			},
			{
				author: PEOPLE.TREZY,
				content: 'Thanks so much to my wife, my kids, and my parents for always being there for me, and supporting me as I pursue the things that make me happy. Love y\'all.',
			},
		],
	},
]
