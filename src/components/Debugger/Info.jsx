// Module imports
import { useStore } from 'statery'





// Local imports
import { store } from '../../store/store.js'

import { DebuggerPanel } from './DebuggerPanel.jsx'





/**
 * Renders debugging info.
 *
 * @component
 */
export function Info() {
	const {
		characterQueue,
		characterQueueIndex,
	} = useStore(store)

	return (
		<DebuggerPanel title={'Info'}>
			<dl>
				<dt>{'Queue length:'}</dt>
				<dd>{characterQueue.length}</dd>

				<dt>{'Queue position:'}</dt>
				<dd>{characterQueueIndex}</dd>

				<dt>{'Name:'}</dt>
				<dd>{characterQueue[characterQueueIndex].name}</dd>
			</dl>
		</DebuggerPanel>
	)
}
