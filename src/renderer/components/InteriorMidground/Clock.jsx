// Module imports
import {
	Container,
	Sprite,
	useTick,
} from '@pixi/react'
import {
	useCallback,
	useMemo,
	useState,
} from 'react'
import { Assets } from 'pixi.js'
import { useStore } from 'statery'





// Local imports
import { ANCHORS } from '../../data/ANCHORS.js'
import { AudioLibrary } from '../../game/structures/AudioLibrary.js'
import { store } from '../../store/store.js'
import { useTimeStageAlpha } from '../../hooks/useTimeStageAlpha.js'





// Variables
let isTickPlaying = false
let isTockPlaying = false





/**
 * Renders the wall clock inside the inn.
 *
 * @component
 */
export function Clock() {
	const {
		renderScale,
		timeAvailable,
		timeRemaining,
		viewport,
	} = useStore(store)

	const [hourHandRotation, setHourHandRotation] = useState(0)
	const [minuteHandRotation, setMinuteHandRotation] = useState(0)
	const [pendulumRotation, setPendulumRotation] = useState(-0.2)
	const [weekHandRotation/* , setWeekHandRotation */] = useState(0)

	useTick(() => {
		const currentSeconds = performance.now() / 1000
		const timeUsed = timeAvailable - timeRemaining
		const localPendulumRotation = Math.sin(currentSeconds * Math.PI) * 0.2

		setHourHandRotation((timeUsed / timeAvailable) * (2 * Math.PI))
		setMinuteHandRotation(((timeUsed / timeAvailable) * 12) * (2 * Math.PI))

		setPendulumRotation(localPendulumRotation)

		if (!isTickPlaying && (0.19 <= localPendulumRotation) && (localPendulumRotation <= 0.2)) {
			isTickPlaying = true
			isTockPlaying = false
			AudioLibrary.playSoundEffect('clock::tick', 'tick')
		} else if (!isTockPlaying && (-0.19 >= localPendulumRotation) && (localPendulumRotation >= -0.2)) {
			isTickPlaying = false
			isTockPlaying = true

			AudioLibrary.playSoundEffect('clock::tick', 'tock')
		}
	})

	const assets = useMemo(() => ({
		pendulum: {
			morning: Assets.get('interior::morning::clock::pendulum'),
			midday: Assets.get('interior::midday::clock::pendulum'),
			afternoon: Assets.get('interior::afternoon::clock::pendulum'),
			night: Assets.get('interior::night::clock::pendulum'),
		},
		clockBase: {
			morning: Assets.get('interior::morning::clock::base'),
			midday: Assets.get('interior::midday::clock::base'),
			afternoon: Assets.get('interior::afternoon::clock::base'),
			night: Assets.get('interior::night::clock::base'),
		},
		clockFront: {
			morning: Assets.get('interior::morning::clock::front'),
			midday: Assets.get('interior::midday::clock::front'),
			afternoon: Assets.get('interior::afternoon::clock::front'),
			night: Assets.get('interior::night::clock::front'),
		},
		hourHand: Assets.get('interior::clock::hour-hand'),
		minuteHand: Assets.get('interior::clock::minute-hand'),
		weekHand: Assets.get('interior::clock::week-hand'),
	}), [])

	const alpha = useTimeStageAlpha()

	const getSpriteProps = useCallback(texture => ({
		height: texture.orig.height * renderScale,
		width: texture.orig.width * renderScale,
	}), [renderScale])

	const getHourHandProps = useCallback(() => ({
		anchor: {
			x: 0.5,
			y: 0.69,
		},
		rotation: hourHandRotation,
		x: 123 * renderScale,
		y: 201.5 * renderScale,
	}), [
		hourHandRotation,
		renderScale,
	])

	const getMinuteHandProps = useCallback(() => ({
		anchor: {
			x: 0.5,
			y: 0.77,
		},
		rotation: minuteHandRotation,
		x: 123 * renderScale,
		y: 201.5 * renderScale,
	}), [
		minuteHandRotation,
		renderScale,
	])

	const getPendulumProps = useCallback(() => ({
		anchor: ANCHORS.TOP_CENTER,
		rotation: pendulumRotation,
		x: 123 * renderScale,
		y: 276 * renderScale,
	}), [
		pendulumRotation,
		renderScale,
	])

	const getWeekHandProps = useCallback(() => ({
		anchor: {
			x: 0.5,
			y: 0.7,
		},
		rotation: weekHandRotation,
		x: 123 * renderScale,
		y: 116.5 * renderScale,
	}), [
		weekHandRotation,
		renderScale,
	])

	return (
		<Container
			x={(viewport.width / 2) + (523 * renderScale)}
			y={(viewport.height / 2) + (-157 * renderScale)}>
			<Container>
				<Sprite
					alpha={alpha.morning}
					{...getSpriteProps(assets.clockBase.morning)}
					texture={assets.clockBase.morning} />
				<Sprite
					alpha={alpha.midday}
					{...getSpriteProps(assets.clockBase.midday)}
					texture={assets.clockBase.midday} />
				<Sprite
					alpha={alpha.afternoon}
					{...getSpriteProps(assets.clockBase.afternoon)}
					texture={assets.clockBase.afternoon} />
				<Sprite
					alpha={alpha.night}
					{...getSpriteProps(assets.clockBase.night)}
					texture={assets.clockBase.night} />
			</Container>

			<Container>
				<Sprite
					{...getSpriteProps(assets.pendulum.morning)}
					{...getPendulumProps()}
					alpha={alpha.morning}
					texture={assets.pendulum.morning} />
				<Sprite
					{...getSpriteProps(assets.pendulum.midday)}
					{...getPendulumProps()}
					alpha={alpha.midday}
					texture={assets.pendulum.midday} />
				<Sprite
					{...getSpriteProps(assets.pendulum.afternoon)}
					{...getPendulumProps()}
					alpha={alpha.afternoon}
					texture={assets.pendulum.afternoon} />
				<Sprite
					{...getSpriteProps(assets.pendulum.night)}
					{...getPendulumProps()}
					alpha={alpha.night}
					texture={assets.pendulum.night} />
			</Container>

			<Container>
				<Sprite
					{...getSpriteProps(assets.clockFront.morning)}
					alpha={alpha.morning}
					texture={assets.clockFront.morning} />
				<Sprite
					{...getSpriteProps(assets.clockFront.midday)}
					alpha={alpha.midday}
					texture={assets.clockFront.midday} />
				<Sprite
					{...getSpriteProps(assets.clockFront.afternoon)}
					alpha={alpha.afternoon}
					texture={assets.clockFront.afternoon} />
				<Sprite
					{...getSpriteProps(assets.clockFront.night)}
					alpha={alpha.night}
					texture={assets.clockFront.night} />
			</Container>

			<Sprite
				{...getSpriteProps(assets.minuteHand)}
				{...getMinuteHandProps()}
				texture={assets.minuteHand} />
			<Sprite
				{...getSpriteProps(assets.hourHand)}
				{...getHourHandProps()}
				texture={assets.hourHand} />
			<Sprite
				{...getSpriteProps(assets.weekHand)}
				{...getWeekHandProps()}
				texture={assets.weekHand} />
		</Container>
	)
}
