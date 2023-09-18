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





/**
 * Renders the title screen background.
 *
 * @component
 */
export function Background(props) {
	const { resizeToRef } = props

	const pixiApp = useApp()

	const asset = Assets.get('title-background')

	const filters = useMemo(() => {
		const colorMatrixFilter = new ColorMatrixFilter
		colorMatrixFilter.brightness(0.5, true)
		colorMatrixFilter.saturate(-0.5, true)

		return [
			new BlurFilter(10),
			colorMatrixFilter,
		]
	}, [])

	const {
		height,
		width,
	} = useMemo(() => {
		const spriteSize = {
			height: asset.orig.height,
			width: asset.orig.width,
		}

		const resizeToElement = resizeToRef.current

		if (resizeToElement.clientHeight < resizeToElement.clientWidth) {
			spriteSize.height = resizeToElement.clientHeight
			spriteSize.width = resizeToElement.clientWidth * (asset.orig.width / asset.orig.height)
		} else {
			spriteSize.width = resizeToElement.clientWidth
			spriteSize.height = resizeToElement.clientHeight * (asset.orig.height / asset.orig.width)
		}

		return spriteSize
	}, [
		asset,
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
			filters={filters}
			height={height}
			texture={asset}
			width={width} />
	)
}

Background.propTypes = {
	resizeToRef: PropTypes.object.isRequired,
}
