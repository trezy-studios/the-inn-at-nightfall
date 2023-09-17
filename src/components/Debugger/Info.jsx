// Module imports
import { useStore } from 'statery'





// Local imports
import { store } from '../../store/store.js'





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
		<details>
			<summary>{'Info'}</summary>

			<dl>
				<dt>{'Queue length:'}</dt>
				<dd>{characterQueue.length}</dd>

				<dt>{'Queue position:'}</dt>
				<dd>{characterQueueIndex}</dd>

				<dt>{'Name:'}</dt>
				<dd>{characterQueue[characterQueueIndex].name}</dd>
			</dl>
		</details>
	)
}
