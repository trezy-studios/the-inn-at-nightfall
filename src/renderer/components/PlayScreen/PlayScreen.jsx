// Module imports
import {
	useCallback,
	useEffect,
	useRef,
} from 'react'
import { AnimatePresence } from 'framer-motion'
import { useStore } from 'statery'





// Local imports
import styles from './PlayScreen.module.scss'

import { AudioLibrary } from '../../game/structures/AudioLibrary.js'
import { CurrentGameStats } from '../CurrentGameStats/CurrentGameStats.jsx'
import { Game } from '../Game/Game.jsx'
import { GameDialog } from '../GameDialog/GameDialog.jsx'
import { GameNotifications } from '../GameNotifications/GameNotifications.jsx'
import { pauseGame } from '../../store/reducers/pauseGame.js'
import { PauseScreen } from '../PauseScreen/PauseScreen.jsx'
import { PixiStage } from '../PixiStage/PixiStage.jsx'
import { resumeGame } from '../../store/reducers/resumeGame.js'
import { RoundScore } from '../RoundScore/RoundScore.jsx'
import { Screen } from '../Screen/Screen.jsx'
import { store } from '../../store/store.js'
import { Vignette } from '../Vignette/Vignette.jsx'





/**
 * Renders the play screen.
 *
 * @component
 */
export function PlayScreen() {
	const {
		isPaused,
		isRoundOver,
	} = useStore(store)

	const gameWrapperRef = useRef(null)

	const handleEscapeKeyPress = useCallback(event => {
		if (event.code === 'Escape') {
			if (isPaused) {
				resumeGame()
			} else {
				pauseGame()
			}
		}
	}, [isPaused])

	useEffect(() => {
		window.addEventListener('keyup', handleEscapeKeyPress)

		return () => {
			window.removeEventListener('keyup', handleEscapeKeyPress)
		}
	}, [handleEscapeKeyPress])

	useEffect(() => {
		AudioLibrary.stopAllMusic()
	}, [])

	return (
		<Screen className={styles['play-screen']}>
			<div
				ref={gameWrapperRef}
				className={styles['stage-wrapper']}>
				<PixiStage>
					<Game resizeToRef={gameWrapperRef} />
				</PixiStage>

				<CurrentGameStats />

				<GameNotifications />

				<Vignette />
			</div>

			<GameDialog />

			<AnimatePresence>
				{isRoundOver && (
					<RoundScore key={'round-score'} />
				)}

				{isPaused && (
					<PauseScreen key={'pause-screen'} />
				)}
			</AnimatePresence>
		</Screen>
	)
}
