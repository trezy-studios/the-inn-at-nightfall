// Local imports
import styles from './TitleMenu.module.scss'

import { goToCredits } from '../../store/reducers/goToCredits.js'
import { goToSettings } from '../../store/reducers/goToSettings.js'
import { Menu } from '../Menu/Menu.jsx'
import { MenuButton } from '../MenuButton/MenuButton.jsx'
import { startRound } from '../../store/reducers/startRound.js'





/**
 * Renders the title screen.
 *
 * @component
 */
export function TitleMenu() {
	return (
		<Menu className={styles['title-menu']}>
			<MenuButton onClick={startRound}>
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
