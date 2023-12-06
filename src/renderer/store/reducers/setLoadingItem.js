// Local imports
import { store } from '../store.js'





/**
 * Sets the name of item currently being loaded.
 *
 * @param {object} asset The name of the item currently being loaded.
 * @param {string} asset.alias The name of the item currently being loaded.
 * @param {string} asset.loadingCategory The name of the item currently being loaded.
 */
export function setLoadingItem(asset) {
	store.set(() => ({
		currentLoadingCategory: asset.loadingCategory,
		currentLoadingItem: asset.alias,
	}))
}
