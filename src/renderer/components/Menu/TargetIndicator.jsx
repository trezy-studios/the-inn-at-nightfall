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
			layoutId={`target-indicator::${menuID}`} />
	)
}

TargetIndicator.propTypes = {
	menuID: PropTypes.string.isRequired,
}
