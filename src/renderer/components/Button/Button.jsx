// Module imports
import classnames from 'classnames'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { useMemo } from 'react'





// Local imports
import styles from './Button.module.scss'





/**
 * Renders a button.
 *
 * @component
 */
export function Button(props) {
	const {
		animate,
		children,
		className,
		exit,
		initial,
		isDisabled,
		onClick,
		onMouseDown,
		onMouseOut,
		onMouseOver,
		onMouseUp,
		transition,
		variants,
	} = props

	const compiledClassName = useMemo(() => {
		return classnames({
			[styles['button']]: true,
			[styles['is-disabled']]: isDisabled,
			[className]: true,
		})
	}, [
		className,
		isDisabled,
	])

	return (
		<motion.button
			animate={animate ?? (variants.animate && 'animate') ?? (variants.visible && 'visible')}
			className={compiledClassName}
			disabled={isDisabled}
			exit={exit ?? (variants.exit && 'exit') ?? (variants.hidden && 'hidden')}
			initial={initial ?? (variants.initial && 'initial') ?? (variants.hidden && 'hidden')}
			onClick={onClick}
			onMouseDown={onMouseDown}
			onMouseOut={onMouseOut}
			onMouseOver={onMouseOver}
			onMouseUp={onMouseUp}
			transition={transition}
			variants={variants}>
			{children}
		</motion.button>
	)
}

Button.defaultProps = {
	animate: null,
	className: '',
	exit: null,
	initial: null,
	isDisabled: false,
	// eslint-disable-next-line jsdoc/require-jsdoc
	onClick: () => {},
	// eslint-disable-next-line jsdoc/require-jsdoc
	onMouseDown: () => {},
	// eslint-disable-next-line jsdoc/require-jsdoc
	onMouseOut: () => {},
	// eslint-disable-next-line jsdoc/require-jsdoc
	onMouseOver: () => {},
	// eslint-disable-next-line jsdoc/require-jsdoc
	onMouseUp: () => {},
	transition: {},
	variants: {},
}

Button.propTypes = {
	animate: PropTypes.string,
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	exit: PropTypes.string,
	initial: PropTypes.string,
	isDisabled: PropTypes.bool,
	onClick: PropTypes.func,
	onMouseDown: PropTypes.func,
	onMouseOut: PropTypes.func,
	onMouseOver: PropTypes.func,
	onMouseUp: PropTypes.func,
	transition: PropTypes.object,
	variants: PropTypes.object,
}
