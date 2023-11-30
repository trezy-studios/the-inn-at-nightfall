// Module imports
import { motion } from 'framer-motion'





// Local imports
import styles from './Menu.module.scss'





// Constants
// const VARIANTS = {
// 	animate: { opacity: 1 },
// 	exit: { opacity: 0 },
// 	initial: { opacity: 0 },
// }





/**
 * Renders the target indicator for a menu.
 *
 * @component
 */
export function TargetIndicator() {
	return (
		<motion.div
			className={styles['target-indicator']}
			// animate={'animate'}
			// exit={'exit'}
			// initial={'initial'}
			/* variants={VARIANTS} */
			layoutId={'target-indicator'} />
	)
}
