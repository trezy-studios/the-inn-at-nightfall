// Module imports
import { useStore } from 'statery'





// Local imports
import styles from './RoundScore.module.scss'

import {
	ALIGNMENT,
	MenuButton,
} from '../MenuButton/MenuButton.jsx'
import { Heading } from '../Heading/Heading.jsx'
import { Menu } from '../Menu/Menu.jsx'
import { Modal } from '../Modal/Modal.jsx'
import { Paragraph } from '../Paragraph/Paragraph.jsx'
import { quitGame } from '../../store/reducers/quitGame.js'
import { ROUND_CONFIGS } from '../../data/ROUND_CONFIGS.js'
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
		characters,
		currentGuests,
		currentRound,
		failed,
	} = useStore(store)

	const currentGuestsList = useMemo(() => {
		return currentGuests
			.map((characterID, index) => {
				const character = characters[characterID]
				return (
					<li key={index}>
						{character.name}
					</li>
				)
			})
	}, [
		characters,
		currentGuests,
	])

	const morningDepartureCount = useMemo(() => {
		return ROUND_CONFIGS[currentRound - 1]
			.departure
			.filter(characterID => currentGuests.includes(characterID))
			.length
	}, [
		currentGuests,
		currentRound,
	])

	const morningDeparturesList = useMemo(() => {
		const departureIDs = ROUND_CONFIGS[currentRound - 1].departure

		return departureIDs
			.filter(characterID => currentGuests.includes(characterID))
			.map((characterID, index) => {
				const character = characters[characterID]
				return (
					<li key={index}>
						{character.name}
					</li>
				)
			})
	}, [
		characters,
		currentGuests,
		currentRound,
	])


	return (
		<Modal>
			{!failed && (
				<>
					<Heading level={2}>
						{'Ho-hum! The night has come and our day is done!'}
					</Heading>

					<Paragraph>{'Rest easy, for all is well this evening.'}</Paragraph>
					<Paragraph>
						<strong>{currentGuests.length}</strong>
						{' guests are relaxing by the fire, enjoying their drink and the company.'}
					</Paragraph>

					{(morningDepartureCount > 0) && (
						<Paragraph>
							<strong>{morningDepartureCount}</strong>
							{` guest${(morningDepartureCount > 1) ? 's' : ''} plan${(morningDepartureCount > 1) ? '' : 's'} to depart in the morning.`}
						</Paragraph>
					)}

					{(currentGuests.length > 0) && (
						<Paragraph>
							{'You have earned '}
							<strong>{`£${currentGuests.length * 10}`}</strong>
							{' for the day\'s work.'}
						</Paragraph>
					)}

					<details className={styles['details']}>
						<div className={styles['details-content']}>
							<div className={styles['column']}>
								<header>{'Current Guests'}</header>
								<ul>
									{currentGuestsList}
								</ul>
							</div>

							<div className={styles['column']}>
								<header>{'Departing in the Morning'}</header>
								<ul>
									{morningDeparturesList}
								</ul>
							</div>
						</div>
					</details>

					{(currentRound === 5) && (
						<Paragraph>
							{'You\'ve reached the end of the demo! Thanks for playing!'}
						</Paragraph>
					)}

					<Menu className={styles['options']}>
						<MenuButton onClick={quitGame}>
							{'Menu'}
						</MenuButton>

						{(currentRound < 5) && (
							<MenuButton
								align={ALIGNMENT.RIGHT}
								onClick={startRound}>
								{'Continue'}
							</MenuButton>
						)}
					</Menu>
				</>
			)}

			{failed && (
				<>
					<Heading level={2}>
						{'Nightfall brings the cold kiss of death'}
					</Heading>

					<Paragraph>
						{'Dearly departed, you have invited the evil to enter your inn.'}<br/>
						{'The sun no longer rises for you and your guests.'}
					</Paragraph>

					<Menu>
						<MenuButton onClick={quitGame}>
							{'Return to Main Menu'}
						</MenuButton>
					</Menu>
				</>
			)}
		</Modal>
	)
}
