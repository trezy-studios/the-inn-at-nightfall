// Module imports
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'





// Local imports
import styles from './Menu.module.scss'





/**
 * Renders the target indicator for a menu.
 *
 * @component
 */
export function TargetIndicator(props) {
	const { menuID } = props

	return (
		<motion.div
			className={styles['target-indicator']}
			layout
			layoutId={`target-indicator::${menuID}`}
			role={'none'}>
			<motion.img
				alt={''}
				className={styles['target-indicator-cap']}
				layoutId={`target-indicator::${menuID}::cap`}
				role={'none'}
				src={'ui/target-indicator.vertical.cap.svg'} />
			<motion.div
				className={styles['target-indicator-bar']}
				layout
				layoutId={`target-indicator::${menuID}::bar`}
				role={'none'}>
				<motion.img
					alt={''}
					className={styles['target-indicator-bar-top']}
					layoutId={`target-indicator::${menuID}::bar::top`}
					role={'none'}
					src={'ui/target-indicator.vertical.bar.top.svg'} />
				<motion.img
					alt={''}
					className={styles['target-indicator-bar-bottom']}
					layoutId={`target-indicator::${menuID}::bar::bottom`}
					role={'none'}
					src={'ui/target-indicator.vertical.bar.bottom.svg'} />
			</motion.div>
		</motion.div>
	)
}

TargetIndicator.propTypes = {
	menuID: PropTypes.string.isRequired,
}
