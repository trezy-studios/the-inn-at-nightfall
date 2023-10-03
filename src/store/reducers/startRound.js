// Local imports
import { ROUND_DEFAULTS } from '../../data/ROUND_DEFAULTS.js'
import { SCREENS } from '../../data/SCREENS.js'
import { shuffleArray } from '../../helpers/shuffleArray.js'
import { store } from '../store.js'





/**
 * Starts a round of play.
 */
export function startRound() {
	store.set(state => {
		const allCharacters = Object.values(state.characters)

		allCharacters.forEach(character => character.reset())

		const nonMerchantCharacterIDs = allCharacters
			.filter(character => !character.isMerchant)
			.map(character => character.id)

		const characterQueue = shuffleArray(nonMerchantCharacterIDs)

		if (state.currentRound === 0) {
			const merchant = allCharacters.find(character => character.isMerchant)
			characterQueue.unshift(merchant.id)
		}

		return {
			allowedCharacters: [],
			characterQueue,
			characterQueueIndex: 0,
			currentRound: state.currentRound + 1,
			isRoundOver: false,
			screen: SCREENS.PLAY,
			timeAvailable: ROUND_DEFAULTS.LENGTH_MS,
			timeRemaining: ROUND_DEFAULTS.LENGTH_MS,
		}
	})
}
