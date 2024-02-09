// Module imports
import { useEffect } from 'react'
import { useStore } from 'statery'





// Local imports
import styles from './LoadingScreen.module.scss'

import { LoadingProgress } from '../LoadingProgress/LoadingProgress.jsx'
import { Screen } from '../Screen/Screen.jsx'
import { SCREENS } from '../../data/SCREENS.js'
import { store } from '../../store/store.js'
import { Vignette } from '../Vignette/Vignette.jsx'





/**
 * Renders the loading screen.
 *
 * @component
 */
export function LoadingScreen() {
	const { isDoneLoadingCriticalAssets } = useStore(store)

	useEffect(() => {
		if (isDoneLoadingCriticalAssets) {
			store.set(() => ({ screen: SCREENS.TITLE }))
		}
	}, [isDoneLoadingCriticalAssets])

	return (
		<Screen className={styles['loading']}>
			<LoadingProgress className={styles['loading-progress']} />

			<Vignette />
		</Screen>
	)
}
