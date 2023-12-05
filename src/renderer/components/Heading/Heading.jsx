// Module imports
import classnames from 'classnames'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { useMemo } from 'react'





// Local imports
import styles from './Heading.module.scss'





/**
 * Renders a heading.
 *
 * @component
 */
export function Heading(props) {
	const {
		animate,
		children,
		className,
		exit,
		initial,
		level,
		variants,
	} = props

	const headingProps = useMemo(() => ({
		animate,
		className: classnames(
			styles['heading'],
			styles[`level-${level}`],
			className,
		),
		exit,
		initial,
		variants,
	}), [
		animate,
		className,
		exit,
		initial,
		level,
		variants,
	])

	switch (level) {
		case 1:
			return (
				<motion.h1 {...headingProps}>
					{children}
				</motion.h1>
			)

		case 2:
			return (
				<motion.h2 {...headingProps}>
					{children}
				</motion.h2>
			)

		case 3:
			return (
				<motion.h3 {...headingProps}>
					{children}
				</motion.h3>
			)

		case 4:
			return (
				<motion.h4 {...headingProps}>
					{children}
				</motion.h4>
			)

		case 5:
			return (
				<motion.h5 {...headingProps}>
					{children}
				</motion.h5>
			)

		case 6:
			return (
				<motion.h6 {...headingProps}>
					{children}
				</motion.h6>
			)

		default:
			throw new RangeError('Headings must have a level between 1 and 6 (inclusive).')
	}
}

Heading.defaultProps = {
	animate: 'animate',
	children: null,
	className: '',
	exit: 'exit',
	initial: 'initial',
	variants: {},
}

Heading.propTypes = {
	animate: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.string,
	]),
	children: PropTypes.node,
	className: PropTypes.string,
	exit: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.string,
	]),
	initial: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.string,
	]),
	level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]).isRequired,
	variants: PropTypes.object,
}
