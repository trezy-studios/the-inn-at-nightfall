// Local imports
import { ROUND_CONFIGS } from '../../data/ROUND_CONFIGS.js'
import { ROUND_DEFAULTS } from '../../data/ROUND_DEFAULTS.js'
import { SCREENS } from '../../data/SCREENS.js'
import { store } from '../store.js'





/**
 * Starts a round of play.
 */
export function startRound() {
	store.set(state => {
		const {
			characters,
			currentRound,
		} = state

		const characterQueue = []
		const roundConfig = ROUND_CONFIGS[currentRound]

		if (roundConfig) {
			roundConfig.add?.forEach(characterID => characterQueue.push(characterID))
			roundConfig.bite?.forEach(characterID => characters[characterID].bite())
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
