// Module imports
import {
	Container,
	Graphics,
	Sprite,
} from '@pixi/react'
import {
	useCallback,
	useMemo,
} from 'react'
import { Assets } from '@pixi/assets'
import PropTypes from 'prop-types'
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
		viewport,
	} = useStore(store)

	const { characterID } = props
	const character = characters[characterID]

	const draw = useCallback(graphics => {
		graphics.clear()
		graphics.lineStyle(2, 0x000000)
		graphics.beginFill(0x00ff00)
		graphics.drawRect(-50, -200, 100, 200)
		graphics.drawRect(-50, -200, 100, 200)
		graphics.endFill()
	}, [])

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
				y: (viewport.height / 2) + offset.y,
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

	const sprite = useMemo(() => {
		return Assets.get(character.sprite)
	}, [character.sprite])


	return (
		<Container
			scale={containerStyles.scale}
			x={containerStyles.position.x}
			y={containerStyles.position.y}>
			{!sprite && (
				<Graphics
					anchor={ANCHORS.CENTER_CENTER}
					draw={draw} />
			)}

			{Boolean(sprite) && (
				<Sprite
					anchor={ANCHORS.CENTER_CENTER}
					scale={0.5}
					texture={sprite} />
			)}
		</Container>
	)
}

Character.propTypes = {
	characterID: PropTypes.string.isRequired,
}
