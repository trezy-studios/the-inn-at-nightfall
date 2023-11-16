// Module imports
import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
} from 'react'
import PropTypes from 'prop-types'





// Local imports
import { AudioLibrary } from '../../game/structures/AudioLibrary.js'





// Constants
export const AudioContext = createContext({
	currentTrack: null,
	currentTrackID: null,

	// eslint-disable-next-line jsdoc/require-jsdoc, @typescript-eslint/no-unused-vars
	playTrack: trackID => {},

	// eslint-disable-next-line jsdoc/require-jsdoc, @typescript-eslint/no-unused-vars
	stopTrack: fadeDuration => {},
})
const DEFAULT_FADE_DURATION = 1000





/**
 * Allows all children components to access the current audio context.
 *
 * @component
 */
export function AudioContextProvider(props) {
	const { children } = props

	const [currentTrackID, setCurrentTrackID] = useState(null)
	const [currentTrack, setCurrentTrack] = useState(null)
	const [soundID, setSoundID] = useState(null)

	const stopTrack = useCallback((fadeDuration = DEFAULT_FADE_DURATION) => {
		setCurrentTrackID(null)

		currentTrack.fade(1, 0, fadeDuration, soundID)
		currentTrack.once('fade', () => {
			currentTrack.stop(soundID)
			setSoundID(null)
		})
	}, [
		currentTrack,
		setCurrentTrackID,
		setSoundID,
		soundID,
	])

	const playTrack = useCallback(trackID => {
		if (trackID !== currentTrackID) {
			if (currentTrackID) {
				stopTrack()
			}

			const track = AudioLibrary.get(trackID)
			const playID = track.play('intro')

			setSoundID(playID)
			track.on('end', () => {
				track.stop(playID)
				setSoundID(track.play('loop'))
			})

			setCurrentTrackID(trackID)
			setCurrentTrack(track)
		}
	}, [
		currentTrackID,
		setCurrentTrack,
		setCurrentTrackID,
		setSoundID,
		stopTrack,
	])

	const providerState = useMemo(() => {
		return {
			currentTrack,
			currentTrackID,
			playTrack,
			stopTrack,
		}
	}, [
		currentTrack,
		currentTrackID,
		playTrack,
		stopTrack,
	])

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
