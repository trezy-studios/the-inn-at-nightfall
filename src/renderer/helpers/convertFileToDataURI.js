/**
 * Converts a blob to a data URI.
 *
 * @param {File} file The file to be converted.
 * @returns {Promise<string>} The data URL.
 */
export function convertFileToDataURI(file) {
	return new Promise(resolve => {
		const fileReader = new FileReader

		fileReader.addEventListener('load', () => {
			resolve(/** @type {string} */ (fileReader.result))
		})

		fileReader.readAsDataURL(file)
	})
}
