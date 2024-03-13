// Module imports
import { DEFAULT_CONTROL_BINDINGS } from '../data/DEFAULT_CONTROL_BINDINGS.js'
import { makeStore } from 'statery'





// Local imports
import { Character } from '../game/structures/Character.js'
import { generateInitialControlState } from './helpers/generateInitialControlState.js'
import { Innkeeper } from '../helpers/Innkeeper.js'
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

	/** @type {string[]} */
	currentGuests: [],

	/** @type {null | string} */
	currentLoadingCategory: null,

	/** @type {null | string} */
	currentLoadingItem: null,

	currentRound: 0,

	delta: 0,

	deltaMS: 0,

	dialogDelay: 0,

	dialogs: {},

	enableFilmGrain: true,

	failed: false,

	isDoneLoadingCriticalAssets: false,

	isInitialized: false,

	isInitializing: false,

	isPaused: false,

	isRoundOver: false,

	isSwappingCharacters: false,

	/** @type {null | number} */
	lastTick: null,

	mainVolume: 0,

	musicVolume: 0,

	soundEffectsVolume: 0,

	renderScale: 1,

	// screen: SCREENS.TITLE_CREDITS,
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

store.subscribe(updates => {
	const patch = {}

	if ('dialogDelay' in updates) {
		patch['settings::gameplay::dialogDelay'] = updates.dialogDelay
	}

	if ('enableFilmGrain' in updates) {
		patch['settings::graphics::enableFilmGrain'] = updates.enableFilmGrain
	}

	if ('mainVolume' in updates) {
		patch['settings::sound::mainVolume'] = updates.mainVolume
	}

	if ('musicVolume' in updates) {
		patch['settings::sound::musicVolume'] = updates.musicVolume
	}

	if ('soundEffectsVolume' in updates) {
		patch['settings::sound::soundEffectsVolume'] = updates.soundEffectsVolume
	}

	if (Object.keys(patch).length) {
		Innkeeper.setConfig(patch)
	}
})
