// Module imports
import { useEffect } from 'react'





// Local imports
import { useAudioContext } from '../components/AudioContext/AudioContext.jsx'





/**
 * Plays a looping track until the component is unmounted.
 *
 * @param {string} trackAlias The alias of the track in the audio library.
 * @param {object} [options] All options.
 * @param {number} [options.fadeDuration] The duration (in milliseconds) over which the track should fade out on unmount.
 * @param {boolean} [options.stopOnUnmount] Whether to stop the track when the parent component is unmounted.
 */
export function useLoopingTrack(trackAlias, options = {}) {
	const {
		fadeDuration = 1000,
		stopOnUnmount = false,
	} = options

	const {
		playTrack,
		stopTrack,
	} = useAudioContext()

	useEffect(() => {
		playTrack(trackAlias)

		return () => {
			if (stopOnUnmount) {
				stopTrack(fadeDuration)
			}
		}
	}, [
		fadeDuration,
		playTrack,
		stopOnUnmount,
		stopTrack,
		trackAlias,
	])
}
