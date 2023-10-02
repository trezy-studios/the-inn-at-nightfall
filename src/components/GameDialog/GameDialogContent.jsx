// Module imports
import {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react'
import { useMachine } from '@xstate/react'
import { useStore } from 'statery'





// Local imports
import styles from './GameDialog.module.scss'

import { allowCurrentCharacter } from '../../store/reducers/allowCurrentCharacter.js'
import { Button } from '../Button/Button.jsx'
import { getCurrentCharacter } from '../../store/reducers/getCurrentCharacter.js'
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
	const callRef = useRef(null)

	const [dialogContent, setDialogContent] = useState([])

	const [dialogMachine, send] = useMachine(currentCharacter.dialogMachine)

	const dialogMachineMetaKey = `${dialogMachine.machine.id}.${dialogMachine.value}`

	const dialogMachineMeta = dialogMachine.meta[dialogMachineMetaKey]

	const handleAllowClick = useCallback(() => allowCurrentCharacter(), [])
	const handleContinueClick = useCallback(() => goToNextCharacter(), [])
	const handleDenyClick = useCallback(() => goToNextCharacter(), [])

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
								<strong>{line.author}</strong>
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
		const responses = []

		if (dialogMachineMeta.response) {
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

		if (dialogMachine.done) {
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
