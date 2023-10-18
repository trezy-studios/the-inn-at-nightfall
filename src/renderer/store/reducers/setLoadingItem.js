// Local imports
import { store } from '../store.js'





/**
 * Sets the name of item currently being loaded.
 *
 * @param {string} item The name of the item currently being loaded.
 */
export function setLoadingItem(item) {
	store.set(() => ({ currentLoadingItem: item }))
}
