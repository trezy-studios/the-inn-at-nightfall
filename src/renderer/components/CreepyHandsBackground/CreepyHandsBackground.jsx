// Module imports
import {
	Container,
	Sprite,
	useApp,
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
	} = useStore(store)

	const pixiApp = useApp()

	const spriteProps = useMemo(() => {
		const texture = Assets.get('backgrounds-creepy-hands')

		const width = pixiApp.screen.width * 0.8

		const scale = width / texture.orig.width
		const height = texture.orig.height * scale

		return {
			anchor: ANCHORS.BOTTOM_CENTER,
			height,
			texture,
			width,
			x: pixiApp.screen.width / 2,
			y: pixiApp.screen.height + (pixiApp.screen.height * (timeRemaining / timeAvailable)),
		}
	}, [
		pixiApp,
		timeAvailable,
		timeRemaining,
	])

	return (
		<Container>
			<Sprite {...spriteProps} />
		</Container>
	)
}
