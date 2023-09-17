// Module imports
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
	const {
		characterQueue,
		characterQueueIndex,
	} = useStore(store)

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
