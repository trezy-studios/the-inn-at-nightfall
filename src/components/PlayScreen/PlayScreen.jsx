// Module imports
import { Stage } from '@pixi/react'
import { useRef } from 'react'





// Local imports
import styles from './PlayScreen.module.scss'

import { Game } from '../Game/Game.jsx'
import { GameUI } from '../GameUI/GameUI.jsx'





/**
 * Renders the play screen.
 *
 * @component
 */
export function PlayScreen() {
	const gameWrapperRef = useRef(null)

	return (
		<div
			ref={gameWrapperRef}
			className={styles['play-screen']}>
			<Stage>
				<Game resizeToRef={gameWrapperRef} />
			</Stage>

			<GameUI />
		</div>
	)
}
