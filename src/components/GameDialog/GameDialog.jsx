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
export function GameDialog() {
	const proxyStore = useStore(store)
	const currentCharacter = getCurrentCharacter(proxyStore)
	const callRef = useRef(null)

	const [dialogContent, setDialogContent] = useState([])

	const [dialogMachine, send] = useMachine(currentCharacter.dialogMachine)

	const dialogMachineMetaKey = `${dialogMachine.machine.id}.${dialogMachine.value}`

	const dialogMachineMeta = dialogMachine.meta[dialogMachineMetaKey]

	const renderedMessages = useMemo(() => {
		return dialogContent.map((line, index) => {
			return (
				<p key={`${dialogMachineMetaKey}:${index}`}>
					<strong>{`${line.author}: `}</strong>
					{Boolean(line.action) && (
						<em>{line.action}</em>
					)}
					{!line.action && line.message}
				</p>
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
		setTimeout(() => callRef.current.querySelector('p:last-child').scrollIntoView({ behavior: 'smooth' }), 0)
	}, [
		dialogMachineMeta,
		setDialogContent,
	])

	return (
		<div
			ref={callRef}
			className={styles['game-dialog']}>
			<div className={styles['call']}>
				{renderedMessages}
			</div>

			{Boolean(renderedResponses) && (
				<div className={styles['response']}>
					<ol className={styles['options']}>
						{renderedResponses}
					</ol>
				</div>
			)}
		</div>
	)
}
