// Module imports
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useStore } from 'statery'





// Local imports
import styles from './RoundLoadingScreen.module.scss'

import { Heading } from '../Heading/Heading.jsx'
import { LoadingProgress } from '../LoadingProgress/LoadingProgress.jsx'
import { Menu } from '../Menu/Menu.jsx'
import { MenuButton } from '../MenuButton/MenuButton.jsx'
import { Screen } from '../Screen/Screen.jsx'
import { startRound } from '../../store/reducers/startRound.js'
import { store } from '../../store/store.js'
import { useLoadAssets } from '../../hooks/useLoadAssets.js'
import { Vignette } from '../Vignette/Vignette.jsx'





// Constants
const BLOCKQUOTE_VARIANTS = {
	initial: { opacity: 0 },
	animate: {
		opacity: 1,
		transition: {
			delayChildren: 1,
			staggerChildren: 0.75,
		},
	},
}
const BLOCKQUOTE_LINE_VARIANTS = {
	initial: {
		opacity: 0,
		y: '2rem',
	},
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 1,
		},
	},
}
const HEADING_VARIANTS = {
	initial: {
		opacity: 0,
		scale: 2,
	},
	animate: {
		opacity: 1,
		scale: 1,
		transition: {
			bounce: 0.1,
			duration: 1.5,
			type: 'spring',
		},
	},
}
const MENU_VARIANTS = {
	initial: {
		opacity: 0,
		y: '5rem',
	},
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 1,
		},
	},
}





/**
 * Renders the loading screen for loading assets before starting a round.
 *
 * @component
 */
export function RoundLoadingScreen() {
	const { currentRound } = useStore(store)

	const [isDoneLoading, setIsDoneLoading] = useState(false)

	useLoadAssets([
		'demo',
		// #v-ifdef NODE_ENV !== 'demo'
			'base',
		// #v-endif
	], {
		// eslint-disable-next-line jsdoc/require-jsdoc
		onDone: () => setIsDoneLoading(true),
	})

	return (
		<Screen className={styles['round-loading-screen']}>
			<Heading
				level={1}
				variants={HEADING_VARIANTS}>
				{`Day ${currentRound + 1}`}
			</Heading>

			<motion.blockquote
				animate={'animate'}
				initial={'initial'}
				variants={BLOCKQUOTE_VARIANTS}>
				<motion.span variants={BLOCKQUOTE_LINE_VARIANTS}>
					{'Dawn breaks over Nightvale\'s realm'}
				</motion.span>

				<motion.span variants={BLOCKQUOTE_LINE_VARIANTS}>
					{'Chasing shadows, a sunlit helm'}
				</motion.span>

				<motion.span variants={BLOCKQUOTE_LINE_VARIANTS}>
					{'Daylight brings its tranquil balm'}
				</motion.span>

				<motion.span variants={BLOCKQUOTE_LINE_VARIANTS}>
					{'In its light, the dangers calm.'}
				</motion.span>
			</motion.blockquote>

			{isDoneLoading && (
				<Menu
					className={styles['start-menu']}
					variants={MENU_VARIANTS}>
					<MenuButton
						key={'start-button'}
						isDisabled={!isDoneLoading}
						onClick={startRound}>
						{'Start'}
					</MenuButton>
				</Menu>
			)}

			<LoadingProgress className={styles['round-loading-progress']} />

			<Vignette />
		</Screen>
	)
}
