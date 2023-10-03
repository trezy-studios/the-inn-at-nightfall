// Module imports
import { useRef } from 'react'





// Local imports
import styles from './TitleScreen.module.scss'

import {
	ALIGNMENT,
	MenuButton,
} from '../MenuButton/MenuButton.jsx'
import { Heading } from '../Heading/Heading.jsx'
import { startRound } from '../../store/reducers/startRound.js'
import { useLoopingTrack } from '../../hooks/useLoopingTrack.js'





/**
 * Renders the title screen.
 *
 * @component
 */
export function TitleScreen() {
	const screenWrapperRef = useRef(null)

	useLoopingTrack('title')

	return (
		<div
			ref={screenWrapperRef}
			className={styles['title-screen']}>
			<header className={styles['header']}>
				<Heading
					className={styles['title']}
					level={1}>
					{'The Inn at'}<br />
					{'Nightfall'}
				</Heading>
			</header>

			<div className={styles['menu']}>
				<MenuButton
					align={ALIGNMENT.LEFT}
					onClick={startRound}>
					{'Play'}
				</MenuButton>

				<MenuButton
					align={ALIGNMENT.LEFT}
					onClick={startRound}>
					{'Settings'}
				</MenuButton>

				<MenuButton
					align={ALIGNMENT.LEFT}
					onClick={startRound}>
					{'Credits'}
				</MenuButton>
			</div>
		</div>
	)
}
