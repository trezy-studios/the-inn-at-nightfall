/* eslint-disable react/forbid-elements */

// Module imports
import {
	Sprite,
	Stage,
} from '@pixi/react'
import {
	useCallback,
	useState,
} from 'react'
import { Assets } from '@pixi/assets'
import { useStore } from 'statery'





// Local imports
import styles from './Debugger.module.scss'

import { AddCharacterForm } from './AddCharacterForm.jsx'
import { DebuggerPanel } from './DebuggerPanel.jsx'
import { store } from '../../store/store.js'





// Constants
const stageOptions = { backgroundAlpha: 0 }





/**
 * Renders tools for managing the character queue.
 *
 * @component
 */
export function CharacterQueue() {
	const [isAddingCharacter, setIsAddingCharacter] = useState(false)

	const {
		characterQueue,
		characterQueueIndex,
	} = useStore(store)

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

			{characterQueue.map((character, index) => {
				const isVisible = (index >= characterQueueIndex) && (index < (characterQueueIndex + 5))

				return (
					<div
						key={character.id}
						className={styles['character-card']}>
						<div className={styles['index']}>
							{index}
						</div>

						<div className={styles['sprite-renderer']}>
							<Stage
								height={100}
								options={stageOptions}
								width={100}>
								<Sprite
									height={100}
									texture={Assets.get(character.sprite)}
									width={100} />
							</Stage>
						</div>

						<div className={styles['info']}>
							<table className={styles['debugger-table']}>
								<tbody>
									<tr>
										<th>{'Name:'}</th>

										<td className={styles['name']}>
											{character.name}
										</td>
									</tr>

									<tr>
										<th>{'ID:'}</th>

										<td
											className={styles['id']}
											title={character.id}>
											{character.id}
										</td>
									</tr>

									<tr>
										<th>{'Visible:'}</th>

										<td>
											{isVisible && 'Yes'}
											{!isVisible && 'No'}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				)
			})}
		</DebuggerPanel>
	)
}
