// Module imports
import {
	useCallback,
	useEffect,
	useMemo,
	useRef,
} from 'react'
import { AnimatePresence } from 'framer-motion'
import classnames from 'classnames'
import { useStore } from 'statery'





// Local imports
import styles from './PlayScreen.module.scss'

import { Debugger } from '../Debugger/Debugger.jsx'
import { Game } from '../Game/Game.jsx'
import { GameDialog } from '../GameDialog/GameDialog.jsx'
import { pauseGame } from '../../store/reducers/pauseGame.js'
import { PauseScreen } from '../PauseScreen/PauseScreen.jsx'
import { PixiStage } from '../PixiStage/PixiStage.jsx'
import { resumeGame } from '../../store/reducers/resumeGame.js'
import { RoundScore } from '../RoundScore/RoundScore.jsx'
import { Screen } from '../Screen/Screen.jsx'
import { store } from '../../store/store.js'
import { useDebugMode } from '../../hooks/useDebugMode.js'
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

	const { isDebugModeEnabled } = useDebugMode()
	const gameWrapperRef = useRef(null)

	const compiledClassName = useMemo(() => classnames({
		[styles['play-screen']]: true,
		[styles['debugger-enabled']]: isDebugModeEnabled,
	}), [isDebugModeEnabled])

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

	return (
		<Screen className={compiledClassName}>
			<div
				ref={gameWrapperRef}
				className={styles['stage-wrapper']}>
				<PixiStage>
					<Game resizeToRef={gameWrapperRef} />
				</PixiStage>

				<Vignette />
			</div>

			<GameDialog />

			<Debugger />

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
