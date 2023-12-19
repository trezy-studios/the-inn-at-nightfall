// Local imports
import { CHARACTER_STATES } from '../../data/CHARACTER_STATES.js'
import { EventEmitter } from './EventEmitter.js'
import { store } from '../../store/store.js'





// Types
/** @typedef {string} Event */

/**
 * @typedef {object} CharacterConfig
 * @property {string} [background] The character background.
 * @property {boolean} [isMerchant] Whether this character is a merchant.
 * @property {string} name The character's name.
 * @property {string} sprite The name of the character's sprite.
 */





// Constants
/** @enum {Event} */
export const EVENTS = {
	STATE_CHANGED: 'STATE_CHANGED',
}





/**
 * Represents a character in the game.
 */
export class Character extends EventEmitter {
	/****************************************************************************\
	 * Private instance properties
	\****************************************************************************/

	#bittenRound = null

	#entryState = null

	#id

	#isBitten = false

	#isMerchant = false

	#name

	#sprite





	/****************************************************************************\
	 * Public instance properties
	\****************************************************************************/

	/** @type {import('xstate').StateMachine} */
	dialogMachine





	/****************************************************************************\
	 * Constructor
	\****************************************************************************/

	/**
	 * Creates a new character.
	 *
	 * @param {CharacterConfig} config All configuration.
	 */
	constructor(config) {
		super()

		this.#id = config.sprite
		this.#isMerchant = config.isMerchant
		this.#name = config.name
		this.#sprite = config.sprite
	}





	/****************************************************************************\
	 * Private instance methods
	\****************************************************************************/

	/**
	 * Whether the character has transformed into a vampire.
	 *
	 * @returns {boolean} Whether the character has transformed into a vampire.
	 */
	#hasTransformed() {
		if (!this.#isBitten) {
			return false
		}

		const hasEnoughTimePassed = store.state.currentRound >= (this.#bittenRound + 1)

		if (hasEnoughTimePassed) {
			return true
		}

		return false
	}





	/****************************************************************************\
	 * Public instance methods
	\****************************************************************************/

	/**
	 * Bites this character, affecting them with vampirism.
	 *
	 * @fires Character#STATE_CHANGED
	 */
	bite() {
		if (!this.#isMerchant) {
			this.#isBitten = true
			this.#bittenRound = store.state.currentRound
			this.emit(EVENTS.STATE_CHANGED)
		}
	}





	/****************************************************************************\
	 * Public instance getters/setters
	\****************************************************************************/

	/** @returns {string} Whether the character has been allowed or denied access to the inn. If they haven't been processed, will be `undefined`. */
	get entryState() {
		return this.#entryState
	}

	/** @returns {string} The character's unique identifier. */
	get id() {
		return this.#id
	}

	/** @returns {boolean} Whether the character is a merchant. */
	get isBitten() {
		return this.#isBitten
	}

	/** @returns {boolean} Whether the character is a merchant. */
	get isMerchant() {
		return this.#isMerchant
	}

	/** @returns {boolean} Whether the character is a vampire. */
	get isVampire() {
		return this.#hasTransformed()
	}

	/** @returns {string} The character's name. */
	get name() {
		return this.#name
	}

	/** @returns {string} The name of the character's sprite. */
	get sprite() {
		return `${this.#sprite}::${this.state}`
	}

	/** @returns {string} The character's current state. */
	get state() {
		if (this.#isBitten) {
			if (this.#hasTransformed()) {
				return CHARACTER_STATES.FANGS
			}

			return CHARACTER_STATES.BITTEN
		}

		return CHARACTER_STATES.NORMAL
	}
}
