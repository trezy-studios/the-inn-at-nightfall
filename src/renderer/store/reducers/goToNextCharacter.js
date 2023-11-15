// Local imports
import { store } from '../store.js'





/**
 * Advances to the next character in the queue if possible.
 */
export function goToNextCharacter() {
	store.set(state => ({
		characterQueueIndex: state.characterQueueIndex + 1,
		currentDialogHistory: new Map,
		isSwappingCharacters: true,
	}))

	setTimeout(() => store.set(() => ({ isSwappingCharacters: false })), 0)
}
