// Local imports
import { store } from '../store/store.js'





/**
 * Initialize game systems.
 */
export function initialize() {
	store.set(() => ({ isInitializing: true }))

	store.set(() => ({
		isInitializing: false,
		isInitialized: true,
	}))
}
