// Module imports
import { useMachine } from '@xstate/react'





// Local imports
import { useCharacter } from './useCharacter.js'





/**
 * Retrieves the dialog machine for the current character.
 *
 * @component
 */
export function useDialogMachine() {
	const currentCharacter = useCharacter()
	const [dialogMachine, sendDialogEvent] = useMachine(currentCharacter.dialogMachine)

	return {
		dialogMachine,
		dialogMeta: dialogMachine.meta[`${dialogMachine.machine.id}.${dialogMachine.value}`],
		sendDialogEvent,
	}
}
