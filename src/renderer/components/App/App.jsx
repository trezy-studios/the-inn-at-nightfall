// Module imports
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { useStore } from 'statery'





// Local imports
import styles from './App.module.scss'

import { AudioContextProvider } from '../AudioContext/AudioContext.jsx'
import { CreditsScreen } from '../CreditsScreen/CreditsScreen.jsx'
import { FilmGrain } from '../FilmGrain/FilmGrain.jsx'
import { Innkeeper } from '../../helpers/Innkeeper.js'
import { LoadingScreen } from '../LoadingScreen/LoadingScreen.jsx'
import { PlayScreen } from '../PlayScreen/PlayScreen.jsx'
import { RoundLoadingScreen } from '../RoundLoadingScreen/RoundLoadingScreen.jsx'
import { SCREENS } from '../../data/SCREENS.js'
import { SettingsScreen } from '../SettingsScreen/SettingsScreen.jsx'
import { store } from '../../store/store.js'
import { TitleCreditsScreen } from '../TitleCreditsScreen/TitleCreditsScreen.jsx'
import { TitleScreen } from '../TitleScreen/TitleScreen.jsx'
import { useLoadAssets } from '../../hooks/useLoadAssets.js'





/**
 * Renders the game.
 *
 * @component
 */
export function App() {
	const {
		enableFilmGrain,
		isDoneLoadingCriticalAssets,
		screen,
	} = useStore(store)

	useLoadAssets(['critical'], {
		// eslint-disable-next-line jsdoc/require-jsdoc
		onDone: () => store.set(() => ({ isDoneLoadingCriticalAssets: true })),
	})

	useEffect(() => {
		if (isDoneLoadingCriticalAssets) {
			store.subscribe(updates => {
				const patch = {}

				if ('dialogDelay' in updates) {
					patch['settings::gameplay::dialogDelay'] = updates.dialogDelay
				}

				if ('enableFilmGrain' in updates) {
					patch['settings::graphics::enableFilmGrain'] = updates.enableFilmGrain
				}

				if ('mainVolume' in updates) {
					patch['settings::sound::mainVolume'] = updates.mainVolume
				}

				if ('musicVolume' in updates) {
					patch['settings::sound::musicVolume'] = updates.musicVolume
				}

				if ('soundEffectsVolume' in updates) {
					patch['settings::sound::soundEffectsVolume'] = updates.soundEffectsVolume
				}

				if (Object.keys(patch).length) {
					Innkeeper.setConfig(patch)
				}
			})
		}
	}, [isDoneLoadingCriticalAssets])

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

					{(screen === SCREENS.TITLE_CREDITS) && (
						<TitleCreditsScreen />
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
