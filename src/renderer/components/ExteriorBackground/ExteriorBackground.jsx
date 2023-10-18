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

	const spriteProps = useMemo(() => {
		const texture = Assets.get('backgrounds-exterior')

		let scale = pixiApp.screen.height / texture.orig.height

		let height = texture.orig.height * scale
		let width = texture.orig.width * scale

		if (pixiApp.screen.width > width) {
			scale = pixiApp.screen.width / width

			height = height * scale
			width = width * scale
		}

		// spriteData.y = -200

		return {
			anchor: ANCHORS.BOTTOM_CENTER,
			height,
			texture,
			width,
			x: pixiApp.screen.width / 2,
			y: pixiApp.screen.height,
		}
	}, [pixiApp])

	return (
		<Container>
			<Sprite {...spriteProps} />
		</Container>
	)
}
