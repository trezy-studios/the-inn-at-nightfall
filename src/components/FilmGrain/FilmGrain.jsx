// Module imports
import {
	useEffect,
	useRef,
} from 'react'





// Local imports
import styles from './FilmGrain.module.scss'





// Constants
const FILM_GRAIN_PROPS = {
	animate: 'animate',
	autoPlay: true,
	className: styles['film-grain'],
	controls: false,
	exit: 'exit',
	initial: 'initial',
	loop: true,
	muted: true,
	preload: 'auto',
	src: '/backgrounds/film-grain.webm',
	variants: {
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		initial: { opacity: 0 },
	},
}





/**
 * Renders the vignette.
 *
 * @component
 */
export function FilmGrain() {
	const videoRef = useRef(null)

	useEffect(() => {
		const videoElement = videoRef.current
		videoElement.playbackRate = 0.5
	}, [])

	return (
		<video
			ref={videoRef}
			autoPlay
			controls={false}
			loop
			muted
			preload={'auto'}
			src={'/backgrounds/film-grain.webm'}
			{...FILM_GRAIN_PROPS} />
	)
}
