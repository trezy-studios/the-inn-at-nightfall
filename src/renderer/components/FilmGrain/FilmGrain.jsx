// Module imports
import {
	useEffect,
	useRef,
} from 'react'
import { motion } from 'framer-motion'





// Local imports
import styles from './FilmGrain.module.scss'





// Constants
const VARIANTS = {
	animate: { opacity: 1 },
	exit: { opacity: 0 },
	initial: { opacity: 0 },
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
		<motion.video
			ref={videoRef}
			animate={'animate'}
			autoPlay
			className={styles['film-grain']}
			controls={false}
			exit={'exit'}
			initial={'initial'}
			loop
			muted
			preload={'auto'}
			src={'backgrounds/film-grain.webm'}
			variants={VARIANTS} />
	)
}
