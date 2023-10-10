// Module imports
import {
	Assets,
	ColorMatrixFilter,
} from 'pixi.js'
import {
	Container,
	Sprite,
	useApp,
} from '@pixi/react'
import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { useStore } from 'statery'





// Local imports
import { store } from '../../store/store.js'

import { ANCHORS } from '../../data/ANCHORS.js'





/**
 * Renders a character.
 *
 * @component
 */
export function Character(props) {
	const {
		characterQueue,
		characterQueueIndex,
		characters,
		timeAvailable,
		timeRemaining,
		viewport,
	} = useStore(store)

	const pixiApp = useApp()

	const { characterID } = props
	const character = characters[characterID]

	const timeLeft = useMemo(() => timeRemaining / timeAvailable, [
		timeAvailable,
		timeRemaining,
	])

	const {
		indexDistance,
		queueIndex,
	} = useMemo(() => {
		const index = characterQueue.indexOf(character.id)

		return {
			indexDistance: Math.abs(characterQueueIndex - index),
			queueIndex: index,
		}
	}, [
		character,
		characterQueue,
		characterQueueIndex,
	])

	const containerStyles = useMemo(() => {
		const offset = {
			x: 0,
			y: 0,
		}
		let scale = 1

		if (queueIndex !== characterQueueIndex) {
			offset.x += 20 + (indexDistance * 80)
			offset.y += 30 + (indexDistance * 15)
			scale -= 0.1 * indexDistance
		}

		return {
			position: {
				x: (viewport.width / 2) + offset.x,
				y: (viewport.height / 2) + offset.y + 150,
			},
			scale,
		}
	}, [
		characterQueueIndex,
		indexDistance,
		queueIndex,
		viewport.height,
		viewport.width,
	])

	const spriteProps = useMemo(() => {
		const colorMatrixFilter = new ColorMatrixFilter
		colorMatrixFilter.resolution = window.devicePixelRatio
		colorMatrixFilter.brightness(Math.max(1 - (indexDistance * (1 - timeLeft)), 0.05), true)

		const filters = [colorMatrixFilter]

		const texture = Assets.get(character.sprite)
		const height = pixiApp.screen.height * 0.8

		const scale = height / texture?.orig.height
		const width = texture?.orig.width * scale

		return {
			anchor: ANCHORS.CENTER_CENTER,
			filters,
			height,
			texture,
			width,
		}
	}, [
		character.sprite,
		indexDistance,
		pixiApp,
		timeLeft,
	])

	return (
		<Container
			scale={containerStyles.scale}
			x={containerStyles.position.x}
			y={containerStyles.position.y}>
			<Sprite {...spriteProps} />
		</Container>
	)
}

Character.propTypes = {
	characterID: PropTypes.string.isRequired,
}
