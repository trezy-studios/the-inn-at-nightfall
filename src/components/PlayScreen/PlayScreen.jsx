// Module imports
import {
	useMemo,
	useRef,
} from 'react'
import classnames from 'classnames'
import { Stage } from '@pixi/react'
import { useStore } from 'statery'





// Local imports
import styles from './PlayScreen.module.scss'

import { Debugger } from '../Debugger/Debugger.jsx'
import { Game } from '../Game/Game.jsx'
import { GameDialog } from '../GameDialog/GameDialog.jsx'
import { RoundScore } from '../RoundScore/RoundScore.jsx'
import { Screen } from '../Screen/Screen.jsx'
import { store } from '../../store/store.js'
import { useDebugMode } from '../../hooks/useDebugMode.js'
import { useLoopingTrack } from '../../hooks/useLoopingTrack.js'
import { Vignette } from '../Vignette/Vignette.jsx'





/**
 * Renders the play screen.
 *
 * @component
 */
export function PlayScreen() {
	const { isDebugModeEnabled } = useDebugMode()
	const { isRoundOver } = useStore(store)
	const gameWrapperRef = useRef(null)

	useLoopingTrack('nightfall')

	const compiledClassName = useMemo(() => classnames({
		[styles['play-screen']]: true,
		[styles['debugger-enabled']]: isDebugModeEnabled,
	}), [isDebugModeEnabled])

	return (
		<Screen className={compiledClassName}>
			<div
				ref={gameWrapperRef}
				className={styles['stage-wrapper']}>
				<Stage>
					<Game resizeToRef={gameWrapperRef} />
				</Stage>

				<Vignette />
			</div>

			<GameDialog />

			<Debugger />

			{isRoundOver && (
				<RoundScore />
			)}

		</Screen>
	)
}
