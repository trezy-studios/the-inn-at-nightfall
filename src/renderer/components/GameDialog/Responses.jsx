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
		isDone,
		options,
		sendNext,
	} = useDialogMachine()

	const handleAllowClick = useCallback(() => allowCurrentCharacter(), [])
	const handleContinueClick = useCallback(() => sendNext(), [sendNext])
	const handleDenyClick = useCallback(() => goToNextCharacter(), [])

	const renderedResponses = useMemo(() => {
		const responses = []

		if (!options) {
			if (!isDone) {
				responses.push((
					<Response
						key={'continue'}
						onClick={handleContinueClick}>
						{'Continue'}
					</Response>
				))
			}
		} else {
			options.forEach(option => {
				responses.push((
					<Response
						key={option.id}
						onClick={option.handleSelect}>
						{option.body}
					</Response>
				))
			})
		}

		if (!currentCharacter.isMerchant) {
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

		return responses
	}, [
		currentCharacter,
		handleAllowClick,
		handleContinueClick,
		handleDenyClick,
		isDone,
		options,
	])

	return (
		<ol className={styles['responses']}>
			<AnimatePresence>
				{renderedResponses}
			</AnimatePresence>
		</ol>
	)
}
