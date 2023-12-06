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
export function CreepyHandsBackground() {
	const {
		timeAvailable,
		timeRemaining,
		viewport,
	} = useStore(store)

	const spriteProps = useMemo(() => {
		const texture = Assets.get('background::creepy-hands')

		const width = viewport.width * 0.6

		const scale = width / texture.orig.width
		const height = texture.orig.height * scale

		return {
			anchor: ANCHORS.BOTTOM_CENTER,
			height,
			texture,
			width,
			x: viewport.width / 2,
			y: viewport.height + (viewport.height * (timeRemaining / timeAvailable)),
		}
	}, [
		timeAvailable,
		timeRemaining,
		viewport,
	])

	return (
		<Container>
			<Sprite {...spriteProps} />
		</Container>
	)
}
