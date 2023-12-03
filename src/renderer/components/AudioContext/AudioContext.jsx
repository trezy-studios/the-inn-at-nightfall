// Module imports
import {
	createContext,
	useContext,
	useEffect,
	useMemo,
} from 'react'
import PropTypes from 'prop-types'
import { useStore } from 'statery'





// Local imports
import { AudioLibrary } from '../../game/structures/AudioLibrary.js'
import { SCREENS } from '../../data/SCREENS.js'
import { store } from '../../store/store.js'





// Constants
export const AudioContext = createContext({})





/**
 * Allows all children components to access the current audio context.
 *
 * @component
 */
export function AudioContextProvider(props) {
	const { children } = props

	const { screen } = useStore(store)

	const providerState = useMemo(() => ({}), [])

	useEffect(() => {
		if ([SCREENS.SETTINGS, SCREENS.TITLE].includes(screen)) {
			AudioLibrary.play('title')
		} else if (screen === SCREENS.PLAY) {
			AudioLibrary.play('nightfall')
		}
	}, [screen])

	return (
		<AudioContext.Provider value={providerState}>
			{children}
		</AudioContext.Provider>
	)
}

AudioContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
}





// eslint-disable-next-line jsdoc/require-jsdoc
export const useAudioContext = () => useContext(AudioContext)
