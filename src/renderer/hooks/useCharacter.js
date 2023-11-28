// Module imports
import { useStore } from 'statery'





// Local imports
import { store } from '../store/store.js'





/**
 * Retrieves the current character.
 *
 * @param {string} [characterID] The ID of the character to return.
 * @returns {import('../game/structures/Character.js').Character} The current character.
 */
export function useCharacter(characterID) {
	const {
		characterQueue,
		characterQueueIndex,
		characters,
	} = useStore(store)

	if (!characterID) {
		characterID = characterQueue?.[characterQueueIndex]
	}

	return characters?.[characterID]
}
