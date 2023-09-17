// Module imports
import {
	Sprite,
	Stage,
} from '@pixi/react'
import { Assets } from '@pixi/assets'
import { useStore } from 'statery'





// Local imports
import styles from './Debugger.module.scss'

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
	const {
		characterQueue,
		characterQueueIndex,
	} = useStore(store)

	return (
		<DebuggerPanel title={'Character Queue'}>
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
