// Module imports
import { useStore } from 'statery'





// Local imports
import styles from './CurrentGameStats.module.scss'

import { store } from '../../store/store.js'





/**
 * Renders the player's current wallet value.
 *
 * @component
 */
export function CurrentGameStats() {
	const {
		allowedCharacters,
		currentGuests,
		isRoundOver,
		wallet,
	} = useStore(store)

	return (
		<div className={styles['current-game-stats']}>
			<table>
				<tbody>
					<tr>
						<th>{'Guests:'}</th>
						<td>
							{!isRoundOver && (currentGuests.length + allowedCharacters.length)}
							{isRoundOver && currentGuests.length}
						</td>
					</tr>

					<tr>
						<th>{'Wallet:'}</th>
						<td>{`£${wallet}`}</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}
