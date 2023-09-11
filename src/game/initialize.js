// Module imports
import { store } from '../store/store.js'





// Local imports
import { loadGameAssets } from './loadGameAssets.js'





/**
 * Initialize game systems.
 */
export async function initialize() {
	store.set(() => ({ isInitializing: true }))

	// Images and spritesheets
	await loadGameAssets()

	store.set(() => ({
		isInitializing: false,
		isInitialized: true,
	}))
}
