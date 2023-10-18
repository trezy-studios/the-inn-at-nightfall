// Module imports
import classnames from 'classnames'
import { useMemo } from 'react'
import { useStore } from 'statery'





// Local imports
import styles from './GameUI.module.scss'

import { Debugger } from '../Debugger/Debugger.jsx'
// import { GameClock } from '../GameClock/GameClock.jsx'
import { GameDialog } from '../GameDialog/GameDialog.jsx'
// import { GameMenu } from '../GameMenu/GameMenu.jsx'
// import { RoundScore } from '../RoundScore/RoundScore.jsx'
import { store } from '../../store/store.js'
import { useDebugMode } from '../../hooks/useDebugMode.js'





/**
 * Renders all game UI.
 *
 * @component
 */
export function GameUI() {
	const { isDebugModeEnabled } = useDebugMode()

	const {
		isInitialized,
		// isRoundOver,
	} = useStore(store)

	const compiledClassName = useMemo(() => {
		return classnames({
			[styles['game-ui-wrapper']]: true,
			[styles['debugger-enabled']]: isDebugModeEnabled,
		})
	}, [isDebugModeEnabled])

	if (!isInitialized) {
		return null
	}

	return (
		<div className={compiledClassName}>
			{/* <GameMenu /> */}

			<GameDialog />

			{/* <GameClock /> */}

			{/* {isRoundOver && (
				<RoundScore />
			)} */}

			<Debugger />
		</div>
	)
}
