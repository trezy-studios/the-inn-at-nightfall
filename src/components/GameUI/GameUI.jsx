// Module imports
import { useStore } from 'statery'





// Local imports
import styles from './GameUI.module.scss'

import { Debugger } from '../Debugger/Debugger.jsx'
import { GameClock } from '../GameClock/GameClock.jsx'
import { GameDialog } from '../GameDialog/GameDialog.jsx'
import { GameMenu } from '../GameMenu/GameMenu.jsx'
import { store } from '../../store/store.js'





/**
 * Renders all game UI.
 *
 * @component
 */
export function GameUI() {
	const { isInitialized } = useStore(store)

	if (!isInitialized) {
		return null
	}

	return (
		<div className={styles['game-ui-wrapper']}>
			<Debugger />

			<GameMenu />

			<GameDialog />

			<GameClock />
		</div>
	)
}
