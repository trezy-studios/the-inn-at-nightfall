// Local imports
import { ROUND_DEFAULTS } from '../../data/ROUND_DEFAULTS.js'
import { SCREENS } from '../../data/SCREENS.js'
import { store } from '../store.js'





/**
 * Starts a round of play.
 */
export function startRound() {
	store.set(() => ({
		isRoundOver: false,
		screen: SCREENS.PLAY,
		timeAvailable: ROUND_DEFAULTS.LENGTH_MS,
		timeRemaining: ROUND_DEFAULTS.LENGTH_MS,
	}))
}
