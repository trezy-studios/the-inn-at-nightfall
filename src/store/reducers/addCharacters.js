// Local imports
import { store } from '../store.js'





/**
 * Adds characters to the game state.
 *
 * @param {...import('../../game/structures/Character.js').Character} characters Entities to be added to the game state.
 */
export function addCharacters(...characters) {
	store.set(state => {
		const newCharactersDictionary = characters.reduce((accumulator, character) => {
			accumulator[character.id] = character
			return accumulator
		}, {
			...state.characters,
		})

		return { characters: newCharactersDictionary }
	})
}
