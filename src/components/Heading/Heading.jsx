// Module imports
import classnames from 'classnames'
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
		children,
		className,
		level,
	} = props

	const compiledClassName = useMemo(() => {
		return classnames(
			styles['heading'],
			styles[`level-${level}`],
			className,
		)
	}, [
		className,
		level,
	])

	switch (level) {
		case 1:
			return (
				<h1 className={compiledClassName}>
					{children}
				</h1>
			)

		case 2:
			return (
				<h2 className={compiledClassName}>
					{children}
				</h2>
			)

		case 3:
			return (
				<h3 className={compiledClassName}>
					{children}
				</h3>
			)

		case 4:
			return (
				<h4 className={compiledClassName}>
					{children}
				</h4>
			)

		case 5:
			return (
				<h5 className={compiledClassName}>
					{children}
				</h5>
			)

		case 6:
			return (
				<h6 className={compiledClassName}>
					{children}
				</h6>
			)

		default:
			throw new RangeError('Headings must have a level between 1 and 6 (inclusive).')
	}
}

Heading.defaultProps = {
	children: null,
	className: '',
}

Heading.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]).isRequired,
}
