// Module imports
import classnames from 'classnames'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { useMemo } from 'react'





// Local imports
import styles from './Screen.module.scss'





// Constants
const DEFAULT_VARIANTS = {
	animate: {
		opacity: 1,
	},

	exit: {
		opacity: 0,
	},

	initial: {
		opacity: 0,
	},
}





/**
 * Renders a screen.
 *
 * @component
 */
export function Screen(props) {
	const {
		animate,
		children,
		className,
		exit,
		initial,
		variants,
	} = props

	const compiledClassName = useMemo(() => classnames(styles['screen'], className), [className])

	return (
		<motion.main
			animate={animate}
			className={compiledClassName}
			exit={exit}
			initial={initial}
			variants={variants}>
			{children}
		</motion.main>
	)
}

Screen.defaultProps = {
	animate: 'animate',
	children: null,
	className: '',
	exit: 'exit',
	initial: 'initial',
	variants: DEFAULT_VARIANTS,
}

Screen.propTypes = {
	animate: PropTypes.string,
	children: PropTypes.node,
	className: PropTypes.string,
	exit: PropTypes.string,
	initial: PropTypes.string,
	variants: PropTypes.object,
}
