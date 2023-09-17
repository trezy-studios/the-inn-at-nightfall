// Module imports
import {
	useLayoutEffect,
	useState,
} from 'react'
import { useRouter } from 'next/router.js'





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
	const router = useRouter()
	const [isDebugModeEnabled, setIsDebugModeEnabled] = useState(false)

	useLayoutEffect(() => {
		if (router.query?.debug) {
			setIsDebugModeEnabled(true)
		}
	}, [
		router.query?.debug,
		setIsDebugModeEnabled,
	])

	return { isDebugModeEnabled }
}
