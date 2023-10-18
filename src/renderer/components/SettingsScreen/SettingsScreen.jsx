// Local imports
import styles from './SettingsScreen.module.scss'

import { Button } from '../Button/Button.jsx'
import { goToTitle } from '../../store/reducers/goToTitle.js'
import { Heading } from '../Heading/Heading.jsx'
import { Screen } from '../Screen/Screen.jsx'
import { useLoopingTrack } from '../../hooks/useLoopingTrack.js'
import { Vignette } from '../Vignette/Vignette.jsx'





/**
 * Renders the title screen.
 *
 * @component
 */
export function SettingsScreen() {
	useLoopingTrack('title')

	return (
		<Screen className={styles['settings-screen']}>
			<header className={styles['header']}>
				<Heading
					className={styles['title']}
					level={1}>
					{'Settings'}
				</Heading>
			</header>

			<Button
				className={styles['back-button']}
				onClick={goToTitle}>
				{'Back'}
			</Button>

			<Vignette />
		</Screen>
	)
}
