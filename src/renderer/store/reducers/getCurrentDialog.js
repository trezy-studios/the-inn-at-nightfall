/**
 * Retrieves the current dialog, grouping serial messages from the same author.
 *
 * @param {object} state The current state of the Statery store.
 * @returns {import('../../types/DialogMessageGroup.js').DialogMessageGroup[]} An array of message groups.
 */
export function getCurrentDialog(state) {
	const result = []

	const { currentDialogHistory } = state

	currentDialogHistory.forEach(message => {
		const mostRecentMessageGroup = result.at(-1)

		if (mostRecentMessageGroup && (message.author === mostRecentMessageGroup.author)) {
			mostRecentMessageGroup.messages.push({
				action: message.action,
				body: message.body,
				id: message.id,
			})
		} else {
			const newMessageGroup = {
				author: message.author,
				messages: [{
					action: message.action,
					body: message.body,
					id: message.id,
				}],
			}
			newMessageGroup.id = message.id
			result.push(newMessageGroup)
		}
	})

	return result
}
