// Module imports
import {
	useCallback,
	useMemo,
} from 'react'
import { useStore } from 'statery'





// Local imports
import styles from './GameDialog.module.scss'

import { allowCurrentCharacter } from '../../store/reducers/allowCurrentCharacter.js'
import { Button } from '../Button/Button.jsx'
import { goToNextCharacter } from '../../store/reducers/goToNextCharacter.js'
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

	const { options } = useDialogMachine({ autoadvanceDelay: dialogDelay })

	const handleAllowClick = useCallback(() => allowCurrentCharacter(), [])
	const handleDenyClick = useCallback(() => goToNextCharacter(true), [])

	const renderedResponses = useMemo(() => {
		const responses = []

		if (options) {
			options.forEach(option => {
				responses.push((
					<Button
						key={option.id}
						className={styles['button']}
						onClick={option.handleSelect}>
						{option.body}
					</Button>
				))
			})
		}

		return responses
	}, [options])

	return (
		<div className={styles['responses-wrapper']}>
			<div className={styles['responses']}>
				{renderedResponses}
			</div>

			{(!currentCharacter.isMerchant) && (
				<>
					<Button
						key={'allow'}
						className={styles['button']}
						onClick={handleAllowClick}>
						{'Allow'}
					</Button>

					<Button
						key={'deny'}
						className={styles['button']}
						onClick={handleDenyClick}>
						{'Deny'}
					</Button>
				</>
			)}
		</div>
	)
}
