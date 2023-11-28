/**
 * Gets a random number using the `crypto` module.
 *
 * @returns {number} A random number between 0 and 1.
 */
export function getRandomNumber() {
	const array = new Uint32Array(1)

	self.crypto.getRandomValues(array)

	return parseFloat(`0.${array[0]}`)
}
