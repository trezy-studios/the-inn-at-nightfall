/* eslint-disable react/forbid-elements */

// Module imports
import {
	Reorder,
	useDragControls,
} from 'framer-motion'
import PropTypes from 'prop-types'
import { useStore } from 'statery'





// Local imports
import styles from './Debugger.module.scss'

import { CharacterQueueImage } from './CharacterQueueImage.jsx'
import { store } from '../../store/store.js'
import { useMemo } from 'react'





/**
 * Renders tools for managing the character queue.
 *
 * @component
 */
export function CharacterQueueItem(props) {
	const { characterID } = props
	const dragControls = useDragControls()

	const {
		characterQueue,
		characterQueueIndex,
		characters,
	} = useStore(store)

	const character = useMemo(() => {
		return characters[characterID]
	}, [
		characters,
		characterID,
	])

	const index = useMemo(() => characterQueue.indexOf(characterID), [
		characterID,
		characterQueue,
	])

	const isVisible = useMemo(() => {
		if (index < characterQueueIndex) {
			return false
		}

		if (index > (characterQueueIndex + 5)) {
			return false
		}

		return true
	}, [
		characterQueueIndex,
		index,
	])

	return (
		<Reorder.Item
			key={character.id}
			dragControls={dragControls}
			dragListener={false}
			value={characterID}>
			<div
				className={styles['character-card']}>
				<div
					className={styles['handle']}
					// eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
					onPointerDown={event => dragControls.start(event)} />

				<div className={styles['sprite-renderer']}>
					<CharacterQueueImage sprite={character.sprite} />
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
		</Reorder.Item>
	)
}

CharacterQueueItem.propTypes = {
	characterID: PropTypes.string.isRequired,
}
