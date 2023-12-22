// Module imports
import { useEffect } from 'react'





// Local imports
import styles from './LoadingScreen.module.scss'

import { enableDebugging } from 'yarn-spinner-xstate'
import { LoadingProgress } from '../LoadingProgress/LoadingProgress.jsx'
import { Screen } from '../Screen/Screen.jsx'
import { SCREENS } from '../../data/SCREENS.js'
import { store } from '../../store/store.js'
import { useLoadAssets } from '../../hooks/useLoadAssets.js'
import { Vignette } from '../Vignette/Vignette.jsx'





/**
 * Renders the loading screen.
 *
 * @component
 */
export function LoadingScreen() {
	useLoadAssets('critical', {
		// eslint-disable-next-line jsdoc/require-jsdoc
		onDone: () => store.set(() => ({ screen: SCREENS.TITLE })),
	})

	useEffect(() => {
		enableDebugging()
	}, [])

	return (
		<Screen className={styles['loading']}>
			<LoadingProgress className={styles['loading-progress']} />

			<Vignette />
		</Screen>
	)
}
