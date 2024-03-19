// Module imports
import { useMemo } from 'react'
import { useStore } from 'statery'





// Local imports
import { store } from '../store/store.js'





/**
 * Calculates the opacity for each stage time stage based on the current time remaining.
 *
 * @returns {import('../types/TimeStageAlpha.js').TimeStageAlpha} The caluclated time stage alphas.
 */
export function useTimeStageAlpha() {
	const {
		timeAvailable,
		timeRemaining,
	} = useStore(store)

	return useMemo(() => {
		const result = {
			morning: 1,
			midday: 0,
			afternoon: 0,
			night: 0,
		}

		const timeStageValue = timeRemaining / timeAvailable
		const timeStageSegmentSize = timeAvailable / 4

		if (timeStageValue < 0.75) {
			result.morning = 0
			result.midday = 1
		} else {
			result.midday = 1 - ((timeRemaining - (timeStageSegmentSize * 3)) / timeStageSegmentSize)
		}

		if (timeStageValue < 0.5) {
			result.midday = 0
			result.afternoon = 1
		} else {
			result.afternoon = 1 - ((timeRemaining - (timeStageSegmentSize * 2)) / timeStageSegmentSize)
		}
		if (timeStageValue < 0.25) {
			result.afternoon = 0
			result.night = 1
		} else {
			result.night = 1 - ((timeRemaining - timeStageSegmentSize) / timeStageSegmentSize)
		}

		return result
	}, [
		timeAvailable,
		timeRemaining,
	])
}
