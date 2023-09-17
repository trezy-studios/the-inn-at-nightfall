// Module imports
import { DEFAULT_CONTROL_BINDINGS } from '../data/DEFAULT_CONTROL_BINDINGS.js'
import { faker } from '@faker-js/faker'
import { makeStore } from 'statery'





// Local imports
import { Character } from '../game/structures/Character.js'
import { generateInitialControlState } from './helpers/generateInitialControlState.js'





faker.seed(123456789)

export const store = makeStore({
	areAssetsLoaded: false,

	assetLoadingProgress: 0,

	/** @type {Character[]} */
	characterQueue: Array(5)
		.fill(null)
		.map((_, index) => new Character({
			name: faker.person.fullName(),
			sprite: `character-${index + 1}`,
		})),

	characterQueueIndex: 0,

	controlBindings: DEFAULT_CONTROL_BINDINGS,

	controlState: generateInitialControlState(),

	delta: 0,

	deltaMS: 0,

	isLoadingAssets: false,

	isInitialized: false,

	isInitializing: false,

	/** @type {null | number} */
	lastTick: null,

	shouldShowDebugger: false,

	timeRemaining: 3600000,

	viewport: {
		height: 0,
		width: 0,
	},
})

if (typeof window !== 'undefined') {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	window.store = store
}
