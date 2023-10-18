// Local imports
import styles from './TitleScreen.module.scss'

import { goToCredits } from '../../store/reducers/goToCredits.js'
import { goToSettings } from '../../store/reducers/goToSettings.js'
import { Heading } from '../Heading/Heading.jsx'
import { MenuButton } from '../MenuButton/MenuButton.jsx'
import { Screen } from '../Screen/Screen.jsx'
import { startRound } from '../../store/reducers/startRound.js'
import { useLoopingTrack } from '../../hooks/useLoopingTrack.js'
import { Vignette } from '../Vignette/Vignette.jsx'





/**
 * Renders the title screen.
 *
 * @component
 */
export function TitleScreen() {
	useLoopingTrack('title')

	return (
		<Screen className={styles['title-screen']}>
			<header className={styles['header']}>
				<Heading
					className={styles['title']}
					level={1}>
					{'The Inn at'}<br />
					{'Nightfall'}
				</Heading>
			</header>

			<div className={styles['menu']}>
				<MenuButton onClick={startRound}>
					{'Play'}
				</MenuButton>

				<MenuButton onClick={goToSettings}>
					{'Settings'}
				</MenuButton>

				<MenuButton onClick={goToCredits}>
					{'Credits'}
				</MenuButton>
			</div>

			<Vignette />
		</Screen>
	)
}
