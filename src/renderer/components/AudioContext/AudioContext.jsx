// Module imports
import {
	createContext,
	useContext,
	useMemo,
} from 'react'
import PropTypes from 'prop-types'





// Constants
export const AudioContext = createContext({})





/**
 * Allows all children components to access the current audio context.
 *
 * @component
 */
export function AudioContextProvider(props) {
	const { children } = props

	const providerState = useMemo(() => ({}), [])

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
