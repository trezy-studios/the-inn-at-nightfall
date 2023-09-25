// Local imports
import { store } from '../../store/store.js'





/**
 * Updates the clock.
 */
export function clockSystem() {
	const { isRoundOver } = store.state

	if (isRoundOver) {
		return
	}

	store.set(state => ({ timeRemaining: state.timeRemaining - state.deltaMS }))
}
