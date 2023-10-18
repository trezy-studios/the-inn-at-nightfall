// Module imports
import { useStore } from 'statery'





// Local imports
import styles from './RoundScore.module.scss'

import { Heading } from '../Heading/Heading.jsx'
import { MenuButton } from '../MenuButton/MenuButton.jsx'
import { quitGame } from '../../store/reducers/quitGame.js'
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
		failed,
		totalGuestsAllowed,
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
		<div className={styles['round-score-backdrop']}>
			<div className={styles['round-score-wrapper']}>
				{failed && (
					<div className={styles['failure-message']}>
						<Heading level={1}>
							{'Game Over'}
						</Heading>

						<p>{'Darkness sweeps over the inn as an unnatural silence descends.'}</p>
						<p>{'You realize, too late, that you\'ve allowed a creature of the night to cross the threshold.'}</p>
						<p>{'The safety of the inn and its guests is compromised.'}</p>
					</div>
				)}

				<div className={styles['round-score']}>
					{failed && (
						<>
							<header>
								<Heading level={2}>
									{'Final Score'}
								</Heading>
							</header>

							<table>
								<tbody>
									<tr>
										<th>{'Total Guests:'}</th>

										<td>
											{totalGuestsAllowed}
										</td>
									</tr>

									<tr>
										<th>{'Vampires Allowed:'}</th>

										<td>
											{vampiresAllowedCount}
										</td>
									</tr>

									<tr>
										<th>{'Final Balance:'}</th>

										<td>
											{`$${wallet}`}
										</td>
									</tr>
								</tbody>
							</table>
						</>
					)}

					{!failed && (
						<>
							<header>
								<Heading level={2}>
									{'Round Score'}
								</Heading>
							</header>

							<table>
								<tbody>
									<tr>
										<th>{'Total Guests:'}</th>

										<td>
											{totalGuestsAllowed}
										</td>
									</tr>

									<tr>
										<th>{'New Guests This Round:'}</th>

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
											{`$${wallet}`}
										</td>
									</tr>
								</tbody>
							</table>
						</>
					)}
				</div>

				<ul className={styles['options']}>
					{!failed && (
						<li className={styles['option']}>
							<MenuButton onClick={startRound}>
								{'Next Round'}
							</MenuButton>
						</li>
					)}

					<li className={styles['option']}>
						<MenuButton onClick={quitGame}>
							{'Return to Main Menu'}
						</MenuButton>
					</li>
				</ul>
			</div>
		</div>
	)
}
