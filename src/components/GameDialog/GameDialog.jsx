// Module imports
import { faker } from '@faker-js/faker'
import { useMemo } from 'react'
import { useStore } from 'statery'





// Local imports
import styles from './GameDialog.module.scss'

import { Button } from '../Button/Button.jsx'
import { store } from '../../store/store.js'





/**
 * Renders the game dialogs.
 *
 * @component
 */
export function GameDialog() {
	const {
		characters,
		characterQueue,
		characterQueueIndex,
	} = useStore(store)

	const currentCharacter = useMemo(() => {
		const index = characterQueue[characterQueueIndex]

		return characters[index]
	}, [
		characters,
		characterQueue,
		characterQueueIndex,
	])

	const dialogContent = useMemo(() => ({
		message: faker.lorem.sentences({
			max: 3,
			min: 1,
		}),
		responses: [
			faker.lorem.sentences(1),
			faker.lorem.sentences(1),
			faker.lorem.sentences(1),
		],
	}), [])

	return (
		<div className={styles['game-dialog']}>
			<div className={styles['call']}>
				<header>
					{`${currentCharacter.name} says...`}
				</header>

				<blockquote>
					<p>{dialogContent.message}</p>
				</blockquote>
			</div>

			<div className={styles['response']}>
				<header>
					{'How would you like to respond?'}
				</header>

				<ol className={styles['options']}>
					{dialogContent.responses.map((response, index) => {
						return (
							<li key={index}>
								{/* eslint-disable-next-line react-perf/jsx-no-new-function-as-prop */}
								<Button onClick={() => {}}>
									{response}
								</Button>
							</li>
						)
					})}
				</ol>
			</div>
		</div>
	)
}
