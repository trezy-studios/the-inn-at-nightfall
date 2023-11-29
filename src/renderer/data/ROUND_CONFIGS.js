// Types
/** @typedef {string} characterID The ID of the character. */

/**
 * @typedef {object} RoundConfig
 * @property {characterID[]} [add] Characters to be added to the world before starting this round.
 * @property {characterID[]} [bite] Characters to bite this before starting this round.
 */





/** @type {{ [key: number]: RoundConfig }} */
export const ROUND_CONFIGS = {
	0: {
		add: [
			'alastair-reid',
			'cedric-holloway',
			'lillian-featherstone',
			'ambrose-blackwood',
		],
		bite: [
			'lillian-featherstone',
		],
	},

	1: {
		add: [
			'eleanor-whitfield',
			'benedict-caldwell',
		],
	},

	2: {
		add: [
			'lillian-featherstone',
		],
	},

	3: {
		add: [
			'cedric-holloway',
		],
	},
}
