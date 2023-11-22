// Module imports
import {
	useCallback,
	useMemo,
} from 'react'
import { AnimatePresence } from 'framer-motion'
import { useStore } from 'statery'





// Local imports
import styles from './GameDialog.module.scss'

import { allowCurrentCharacter } from '../../store/reducers/allowCurrentCharacter.js'
import { goToNextCharacter } from '../../store/reducers/goToNextCharacter.js'
import { Response } from './Response.jsx'
import { store } from '../../store/store.js'
import { useCharacter } from '../../hooks/useCharacter.js'
import { useDialogMachine } from '../../hooks/useDialogMachine.js'





/**
 * Renders the game dialogs.
 *
 * @component
 */
export function Responses() {
	const currentCharacter = useCharacter()

	const { dialogDelay } = useStore(store)

	const { options } = useDialogMachine({
		autoadvanceDelay: dialogDelay * 1000,
	})

	const handleAllowClick = useCallback(() => allowCurrentCharacter(), [])
	const handleDenyClick = useCallback(() => goToNextCharacter(), [])

	const renderedResponses = useMemo(() => {
		const responses = []

		if (options) {
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
		handleDenyClick,
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
