// Module imports
import { createMachine } from 'xstate'





// Local imports
import { Character } from '../../game/structures/Character.js'





export const ALASTAIR_REID = new Character({
	dialogMachine: createMachine({
		id: 'Alastair Reid',
		initial: 'greeting',
		states: {
			greeting: {
				description: '**Alastair Reid:** Well hello there, innkeeper! I’ve brought your daily supplies!\n\n**Innkeeper:** Thank you, Alastair.\n\n**Alastair Reid:** Have you heard the news going through town?',
				on: {
					ANSWER_NO: {
						target: 'No',
					},
					ANSWER_NOT_INTERESTED: {
						target: 'Not Interested',
					},
				},
			},
			No: {
				description: '**Innkeeper:** No, please do tell!',
				always: {
					target: 'Weird Happenings',
				},
			},
			'Not Interested': {
				description: '**Innkeeper:** I don’t really care for gossip…',
				always: {
					target: 'Weird Happenings',
				},
			},
			'Weird Happenings': {
				description: '**Alastair Reid:** Well, it’s mighty concerning! Folks have been going missing in the night!\n\n**Alastair Reid:** Some turn up dead the next day and other folks… well they’re just … different from before…\n\n**Alastair Reid:** No one knows what is causing the trouble. I think it might be some kind of creature that can disguise itself as a person!',
				on: {
					ANSWER_EMPATHETIC: {
						target: 'Empathetic Response',
					},
					ANSWER_SKEPTICAL: {
						target: 'Skeptical Response',
					},
				},
			},
			'Empathetic Response': {
				description: '**Innkeeper:** Oh! That’s terrible!',
				always: {
					target: 'Warning',
				},
			},
			'Skeptical Response': {
				description: '**Innkeeper:** Uh huh…',
				always: {
					target: 'Warning',
				},
			},
			Warning: {
				description: '**Alastair Reid:** Well the important part is to be inside by nightfall. Now I know you get plenty of travelers who come by here.\n\n**Alastair Reid:** Be wary of who you allow to be guests! I’d say look for anyone with a strange appearance or manner to them.',
				on: {
					ANSWER_ACKNOWLEDGE_WARNING: {
						target: 'Acknowledge Warning',
					},
					ANSWER_EXCUSE_ODD_TRAVELERS: {
						target: 'Excuse Odd Travelers',
					},
				},
			},
			'Acknowledge Warning': {
				description: '**Innkeeper:** Oh yes, of course.',
				always: {
					target: 'Goodbye',
				},
			},
			'Excuse Odd Travelers': {
				description: '**Innkeeper:** Well most travelers will arrive not appearing their best.',
				always: {
					target: 'Goodbye',
				},
			},
			Goodbye: {
				description: '**Alastair Reid:** Well just be careful now. You wouldn’t want yourself and all stayin at the inn to turn up dead in the morning!',
				on: {
					ANSWER_THANKS: {
						target: 'Thanks',
					},
					ANSWER_UNIMPRESSED_FAREWELL: {
						target: 'Unimpressed Farewell',
					},
				},
			},
			Thanks: {
				description: '**Innkeeper:** Thank you so much, Alastair!',
				type: 'final',
			},
			'Unimpressed Farewell': {
				description: '**Innkeeper:** *sigh* Very well Alastair. Good day to you!',
				type: 'final',
			},
		},
		predictableActionArguments: true,
		preserveActionOrder: true,
	},
	{
		actions: {},
		services: {},
		guards: {},
		delays: {},
	}),
	name: 'Alastair Reid',
	sprite: 'merchant',
})
