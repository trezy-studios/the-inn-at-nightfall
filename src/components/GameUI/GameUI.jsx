// Module imports
import classnames from 'classnames'
import { useMemo } from 'react'
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
	const {
		isInitialized,
		shouldShowDebugger,
	} = useStore(store)

	const compiledClassName = useMemo(() => {
		return classnames({
			[styles['game-ui-wrapper']]: true,
			[styles['debugger-enabled']]: shouldShowDebugger,
		})
	}, [shouldShowDebugger])

	if (!isInitialized) {
		return null
	}

	return (
		<div className={compiledClassName}>
			<GameMenu />

			<GameDialog />

			<GameClock />

			<Debugger />
		</div>
	)
}
