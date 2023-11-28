// Module imports
import {
	Assets,
	ColorMatrixFilter,
} from 'pixi.js'
import {
	Container,
	Sprite,
} from '@pixi/react'
import {
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react'
import PropTypes from 'prop-types'
import { useStore } from 'statery'





// Local imports
import { store } from '../../store/store.js'

import { ANCHORS } from '../../data/ANCHORS.js'
import { EVENTS as CharacterEvents } from '../../game/structures/Character.js'
import { useCharacter } from '../../hooks/useCharacter.js'





/**
 * Renders a character.
 *
 * @component
 */
export function Character(props) {
	const { characterID } = props

	const {
		characterQueue,
		characterQueueIndex,
		timeAvailable,
		timeRemaining,
		viewport,
	} = useStore(store)
	const character = useCharacter(characterID)

	const [spriteName, setSpriteName] = useState(character.sprite)

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
		viewport,
	])

	const spriteProps = useMemo(() => {
		const colorMatrixFilter = new ColorMatrixFilter
		colorMatrixFilter.resolution = window.devicePixelRatio
		colorMatrixFilter.brightness(Math.max(1 - (indexDistance * (1 - timeLeft)), 0.05), true)

		const filters = [colorMatrixFilter]

		const texture = Assets.get(spriteName)
		const height = viewport.height * 0.8

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
		indexDistance,
		spriteName,
		timeLeft,
		viewport,
	])

	const handleStateChanged = useCallback(() => setSpriteName(character.sprite), [
		character,
		setSpriteName,
	])

	useEffect(() => {
		const unsubscribe = character.on(CharacterEvents.STATE_CHANGED, handleStateChanged)

		return () => unsubscribe()
	}, [
		character,
		handleStateChanged,
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
