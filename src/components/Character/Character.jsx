// Module imports
import {
	Container,
	Sprite,
	useApp,
} from '@pixi/react'
import { Assets } from '@pixi/assets'
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
		viewport,
	} = useStore(store)

	const pixiApp = useApp()

	const { characterID } = props
	const character = characters[characterID]

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
		const texture = Assets.get(character.sprite)
		const height = pixiApp.screen.height * 0.8

		const scale = height / texture.orig.height
		const width = texture.orig.width * scale

		return {
			height,
			texture,
			width,
		}
	}, [
		character.sprite,
		pixiApp,
	])

	return (
		<Container
			scale={containerStyles.scale}
			x={containerStyles.position.x}
			y={containerStyles.position.y}>
			<Sprite
				anchor={ANCHORS.CENTER_CENTER}
				{...spriteProps} />
		</Container>
	)
}

Character.propTypes = {
	characterID: PropTypes.string.isRequired,
}
