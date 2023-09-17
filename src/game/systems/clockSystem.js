// Local imports
import { store } from '../../store/store.js'





/**
 * Updates the clock.
 */
export function clockSystem() {
	store.set(state => ({ timeRemaining: state.timeRemaining - state.deltaMS }))
}
