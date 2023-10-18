// Module imports
import {
	Container,
	Sprite,
	useApp,
} from '@pixi/react'
import {
	useCallback,
	useMemo,
} from 'react'
import { Assets } from 'pixi.js'





// Local imports
import { ANCHORS } from '../../data/ANCHORS.js'





/**
 * Renders the interior wall, door, and shelf.
 *
 * @component
 */
export function InteriorMidground() {
	const pixiApp = useApp()

	const doorOpenAsset = useMemo(() => Assets.get('interior-door-open'), [])
	const shelfAsset = useMemo(() => Assets.get('interior-shelf'), [])
	const wallAsset = useMemo(() => Assets.get('interior-wall'), [])

	const getSpriteProps = useCallback(texture => {
		let scale = (pixiApp.screen.height * 1.2) / texture.orig.height

		let height = texture.orig.height * scale
		let width = texture.orig.width * scale

		if (pixiApp.screen.width > width) {
			scale = pixiApp.screen.width / width

			height = height * scale
			width = width * scale
		}

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
			<Sprite {...getSpriteProps(wallAsset)} />
			<Sprite {...getSpriteProps(doorOpenAsset)} />
			<Sprite {...getSpriteProps(shelfAsset)} />
		</Container>
	)
}
