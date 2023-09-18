// Module imports
import { useMemo } from 'react'
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
		characters,
		characterQueue,
		characterQueueIndex,
	} = useStore(store)

	const currentCharacterName = useMemo(() => {
		const index = characterQueue[characterQueueIndex]
		const character = characters[index]

		return character.name
	}, [
		characters,
		characterQueue,
		characterQueueIndex,
	])

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
						<td>{currentCharacterName}</td>
					</tr>
				</tbody>
			</table>
		</DebuggerPanel>
	)
}
