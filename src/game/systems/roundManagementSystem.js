// Local imports
import { store } from '../../store/store.js'





/**
 * Updates the clock.
 */
export function roundManagementSystem() {
	const { timeRemaining } = store.state

	if (timeRemaining <= 0) {
		store.set(() => ({ isRoundOver: true }))
	}
}
