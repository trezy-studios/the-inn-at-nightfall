// Module imports
import { useStore } from 'statery'





// Local imports
import { store } from '../store/store.js'





/**
 * Retrieves the current character.
 *
 * @returns {import('../game/structures/Character.js').Character} The current character.
 */
export function useCharacter() {
	const {
		characterQueue,
		characterQueueIndex,
		characters,
	} = useStore(store)

	return characters?.[characterQueue?.[characterQueueIndex]]
}
