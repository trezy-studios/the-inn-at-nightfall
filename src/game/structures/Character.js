// Module imports
import { createMachine } from 'xstate'
import { v4 as uuid } from 'uuid'





// Local imports
import { ENTRY_STATE } from '../../data/ENTRY_STATE.js'





// Types
/**
 * @typedef {object} CharacterConfig
 * @property {object} [dialog] The dialog for the character, if available.
 * @property {boolean} [isMerchant] Whether this character is a merchant.
 * @property {string} name The character's name.
 * @property {string} sprite The name of the character's sprite.
 */





/**
 * Represents a character in the game.
 */
export class Character {
	/****************************************************************************\
	 * Public static methods
	\****************************************************************************/

	/**
	 * Takes the characters config and generates a finite state machine
	 * representing the character's conversation tree.
	 *
	 * @param {object} config The base character config.
	 * @returns {import('xstate').StateMachine} The compiled state machine.
	 */
	static compileDialogMachine(config) {
		const stateEntries = Object.entries(config.dialog.content)
		const states = stateEntries.reduce((accumulator, [stateKey, stateData]) => {
			const state = {
				meta: {
					dialog: stateData.conversation,
				},
			}

			if ('response' in stateData) {
				state.meta.response = stateData.response.map(responseData => ({
					message: responseData.message,
					transitionID: responseData.transitionID,
				}))

				state.on = stateData.response.reduce((responseAccumulator, responseData) => {
					responseAccumulator[responseData.transitionID] = { target: responseData.target }
					return responseAccumulator
				}, {})
			} else if ('next' in stateData) {
				state.after = { 1: stateData.next }
			} else {
				state.type = 'final'
			}

			accumulator[stateKey] = state

			return accumulator
		}, {})

		return createMachine({
			id: config.name,
			initial: config.dialog.initial,
			states,
		})
	}





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

		if (config.dialog) {
			this.#dialogMachine = Character.compileDialogMachine(config)
		}

		if (!this.#isMerchant) {
			this.#isVampire = Math.random() > 0.9
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
		return this.#isMerchant
	}

	/** @returns {boolean} Whether the character is a vampire. */
	get isVampire() {
		return this.#isVampire
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
