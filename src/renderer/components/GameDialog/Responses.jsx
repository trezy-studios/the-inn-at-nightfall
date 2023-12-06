// Module imports
import {
	useCallback,
	useMemo,
} from 'react'
import { useStore } from 'statery'





// Local imports
import styles from './GameDialog.module.scss'

import { allowCurrentCharacter } from '../../store/reducers/allowCurrentCharacter.js'
import { goToNextCharacter } from '../../store/reducers/goToNextCharacter.js'
import { Menu } from '../Menu/Menu.jsx'
import { MenuButton } from '../MenuButton/MenuButton.jsx'
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
					<MenuButton
						key={option.id}
						onClick={option.handleSelect}>
						{option.body}
					</MenuButton>
				))
			})
		}

		if (!currentCharacter.isMerchant) {
			responses.push((
				<MenuButton
					key={'allow'}
					onClick={handleAllowClick}>
					{'Allow'}
				</MenuButton>
			))

			responses.push((
				<MenuButton
					key={'deny'}
					onClick={handleDenyClick}>
					{'Deny'}
				</MenuButton>
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
		<Menu className={styles['responses']}>
			{renderedResponses}
		</Menu>
	)
}
