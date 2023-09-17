// Module imports
import { v4 as uuid } from 'uuid'





// Types
/**
 * @typedef {object} CharacterConfig
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
	}





	/****************************************************************************\
	 * Public instance getters/setters
	\****************************************************************************/

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
