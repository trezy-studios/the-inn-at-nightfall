// Module imports
import { Container } from '@pixi/react'
import { useMemo } from 'react'
import { useStore } from 'statery'





// Local imports
import { Character } from '../Character/Character.jsx'
import { store } from '../../store/store.js'





/**
 * Renders all characters currently in the queue.
 *
 * @component
 */
export function CharacterQueue() {
	const {
		characterQueue,
		characterQueueIndex,
	} = useStore(store)

	const renderedCharacterQueue = useMemo(() => {
		return [...characterQueue]
			.slice(characterQueueIndex, characterQueueIndex + 5)
			.reverse()
			.map(characterData => {
				return (
					<Character
						key={characterData.id}
						character={characterData} />
				)
			})
	}, [
		characterQueue,
		characterQueueIndex,
	])

	return (
		<Container>
			{renderedCharacterQueue}
		</Container>
	)
}
