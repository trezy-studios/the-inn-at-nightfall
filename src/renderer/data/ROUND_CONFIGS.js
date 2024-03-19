/** @type {{ [key: number]: import('../types/RoundConfig.js').RoundConfig }} */
export const ROUND_CONFIGS = {
	0: {
		arrival: [
			['alastair-reid', 'alastair-reid-1'],
			['cedric-holloway', 'cedric-holloway-1'],
			['benedict-caldwell', 'benedict-caldwell-1'],
			['lillian-featherstone', 'lillian-featherstone-1'],
		],
		bite: [
			'lillian-featherstone',
		],
		departure: [
			'cedric-holloway',
			'benedict-caldwell',
			'lillian-featherstone',
		],
	},

	1: {
		arrival: [
			['eleanor-whitfield', 'eleanor-whitfield-1'],
			['ambrose-blackwood', 'ambrose-blackwood-1'],
			['ivy-fletcher', 'ivy-fletcher-1'],
			['mark-grimmelstone', 'mark-grimmelstone-1'],
			['mary-grimmelstone', 'mary-grimmelstone-1'],
		],
		departure: [
			'eleanor-whitfield',
			'ivy-fletcher',
			'mark-grimmelstone',
			'mary-grimmelstone',
		],
	},

	2: {
		arrival: [
			['emily-hartley', 'emily-hartley-1'],
			['clara-weston', 'clara-weston-1'],
			['samuel-wolffe', 'samuel-wolffe-1'],
			['martin-butler', 'martin-butler-1'],
		],
		departure: [
			'ambrose-blackwood',
			'martin-butler',
		],
	},

	3: {
		arrival: [
			['lillian-featherstone', 'lillian-featherstone-2'],
			['benedict-caldwell', 'benedict-caldwell-2'],
			['emily-hartley', 'emily-hartley-2'],
			['clara-weston', 'clara-weston-2'],
		],
		departure: [
			'lillian-featherstone',
			'benedict-caldwell',
			'emily-hartley',
			'clara-weston',
			'samuel-wolffe',
		],
	},

	4: {
		arrival: [
			['cedric-holloway', 'cedric-holloway-1'],
			['emily-hartley', 'emily-hartley-2'],
			['clara-weston', 'clara-weston-2'],
			['mark-grimmelstone', 'mark-grimmelstone-1'],
			['mary-grimmelstone', 'mary-grimmelstone-1'],
		],
		departure: [
			'cedric-holloway',
			'emily-hartley',
			'clara-weston',
			'mark-grimmelstone',
			'mary-grimmelstone',
		],
	},
}
