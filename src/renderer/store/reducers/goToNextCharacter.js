// Local imports
import { getRandomNumber } from '../../helpers/getRandomNumber.js'
import { store } from '../store.js'





/**
 * Advances to the next character in the queue if possible.
 *
 * @param {boolean} [shouldDeny] Whether the current character should be denied.
 */
export function goToNextCharacter(shouldDeny = false) {
	store.set(state => {
		const {
			characterQueue,
			characterQueueIndex,
			characters,
			timeAvailable,
			timeRemaining,
		} = state

		const currentCharacter = characters[characterQueue[characterQueueIndex]]

		if (shouldDeny) {
			const roundPassedPercentage = 1 - (timeRemaining / timeAvailable)
			const randomNumber = Math.min(1, getRandomNumber() + roundPassedPercentage)

			if (randomNumber >= 0.9) {
				currentCharacter.bite()
			}
		}

		return {
			characterQueueIndex: state.characterQueueIndex + 1,
			currentDialogHistory: new Map,
			isSwappingCharacters: true,
		}
	})

	setTimeout(() => store.set(() => ({ isSwappingCharacters: false })), 0)
}
