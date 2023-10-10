// Module imports
import {
	useCallback,
	useMemo,
} from 'react'
import { AnimatePresence } from 'framer-motion'





// Local imports
import styles from './GameDialog.module.scss'

import { allowCurrentCharacter } from '../../store/reducers/allowCurrentCharacter.js'
import { goToNextCharacter } from '../../store/reducers/goToNextCharacter.js'
import { Response } from './Response.jsx'
import { useCharacter } from '../../hooks/useCharacter.js'
import { useDialogMachine } from '../../hooks/useDialogMachine.js'





/**
 * Renders the game dialogs.
 *
 * @component
 */
export function Responses() {
	const currentCharacter = useCharacter()

	const {
		dialogMachine,
		dialogMeta,
		sendDialogEvent,
	} = useDialogMachine()

	const handleAllowClick = useCallback(() => allowCurrentCharacter(), [])
	const handleContinueClick = useCallback(() => goToNextCharacter(), [])
	const handleDenyClick = useCallback(() => goToNextCharacter(), [])

	const renderedResponses = useMemo(() => {
		const responses = []

		if (dialogMeta?.response) {
			dialogMeta
				.response
				.filter(response => dialogMachine.can(response.transitionID))
				.forEach(response => {
					responses.push((
						<Response
							key={response.transitionID}
							// eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
							onClick={() => sendDialogEvent(response.transitionID)}>
							{response.message}
						</Response>
					))
				})
		}

		if (!dialogMachine || dialogMachine?.done) {
			if (currentCharacter.isMerchant) {
				responses.push((
					<Response
						key={'continue'}
						onClick={handleContinueClick}>
						{'Continue'}
					</Response>
				))
			} else {
				responses.push((
					<Response
						key={'allow'}
						onClick={handleAllowClick}>
						{'Allow'}
					</Response>
				))

				responses.push((
					<Response
						key={'deny'}
						onClick={handleDenyClick}>
						{'Deny'}
					</Response>
				))
			}
		}

		return responses
	}, [
		currentCharacter,
		dialogMachine,
		dialogMeta,
		handleAllowClick,
		handleContinueClick,
		handleDenyClick,
		sendDialogEvent,
	])

	return (
		<div className={styles['response']}>
			<ol className={styles['options']}>
				<AnimatePresence>
					{renderedResponses}
				</AnimatePresence>
			</ol>
		</div>
	)
}
