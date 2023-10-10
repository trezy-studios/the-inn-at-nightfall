// Module imports
import { useStore } from 'statery'





// Local imports
import { getCurrentDialog } from '../store/reducers/getCurrentDialog.js'
import { store } from '../store/store.js'





/**
 * Retrieves the current game dialog.
 *
 * @component
 */
export function useDialog() {
	const proxyStore = useStore(store)
	return getCurrentDialog(proxyStore)
}
