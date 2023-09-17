// Module imports
import {
	useCallback,
	useState,
} from 'react'
import { store } from '../../store/store.js'
import { useStore } from 'statery'





// Local imports
import styles from './Debugger.module.scss'





/**
 * Renders some debugging bullshit.
 *
 * @component
 */
export function Debugger() {
	const [shouldShowDebugger, setShouldShowDebugger] = useState(false)

	const {
		characterQueue,
		characterQueueIndex,
	} = useStore(store)

	const hideDebugger = useCallback(() => {
		setShouldShowDebugger(false)
	}, [setShouldShowDebugger])

	const showDebugger = useCallback(() => {
		setShouldShowDebugger(true)
	}, [setShouldShowDebugger])

	const toggleDebugger = useCallback(() => {
		if (shouldShowDebugger) {
			hideDebugger()
		} else {
			showDebugger()
		}
	}, [
		hideDebugger,
		shouldShowDebugger,
		showDebugger,
	])

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
			<dl>
				<dt>{'Queue length:'}</dt>
				<dd>{characterQueue.length}</dd>

				<dt>{'Queue position:'}</dt>
				<dd>{characterQueueIndex}</dd>

				<dt>{'Name:'}</dt>
				<dd>{characterQueue[characterQueueIndex].name}</dd>
			</dl>
		</div>
	)
}
