// Module imports
import { useStore } from 'statery'





// Local imports
import styles from './GameDialog.module.scss'

import { Messages } from './Messages.jsx'
import { Responses } from './Responses.jsx'
import { store } from '../../store/store.js'
import { useCharacter } from '../../hooks/useCharacter.js'





/**
 * Renders the game dialogs.
 *
 * @component
 */
export function GameDialog() {
	const { isSwappingCharacters } = useStore(store)
	const character = useCharacter()

	return (
		<div className={styles['game-dialog']}>
			{(Boolean(character) && !isSwappingCharacters) && (
				<>
					<Messages />
					<Responses />
				</>
			)}
		</div>
	)
}
