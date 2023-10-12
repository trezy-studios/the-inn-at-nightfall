// Local imports
import { SCREENS } from '../../data/SCREENS.js'
import { store } from '../store.js'





/**
 * Advances to the next character in the queue if possible.
 */
export function goToTitle() {
	store.set(() => ({ screen: SCREENS.TITLE }))
}
