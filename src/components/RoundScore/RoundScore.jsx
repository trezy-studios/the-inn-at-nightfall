// Module imports
import { useStore } from 'statery'





// Local imports
import styles from './RoundScore.module.scss'

import { MenuButton } from '../MenuButton/MenuButton.jsx'
import { startRound } from '../../store/reducers/startRound.js'
import { store } from '../../store/store.js'
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

				<MenuButton onClick={startRound}>
					{'Next Round'}
				</MenuButton>
			</div>
		</div>
	)
}
