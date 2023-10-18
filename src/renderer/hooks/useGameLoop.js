// Module imports
import { useTick } from '@pixi/react'





// Local imports
import { clockSystem } from '../game/systems/clockSystem.js'
import { roundManagementSystem } from '../game/systems/roundManagementSystem.js'
import { store } from '../store/store.js'





/**
 * Uses the Pixi.js ticker to run all systems in the game loop.
 */
export function useGameLoop() {
	useTick((delta, ticker) => {
		store.set(() => ({
			delta,
			deltaMS: ticker.deltaMS,
			lastTick: ticker.lastTime,
		}))

		const { isInitialized } = store.state

		if (!isInitialized) {
			return
		}

		clockSystem()
		roundManagementSystem()

	// 	controlsSystem()
	// 	spawnSystem()
	// 	aiSystem()
	// 	physicsSystem()
	// 	projectileSystem()
	// 	moveSystem()
	// 	cullSystem()
	// 	sortSystem()
	})

	// useControlsSystem()
}
