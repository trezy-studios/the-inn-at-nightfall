// Module imports
import {
	Container,
	Sprite,
} from '@pixi/react'
import {
	useCallback,
	useMemo,
	useState,
} from 'react'
import { Assets } from 'pixi.js'
import { GlowFilter } from 'pixi-filters'
import { useStore } from 'statery'





// Local imports
import { ANCHORS } from '../../data/ANCHORS.js'
import { store } from '../../store/store.js'
import { useTimeStageAlpha } from '../../hooks/useTimeStageAlpha.js'





/**
 * Renders the sideboard inside the inn.
 *
 * @component
 */
export function Sideboard() {
	const {
		renderScale,
		viewport,
	} = useStore(store)

	const [isHovered, setIsHovered] = useState(false)

	const assets = useMemo(() => ({
		morning: Assets.get('interior::morning::sideboard'),
		midday: Assets.get('interior::midday::sideboard'),
		afternoon: Assets.get('interior::afternoon::sideboard'),
		night: Assets.get('interior::night::sideboard'),
	}), [])

	const handlePointerEnter = useCallback(() => setIsHovered(true), [])
	const handlePointerLeave = useCallback(() => setIsHovered(false), [])

	const alpha = useTimeStageAlpha()

	const filters = useMemo(() => {
		const glowFilter = new GlowFilter({ quality: 1 })
		glowFilter.alpha = isHovered ? 1 : 0
		glowFilter.resolution = window.devicePixelRatio

		return [glowFilter]
	}, [isHovered])

	const size = useMemo(() => ({
		height: assets.morning.orig.height * renderScale,
		width: assets.morning.orig.width * renderScale,
	}), [
		assets,
		renderScale,
	])

	return (
		<Container
			filters={filters}
			onpointerenter={handlePointerEnter}
			onpointerleave={handlePointerLeave}
			x={(viewport.width / 2) + (-1578 * renderScale)}
			y={(viewport.height / 2) + (797.5 * renderScale)}>
			<Sprite
				alpha={alpha.morning}
				anchor={ANCHORS.CENTER_CENTER}
				eventMode={'static'}
				texture={assets.morning}
				{...size} />
			<Sprite
				alpha={alpha.midday}
				anchor={ANCHORS.CENTER_CENTER}
				eventMode={'static'}
				texture={assets.midday}
				{...size} />
			<Sprite
				alpha={alpha.afternoon}
				anchor={ANCHORS.CENTER_CENTER}
				eventMode={'static'}
				texture={assets.afternoon}
				{...size} />
			<Sprite
				alpha={alpha.night}
				anchor={ANCHORS.CENTER_CENTER}
				eventMode={'static'}
				texture={assets.night}
				{...size} />
		</Container>
	)
}
