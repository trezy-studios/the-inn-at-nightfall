// Module imports
import { Stage } from '@pixi/react'
import { useRef } from 'react'





// Local imports
import styles from './TitleScreen.module.scss'

import {
	ALIGNMENT,
	MenuButton,
} from '../MenuButton/MenuButton.jsx'
import { Background } from './Background.jsx'
import { Heading } from '../Heading/Heading.jsx'
import { startRound } from '../../store/reducers/startRound.js'





/**
 * Renders the title screen.
 *
 * @component
 */
export function TitleScreen() {
	const screenWrapperRef = useRef(null)

	return (
		<div
			ref={screenWrapperRef}
			className={styles['title-screen']}>
			<Stage>
				<Background resizeToRef={screenWrapperRef} />
			</Stage>

			<header className={styles['header']}>
				<Heading level={1}>
					{'The Inn at the Edge of Nightfall'}
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
