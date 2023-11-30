// Local imports
import { checkMerchantPresence } from '../../store/reducers/checkMerchantPresence.js'
import { store } from '../../store/store.js'





/**
 * Updates the clock.
 */
export function clockSystem() {
	const {
		isPaused,
		isRoundOver,
	} = store.state

	const isMerchantPresent = checkMerchantPresence(store.state)

	if (isMerchantPresent) {
		return
	}

	if (isRoundOver) {
		return
	}

	if (isPaused) {
		return
	}

	store.set(state => ({ timeRemaining: state.timeRemaining - state.deltaMS }))
}
