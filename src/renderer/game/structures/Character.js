// Local imports
import { CHARACTER_STATES } from '../../data/CHARACTER_STATES.js'
import { EventEmitter } from './EventEmitter.js'





// Types
/** @event Character#stateChanged */

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

	#entryState = null

	#id

	#isMerchant = false

	#isVampire = false

	#name

	#sprite

	#state = 'normal'





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
	 * Bites this character, affecting them with vampirism.
	 *
	 * @param {import('../../data/CHARACTER_STATES.js').CharacterState} state The new state.
	 * @fires Character#STATE_CHANGED
	 */
	#setState(state) {
		this.#state = state
		this.emit(EVENTS.STATE_CHANGED)
	}





	/****************************************************************************\
	 * Public instance methods
	\****************************************************************************/

	/**
	 * Bites this character, affecting them with vampirism.
	 */
	bite() {
		if (!this.#isMerchant) {
			this.#isVampire = true
			this.#setState(CHARACTER_STATES.BITTEN)
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
	get isMerchant() {
		return Boolean(this.#isMerchant)
	}

	/** @returns {boolean} Whether the character is a vampire. */
	get isVampire() {
		return Boolean(this.#isVampire)
	}

	/** @returns {string} The character's name. */
	get name() {
		return this.#name
	}

	/** @returns {string} The name of the character's sprite. */
	get sprite() {
		return `${this.#sprite}::${this.#state}`
	}

	/** @returns {string} The character's current state. */
	get state() {
		return this.#state
	}
}
