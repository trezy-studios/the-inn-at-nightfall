/**
 * Gets the current character.
 *
 * @param {object} state The current state of the Statery store.
 * @returns {import('../../game/structures/Character.js').Character} The current character.
 */
export function getCurrentCharacter(state) {
	const {
		characterQueue,
		characterQueueIndex,
		characters,
	} = state

	return characters[characterQueue[characterQueueIndex]]
}
