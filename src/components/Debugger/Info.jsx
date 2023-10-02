// Module imports
import { useStore } from 'statery'





// Local imports
import styles from './Debugger.module.scss'

import { DebuggerPanel } from './DebuggerPanel.jsx'
import { getCurrentCharacter } from '../../store/reducers/getCurrentCharacter.js'
import { store } from '../../store/store.js'





/**
 * Renders debugging info.
 *
 * @component
 */
export function Info() {
	const proxyStore = useStore(store)
	const {
		characterQueue,
		characterQueueIndex,
	} = proxyStore

	const currentCharacter = getCurrentCharacter(proxyStore)

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
						<td>{Boolean(currentCharacter) && currentCharacter.name}</td>
					</tr>
				</tbody>
			</table>
		</DebuggerPanel>
	)
}
