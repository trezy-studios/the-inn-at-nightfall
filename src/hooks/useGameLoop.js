// Local imports
import { clockSystem } from '../game/systems/clockSystem.js'
import { store } from '../store/store.js'
import { useTick } from '@pixi/react'





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
	})
}
