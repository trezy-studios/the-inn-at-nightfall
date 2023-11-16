// Module imports
import {
	contextBridge,
	ipcRenderer,
} from 'electron'





contextBridge.exposeInMainWorld('Innkeeper', {
	// Invocations
	/**
	 * Gets a config value from electron-store.
	 *
	 * @param {string} key The config key to be retrieved.
	 * @returns {Promise<*>} The value of the config.
	 */
	getConfig: key => ipcRenderer.invoke('getConfig', key),

	/**
	 * Sets a config value via electron-store.
	 *
	 * @param {string} key The config key to be set.
	 * @param {*} value The new config value.
	 */
	setConfig: (key, value) => {
		ipcRenderer.invoke('setConfig', key, value)
	},
})
