/* eslint-disable react/forbid-elements */

// Module imports
import {
	AnimatePresence,
	Reorder,
} from 'framer-motion'
import {
	useCallback,
	useState,
} from 'react'
import { useStore } from 'statery'





// Local imports
import styles from './Debugger.module.scss'

import { AddCharacterForm } from './AddCharacterForm.jsx'
import { CharacterQueueItem } from './CharacterQueueItem.jsx'
import { DebuggerPanel } from './DebuggerPanel.jsx'
import { store } from '../../store/store.js'





// Functions
/**
 * Updates the order of characters in the queue when reordered in this panel.
 *
 * @param {string[]} newCharacterQueue An array of items in their new order.
 */
function handleCharacterQueueReorder(newCharacterQueue) {
	store.set(() => ({ characterQueue: newCharacterQueue }))
}





/**
 * Renders tools for managing the character queue.
 *
 * @component
 */
export function CharacterQueue() {
	const [isAddingCharacter, setIsAddingCharacter] = useState(false)

	const { characterQueue } = useStore(store)

	const handleAddCharacterClick = useCallback(() => setIsAddingCharacter(true), [setIsAddingCharacter])
	const handleAddCharacterSubmit = useCallback(() => setIsAddingCharacter(false), [setIsAddingCharacter])
	const handleNextCharacterClick = useCallback(() => store.set(state => {
		const patch = {}

		if (state.characterQueueIndex < (state.characterQueue.length - 1)) {
			patch.characterQueueIndex = state.characterQueueIndex + 1
		}

		return patch
	}), [])
	const handlePreviousCharacterClick = useCallback(() => store.set(state => {
		const patch = {}

		if (state.characterQueueIndex > 0) {
			patch.characterQueueIndex = state.characterQueueIndex - 1
		}

		return patch
	}), [])

	return (
		<DebuggerPanel title={'Character Queue'}>
			<div className={styles['actions']}>
				<button onClick={handleAddCharacterClick}>
					{'Add Character'}
				</button>

				<button onClick={handlePreviousCharacterClick}>
					{'Previous Character'}
				</button>

				<button onClick={handleNextCharacterClick}>
					{'Next Character'}
				</button>
			</div>

			{isAddingCharacter && (
				<AddCharacterForm onSubmit={handleAddCharacterSubmit} />
			)}

			<AnimatePresence>
				<Reorder.Group
					axis={'y'}
					layoutScroll
					onReorder={handleCharacterQueueReorder}
					values={characterQueue}>
					{characterQueue.map(characterID => (
						<CharacterQueueItem
							key={characterID}
							characterID={characterID} />
					))}
				</Reorder.Group>
			</AnimatePresence>
		</DebuggerPanel>
	)
}
