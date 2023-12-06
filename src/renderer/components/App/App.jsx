// Module imports
import { AnimatePresence } from 'framer-motion'
import { useStore } from 'statery'





// Local imports
import styles from './App.module.scss'

import { AudioContextProvider } from '../AudioContext/AudioContext.jsx'
import { CreditsScreen } from '../CreditsScreen/CreditsScreen.jsx'
import { FilmGrain } from '../FilmGrain/FilmGrain.jsx'
import { LoadingScreen } from '../LoadingScreen/LoadingScreen.jsx'
import { PlayScreen } from '../PlayScreen/PlayScreen.jsx'
import { RoundLoadingScreen } from '../RoundLoadingScreen/RoundLoadingScreen.jsx'
import { SCREENS } from '../../data/SCREENS.js'
import { SettingsScreen } from '../SettingsScreen/SettingsScreen.jsx'
import { store } from '../../store/store.js'
import { TitleScreen } from '../TitleScreen/TitleScreen.jsx'





/**
 * Renders the game.
 *
 * @component
 */
export function App() {
	const {
		enableFilmGrain,
		screen,
	} = useStore(store)

	return (
		<AudioContextProvider>
			<AnimatePresence>
				<div className={styles['app']}>
					{(screen === SCREENS.CREDITS) && (
						<CreditsScreen />
					)}

					{(screen === SCREENS.LOAD_ROUND) && (
						<RoundLoadingScreen />
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

			{enableFilmGrain && (
				<FilmGrain />
			)}
		</AudioContextProvider>
	)
}
