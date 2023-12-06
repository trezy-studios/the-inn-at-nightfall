// Local imports
import { store } from '../store.js'





/**
 * Adds a dialog machine to the store.
 *
 * @param {string} alias The alias for the dialog machine.
 * @param {import('xstate').StateMachine} dialogMachine The dialog machine to be added.
 */
export function addDialog(alias, dialogMachine) {
	store.set(previousState => {
		return {
			dialogs: {
				...previousState.dialogs,
				[alias]: dialogMachine,
			},
		}
	})
}
