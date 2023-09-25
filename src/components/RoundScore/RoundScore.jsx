// Local imports
import styles from './RoundScore.module.scss'





/**
 * Renders the score screen for a round.
 *
 * @component
 */
export function RoundScore() {
	return (
		<div className={styles['round-score-wrapper']}>
			<div className={styles['round-score']}>
				{'SCORE!'}
			</div>
		</div>
	)
}
