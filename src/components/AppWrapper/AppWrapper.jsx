// Module imports
import { AnimatePresence } from 'framer-motion'
import { useStore } from 'statery'





// Local imports
import styles from './AppWrapper.module.scss'

import { AudioContextProvider } from '../AudioContext/AudioContext.jsx'
import { CreditsScreen } from '../CreditsScreen/CreditsScreen.jsx'
import { FilmGrain } from '../FilmGrain/FilmGrain.jsx'
import { LoadingScreen } from '../LoadingScreen/LoadingScreen.jsx'
import { PlayScreen } from '../PlayScreen/PlayScreen.jsx'
import { SCREENS } from '../../data/SCREENS.js'
import { SettingsScreen } from '../SettingsScreen/SettingsScreen.jsx'
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
		<AudioContextProvider>
			<AnimatePresence>
				<div className={styles['app-wrapper']}>
					{(screen === SCREENS.CREDITS) && (
						<CreditsScreen />
					)}

					{(screen === SCREENS.LOADING) && (
						<LoadingScreen />
					)}

					{(screen === SCREENS.PLAY) && (
						<PlayScreen />
					)}

					{(screen === SCREENS.SETTINGS) && (
						<SettingsScreen />
					)}

					{(screen === SCREENS.TITLE) && (
						<TitleScreen />
					)}
				</div>
			</AnimatePresence>

			<FilmGrain />
		</AudioContextProvider>
	)
}
