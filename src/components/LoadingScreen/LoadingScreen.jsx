// Module imports
import { useLayoutEffect } from 'react'
import { useStore } from 'statery'





// Local imports
import { loadGameAssets } from '../../game/loadGameAssets.js'
import { SCREENS } from '../../data/SCREENS.js'
import { store } from '../../store/store.js'





/**
 * Renders the loading screen.
 *
 * @component
 */
export function LoadingScreen() {
	const {
		areAssetsLoaded,
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
		<div>
			{'Loading...'}
		</div>
	)
}
