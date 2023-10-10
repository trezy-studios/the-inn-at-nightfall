// Module imports
import {
	useCallback,
	useEffect,
	useMemo,
	useRef,
} from 'react'
import { useMachine } from '@xstate/react'
import { useStore } from 'statery'





// Local imports
import styles from './GameDialog.module.scss'

import { addMessagesToDialog } from '../../store/reducers/addMessagesToDialog.js'
import { allowCurrentCharacter } from '../../store/reducers/allowCurrentCharacter.js'
import { Button } from '../Button/Button.jsx'
import { getCurrentCharacter } from '../../store/reducers/getCurrentCharacter.js'
import { getCurrentDialog } from '../../store/reducers/getCurrentDialog.js'
import { goToNextCharacter } from '../../store/reducers/goToNextCharacter.js'
import { store } from '../../store/store.js'





/**
 * Renders the game dialogs.
 *
 * @component
 */
export function GameDialogContent() {
	const proxyStore = useStore(store)
	const currentCharacter = getCurrentCharacter(proxyStore)
	const currentDialog = getCurrentDialog(proxyStore)

	const callRef = useRef(null)

	const [dialogMachine, send] = useMachine(currentCharacter.dialogMachine)

	const dialogMachineMetaKey = `${dialogMachine.machine.id}.${dialogMachine.value}`

	const dialogMachineMeta = dialogMachine.meta[dialogMachineMetaKey]

	const handleAllowClick = useCallback(() => allowCurrentCharacter(), [])
	const handleContinueClick = useCallback(() => goToNextCharacter(), [])
	const handleDenyClick = useCallback(() => goToNextCharacter(), [])

	const renderedMessages = useMemo(() => currentDialog.map((messageGroup, index, allMessageGroups) => (
		<div
			key={messageGroup.id}
			className={styles['message-group']}
			// eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
			style={{ order: allMessageGroups.length - index }}>
			<div className={styles['author']}>
				<strong>{messageGroup.author}</strong>
			</div>

			<div className={styles['content']}>
				{messageGroup.messages.map(message => (
					<p key={message.id}>
						{Boolean(message.action) && (
							<em>{message.action}</em>
						)}
						{!message.action && message.message}
					</p>
				))}
			</div>
		</div>
	)), [currentDialog])

	const renderedResponses = useMemo(() => {
		const responses = []

		if (dialogMachineMeta?.response) {
			dialogMachineMeta
				.response
				.filter(response => dialogMachine.can(response.transitionID))
				.forEach((response, index) => {
					responses.push((
						<li key={`${dialogMachineMetaKey}:${index}`}>
							<Button
								// eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
								onClick={() => send(response.transitionID)}>
								{response.message}
							</Button>
						</li>
					))
				})
		}

		if (!dialogMachine || dialogMachine?.done) {
			if (currentCharacter.isMerchant) {
				responses.push((
					<li key={'continue'}>
						<Button
							// eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
							onClick={handleContinueClick}>
							{'Continue'}
						</Button>
					</li>
				))
			} else {
				responses.push((
					<li key={'allow'}>
						<Button
							// eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
							onClick={handleAllowClick}>
							{'Allow'}
						</Button>
					</li>
				))

				responses.push((
					<li key={'deny'}>
						<Button
							// eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
							onClick={handleDenyClick}>
							{'Deny'}
						</Button>
					</li>
				))
			}
		}

		return responses
	}, [
		currentCharacter,
		dialogMachine,
		dialogMachineMeta,
		dialogMachineMetaKey,
		handleAllowClick,
		handleContinueClick,
		handleDenyClick,
		send,
	])

	useEffect(() => {
		if (dialogMachineMeta) {
			addMessagesToDialog(dialogMachineMeta.dialog)
		}
	}, [
		dialogMachine,
		dialogMachineMeta,
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
