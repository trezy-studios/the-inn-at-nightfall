// Module imports
import { v4 as uuid } from 'uuid'





// Local imports
import { CHARACTER_STATES } from '../../data/CHARACTER_STATES.js'
import { ENTRY_STATE } from '../../data/ENTRY_STATE.js'





// Types
/**
 * @typedef {object} CharacterConfig
 * @property {string} [background] The character background.
 * @property {boolean} [isMerchant] Whether this character is a merchant.
 * @property {import('xstate').StateMachine} machine The dialog machine for the character.
 * @property {string} name The character's name.
 * @property {string} sprite The name of the character's sprite.
 */





/**
 * Represents a character in the game.
 */
export class Character {
	/****************************************************************************\
	 * Private instance properties
	\****************************************************************************/

	#dialogMachine

	#entryState = null

	#id = uuid()

	#isMerchant = false

	#isVampire = false

	#name

	#sprite

	#state = 'normal'





	/****************************************************************************\
	 * Constructor
	\****************************************************************************/

	/**
	 * Creates a new character.
	 *
	 * @param {CharacterConfig} config All configuration.
	 */
	constructor(config) {
		this.#isMerchant = config.isMerchant
		this.#name = config.name
		this.#sprite = config.sprite
		this.#dialogMachine = config.machine

		this.reset()
	}





	/****************************************************************************\
	 * Public instance methods
	\****************************************************************************/

	/**
	 * Allows the character to enter the inn.
	 */
	allowEntry() {
		this.#entryState = ENTRY_STATE.ALLOWED
	}

	/**
	 * Prevents the character from entering the inn.
	 */
	denyEntry() {
		this.#entryState = ENTRY_STATE.DENIED
	}

	/**
	 * Resets the character. This allows them to become a vampire.
	 */
	reset() {
		if (!this.#isMerchant) {
			this.#isVampire = Math.random() > 0.8

			if (this.#isVampire) {
				const stateKeys = Object.keys(CHARACTER_STATES)
				const stateKeyIndex = Math.floor((stateKeys.length - 1) * Math.random())
				const selectedStateKey = stateKeys[stateKeyIndex + 1]

				this.#state = CHARACTER_STATES[selectedStateKey]
			}
		}
	}





	/****************************************************************************\
	 * Public instance getters/setters
	\****************************************************************************/

	/** @returns {import('xstate').StateMachine} The character's dialog state machine. */
	get dialogMachine() {
		return this.#dialogMachine
	}

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
		return `${this.#sprite}-${this.#state}`
	}

	/** @returns {string} The character's current state. */
	get state() {
		return this.#state
	}
}
