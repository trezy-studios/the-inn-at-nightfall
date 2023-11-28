/**
 * @typedef {object} UnsubscribeResults
 * @property {number} matchCount The number of matching listeners that were found.
 * @property {number} remainingCount The number of listeners that match but remain subscribed.
 * @property {number} unsubscribeCount The number of listeners that were unsubscribed.
 */





/**
 * An entity that emits events.
 */
export class EventEmitter {
	/****************************************************************************\
	 * Private instance properties
	\****************************************************************************/

	/** @type {Map<string, Function[]>} */
	#events = new Map

	/** @type {Map<Function, Function>} */
	#originalCallbacks = new Map





	/****************************************************************************\
	 * Public instance methods
	\****************************************************************************/

	/**
	 * Triggers an event.
	 *
	 * @param {string} eventName The name of the event to be triggered.
	 * @param {*} [data] Data to be passed to callbacks for this event.
	 */
	emit(eventName, data) {
		const listeners = this.#events.get(eventName)

		if (!listeners) {
			return
		}

		listeners.forEach(callback => callback(data))
	}

	/**
	 * Attaches an event listener.
	 *
	 * @param {string} eventName The name of the event to remove the listener from.
	 * @param {Function} [callback] The listener to be removed.
	 * @returns {UnsubscribeResults} Details of the unsubscribe operation.
	 */
	off(eventName, callback) {
		const listeners = this.#events.get(eventName)

		let matchCount = 0
		let unsubscribeCount = 0

		if (!listeners?.length) {
			return {
				matchCount,
				remainingCount: matchCount - unsubscribeCount,
				unsubscribeCount,
			}
		}

		if (callback) {
			const originalCallback = this.#originalCallbacks.get(callback) ?? callback
			const callbackIndex = listeners.indexOf(originalCallback)

			matchCount = listeners.filter(item => item === callback).length

			if (callbackIndex > -1) {
				unsubscribeCount += 1

				listeners.splice(callbackIndex, 1)

				if (originalCallback) {
					this.#originalCallbacks.delete(callback)
				}

				if (listeners.length === 0) {
					this.#events.delete(eventName)
				}
			}
		} else {
			matchCount += listeners.length
			unsubscribeCount += listeners.length

			this.#events.delete(eventName)
		}

		return {
			matchCount,
			remainingCount: matchCount - unsubscribeCount,
			unsubscribeCount,
		}
	}

	/**
	 * Attaches an event listener.
	 *
	 * @param {string} eventName The name of the event to listen for.
	 * @param {Function} callback The listener to be executed when the event is triggered.
	 * @returns {Function} A function for unsubscribing this specific listener.
	 */
	on(eventName, callback) {
		let listeners = this.#events.get(eventName)

		if (!listeners) {
			listeners = []
			this.#events.set(eventName, listeners)
		}

		listeners.push(callback)

		return () => this.off(eventName, callback)
	}

	/**
	 * Attaches an event listener that will be removed immediatley after the next time the event is triggered.
	 *
	 * @param {string} eventName The name of the event to listen for.
	 * @param {Function} callback The listener to be executed when the event is triggered.
	 * @returns {Function} A function for unsubscribing this specific listener.
	 */
	once(eventName, callback) {
		// eslint-disable-next-line jsdoc/require-jsdoc
		const newCallback = () => {
			callback()
			this.off(eventName, newCallback)
		}

		this.#originalCallbacks.set(callback, newCallback)

		this.on(eventName, newCallback)

		return () => this.off(eventName, callback)
	}
}
