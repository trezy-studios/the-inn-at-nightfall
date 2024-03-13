// Module imports
import {
	Container,
	useApp,
} from '@pixi/react'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useStore } from 'statery'





// Local imports
import { CharacterQueue } from '../CharacterQueue/CharacterQueue.jsx'
import { CreepyHandsBackground } from '../CreepyHandsBackground/CreepyHandsBackground.jsx'
import { ExteriorBackground } from '../ExteriorBackground/ExteriorBackground.jsx'
import { initialize } from '../../game/initialize.js'
import { InteriorMidground } from '../InteriorMidground/InteriorMidground.jsx'
import { store } from '../../store/store.js'
import { useGameLoop } from '../../hooks/useGameLoop.js'





/**
 * Updates the viewport size in state.
 *
 * @param {number} screenWidth The new screen width.
 * @param {number} screenHeight The new screen height.
 */
function handleResize(screenWidth, screenHeight) {
	store.set(() => ({
		viewport: {
			height: screenHeight,
			width: screenWidth,
		},
	}))
}





/**
 * Renders the game.
 *
 * @component
 */
export function Game(props) {
	const { resizeToRef } = props
	const {
		isInitialized,
		isInitializing,
	} = useStore(store)

	const pixiApp = useApp()

	useGameLoop()

	useEffect(() => {
		if (!isInitialized && !isInitializing) {
			initialize()
		}
	}, [
		isInitialized,
		isInitializing,
	])

	useEffect(() => {
		pixiApp.resizeTo = resizeToRef.current
		pixiApp.renderer.on('resize', handleResize)

		handleResize(pixiApp.screen.width, pixiApp.screen.height)

		return () => {
			pixiApp.renderer?.removeListener('resize', handleResize)
		}
	}, [
		pixiApp,
		resizeToRef,
	])

	if (!isInitialized) {
		return null
	}

	return (
		<Container x={100}>
			<ExteriorBackground />
			<CreepyHandsBackground />
			<CharacterQueue />
			<InteriorMidground />
		</Container>
	)
}

Game.propTypes = {
	resizeToRef: PropTypes.object.isRequired,
}
