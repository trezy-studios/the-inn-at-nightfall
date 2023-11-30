// Local imports
import { store } from '../store.js'





/**
 * Pauses the game.
 */
export function pauseGame() {
	const { isRoundOver } = store.state

	if (!isRoundOver) {
		store.set(() => ({ isPaused: true }))
	}
}
