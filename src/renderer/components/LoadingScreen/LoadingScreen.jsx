// Module imports
import { useLayoutEffect } from 'react'
import { useStore } from 'statery'





// Local imports
import styles from './LoadingScreen.module.scss'

import { loadGameAssets } from '../../game/loadGameAssets.js'
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
	const {
		areAssetsLoaded,
		currentLoadingCategory,
		currentLoadingItem,
		isLoadingAssets,
	} = useStore(store)

	useLayoutEffect(() => {
		if (!areAssetsLoaded && !isLoadingAssets) {
			loadGameAssets()
		}

		if (areAssetsLoaded) {
			store.set(() => ({ screen: SCREENS.TITLE }))
		}
	}, [
		areAssetsLoaded,
		isLoadingAssets,
	])

	return (
		<Screen className={styles['loading']}>
			{!currentLoadingCategory && (
				<p>{'Loading...'}</p>
			)}

			{Boolean(currentLoadingCategory) && (
				<>
					<p>{`Loading ${currentLoadingCategory}...`}</p>

					{Boolean(currentLoadingItem) && (
						<p className={styles['loading-item']}>
							{currentLoadingItem}
						</p>
					)}
				</>
			)}

			<Vignette />
		</Screen>
	)
}
