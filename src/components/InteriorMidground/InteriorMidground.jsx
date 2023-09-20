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
 * Renders the interior wall, door, and shelf.
 *
 * @component
 */
export function InteriorMidground() {
	const pixiApp = useApp()

	const doorOpenAsset = useMemo(() => Assets.get('interior-door-open'), [])
	const shelfAsset = useMemo(() => Assets.get('interior-shelf'), [])
	const wallAsset = useMemo(() => Assets.get('interior-wall'), [])

	const spriteProps = {
		anchor: ANCHORS.CENTER_CENTER,
		scale: 0.25,
		x: pixiApp.screen.width / 2,
		y: (pixiApp.screen.height / 2) - 100,
	}

	return (
		<Container>
			<Sprite
				{...spriteProps}
				texture={wallAsset} />
			<Sprite
				{...spriteProps}
				texture={doorOpenAsset} />
			<Sprite
				{...spriteProps}
				texture={shelfAsset} />
		</Container>
	)
}
