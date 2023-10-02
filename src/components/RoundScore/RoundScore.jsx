// Module imports
import { useStore } from 'statery'





// Local imports
import { store } from '../../store/store.js'
import styles from './RoundScore.module.scss'
import { useMemo } from 'react'





/**
 * Renders the score screen for a round.
 *
 * @component
 */
export function RoundScore() {
	const {
		allowedCharacters,
		characters,
		wallet,
	} = useStore(store)

	const humansAllowedCount = useMemo(() => {
		return allowedCharacters
			.filter(characterID => !characters[characterID].isVampire)
			.length
	}, [
		allowedCharacters,
		characters,
	])

	const vampiresAllowedCount = useMemo(() => {
		return allowedCharacters
			.filter(characterID => characters[characterID].isVampire)
			.length
	}, [
		allowedCharacters,
		characters,
	])

	return (
		<div className={styles['round-score-wrapper']}>
			<div className={styles['round-score']}>
				<table>
					<tbody>
						<tr>
							<th>{'New Guests:'}</th>

							<td>
								{humansAllowedCount}
							</td>
						</tr>

						<tr>
							<th>{'Vampires Allowed:'}</th>

							<td>
								{vampiresAllowedCount}
							</td>
						</tr>

						<tr>
							<th>{'New Balance:'}</th>

							<td>
								{wallet}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	)
}
