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
			dialogs,
			currentGuests,
		} = state

		const characterQueue = []
		const previousRoundConfig = ROUND_CONFIGS[currentRound - 1]
		const roundConfig = ROUND_CONFIGS[currentRound]

		if (roundConfig) {
			roundConfig.arrival?.forEach(([characterID, dialogAlias]) => {
				const character = characters[characterID]
				character.dialogMachine = dialogs[dialogAlias]
				characterQueue.push(characterID)
			})
			roundConfig.bite?.forEach(characterID => characters[characterID].bite())
		}

		const patch = {
			allowedCharacters: [],
			characterQueue,
			characterQueueIndex: 0,
			currentRound: state.currentRound + 1,
			isPaused: false,
			isRoundOver: false,
			screen: SCREENS.PLAY,
			timeAvailable: ROUND_DEFAULTS.LENGTH_MS,
			timeRemaining: ROUND_DEFAULTS.LENGTH_MS,
		}

		if (currentRound > 0) {
			patch.currentGuests = currentGuests.filter(characterID => !previousRoundConfig.departure.includes(characterID))
		}

		return patch
	})
}
