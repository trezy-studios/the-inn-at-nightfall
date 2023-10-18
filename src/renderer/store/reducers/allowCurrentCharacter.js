// Local imports
import { getCurrentCharacter } from './getCurrentCharacter.js'
import { goToNextCharacter } from './goToNextCharacter.js'
import { store } from '../store.js'





/**
 * Advances to the next character in the queue if possible.
 */
export function allowCurrentCharacter() {
	const currentCharacter = getCurrentCharacter(store.state)

	store.set(state => {
		const patch = {
			allowedCharacters: [
				...state.allowedCharacters,
				currentCharacter.id,
			],
		}

		if (!currentCharacter.isVampire) {
			patch.totalGuestsAllowed = state.totalGuestsAllowed + 1
		}

		return patch
	})

	goToNextCharacter()
}
