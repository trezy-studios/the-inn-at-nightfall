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
		onClick,
	} = props

	const compiledClassName = useMemo(() => {
		return classnames(styles['button'], className)
	}, [className])

	return (
		// eslint-disable-next-line react/forbid-elements
		<button
			className={compiledClassName}
			onClick={onClick}>
			{children}
		</button>
	)
}

Button.defaultProps = {
	className: '',
}

Button.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	onClick: PropTypes.func.isRequired,
}
