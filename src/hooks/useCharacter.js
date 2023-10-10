// Module imports
import { useStore } from 'statery'





// Local imports
import { getCurrentCharacter } from '../store/reducers/getCurrentCharacter.js'
import { store } from '../store/store.js'





/**
 * Retrieves the current character.
 *
 * @component
 */
export function useCharacter() {
	const proxyStore = useStore(store)
	return getCurrentCharacter(proxyStore)
}
