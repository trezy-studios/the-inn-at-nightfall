// Module imports
import {
	Container,
	Sprite,
	useApp,
} from '@pixi/react'
import { Assets } from '@pixi/assets'
import { useMemo } from 'react'
import { useStore } from 'statery'





// Local imports
import { ANCHORS } from '../../data/ANCHORS.js'
import { store } from '../../store/store.js'





/**
 * Renders the game sky and adjusta its position based on the current time in the round.
 *
 * @component
 */
export function SkyBackground() {
	const {
		timeAvailable,
		timeRemaining,
	} = useStore(store)

	const pixiApp = useApp()

	const asset = useMemo(() => Assets.get('backgrounds-sky'), [])

	const {
		height,
		width,
		y,
	} = useMemo(() => {
		const spriteData = {
			height: asset.orig.height,
			width: asset.orig.width,
			y: pixiApp.screen.height / 2,
		}

		spriteData.width = pixiApp.screen.width
		spriteData.height = asset.orig.height * (pixiApp.screen.width / asset.orig.width)

		const spriteTraveldistance = spriteData.height - pixiApp.screen.height

		spriteData.y = (spriteTraveldistance - (spriteTraveldistance * (timeRemaining / timeAvailable))) * -1

		return spriteData
	}, [
		asset,
		pixiApp,
		timeRemaining,
		timeAvailable,
	])

	return (
		<Container
			anchor={ANCHORS.TOP_CENTER}
			y={y}>
			<Sprite
				height={height}
				texture={asset}
				width={width} />
		</Container>
	)
}
