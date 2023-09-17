// Module imports
import { useStore } from 'statery'





// Local imports
import { store } from '../../store/store.js'
import styles from './Debugger.module.scss'

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
			<table className={styles['debugger-table']}>
				<tbody>
					<tr>
						<th>{'Queue length:'}</th>
						<td>{characterQueue.length}</td>
					</tr>

					<tr>
						<th>{'Queue position:'}</th>
						<td>{characterQueueIndex}</td>
					</tr>

					<tr>
						<th>{'Current name:'}</th>
						<td>{characterQueue[characterQueueIndex].name}</td>
					</tr>
				</tbody>
			</table>
		</DebuggerPanel>
	)
}
