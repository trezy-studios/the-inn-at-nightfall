// Local imports
import { store } from '../store.js'





/**
 * Adds messages to the current dialog.
 *
 * @param {import('../../types/DialogMessage.js').DialogMessage} message Messages to be added to the dialog.
 */
export function addMessageToDialog(message) {
	store.set(state => {
		const newState = { currentDialogHistory: new Map(state.currentDialogHistory) }
		newState.currentDialogHistory.set(message.id, { ...message })
		return newState
	})
}
