// Module imports
import classnames from 'classnames'
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
		children,
		className,
		isDisabled,
		onClick,
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
		// eslint-disable-next-line react/forbid-elements
		<button
			className={compiledClassName}
			disabled={isDisabled}
			onClick={onClick}>
			{children}
		</button>
	)
}

Button.defaultProps = {
	className: '',
	isDisabled: false,
}

Button.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	isDisabled: PropTypes.bool,
	onClick: PropTypes.func.isRequired,
}
