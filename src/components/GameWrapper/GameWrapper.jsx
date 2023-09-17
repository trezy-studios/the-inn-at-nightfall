// Module imports
import { Stage } from '@pixi/react'
import { useRef } from 'react'





// Local imports
import { Game } from '../Game/Game.jsx'
import { GameUI } from '../GameUI/GameUI.jsx'

import styles from './GameWrapper.module.scss'





/**
 * Renders the game.
 *
 * @component
 */
export function GameWrapper() {
	const gameWrapperRef = useRef(null)

	return (
		<div
			ref={gameWrapperRef}
			className={styles['game-wrapper']}>
			<Stage>
				<Game resizeToRef={gameWrapperRef} />
			</Stage>

			<GameUI />
		</div>
	)
}
