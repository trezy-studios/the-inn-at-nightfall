// Module imports
import { useState } from 'react'





// Types
/**
 * @typedef {object} DebugState
 * @property {boolean} isDebugModeEnabled Whether debug mode is enabled.
 */





/**
 * Returns the current debug state.
 *
 * @returns {DebugState} The current debug state.
 */
export function useDebugMode() {
	const [
		isDebugModeEnabled,
		// setIsDebugModeEnabled,
	] = useState(false)

	return { isDebugModeEnabled }
}
