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
 * @typedef {object} useDialogMachineProps
 * @property {object} dialogMeta Metadata for the parent state machine.
 * @property {boolean} isDone Whether the state machine has reached a final state.
 * @property {object} meta Metadata for the current node.
 * @property {Array} options A list of options if we've reached a parallel state.
 * @property {Function} sendEvent Send an arbitrary event to the machine.
 * @property {Function} sendNext Send the next event to the machine.
 * @property {import('xstate').StateConfig} state The machine's current state.
 */

/**
 * Retrieves the dialog machine for the current character.
 *
 * @param {object} [options] All options.
 * @param {boolean} [options.autoadvance] Whether to automatically advance when the new state has only a `next` event.
 * @returns {useDialogMachineProps} All props.
 */
export function useDialogMachine(options = {}) {
	const {
		autoadvance = true,
	} = options

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
		options: resultOptions,
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

	useEffect(() => {
		if (
			!state.done
			&& autoadvance
			&& (state.nextEvents.length === 1)
			&& (state.nextEvents[0] === 'next')
		) {
			sendNext()
		}
	}, [
		autoadvance,
		sendNext,
		state,
	])

	return {
		dialogMeta,
		isDone,
		meta: nodeMeta,
		options: resultOptions,
		sendEvent,
		sendNext,
		state,
	}
}
