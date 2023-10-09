// Module imports
import { useRef } from 'react'





// Local imports
import styles from './TitleScreen.module.scss'

import { goToCredits } from '../../store/reducers/goToCredits.js'
import { Heading } from '../Heading/Heading.jsx'
import { MenuButton } from '../MenuButton/MenuButton.jsx'
import { startRound } from '../../store/reducers/startRound.js'
import { useLoopingTrack } from '../../hooks/useLoopingTrack.js'
import { Vignette } from '../Vignette/Vignette.jsx'





/**
 * Renders the title screen.
 *
 * @component
 */
export function TitleScreen() {
	const screenWrapperRef = useRef(null)

	useLoopingTrack('title')

	return (
		<>
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
					<MenuButton onClick={startRound}>
						{'Play'}
					</MenuButton>

					<MenuButton onClick={startRound}>
						{'Settings'}
					</MenuButton>

					<MenuButton onClick={goToCredits}>
						{'Credits'}
					</MenuButton>
				</div>
			</div>

			<Vignette />
		</>
	)
}
