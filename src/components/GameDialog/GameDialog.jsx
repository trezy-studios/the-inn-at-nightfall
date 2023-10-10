// Module imports
import { useStore } from 'statery'





// Local imports
import styles from './GameDialog.module.scss'

import { getCurrentCharacter } from '../../store/reducers/getCurrentCharacter.js'
import { Messages } from './Messages.jsx'
import { Responses } from './Responses.jsx'
import { store } from '../../store/store.js'





/**
 * Renders the game dialogs.
 *
 * @component
 */
export function GameDialog() {
	const proxyStore = useStore(store)
	const currentCharacter = getCurrentCharacter(proxyStore)

	return (
		<div className={styles['game-dialog']}>
			{Boolean(currentCharacter) && (
				<>
					<Messages />
					<Responses />
				</>
			)}
		</div>
	)
}
