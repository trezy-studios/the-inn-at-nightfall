// Module imports
import { useStore } from 'statery'





// Local imports
import styles from './GameClock.module.scss'

import { store } from '../../store/store.js'





/**
 * Renders the game clock.
 *
 * @component
 */
export function GameClock() {
	const { timeRemaining } = useStore(store)

	const minutesRemaining = Math.floor((timeRemaining / 1000) / 60)
	const secondsRemaining = Math.floor((timeRemaining - ((minutesRemaining * 60) * 1000)) / 1000)

	return (
		<div className={styles['game-clock']}>
			<time>{minutesRemaining}</time>
			{':'}
			<time>{String(secondsRemaining).padStart(2, '0')}</time>
		</div>
	)
}
