// Module imports
import { useCallback } from 'react'





// Local imports
import styles from './TitleMenu.module.scss'

import { goToCredits } from '../../store/reducers/goToCredits.js'
import { goToSettings } from '../../store/reducers/goToSettings.js'
import { Menu } from '../Menu/Menu.jsx'
import { MenuButton } from '../MenuButton/MenuButton.jsx'
import { SCREENS } from '../../data/SCREENS.js'
import { store } from '../../store/store.js'





/**
 * Renders the title screen.
 *
 * @component
 */
export function TitleMenu() {
	const loadRound = useCallback(() => {
		store.set(() => ({
			screen: SCREENS.LOAD_ROUND,
		}))
	}, [])

	return (
		<Menu className={styles['title-menu']}>
			<MenuButton onClick={loadRound}>
				{'Play'}
			</MenuButton>

			<MenuButton onClick={goToSettings}>
				{'Settings'}
			</MenuButton>

			<MenuButton onClick={goToCredits}>
				{'Credits'}
			</MenuButton>
		</Menu>
	)
}
