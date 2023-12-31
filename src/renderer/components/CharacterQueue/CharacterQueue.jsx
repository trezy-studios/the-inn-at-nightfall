// Module imports
import { checkMerchantPresence } from '../../store/reducers/checkMerchantPresence.js'
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
	const proxyStore = useStore(store)
	const {
		characterQueue,
		characterQueueIndex,
		characters,
	} = proxyStore

	const isMerchantPresent = checkMerchantPresence(proxyStore)

	const renderedCharacterQueue = useMemo(() => {
		const characterQueueToRender = [...characterQueue]
			.slice(characterQueueIndex, characterQueueIndex + 5)
			.reverse()

		if (!characterQueueToRender.length) {
			return null
		}

		if (isMerchantPresent) {
			return (
				<Character characterID={characters[characterQueue[0]].id} />
			)
		}

		return characterQueueToRender.map(characterID => (
			<Character
				key={characterID}
				characterID={characterID} />
		))
	}, [
		characterQueue,
		characterQueueIndex,
		characters,
		isMerchantPresent,
	])

	return (
		<Container>
			{renderedCharacterQueue}
		</Container>
	)
}
