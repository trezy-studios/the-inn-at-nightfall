// Local imports
import { AudioLibrary } from '../../game/structures/AudioLibrary.js'
import { SCREENS } from '../../data/SCREENS.js'
import { store } from '../store.js'





/**
 * Starts a round of play.
 */
export function quitGame() {
	AudioLibrary.stopAllSoundEffects()

	store.set(() => ({
		allowedCharacters: [],
		characterQueue: [],
		characterQueueIndex: 0,
		currentDialogHistory: new Map,
		currentGuests: [],
		currentRound: 0,
		failed: false,
		isPaused: false,
		isRoundOver: false,
		screen: SCREENS.TITLE,
		totalGuestsAllowed: 0,
		wallet: 0,
	}))
}
