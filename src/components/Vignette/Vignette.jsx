// Module imports
import {
	AnimatePresence,
	motion,
} from 'framer-motion'
import {
	useEffect,
	useState,
} from 'react'





// Local imports
import styles from './Vignette.module.scss'





// Constants
const VIGNETTE_PROPS = {
	animate: 'animate',
	className: styles['vignette'],
	exit: 'exit',
	initial: 'initial',
	variants: {
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		initial: { opacity: 0 },
	},
}





// Variables
let isLoadedSingleton = false





/**
 * Renders the vignette.
 *
 * @component
 */
export function Vignette() {
	const [isLoaded, setIsLoaded] = useState(isLoadedSingleton)

	useEffect(() => {
		if (!isLoaded) {
			const image = new Image
			image.addEventListener('load', () => {
				isLoadedSingleton = true
				setIsLoaded(true)
			})
			image.src = '/backgrounds/vignette.png'
			image.decode()
		}
	}, [
		isLoaded,
		setIsLoaded,
	])

	return (
		<AnimatePresence>
			{isLoaded && (
				<motion.div {...VIGNETTE_PROPS} />
			)}
		</AnimatePresence>
	)
}
