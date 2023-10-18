// Local imports
import { SCREENS } from '../../data/SCREENS.js'
import { store } from '../store.js'





/**
 * Starts a round of play.
 */
export function quitGame() {
	store.set(() => ({
		currentRound: 0,
		failed: false,
		screen: SCREENS.TITLE,
		totalGuestsAllowed: 0,
		wallet: 0,
	}))
}
