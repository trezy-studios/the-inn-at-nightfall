// Types
/** @typedef {string} characterID The ID of the character. */

/**
 * @typedef {object} RoundConfig
 * @property {string[][]} [add] Characters to be added to the world before starting this round.
 * @property {characterID[]} [bite] Characters to bite this before starting this round.
 */





/** @type {{ [key: number]: RoundConfig }} */
export const ROUND_CONFIGS = {
	0: {
		add: [
			['alastair-reid', 'alastair-reid-1'],
			['cedric-holloway', 'cedric-holloway-1'],
			['benedict-caldwell', 'benedict-caldwell-1'],
			['lillian-featherstone', 'lillian-featherstone-1'],
		],
		bite: [
			'lillian-featherstone',
		],
	},

	1: {
		add: [
			['eleanor-whitfield', 'eleanor-whitfield-1'],
			['ambrose-blackwood', 'ambrose-blackwood-1'],
			['ivy-fletcher', 'ivy-fletcher-1'],
		],
	},

	2: {
		add: [
			['lillian-featherstone', 'lillian-featherstone-1'],
			['samuel-wolffe', 'samuel-wolffe-1'],
		],
	},

	3: {
		add: [
			['cedric-holloway', 'cedric-holloway-1'],
		],
	},
}
