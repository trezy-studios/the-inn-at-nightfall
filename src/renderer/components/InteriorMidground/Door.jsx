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
import { useTimeStageAlpha } from '../../hooks/useTimeStageAlpha.js'





/**
 * Renders the door of the inn.
 *
 * @component
 */
export function Door() {
	const {
		renderScale,
		viewport,
	} = useStore(store)

	const assets = useMemo(() => ({
		morning: Assets.get('interior::morning::door'),
		midday: Assets.get('interior::midday::door'),
		afternoon: Assets.get('interior::afternoon::door'),
		night: Assets.get('interior::night::door'),
	}), [])

	const alpha = useTimeStageAlpha()

	const size = useMemo(() => ({
		height: assets.morning.orig.height * renderScale,
		width: assets.morning.orig.width * renderScale,
	}), [
		assets,
		renderScale,
	])

	return (
		<Container
			x={viewport.width / 2}
			y={viewport.height}>
			<Sprite
				alpha={alpha.morning}
				anchor={ANCHORS.BOTTOM_CENTER}
				texture={assets.morning}
				{...size} />
			<Sprite
				alpha={alpha.midday}
				anchor={ANCHORS.BOTTOM_CENTER}
				texture={assets.midday}
				{...size} />
			<Sprite
				alpha={alpha.afternoon}
				anchor={ANCHORS.BOTTOM_CENTER}
				texture={assets.afternoon}
				{...size} />
			<Sprite
				alpha={alpha.night}
				anchor={ANCHORS.BOTTOM_CENTER}
				texture={assets.night}
				{...size} />
		</Container>
	)
}
