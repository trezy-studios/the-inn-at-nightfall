// Local imports
import { store } from '../store.js'





/**
 * Adds messages to the current dialog.
 *
 * @param {import('../../types/DialogMessage.js').DialogMessage[]} messages Messages to be added to the dialog.
 */
export function addMessagesToDialog(messages) {
	if (!Array.isArray(messages)) {
		messages = [messages]
	}

	store.set(state => ({
		currentDialogHistory: messages.reduce((accumulator, message) => {
			accumulator.set(message.id, { ...message })

			return accumulator
		}, new Map(state.currentDialogHistory)),
	}))
}
