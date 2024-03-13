// Module imports
import {
	Container,
	Sprite,
} from '@pixi/react'
import {
	useEffect,
	useMemo,
} from 'react'
import { Assets } from 'pixi.js'
import { useStore } from 'statery'





// Local imports
import { ANCHORS } from '../../data/ANCHORS.js'
import { store } from '../../store/store.js'
import { useTimeStageAlpha } from '../../hooks/useTimeStageAlpha.js'





/**
 * Renders the wall of the inn.
 *
 * @component
 */
export function Wall() {
	const { viewport } = useStore(store)

	const assets = useMemo(() => ({
		morning: Assets.get('interior::morning::wall'),
		midday: Assets.get('interior::midday::wall'),
		afternoon: Assets.get('interior::afternoon::wall'),
		night: Assets.get('interior::night::wall'),
	}), [])

	const scale = useMemo(() => {
		const texture = assets.morning.orig
		let localScale = viewport.height / texture.height

		const width = texture.width * localScale

		if (viewport.width > width) {
			localScale = viewport.width / width
		}

		return localScale
	}, [
		assets.morning,
		viewport,
	])

	const size = useMemo(() => ({
		height: assets.morning.orig.height * scale,
		width: assets.morning.orig.width * scale,
	}), [
		assets,
		scale,
	])

	const alpha = useTimeStageAlpha()

	useEffect(() => {
		store.set(() => ({ renderScale: scale }))
	}, [scale])

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
