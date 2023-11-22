// Module imports
import {
	Container,
	Sprite,
} from '@pixi/react'
import { Assets } from 'pixi.js'
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
export function ExteriorBackground() {
	const { viewport } = useStore(store)

	const spriteProps = useMemo(() => {
		const texture = Assets.get('backgrounds-exterior')

		let scale = viewport.height / texture.orig.height

		let height = texture.orig.height * scale
		let width = texture.orig.width * scale

		if (viewport.width > width) {
			scale = viewport.width / width

			height = height * scale
			width = width * scale
		}

		// spriteData.y = -200

		return {
			anchor: ANCHORS.BOTTOM_CENTER,
			height,
			texture,
			width,
			x: viewport.width / 2,
			y: viewport.height,
		}
	}, [viewport])

	return (
		<Container>
			<Sprite {...spriteProps} />
		</Container>
	)
}
