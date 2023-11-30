// Local imports
import { store } from '../store.js'





/**
 * Resumes the game.
 */
export function resumeGame() {
	store.set(() => ({ isPaused: false }))
}
