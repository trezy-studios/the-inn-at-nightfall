// Module imports
// import { store } from '../../store/store.js'
// import { useStore } from 'statery'





// Local imports
import styles from './Debugger.module.scss'





/**
 * Renders some debugging bullshit.
 *
 * @component
 */
export function Debugger() {
	// const proxyStore = useStore(store)

	return (
		<div className={styles['debugger']}>
			<dl>
				<dt>{'Data point:'}</dt>
				<dd>{'Value'}</dd>
			</dl>
		</div>
	)
}
