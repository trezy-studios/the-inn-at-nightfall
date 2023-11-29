// Module imports
import { useStore } from 'statery'





// Local imports
import styles from './RoundScore.module.scss'

import { Heading } from '../Heading/Heading.jsx'
import { MenuButton } from '../MenuButton/MenuButton.jsx'
import { Paragraph } from '../Paragraph/Paragraph.jsx'
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

	return (
		<div className={styles['round-score-backdrop']}>
			<div className={styles['round-score-wrapper']}>
				{!failed && (
					<div className={styles['round-score']}>
						<Heading level={2}>
							{'Ho-hum! The night has come and our day is done!'}
						</Heading>

						<Paragraph>{'Rest easy, for all is well this evening.'}</Paragraph>
						<Paragraph><strong>{humansAllowedCount}</strong>{' guests are relaxing by the fire, enjoying their drink and the company.'}</Paragraph>
						<Paragraph>{'You have earned '}<strong>{`£${wallet}`}</strong>{' for the day\'s work.'}</Paragraph>

						<div className={styles['options']}>
							<MenuButton onClick={quitGame}>
								{'Menu'}
							</MenuButton>

							<MenuButton onClick={startRound}>
								{'Continue'}
							</MenuButton>
						</div>
					</div>
				)}

				{failed && (
					<div className={styles['round-score']}>
						<Heading level={2}>
							{'Nightfall brings the cold kiss of death'}
						</Heading>

						<Paragraph>
							{'Dearly departed, you have invited the evil to enter your inn.'}<br/>
							{'The sun no longer rises for you and your guests.'}
						</Paragraph>

						<MenuButton onClick={quitGame}>
							{'Return to Main Menu'}
						</MenuButton>
					</div>
				)}
			</div>
		</div>
	)
}
