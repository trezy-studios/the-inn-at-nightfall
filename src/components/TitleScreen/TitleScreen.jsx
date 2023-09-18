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
import { SCREENS } from '../../data/SCREENS.js'
import { store } from '../../store/store.js'





// Functions
/**
 * updates the game state when the play button is clicked.
 */
function handlePlayClick() {
	store.set(() => ({ screen: SCREENS.PLAY }))
}





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
					onClick={handlePlayClick}>
					{'Play'}
				</MenuButton>

				<MenuButton
					align={ALIGNMENT.LEFT}
					onClick={handlePlayClick}>
					{'Settings'}
				</MenuButton>

				<MenuButton
					align={ALIGNMENT.LEFT}
					onClick={handlePlayClick}>
					{'Credits'}
				</MenuButton>
			</div>
		</div>
	)
}
