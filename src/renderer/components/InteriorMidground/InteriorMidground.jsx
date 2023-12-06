// Module imports
import {
	Container,
	Sprite,
} from '@pixi/react'
import {
	useCallback,
	useMemo,
} from 'react'
import { Assets } from 'pixi.js'
import { useStore } from 'statery'





// Local imports
import { ANCHORS } from '../../data/ANCHORS.js'
import { store } from '../../store/store.js'





/**
 * Renders the interior wall, door, and shelf.
 *
 * @component
 */
export function InteriorMidground() {
	const { viewport } = useStore(store)

	const doorOpenAsset = useMemo(() => Assets.get('interior::door-open'), [])
	const shelfAsset = useMemo(() => Assets.get('interior::shelf'), [])
	const wallAsset = useMemo(() => Assets.get('interior::wall'), [])

	const getSpriteProps = useCallback(texture => {
		let scale = (viewport.height * 1.2) / texture.orig.height

		let height = texture.orig.height * scale
		let width = texture.orig.width * scale

		if (viewport.width > width) {
			scale = viewport.width / width

			height = height * scale
			width = width * scale
		}

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
			<Sprite {...getSpriteProps(wallAsset)} />
			<Sprite {...getSpriteProps(doorOpenAsset)} />
			<Sprite {...getSpriteProps(shelfAsset)} />
		</Container>
	)
}
