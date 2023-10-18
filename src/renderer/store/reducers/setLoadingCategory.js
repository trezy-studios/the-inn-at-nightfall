// Local imports
import { store } from '../store.js'





/**
 * Sets the category of items currently being loaded.
 *
 * @param {string} category The category of items currently being loaded.
 * @param {string} [item] The name of the item currently being loaded.
 */
export function setLoadingCategory(category, item = null) {
	store.set(() => ({
		currentLoadingCategory: category,
		currentLoadingItem: item,
	}))
}
