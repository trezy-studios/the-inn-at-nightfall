// Module imports
import { app } from 'electron'
import fs from 'node:fs/promises'
import path from 'node:path'





// Constants
const STORE_FILE_PATH = path.join(app.getPath('userData'), 'config.json')
const UPDATE_QUEUE = []





/**
 * Updates the contents of the config file.
 *
 * @param {object} data Updated store data.
 */
export async function setStore(data) {
	UPDATE_QUEUE.push(data)
	// eslint-disable-next-line security/detect-non-literal-fs-filename
	await fs.writeFile(STORE_FILE_PATH, JSON.stringify(data), 'utf8')
}

/**
 * Retrieves the value of the store file.
 *
 * @returns {Promise<object>} The full, parsed store object.
 */
export async function getStore() {
	let store = '{}'

	try {
		// eslint-disable-next-line security/detect-non-literal-fs-filename
		const storeFileContent = await fs.readFile(STORE_FILE_PATH, 'utf8')
		store = storeFileContent
	} catch (error) {
		// eslint-disable-next-line security/detect-non-literal-fs-filename
		await setStore(JSON.parse(store))
	}

	try {
		store = JSON.parse(store)
		return store
	} catch (error) {
		throw new Error('Store file has been corrupted.')
	}
}





/**
 * Manages a data store on disk.
 */
export class DiskStore {
	/****************************************************************************\
	 * Private instance properties
	\****************************************************************************/

	#defaults = {}





	/****************************************************************************\
	 * Constructor
	\****************************************************************************/

	/**
	 * Creates a new Store.
	 *
	 * @param {object} [options] All options.
	 * @param {{
	 * 	[key: string]: *,
	 * }} [options.defaults] Default values.
	 */
	constructor(options = {}) {
		const {
			defaults = {},
		} = options

		this.#defaults = defaults
	}





	/****************************************************************************\
	 * Public instance methods
	\****************************************************************************/

	/**
	 * Deletes a value from the store.
	 *
	 * @param {string} key The config key the value will be set at.
	 */
	async delete(key) {
		const data = await getStore()

		delete data[key]

		await setStore(data)
	}

	/**
	 * Retrieves a value from the store.
	 *
	 * @param {string} [key] The key of the value to be retrieved.
	 * @returns {Promise<*>} The value at the requested key.
	 */
	async get(key) {
		const config = {
			...this.#defaults,
			...await getStore(),
		}

		if (key) {
			return config[key]
		}

		return config
	}

	/**
	 * Sets a value in the store.
	 *
	 * @param {string | object} keyOrPatch The config key the value will be set at.
	 * @param {*} [value] The value to be set.
	 */
	async set(keyOrPatch, value) {
		const data = await getStore()

		if (typeof keyOrPatch === 'string') {
			data[keyOrPatch] = value
		} else {
			Object.entries(keyOrPatch).forEach(([entryKey, entryValue]) => {
				data[entryKey] = entryValue
			})
		}

		await setStore(data)
	}
}
