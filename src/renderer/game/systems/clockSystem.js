// Local imports
import { checkMerchantPresence } from '../../store/reducers/checkMerchantPresence.js'
import { store } from '../../store/store.js'





/**
 * Updates the clock.
 */
export function clockSystem() {
	const { isRoundOver } = store.state

	const isMerchantPresent = checkMerchantPresence(store.state)

	if (isMerchantPresent) {
		return
	}

	if (isRoundOver) {
		return
	}

	store.set(state => ({ timeRemaining: state.timeRemaining - state.deltaMS }))
}
