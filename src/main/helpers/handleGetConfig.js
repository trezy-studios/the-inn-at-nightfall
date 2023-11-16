// Local imports
import { configStore } from './configStore.js'





/**
 * Rerieves uiser settings from electron-store.
 *
 * @param {*} _
 * @param {string} key The key of the config to be retrieved.
 * @returns {object} All settings
 */
export function handleGetConfig(_, key) {
	return configStore.get(key)
}
