// Local imports
import { addCharacters } from './addCharacters.js'
import { ALASTAIR_REID } from '../../data/characters/AlastairReid.js'
import { ROUND_DEFAULTS } from '../../data/ROUND_DEFAULTS.js'
import { SCREENS } from '../../data/SCREENS.js'
import { store } from '../store.js'





/**
 * Starts a round of play.
 */
export function startRound() {
	addCharacters(ALASTAIR_REID)

	store.set(() => ({
		isRoundOver: false,
		screen: SCREENS.PLAY,
		timeAvailable: ROUND_DEFAULTS.LENGTH_MS,
		timeRemaining: ROUND_DEFAULTS.LENGTH_MS,
	}))
}
