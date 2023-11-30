// Module imports
import classnames from 'classnames'// Module imports
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'





// Local imports
import styles from './Modal.module.scss'
import { useMemo } from 'react'





// Constants
const VARIANTS = {
	animate: { opacity: 1 },
	exit: { opacity: 0 },
	initial: { opacity: 0 },
}





/**
 * Renders the score screen for a round.
 *
 * @component
 */
export function Modal(props) {
	const {
		children,
		className,
	} = props

	const compiledClassName = useMemo(() => classnames(styles['modal'], className), [className])

	return (
		<motion.div
			animate={'animate'}
			className={styles['modal-backdrop']}
			exit={'exit'}
			initial={'initial'}
			variants={VARIANTS}>
			<div className={styles['modal-wrapper']}>
				<div className={compiledClassName}>
					{children}
				</div>
			</div>
		</motion.div>
	)
}

Modal.defaultProps = {
	children: null,
	className: '',
}

Modal.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
}
