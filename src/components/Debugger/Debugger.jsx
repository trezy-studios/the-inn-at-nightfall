// Module imports
import { useStore } from 'statery'





// Local imports
import styles from './Debugger.module.scss'

import { CharacterQueue } from './CharacterQueue.jsx'
import { Info } from './Info.jsx'
import { store } from '../../store/store.js'





/** Hides the debug panel. */
function hideDebugger() {
	store.set(() => ({ shouldShowDebugger: false }))
}

/** Shows the debug panel. */
function showDebugger() {
	store.set(() => ({ shouldShowDebugger: true }))
}

/** Toggles the debug panel. */
function toggleDebugger() {
	store.set(state => {
		return { shouldShowDebugger: !state.shouldShowDebugger }
	})
}





/**
 * Renders some debugging bullshit.
 *
 * @component
 */
export function Debugger() {
	const { shouldShowDebugger } = useStore(store)

	if (typeof window !== 'undefined') {
		/* eslint-disable @typescript-eslint/ban-ts-comment */

		// @ts-ignore
		window.hideDebugger = hideDebugger
		// @ts-ignore
		window.showDebugger = showDebugger
		// @ts-ignore
		window.toggleDebugger = toggleDebugger

		/* eslint-enable @typescript-eslint/ban-ts-comment */
	}

	if (!shouldShowDebugger) {
		return null
	}

	return (
		<div className={styles['debugger']}>
			<Info />
			<CharacterQueue />
		</div>
	)
}
