// Module imports
import {
	useEffect,
	useMemo,
} from 'react'
import { useMachine } from '@xstate/react'





// Local imports
import { addMessagesToDialog } from '../store/reducers/addMessagesToDialog.js'
import { useCharacter } from './useCharacter.js'





/**
 * Retrieves the dialog machine for the current character.
 *
 * @component
 */
export function useDialogMachine() {
	const currentCharacter = useCharacter()
	const [dialogMachine, sendDialogEvent] = useMachine(currentCharacter.dialogMachine)

	const dialogMeta = useMemo(() => {
		const metaKey = `${dialogMachine.machine.id}.${dialogMachine.value}`
		return dialogMachine.meta[metaKey]
	}, [dialogMachine])

	useEffect(() => {
		if (dialogMeta) {
			addMessagesToDialog(dialogMeta.dialog)
		}
	}, [
		dialogMachine,
		dialogMeta,
	])

	return {
		dialogMachine,
		dialogMeta,
		sendDialogEvent,
	}
}
