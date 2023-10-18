// Local imports
import { getCurrentCharacter } from './getCurrentCharacter.js'





/**
 * Checks the store to determine if the merchant is currently present.
 *
 * @param {object} state The current state of the Statery store.
 * @returns {boolean} Whether the merchant is present.
 */
export function checkMerchantPresence(state) {
	const { characterQueueIndex } = state

	if (characterQueueIndex !== 0) {
		return false
	}

	return Boolean(getCurrentCharacter(state)?.isMerchant)
}
