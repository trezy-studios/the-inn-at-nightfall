// Module imports
import { useStore } from 'statery'





// Local imports
import styles from './AppWrapper.module.scss'

import { LoadingScreen } from '../LoadingScreen/LoadingScreen.jsx'
import { PlayScreen } from '../PlayScreen/PlayScreen.jsx'
import { SCREENS } from '../../data/SCREENS.js'
import { store } from '../../store/store.js'
import { TitleScreen } from '../TitleScreen/TitleScreen.jsx'





/**
 * Renders the game.
 *
 * @component
 */
export function AppWrapper() {
	const { screen } = useStore(store)

	return (
		<div className={styles['app-wrapper']}>
			{(screen === SCREENS.LOADING) && (
				<LoadingScreen />
			)}

			{(screen === SCREENS.PLAY) && (
				<PlayScreen />
			)}

			{(screen === SCREENS.TITLE) && (
				<TitleScreen />
			)}
		</div>
	)
}
