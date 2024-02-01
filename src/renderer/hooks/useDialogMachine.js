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





// Types
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





// Functions
/**
 * @param {import('xstate').AnyMachineSnapshot} snapshot The state to be analysed.
 * @returns {string[]} A  list of possible next events.
 */
function getNextEvents(snapshot) {
	return Array.from(new Set([
		...snapshot._nodes.flatMap(({ ownEvents }) => ownEvents),
	]))
}





/**
 * Retrieves the dialog machine for the current character.
 *
 * @param {object} [options] All options.
 * @param {boolean} [options.autoadvance] Whether to automatically advance when the new state has only a `next` event.
 * @param {number} [options.autoadvanceDelay] The time to wait (in milliseconds) before automatically advancing to the next line.
 * @returns {useDialogMachineProps} All props.
 */
export function useDialogMachine(options = {}) {
	const {
		autoadvance = true,
		autoadvanceDelay = 250,
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

		const result = {
			nodeMeta: state.getMeta()[nodeMetaKey],
		}

		if (typeof lineID === 'string') {
			result.lineMeta = {
				...state.getMeta()[lineMetaKey],
				id: lineID,
			}
		} else {
			const parallelStateID = Object.keys(lineID)[0]
			const childStateIDs = Object.keys(lineID[parallelStateID])

			result.options = childStateIDs.map(id => {
				return {
					handleSelect: createOptionSelectHandler(id),
					id,
					...state.getMeta()[`${nodeMetaKey}.${parallelStateID}.${id}`],
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
		return state.getMeta()[metaKey]
	}, [state])

	useEffect(() => {
		const isStateDone = state.status === 'done'

		if (lineMeta && !isStateDone) {
			addMessageToDialog(lineMeta)
		}

		if (isStateDone) {
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
		const isStateDone = state.status === 'done'
		if (autoadvance && !isStateDone) {
			const timeoutID = setTimeout(() => {
				const nextEvents = getNextEvents(state)
				if ((nextEvents[0] === 'next') && (nextEvents.length === 1)) {
					sendNext()
				}
			}, autoadvanceDelay)

			return () => clearTimeout(timeoutID)
		}
	}, [
		autoadvance,
		autoadvanceDelay,
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
