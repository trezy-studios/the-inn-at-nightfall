// Module imports
import {
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react'





// Local imports
import { AudioLibrary } from '../game/structures/AudioLibrary.js'





/**
 * Plays a looping track until the component is unmounted.
 *
 * @param {string} trackAlias The alias of the track in the audio library.
 * @param {object} [options] All options.
 * @param {number} [options.fadeDuration] The duration (in milliseconds) over which the track should fade out on unmount.
 */
export function useLoopingTrack(trackAlias, options = {}) {
	const {
		fadeDuration = 1000,
	} = options

	const [soundID, setSoundID] = useState(null)

	const titleTrack = useMemo(() => AudioLibrary.get(trackAlias), [trackAlias])

	const handleClose = useCallback(() => {
		titleTrack.fade(1, 0, fadeDuration, soundID)
		titleTrack.once('fade', () => {
			titleTrack.stop(soundID)
			setSoundID(null)
		})
	}, [
		fadeDuration,
		soundID,
		titleTrack,
	])

	const handleIntroEnd = useCallback(() => {
		titleTrack.stop(soundID)
		setSoundID(titleTrack.play('loop'))
	}, [
		soundID,
		titleTrack,
	])

	useEffect(() => {
		if (!soundID) {
			setSoundID(titleTrack.play('intro'))
			titleTrack.once('end', handleIntroEnd)
		}
	}, [
		handleIntroEnd,
		setSoundID,
		soundID,
		titleTrack,
	])

	useEffect(() => () => handleClose(), [handleClose])
}
