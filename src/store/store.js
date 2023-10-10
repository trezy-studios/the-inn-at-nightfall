// Module imports
import { DEFAULT_CONTROL_BINDINGS } from '../data/DEFAULT_CONTROL_BINDINGS.js'
import { makeStore } from 'statery'





// Local imports
import { Character } from '../game/structures/Character.js'
import { generateInitialControlState } from './helpers/generateInitialControlState.js'
import { SCREENS } from '../data/SCREENS.js'





export const store = makeStore({
	/** @type {string[]} */
	allowedCharacters: [],

	areAssetsLoaded: false,

	assetLoadingProgress: 0,

	/** @type {{ [key: string]: Character }} */
	characters: {},

	/** @type {string[]} */
	characterQueue: [],

	characterQueueIndex: 0,

	controlBindings: DEFAULT_CONTROL_BINDINGS,

	controlState: generateInitialControlState(),

	/** @type {Map<string, import('../types/DialogMessage.js').DialogMessage>} */
	currentDialogHistory: new Map,

	/** @type {null | string} */
	currentLoadingCategory: null,

	/** @type {null | string} */
	currentLoadingItem: null,

	currentRound: 0,

	delta: 0,

	deltaMS: 0,

	failed: false,

	isLoadingAssets: false,

	isInitialized: false,

	isInitializing: false,

	isRoundOver: false,

	/** @type {null | number} */
	lastTick: null,

	screen: SCREENS.LOADING,

	/** @type {null | number} */
	timeAvailable: null,

	/** @type {null | number} */
	timeRemaining: null,

	totalGuestsAllowed: 0,

	viewport: {
		height: 0,
		width: 0,
	},

	wallet: 0,
})

if (typeof window !== 'undefined') {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	window.store = store
}
