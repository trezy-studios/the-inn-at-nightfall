// Module imports
import {
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react'
import { useMachine } from '@xstate/react'
import { useStore } from 'statery'





// Local imports
import styles from './GameDialog.module.scss'

import { Button } from '../Button/Button.jsx'
import { getCurrentCharacter } from '../../store/reducers/getCurrentCharacter.js'
import { store } from '../../store/store.js'





/**
 * Renders the game dialogs.
 *
 * @component
 */
export function GameDialogContent() {
	const proxyStore = useStore(store)
	const currentCharacter = getCurrentCharacter(proxyStore)
	const callRef = useRef(null)

	const [dialogContent, setDialogContent] = useState([])

	const [dialogMachine, send] = useMachine(currentCharacter.dialogMachine)

	const dialogMachineMetaKey = `${dialogMachine.machine.id}.${dialogMachine.value}`

	const dialogMachineMeta = dialogMachine.meta[dialogMachineMetaKey]

	const renderedMessages = useMemo(() => {
		return [...dialogContent]
			.reverse()
			.map((line, index, allLines) => {
				const nextLine = allLines[index + 1]
				const shouldShowAuthor = !nextLine || nextLine.author !== line.author

				return (
					<div
						key={`${dialogMachineMetaKey}:${index}`}
						className={styles['message']}>
						{shouldShowAuthor && (
							<div className={styles['author']}>
								<strong>{`${line.author}:`}</strong>
							</div>
						)}

						<div className={styles['content']}>
							{Boolean(line.action) && (
								<em>{line.action}</em>
							)}
							{!line.action && line.message}
						</div>
					</div>
				)
			})
	}, [
		dialogContent,
		dialogMachineMetaKey,
	])

	const renderedResponses = useMemo(() => {
		if (!dialogMachineMeta.response) {
			return null
		}

		return dialogMachineMeta
			.response
			.filter(response => dialogMachine.can(response.transitionID))
			.map((response, index) => {
				return (
					<li key={`${dialogMachineMetaKey}:${index}`}>
						<Button
							// eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
							onClick={() => send(response.transitionID)}>
							{response.message}
						</Button>
					</li>
				)
			})
	}, [
		dialogMachine,
		dialogMachineMeta,
		dialogMachineMetaKey,
		send,
	])

	useEffect(() => {
		setDialogContent(previousState => [
			...previousState,
			...dialogMachineMeta.dialog,
		])
	}, [
		dialogMachineMeta,
		setDialogContent,
	])

	return (
		<>
			<div
				ref={callRef}
				className={styles['call']}>
				{renderedMessages}
			</div>

			{Boolean(renderedResponses) && (
				<div className={styles['response']}>
					<ol className={styles['options']}>
						{renderedResponses}
					</ol>
				</div>
			)}
		</>
	)
}
