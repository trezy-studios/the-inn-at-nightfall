// Module imports
import { faker } from '@faker-js/faker'





// Local imports
import { store } from '../store/store.js'





/**
 * Initialize game systems.
 */
export function initialize() {
	store.set(() => ({ isInitializing: true }))

	faker.seed(123456789)

	store.set(() => ({
		isInitializing: false,
		isInitialized: true,
	}))
}
