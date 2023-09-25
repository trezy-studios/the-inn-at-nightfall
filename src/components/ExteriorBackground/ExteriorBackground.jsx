// Module imports
import {
	Container,
	Sprite,
	useApp,
} from '@pixi/react'
import { Assets } from '@pixi/assets'
import { useMemo } from 'react'





// Local imports
import { ANCHORS } from '../../data/ANCHORS.js'





/**
 * Renders the game sky and adjusta its position based on the current time in the round.
 *
 * @component
 */
export function ExteriorBackground() {
	const pixiApp = useApp()

	const asset = useMemo(() => Assets.get('exterior-day'), [])

	const {
		height,
		width,
	} = useMemo(() => {
		const spriteData = {
			height: asset.orig.height,
			width: asset.orig.width,
		}

		spriteData.width = pixiApp.screen.width
		spriteData.height = asset.orig.height * (pixiApp.screen.width / asset.orig.width)

		return spriteData
	}, [
		asset,
		pixiApp,
	])

	return (
		<Container anchor={ANCHORS.BOTTOM_CENTER}>
			<Sprite
				height={height}
				texture={asset}
				width={width} />
		</Container>
	)
}
