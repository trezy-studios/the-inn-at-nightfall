// Module imports
import {
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react'
import { useMachine } from '@xstate/react'





// Local imports
import { addMessageToDialog } from '../store/reducers/addMessageToDialog.js'
import { goToNextCharacter } from '../store/reducers/goToNextCharacter.js'
import { useCharacter } from './useCharacter.js'





/**
 * Retrieves the dialog machine for the current character.
 *
 * @component
 */
export function useDialogMachine() {
	const currentCharacter = useCharacter()

	const [state, sendEvent] = useMachine(currentCharacter.dialogMachine)
	const [isDone, setIsDone] = useState(false)

	const sendNext = useCallback(optionID => {
		let eventName = 'next'

		if (optionID) {
			eventName += `::${optionID}`
		}

		if (state.can({ type: eventName })) {
			sendEvent({ type: eventName })
		}
	}, [
		sendEvent,
		state,
	])

	const createOptionSelectHandler = useCallback(optionID => () => sendNext(optionID), [sendNext])

	const {
		lineMeta,
		nodeMeta,
		options,
	} = useMemo(() => {
		const [
			nodeID,
			lineID,
		] = Object.entries(state.value)[0]

		const nodeMetaKey = `${state.machine.id}.${nodeID}`
		const lineMetaKey = `${nodeMetaKey}.${lineID}`

		const result = { nodeMeta: state.meta[nodeMetaKey] }

		if (typeof lineID === 'string') {
			result.lineMeta = {
				...state.meta[lineMetaKey],
				id: lineID,
			}
		} else {
			const parallelStateID = Object.keys(lineID)[0]
			const childStateIDs = Object.keys(lineID[parallelStateID])

			result.options = childStateIDs.map(id => {
				return {
					handleSelect: createOptionSelectHandler(id),
					id,
					...state.meta[`${nodeMetaKey}.${parallelStateID}.${id}`],
				}
			})
		}

		return result
	}, [
		createOptionSelectHandler,
		state,
	])

	const dialogMeta = useMemo(() => {
		const metaKey = `${state.machine.id}.${state.value}`
		return state.meta[metaKey]
	}, [state])

	useEffect(() => {
		if (lineMeta && !state.done) {
			addMessageToDialog(lineMeta)
		}

		if (state.done) {
			setIsDone(true)

			if (currentCharacter.isMerchant) {
				goToNextCharacter()
			}
		}
	}, [
		currentCharacter,
		lineMeta,
		sendNext,
		state,
	])

	return {
		dialogMeta,
		isDone,
		meta: nodeMeta,
		options,
		sendEvent,
		sendNext,
		state,
	}
}
