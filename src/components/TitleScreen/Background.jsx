// Module imports
import {
	Sprite,
	useApp,
} from '@pixi/react'
import {
	useEffect,
	useMemo,
} from 'react'
import { Assets } from '@pixi/assets'
import { BlurFilter } from '@pixi/filter-blur'
import { ColorMatrixFilter } from '@pixi/filter-color-matrix'
import PropTypes from 'prop-types'





// Local imports
import { ANCHORS } from '../../data/ANCHORS.js'





/**
 * Renders the title screen background.
 *
 * @component
 */
export function Background(props) {
	const { resizeToRef } = props

	const pixiApp = useApp()

	const asset = Assets.get('backgrounds-title')

	const filters = useMemo(() => {
		const blurFilter = new BlurFilter(10)

		const colorMatrixFilter = new ColorMatrixFilter
		colorMatrixFilter.brightness(0.5, true)
		colorMatrixFilter.saturate(-0.5, true)

		return [
			blurFilter,
			colorMatrixFilter,
		]
	}, [])

	const {
		height,
		width,
		x,
		y,
	} = useMemo(() => {
		const spriteData = {
			height: asset.orig.height,
			width: asset.orig.width,
			x: pixiApp.screen.width / 2,
			y: pixiApp.screen.height / 2,
		}

		const resizeToElement = resizeToRef.current

		if (resizeToElement.clientHeight < resizeToElement.clientWidth) {
			spriteData.width = resizeToElement.clientWidth
			spriteData.height = resizeToElement.clientHeight * (asset.orig.width / asset.orig.height)
		} else {
			spriteData.height = resizeToElement.clientHeight
			spriteData.width = resizeToElement.clientWidth * (asset.orig.height / asset.orig.width)
		}

		return spriteData
	}, [
		asset,
		pixiApp,
		resizeToRef,
	])

	useEffect(() => {
		pixiApp.resizeTo = resizeToRef.current
		pixiApp.resize()
	}, [
		pixiApp,
		resizeToRef,
	])

	return (
		<Sprite
			anchor={ANCHORS.CENTER_CENTER}
			filters={filters}
			height={height}
			texture={asset}
			width={width}
			x={x}
			y={y} />
	)
}

Background.propTypes = {
	resizeToRef: PropTypes.object.isRequired,
}
