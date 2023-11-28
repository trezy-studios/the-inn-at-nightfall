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
				wallet,
			} = state

			let newWallet = wallet
			let failed = false

			const humansAllowedCount = allowedCharacters
				.filter(characterID => {
					const character = characters[characterID]

					return !(character.isVampire || character.isMerchant)
				})
				.length

			// Bite all characters that are still outside.
			characterQueue
				.slice(characterQueueIndex + 1)
				.forEach(characterID => {
					if (!allowedCharacters.includes(characterID)) {
						const character = characters[characterID]
						character.bite()
					}
				})

			if (humansAllowedCount === allowedCharacters.length) {
				newWallet += humansAllowedCount * 10
			} else {
				failed = true
			}

			return {
				failed,
				isRoundOver: true,
				wallet: newWallet,
			}
		})
	}
}
