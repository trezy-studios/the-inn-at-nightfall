// Module imports
import { interpret } from 'xstate'
import { v4 as uuid } from 'uuid'





// Local imports
import { ENTRY_STATE } from '../../data/ENTRY_STATE.js'





// Types
/**
 * @typedef {object} CharacterConfig
 * @property {import('xstate').StateMachine} [dialogMachine] The character's name.
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

	#name

	#sprite





	/****************************************************************************\
	 * Constructor
	\****************************************************************************/

	/**
	 * Creates a new character.
	 *
	 * @param {CharacterConfig} config All configuration.
	 */
	constructor(config) {
		this.#name = config.name
		this.#sprite = config.sprite

		if (config.dialogMachine) {
			this.#dialogMachine = interpret(config.dialogMachine)
		}
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





	/****************************************************************************\
	 * Public instance getters/setters
	\****************************************************************************/

	/** @returns {object} The character's dialog state machine. */
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

	/** @returns {string} The character's name. */
	get name() {
		return this.#name
	}

	/** @returns {string} The name of the character's sprite. */
	get sprite() {
		return this.#sprite
	}
}
