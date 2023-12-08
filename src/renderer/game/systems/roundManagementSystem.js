// Local imports
import { store } from '../../store/store.js'





/**
 * Updates the clock.
 */
export function roundManagementSystem() {
	const {
		characterQueue,
		characterQueueIndex,
		isRoundOver,
		timeRemaining,
	} = store.state

	const travelersRemaining = characterQueue.length - characterQueueIndex

	if (!isRoundOver && ((travelersRemaining === 0) || (timeRemaining <= 0))) {
		store.set(state => {
			const {
				allowedCharacters,
				characters,
				currentGuests,
				wallet,
			} = state

			const newGuests = Array.from(new Set([
				...currentGuests,
				...allowedCharacters,
			]))

			const failed = Boolean(
				allowedCharacters
					.filter(characterID => characters[characterID].isVampire)
					.length,
			)

			let newWallet = wallet

			// Bite all characters that are still outside.
			characterQueue
				.slice(characterQueueIndex + 1)
				.forEach(characterID => {
					if (!allowedCharacters.includes(characterID)) {
						const character = characters[characterID]
						character.bite()
					}
				})

			if (!failed) {
				newWallet += newGuests.length * 10
			}

			return {
				currentGuests: newGuests,
				failed,
				isPaused: false,
				isRoundOver: true,
				wallet: newWallet,
			}
		})
	}
}
