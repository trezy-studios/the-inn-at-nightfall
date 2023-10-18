/**
 * Reorders the contents of an array at random.
 *
 * @param {*[]} array The array to be shuffled.
 * @returns {*[]} The shuffled array.
 */
export function shuffleArray(array) {
	const copyOfArray = [...array]
	const result = []

	while (result.length < array.length) {
		const selectedIndex = Math.floor(copyOfArray.length * Math.random())
		result.push(copyOfArray[selectedIndex])
		copyOfArray.splice(selectedIndex, 1)
	}

	return result
}
